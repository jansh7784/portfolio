"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiX, FiVolume2, FiVolumeX } from "react-icons/fi";
import shooter from "../assets/shooter.webp";
import life from "../assets/heart.webp";
import bugImage from "../assets/bug.webp";
import LetterGlitch from '../components/Backgrounds/LetterGlitch/LetterGlitch';

interface Position { x: number; y: number }
interface GameObject extends Position { id: number }
interface Bullet extends GameObject { hit?: boolean }
interface Bug extends GameObject { dx: number; dy: number; health: number; hit?: boolean; flipped?: boolean }
interface Particle extends Position { id: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }
interface GameState { player: Position; bullets: Bullet[]; bugs: Bug[]; particles: Particle[]; score: number; lives: number; wave: number; gameRunning: boolean; lastBulletTime: number }
interface ShooterGameProps { isOpen: boolean; onClose: () => void; highScore: number; onHighScoreUpdate: (newHighScore: number) => void }

const GAME_CONFIG = { PLAYER_SPEED: 5, BULLET_SPEED: 6, SHOOT_INTERVAL: 300, POINTS_PER_WAVE: 20, BUG_CONFIG: { health: 1, speed: 1, points: 1 }, BASE_SPAWN_RATE: 0.012 }

const createParticles = (x: number, y: number, color: string, count = 8): Particle[] => {
  return Array.from({ length: count }, () => ({
    id: Math.random(),
    x: x + Math.random() * 20 - 10,
    y: y + Math.random() * 20 - 10,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    life: 30,
    maxLife: 30,
    color,
    size: Math.random() * 4 + 2,
  }));
};

const ShooterGame: React.FC<ShooterGameProps> = ({ isOpen, onClose, highScore, onHighScoreUpdate }) => {
  const [gameWidth, setGameWidth] = useState(600);
  const [gameHeight, setGameHeight] = useState(500);
  const [muted, setMuted] = useState(false);
  const [showLaggyText, setShowLaggyText] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const gameStateRef = useRef<GameState>({ player: { x: 300, y: 450 }, bullets: [], bugs: [], particles: [], score: 0, lives: 3, wave: 1, gameRunning: false, lastBulletTime: 0 });
  const [uiState, setUiState] = useState({ score: 0, lives: 3, wave: 1 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const playerVelocityRef = useRef({ x: 0, y: 0 });
  const audioContextRef = useRef<AudioContext | null>(null);
  const touchRef = useRef<boolean>(false);

  if (!audioContextRef.current) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioContextRef.current = new AudioContextClass();
  }

  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (muted) return;
    try {
      const ctx = audioContextRef.current;
      if (!ctx) return;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch { /* ignore audio errors */ }
  }, [muted]);

  const updateGameSize = useCallback(() => {
    const maxWidth = Math.min(window.innerWidth - 32, 800);
    const maxHeight = Math.min(window.innerHeight - 160, 600);
    const aspectRatio = 4 / 3;
    let newWidth = maxWidth;
    let newHeight = newWidth / aspectRatio;
    if (newHeight > maxHeight) { newHeight = maxHeight; newWidth = newHeight * aspectRatio; }
    newWidth = Math.max(280, newWidth);
    newHeight = Math.max(210, newHeight);
    setGameWidth(newWidth);
    setGameHeight(newHeight);
  }, []);

  useEffect(() => {
    updateGameSize();
    window.addEventListener("resize", updateGameSize);
    return () => window.removeEventListener("resize", updateGameSize);
  }, [updateGameSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keysRef.current[e.key] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("shooterHighScore");
    if (storedHighScore) {
      onHighScoreUpdate(Number(storedHighScore));
    }
  }, [onHighScoreUpdate]);  

  const initGame = useCallback(() => {
    playerVelocityRef.current = { x: 0, y: 0 };
    gameStateRef.current = { player: { x: gameWidth / 2 - 20, y: gameHeight - 80 }, bullets: [], bugs: [], particles: [], score: 0, lives: 3, wave: 1, gameRunning: true, lastBulletTime: 0 };
    setShowLeaderboard(false);
    setTimeout(() => setShowLaggyText(true), 3000);
  }, [gameWidth, gameHeight]);

  const createBug = useCallback((wave: number): Bug => {
    const bugSize = 40;
    const waveFactor = Math.min(wave, 10);
    return { id: Math.random(), x: Math.random() * (gameWidth - bugSize), y: -bugSize, dx: (Math.random() - 0.5) * 3 * (1 + waveFactor * 0.1), dy: (0.8 + Math.random() * 0.7), health: 1 + Math.floor(waveFactor / 2), flipped: Math.random() < 0.5 };
  }, [gameWidth]);

  useEffect(() => {
    if (!isOpen || showLeaderboard) return;
    let lastTime = performance.now();
    const loop = setInterval(() => {
      const now = performance.now();
      const delta = (now - lastTime) / (1000 / 60);
      lastTime = now;
      const state = gameStateRef.current;
      if (!state.gameRunning) return;
      const currentWave = Math.floor(state.score / GAME_CONFIG.POINTS_PER_WAVE) + 1;
      if (currentWave > state.wave) { state.wave = currentWave; playSound(400, 0.5, "sine"); }
      const acceleration = 0.8 * delta;
      const friction = 0.85;
      const maxSpeed = GAME_CONFIG.PLAYER_SPEED * delta;
      let targetVelX = 0;
      if (keysRef.current["ArrowLeft"] || keysRef.current["a"] || keysRef.current["A"]) targetVelX = -maxSpeed;
      if (keysRef.current["ArrowRight"] || keysRef.current["d"] || keysRef.current["D"]) targetVelX = maxSpeed;
      if (targetVelX !== 0) playerVelocityRef.current.x += (targetVelX - playerVelocityRef.current.x) * acceleration;
      else playerVelocityRef.current.x *= friction;
      state.player.x += playerVelocityRef.current.x;
      state.player.x = Math.max(0, Math.min(gameWidth - 40, state.player.x));
      if (now - state.lastBulletTime >= GAME_CONFIG.SHOOT_INTERVAL) { state.bullets.push({ id: Math.random(), x: state.player.x + 20, y: state.player.y }); state.lastBulletTime = now; playSound(800, 0.1, "square"); }
      state.bullets = state.bullets.map(b => ({ ...b, y: b.y - GAME_CONFIG.BULLET_SPEED * delta })).filter(b => b.y > -10 && !b.hit);
      state.bugs = state.bugs.map(bug => {
        const newX = bug.x + bug.dx * delta;
        const newY = bug.y + bug.dy * delta;
        let newDx = bug.dx;
        if (newX <= 0 || newX >= gameWidth - 40) newDx = -bug.dx;
        return { ...bug, x: Math.max(0, Math.min(gameWidth - 40, newX)), y: newY, dx: newDx };
      }).filter(bug => {
        if (bug.y >= gameHeight) { state.lives -= 1; if (state.lives <= 0) { state.gameRunning = false; setShowLaggyText(false); if (state.score > highScore) { onHighScoreUpdate(state.score); localStorage.setItem("shooterHighScore", String(state.score)); } } return false; }
        return true;
      });
      state.particles = state.particles.map(p => ({ ...p, x: p.x + p.vx * delta, y: p.y + p.vy * delta, life: p.life - delta })).filter(p => p.life > 0).slice(-200);
      for (const bullet of state.bullets) {
        for (const bug of state.bugs) {
          const dx = bullet.x - (bug.x + 20);
          const dy = bullet.y - (bug.y + 20);
          if (dx * dx + dy * dy < 625) { bullet.hit = true; bug.hit = true; state.score += GAME_CONFIG.BUG_CONFIG.points; state.particles.push(...createParticles(bug.x + 20, bug.y + 20, "#ff6b6b")); playSound(300, 0.2, "sawtooth"); if (state.score > highScore) { onHighScoreUpdate(state.score); localStorage.setItem("shooterHighScore", String(state.score)); } break; }
        }
      }
      for (const bug of state.bugs) {
        const dx = state.player.x + 20 - (bug.x + 20);
        const dy = state.player.y + 20 - (bug.y + 20);
        if (dx * dx + dy * dy < 900) { bug.hit = true; state.lives -= 1; state.particles.push(...createParticles(state.player.x + 20, state.player.y + 20, "#ff4444")); playSound(150, 0.5, "sawtooth"); if (state.lives <= 0) { state.gameRunning = false; setShowLaggyText(false); if (state.score > highScore) { onHighScoreUpdate(state.score); localStorage.setItem("shooterHighScore", String(state.score)); } } break; }
      }
      state.bullets = state.bullets.filter(b => !b.hit);
      state.bugs = state.bugs.filter(b => !b.hit);
      const spawnRate = GAME_CONFIG.BASE_SPAWN_RATE * (1 + state.wave * 0.3);
      if (Math.random() < spawnRate * delta) state.bugs.push(createBug(state.wave));
    }, 1000 / 75);
    const uiUpdater = setInterval(() => { const { score, lives, wave } = gameStateRef.current; setUiState({ score, lives, wave }); }, 100);
    return () => { clearInterval(loop); clearInterval(uiUpdater); };
  }, [isOpen, gameWidth, gameHeight, createBug, highScore, onHighScoreUpdate, playSound, showLeaderboard]);

  const closeGame = () => { gameStateRef.current.gameRunning = false; setShowLaggyText(false); onClose(); };
  const openLeaderboard = () => { gameStateRef.current.gameRunning = false; setShowLaggyText(false); setShowLeaderboard(true); };

  if (!isOpen) return null;
  const imageSize = Math.max(24, gameWidth / 25);
  const state = gameStateRef.current;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchRef.current = true;
    const touchX = e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left;
    state.player.x = Math.min(Math.max(touchX - imageSize / 2, 0), gameWidth - imageSize);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchRef.current) return;
    const touchX = e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left;
    state.player.x = Math.min(Math.max(touchX - imageSize / 2, 0), gameWidth - imageSize);
  };

  const handleTouchEnd = () => { touchRef.current = false; };

  return (
    <div className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 font-mono">
      <div className="bg-white w-full max-w-4xl max-h-full overflow-hidden flex flex-col relative">
      {showLeaderboard && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col text-black">
          <div className="flex justify-between items-center py-2 px-4 sm:px-6 bg-gray-100 border-b border-gray-200">
            <div className="text-gray-800 font-semibold text-sm sm:text-lg">Welcome ...</div>
            <button
              onClick={() => setShowLeaderboard(false)}
              className="text-gray-600 hover:text-black text-xl sm:text-2xl"
            >
              <FiX />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboards Coming Soon</h2>
          </div>
        </div>
      )}
        <div className="flex justify-between items-center py-2 px-4 sm:px-6 bg-gray-100 border-b border-gray-200">
          <div className="text-yellow-500 font-semibold text-sm sm:text-lg truncate">
            {!showLeaderboard && highScore > 0 && <>HighScore: {highScore}</>}
          </div>
          <div className="flex items-center gap-3">
            {!showLeaderboard && (
              <button onClick={openLeaderboard} className="bg-cyan-500 text-white px-3 py-1 hover:bg-cyan-600 text-xs sm:text-sm md:text-base">
                Leaderboard
              </button>
            )}
            <div className="flex items-center gap-2">
              {!showLeaderboard && (
                <button onClick={() => setMuted(!muted)} className="text-gray-600 hover:text-gray-800 text-lg sm:text-xl">
                  {muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
              )}
              <button onClick={closeGame} className="text-gray-600 hover:text-gray-800 text-xl sm:text-2xl">
                <FiX />
              </button>
            </div>
          </div>
        </div>
        <div className="p-2 sm:p-6 flex-1 flex flex-col items-center justify-center bg-gray-50 relative">
          <div
            className="relative bg-black overflow-hidden"
            style={{ width: gameWidth, height: gameHeight, touchAction: "none" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 z-0 opacity-5">
              <LetterGlitch
                glitchColors = {["#2b4539", "#61dca3", "#61b3dc"]}
                glitchSpeed={50}
                centerVignette={false}
                outerVignette={false}
                smooth={true}
              />
            </div>

            <div className="absolute inset-0 z-10">
              {!showLeaderboard && (
                <>
                  {state.gameRunning && (<div className="absolute top-2 left-2 flex flex-col gap-1 z-10 text-white font-bold text-xs sm:text-sm"><div className="bg-black/70 px-2 py-1 rounded">Score: {uiState.score}</div><div className="bg-black/70 px-2 py-1 rounded text-cyan-400">Wave {uiState.wave}</div></div>)}
                  {state.gameRunning && (<div className="absolute top-2 right-2 flex items-center gap-1 z-10">{[...Array(Math.max(0, uiState.lives))].map((_, i) => (<img key={i} src={life} alt="Life" className="w-4 h-4 sm:w-6 sm:h-6" />))}</div>)}
                  <div className="absolute" style={{ left: state.player.x, top: state.player.y, width: imageSize, height: imageSize }}><img src={shooter} alt="Player" width={imageSize} height={imageSize} className="w-full h-full object-contain" /></div>
                  {state.bullets.map(b => (<div key={b.id} className="absolute w-1 h-3 bg-cyan-400 rounded-full shadow-lg" style={{ left: b.x, top: b.y, boxShadow: "0 0 6px #22d3ee" }} />))}
                  {state.bugs.map(b => (<div key={b.id} className="absolute select-none" style={{ left: b.x, top: b.y, width: imageSize, height: imageSize, transform: b.flipped ? "scaleX(-1)" : "scaleX(1)" }}><img src={bugImage} alt="Bug" width={imageSize} height={imageSize} className="w-full h-full object-contain" /></div>))}
                  {state.particles.map(p => (<div key={p.id} className="absolute rounded-full" style={{ left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color, opacity: p.life / p.maxLife }} />))}
                </>
              )}
              {!state.gameRunning && !showLeaderboard && (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-xl">
                  <div className="text-center text-white max-w-xs sm:max-w-sm p-4 sm:p-6">
                    {state.score > 0 ? (<>
                      <h3 className="text-lg sm:text-2xl font-bold mb-2 text-red-500">Game Over!</h3>
                      <p className="text-base sm:text-xl mb-2">Final Score: {state.score}</p>
                      <p className="text-gray-400 mb-2 text-sm sm:text-base">Reached Wave {state.wave}</p>
                      {state.score > highScore && <p className="text-yellow-400 font-bold mb-2">New High Score!</p>}
                      <button onClick={initGame} className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors w-full text-sm sm:text-base">Play Again</button>
                    </>) : (
                      <>
                        <h3 className="text-lg sm:text-2xl font-bold mb-2 text-yellow-500">Time To Debug!!</h3>
                        <p className="text-sm sm:text-base mb-4 text-gray-300">Arrow keys/AD or touch to move</p>
                        <button onClick={initGame} className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors w-full text-sm sm:text-base">Start Game</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {showLaggyText && state.gameRunning && !showLeaderboard && (
          <p className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm italic hidden md:block">the game isn't laggy, you are</p>
        )}
      </div>
    </div>
  );
};

export default ShooterGame;
