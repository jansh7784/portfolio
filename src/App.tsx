import flyingTarun from './assets/superman.gif';
import { SpeechBox, SpeechBoxR, SpeechBoxL, SpeechBoxLL, SpeechBoxSolid } from './components/SpeechBox';
import { AvatarCircles } from "./components/AvatarCircles";
import skillbg from './assets/skillbg.webp';
import concrete from './assets/concrete.webp';
import cognify from './assets/cognify.png';
import bento from './assets/bento.webp';
import aaargh from './assets/img4.mp4';
import arrow from './assets/arrow.webp';
import link from './assets/link.webp';
import LinkedinLogo from './assets/LinkedinLogo.webp';
import XLogo from './assets/XLogo.webp';
import GithubLogo from './assets/GithubLogo.webp';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import kid from './assets/kid.webp';
import awakening from './assets/awakening.webp';
import quests from './assets/quests.webp';
import sky from './assets/sky.webp';
import looking from './assets/looking.webp';
import boredme from './assets/boredme.webp';
import bug from './assets/bug.webp';
import ShooterGame from './components/shooter.tsx'
import hand from './assets/hand.webp';
import { TiArrowSortedUp } from 'react-icons/ti';
import { getDatabase, ref, runTransaction, get } from 'firebase/database';
import app from './firebase';
import LoadingScreen from './LoadingScreen';
import { FiEye, FiHeart } from 'react-icons/fi';
import CachedImage from './components/CachedImage';
import bubble from './assets/bubble.webp';
import pow from './assets/pow.webp';

const webDevAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=react", profileUrl: "https://react.dev/" },
  { imageUrl: "https://skillicons.dev/icons?i=next", profileUrl: "https://nextjs.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=express", profileUrl: "https://expressjs.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=nodejs", profileUrl: "https://nodejs.org/en/" },
  { imageUrl: "https://skillicons.dev/icons?i=firebase", profileUrl: "https://firebase.google.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=threejs", profileUrl: "https://threejs.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=html", profileUrl: "https://developer.mozilla.org/docs/Web/HTML" },
  { imageUrl: "https://skillicons.dev/icons?i=css", profileUrl: "https://developer.mozilla.org/docs/Web/CSS" },
  { imageUrl: "https://skillicons.dev/icons?i=js", profileUrl: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { imageUrl: "https://skillicons.dev/icons?i=ts", profileUrl: "https://www.typescriptlang.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=tailwind", profileUrl: "https://tailwindcss.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=mysql", profileUrl: "https://www.mysql.com/" },
];

const androidDevAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=kotlin", profileUrl: "https://kotlinlang.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=flutter", profileUrl: "https://flutter.dev/" },
  { imageUrl: "https://skillicons.dev/icons?i=mongodb", profileUrl: "https://www.mongodb.com/" },
];

const cloudAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=aws", profileUrl: "https://aws.amazon.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=kubernetes", profileUrl: "https://kubernetes.io/" },
  { imageUrl: "https://skillicons.dev/icons?i=azure", profileUrl: "https://azure.microsoft.com/en-in" },
];

const programmingAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=python", profileUrl: "https://www.python.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=cpp", profileUrl: "https://isocpp.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=java", profileUrl: "https://www.java.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=latex", profileUrl: "https://www.latex-project.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=solidity", profileUrl: "https://docs.soliditylang.org/" },
];

const uiuxAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=figma", profileUrl: "https://www.figma.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=ps", profileUrl: "https://www.adobe.com/products/photoshop.html" },
  { imageUrl: "https://skillicons.dev/icons?i=ai", profileUrl: "https://www.adobe.com/products/illustrator.html" },
  { imageUrl: "https://skillicons.dev/icons?i=blender", profileUrl: "https://www.blender.org/" },
];

function App() {
  const navigate = useNavigate();
  const [showSpeech, setShowSpeech] = useState(false);
  const [isShooterOpen, setIsShooterOpen] = useState(false);

  const { scrollY } = useViewportScroll();
  const imgParallaxY = useTransform(scrollY, value => -value * 0.09);

  const [rotation, setRotation] = useState({ initial: -20, whileInView: -12 });

  const [arrowRotation, setArrowRotation] = useState({ initial: 110, whileInView: 90 });

  const [views, setViews] = useState<number | null>(null);

  const incrementedRef = useRef(false);

  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const lastLoaded = localStorage.getItem('comic-loading-last');
  const now = Date.now();
  const shouldShowLoading = !(lastLoaded && now - parseInt(lastLoaded, 10) < weekMs);
  const [loading, setLoading] = useState(shouldShowLoading);

  const [shooterHighScore, setShooterHighScore] = useState(
    Number.parseInt(localStorage.getItem("shooterHighScore") || "0")
  );

  const updateShooterHighScore = (newScore: number) => {
    setShooterHighScore(newScore);
    localStorage.setItem("shooterHighScore", newScore.toString());
  };

  useEffect(() => {
    const lastLoaded = localStorage.getItem('comic-loading-last');
    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    if (lastLoaded && now - parseInt(lastLoaded, 10) < weekMs) {
      setLoading(false);
    }
  }, []);

  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem('comic-liked') === 'true');

    const db = getDatabase(app);
    const likesRef = ref(db, 'likes');
    get(likesRef).then(snapshot => {
      setLikes(snapshot.exists() ? snapshot.val() : 0);
    });

    // const favicon = document.getElementById('dynamic-favicon');
    // function handleVisibility() {
    //   if (!favicon) return;
    //   favicon.setAttribute(
    //     'href',
    //     document.visibilityState === 'visible' ? '/favicon2.webp' : '/favicon.webp'
    //   );
    // }
    // document.addEventListener('visibilitychange', handleVisibility);
    // handleVisibility();
    // return () => {
    //   document.removeEventListener('visibilitychange', handleVisibility);
    // };
  }, []);

  const handleLike = async () => {
    const db = getDatabase(app);
    const likesRef = ref(db, 'likes');
    if (liked) {
      setLiked(false);
      localStorage.removeItem('comic-liked');
      
      await runTransaction(likesRef, (current) => Math.max((current || 1) - 1, 0));
    } else {
      setLiked(true);
      localStorage.setItem('comic-liked', 'true');
      
      await runTransaction(likesRef, (current) => (current || 0) + 1);
    }
    
    get(likesRef).then(snapshot => {
      setLikes(snapshot.exists() ? snapshot.val() : 0);
    });
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setRotation({ initial: 25, whileInView: 20 });
      } else {
        setRotation({ initial: -20, whileInView: -12 });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleArrowResize() {
      if (window.innerWidth < 768) {
        setArrowRotation({ initial: 110, whileInView: 90 });
      } else {
        setArrowRotation({ initial: 60, whileInView: 40 });
      }
    }
    handleArrowResize();
    window.addEventListener('resize', handleArrowResize);
    return () => window.removeEventListener('resize', handleArrowResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
      setShowSpeech(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 2.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (incrementedRef.current) return;
    incrementedRef.current = true;

    const db = getDatabase(app);
    const counterRef = ref(db, 'pageviews');

    runTransaction(counterRef, (current) => (current || 0) + 1)
      .then(() => {
        return get(counterRef);
      })
      .then((snapshot) => {
        setViews(snapshot.val());
      })
      .catch((error) => {
        setViews(null);
        console.error('Error updating or fetching pageviews:', error);
      });
  }, []);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => {
        setLoading(false);
        localStorage.setItem('comic-loading-last', Date.now().toString());
      }} />}
      <div className={`overflow-x-hidden w-full min-h-screen flex flex-col items-center bg-white relative transition-opacity duration-500 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <motion.div
          className="absolute top-2 left-4 text-black gaegu-regular text-lg md:text-xl z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <button
            onClick={() => navigate('/simple')}
            className="cursor-pointer gaegu-regular border-y-2 border-black text-base md:text-lg"
          >
            &lt; View Simpler Version &gt;
          </button>
        </motion.div>
        <motion.div
          className="absolute top-2 right-4 text-black gaegu-regular text-lg md:text-xl z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="flex items-center gap-2">
            <button
              className="focus:outline-none flex items-center cursor-pointer"
              onClick={handleLike}
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <FiHeart
                className={`inline-block text-2xl transition-colors duration-200 ${liked ? 'text-red-500 fill-red-500' : 'text-black'}`}
                style={{ strokeWidth: 2 }}
                fill={liked ? 'red' : 'none'}
              />
              <span className="ml-1 select-none">{likes === null ? '.' : likes}</span>
            </button>
            <FiEye className="inline-block text-2xl" aria-label="Total Reads" />
            <span className=''>{views === null ? '.' : views}</span>
          </span>
        </motion.div>

        {/* page 1 */}
        <section className="relative w-full h-dvh flex justify-center items-center" aria-label="Introduction">
          <motion.img
            src={kid}
            alt="Tarun Gupta as kid"
            className="border-2 md:border-4 border-black w-[90vw] md:w-[60vw] h-auto z-10"
            loading="lazy"
            initial={{ scale: 3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          {showSpeech && (
            <SpeechBoxR className="absolute max-w-[85vw] md:left-[15%] bottom-[25%] md:bottom-8 text-base z-20">
              Since birth, Tarun showed signs of becoming<br className='hidden md:block'/> something more than human... <span className="gaegu-bold text-lg md:text-4xl">a Developer.</span>
            </SpeechBoxR>
          )}
        </section>

        {/* page 2 */}
        <section className="relative w-full h-[30vh] md:h-[40vh] md:mt-16" aria-label="Development Journey">
          <div className="border-y-4 border-black w-full h-full object-cover overflow-hidden">
            <motion.img
              src={awakening}
              alt="Tarun Gupta's development journey"
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1.0 }}
              transition={{ duration: 1 }}
            />
          </div>
          <SpeechBoxL className="absolute -bottom-28 right-4 md:right-16">
            He trained in the sacred arts of code,<br />logic, and late-night debugging.
          </SpeechBoxL>
        </section>


        <section className="relative w-full h-[30vh] md:h-[45vh] mt-32 mb-16" aria-label="Developer Skills">
          <div className="border-y-4 border-black w-full h-full object-cover relative overflow-hidden">
            <motion.img
              src={sky}
              alt="Bug Killer background image"
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1.0 }}
              transition={{ duration: 1 }}
            />
          </div>
          <motion.img
            src={flyingTarun}
            alt="Flying character illustration"
            className="absolute h-12 md:h-36 w-auto rotate-[20deg] md:-rotate-12 -top-4 -left-4 md:left-4 scale-125"
            loading="lazy"
            initial={{ x: -60, rotate: rotation.initial + 'deg' }}
            whileInView={{ x: 0, rotate: rotation.whileInView + 'deg' }}
            transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 2 }}
          />
          <motion.img
            src={bug}
            alt="Bug illustration"
            className="absolute h-16 md:h-28 cursor-pointer w-auto bottom-4 md:bottom-8 right-8 md:right-20"
            loading="lazy"
            initial={{ x: 60 }}
            whileInView={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 2 }}
            onClick={() => {
              setIsShooterOpen(true);
            }}
          />
          <motion.img
            src={pow}
            alt="PoW pOw Pow"
            className="absolute h-6 md:h-10 cursor-pointer w-auto bottom-[4.5rem] md:bottom-32 right-2 md:right-8"
            loading="lazy"
            initial={{ x: 60 }}
            whileInView={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 2 }}
            onClick={() => {
              setIsShooterOpen(true);
            }}
          />
          <motion.img
            src={pow}
            alt="PoW pOw Pow"
            className="absolute h-4 md:h-8 cursor-pointer w-auto bottom-2 md:bottom-4 right-20 md:right-40"
            loading="lazy"
            initial={{ x: 60 }}
            whileInView={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 2 }}
            onClick={() => {
              setIsShooterOpen(true);
            }}
          />
          <ShooterGame 
            isOpen={isShooterOpen} 
            onClose={() => setIsShooterOpen(false)}
            highScore={shooterHighScore}
            onHighScoreUpdate={updateShooterHighScore}
          />
          <div className='absolute bottom-4 left-8 gaegu-regular text-white text-base md:text-2xl'> &#91; Part time bug fixer &#93;	</div>
          {/* <div className='absolute top-4 right-8 gaegu-regular text-white text-base md:text-2xl'>Highscore: <span className='underline-offset-8 underline'>{shooterHighScore}</span></div> */}
          <div className="absolute top-4 right-8 gaegu-regular text-white text-base md:text-2xl group">
            <div className="relative inline-block">
              Highscore: <span className="underline underline-offset-8">{shooterHighScore}</span>
              <div className="absolute -left-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="relative w-[10rem] sm:w-[12rem] rotate-3 md:-mt-2">
                  <img src={bubble} alt="tooltip bubble background" className="w-full h-auto" />
                  <span className="absolute inset-0 flex items-center justify-center text-center mt-3 text-black text-xs md:text-sm px-2 gaegu-bold whitespace-nowrap">
                    {shooterHighScore < 20
                      ? "Intern Debugger"
                      : shooterHighScore < 100
                      ? "Junior Bug Squasher"
                      : shooterHighScore < 200
                      ? "Senior Code Exterminator"
                      : "Legendary Bug Slayer"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute rotate-[20deg] md:-rotate-[20deg] top-12 left-[28%] text-6xl gaegu-regular text-[#FFD403]'><span className='text-4xl md:text-6xl'>W</span><span className='text-5xl md:text-7xl'>O</span><span className='text-6xl md:text-8xl'>O</span><span className='text-6xl md:text-8xl'>!</span></div>
        </section>

        {/* page 3 */}
        <section className="w-full h-fit flex flex-col md:flex-row items-center justify-center bg-white my-16" aria-label="Technical Skills">
            <div className="flex-1 flex items-center justify-center -mt-32 relative">
              <SpeechBox className="relative mt-16">
                his arsenal only grew bigger
              </SpeechBox>
              <motion.img 
                key={arrowRotation.initial}
                src={arrow} 
                alt="Arrow pointing to skills section" 
                className="absolute -bottom-14 md:-bottom-20 right-56 md:right-8 w-20 md:w-32 h-auto"
                loading="lazy"
                initial={{ rotate: arrowRotation.initial }}
                whileInView={{ rotate: arrowRotation.whileInView }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex-1 flex items-center justify-end mt-24 md:mt-0 -mr-6 md:mr-0">
              <div
                className="w-full border-y-2 border-l-2 md:border-l-4 md:border-y-4 border-r-0 border-black p-6 ml-4 md:ml-20 flex flex-col gap-4 md:gap-6 bg-white relative"
                style={{
                  backgroundImage: `url(${skillbg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-black px-8 py-2 text-2xl font-bold gaegu-bold">
                  #SKILLS
                </h2>
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                >
                  <div className="flex items-center gap-4 border-2 border-black px-4 md:px-8 py-2 md:py-4 bg-white text-black text-left text-[0.8rem] md:text-xl font-mono capitalize rounded-xl">
                    <span className="flex-1">web development</span>
                    <AvatarCircles avatarUrls={webDevAvatars} numPeople={20} />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                >
                  <div className="flex items-center gap-4 border-2 border-black px-4 md:px-8 py-2 md:py-4 bg-white text-black text-left text-[0.8rem] md:text-xl font-mono capitalize rounded-xl">
                    <span className="flex-1">android development</span>
                    <AvatarCircles avatarUrls={androidDevAvatars} numPeople={0} />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                >
                  <div className="flex items-center gap-4 border-2 border-black px-4 md:px-8 py-2 md:py-4 bg-white text-black text-left text-[0.8rem] md:text-xl font-mono capitalize rounded-xl">
                    <span className="flex-1">cloud computing</span>
                    <AvatarCircles avatarUrls={cloudAvatars} numPeople={0} />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                >
                  <div className="flex items-center gap-4 border-2 border-black px-4 md:px-8 py-2 md:py-4 bg-white text-black text-left text-[0.8rem] md:text-xl font-mono capitalize rounded-xl">
                    <span className="flex-1">programming languages</span>
                    <AvatarCircles avatarUrls={programmingAvatars} numPeople={0} />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                >
                  <div className="flex items-center gap-4 border-2 border-black px-4 md:px-8 py-2 md:py-4 bg-white text-black text-left text-[0.8rem] md:text-xl font-mono capitalize rounded-xl">
                    <span className="flex-1">UI/UX designing</span>
                    <AvatarCircles avatarUrls={uiuxAvatars} numPeople={0} />
                  </div>
                </motion.div>
              </div>
          </div>
        </section>

        {/* page 4 */}
        <section className="w-full h-fit flex items-center justify-start bg-white my-16" aria-label="Project Journey">
          <div className="md:w-2/3 flex items-center justify-center relative">
            <div className="relative w-full h-auto border-y-2 md:border-y-4 border-r-2 md:border-r-4 border-black overflow-hidden">
              <motion.img
                src={quests}
                alt="Tarun Gupta's various quests showcase"
                className="w-full h-auto"
                loading="lazy"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1.0 }}
                transition={{ duration: 1 }}
              />
            </div>
            <SpeechBoxLL className="absolute top-[20rem] -right-[60%] hidden md:block">
              With his powers now honed, Tarun<br/>sets off on <span className='gaegu-bold'>quests</span> that tests both<br/>his logic and caffeine limits.
            </SpeechBoxLL>
            <SpeechBoxL className="absolute top-[24rem] -right-6 md:hidden block">
              With his powers now honed, Tarun<br/>sets off on <span className='gaegu-bold'>quests</span> that tests both<br/>his logic and caffeine limits.
            </SpeechBoxL>
          </div>
          <motion.div className="w-1/2 relative" initial={{ x: '100%' }} whileInView={{ x: 0 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}>          
            <CachedImage className='translate-y-64 -translate-x-20 md:translate-x-0 right-0 w-auto md:scale-100 scale-[450%]' src={hand}></CachedImage>
            <a href="https://freelance.maybetarun.in" target="_blank" rel="noopener noreferrer">
              <button  className='absolute -left-56 md:left-12 py-1 px-2 md:py-2 md:px-4 border-2 border-black bg-black hover:bg-white text-white hover:text-black -bottom-48 md:bottom-32 text-base md:text-xl gaegu-regular -rotate-2 hover:rotate-6 hover:scale-105 transition-transform duration-100'># He also freelances btw</button>
            </a>
          </motion.div>
        </section>

        {/* page 5 for >md */}
        <section className="w-full h-fit flex-row items-center justify-center bg-white my-32 relative hidden md:flex" aria-label="Portfolio Projects">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="flex flex-col gap-8 md:mt-12 relative"
              initial={{ y: 60 }}
              whileInView={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            >
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-10">
                <h2 className="text-2xl md:text-3xl font-bold gaegu-bold text-black border-2 md:border-4 border-black bg-white px-6 py-2">
                  #QUESTS
                </h2>
              </div>
              <article>
                <div className="relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                    <div
                      className="absolute top-0 right-0 pointer-events-none"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '40px solid #fff', 
                        borderLeft: '40px solid transparent',
                      }}
                    />
                  </div>
                  <a
                    href="https://github.com/MaybeTarun/Concrete-Damage-Detector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 z-30"
                    aria-label="View Concrete Damage Detector project on GitHub"
                  >
                    <CachedImage
                      src={link}
                      alt="Link to Concrete Damage Detector project"
                      className="w-10 h-10"
                      
                      loading="lazy"
                    />
                  </a>
                  <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                    <h3 className="font-bold font-mono text-base capitalize text-center">Concrete Damage Detector</h3>
                    <p className="text-sm font-mono normal-case text-justify">Built a YOLO-powered damage detector to spot and segment cracks in concrete — keeping buildings strong, one frame at a time.</p>
                  </SpeechBoxSolid>
                  <div className="max-w-[40vw] h-auto border-2 md:border-4 border-black overflow-hidden">
                    <CachedImage
                      src={concrete}
                      alt="Concrete Damage Detector - AI-powered crack detection system for infrastructure monitoring"
                      className="w-full h-auto transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
                          <article>
                <div className="relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                    <div
                      className="absolute top-0 right-0 pointer-events-none"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '40px solid #fff', 
                        borderLeft: '40px solid transparent',
                      }}
                    />
                  </div>
                  <a
                    href="https://bento-gen.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 z-30"
                    aria-label="View Bento Grid Generator project"
                  >
                    <CachedImage
                      src={link}
                      alt="Link to Bento Grid Generator project"
                      className="w-10 h-10"
                      
                      loading="lazy"
                    />
                  </a>
                  <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                    <h3 className="font-bold font-mono text-base capitalize text-center">Bento Grid Generator</h3>
                    <p className="text-sm font-mono normal-case text-justify">Designed a tool that generates bento-style UI layouts with live previews and exportable code templates.</p>
                  </SpeechBoxSolid>
                  <div className="max-w-[40vw] h-auto border-2 md:border-4 border-black overflow-hidden">
                    <CachedImage
                      src={bento}
                      alt="Bento Grid Generator - UI layout tool for creating bento-style designs with live previews"
                      className="w-full h-auto transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            </motion.div>
            <motion.div
              className="flex flex-col gap-8 -mt-12 relative"
              initial={{ y: -60 }}
              whileInView={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            >
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
                <Link
                  to="/projects"
                  className="bg-black text-white border-2 md:border-4 border-black px-6 py-3 font-bold gaegu-regular hover:bg-white hover:text-black transition-colors duration-300 text-xl whitespace-nowrap inline-block"
                >
                  Check out more quests/projects
                </Link>
              </div>
              <article>
                <div className="relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                    <div
                      className="absolute top-0 right-0 pointer-events-none"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '40px solid #fff',
                        borderLeft: '40px solid transparent',
                      }}
                    />
                  </div>
                  <a
                    href="https://github.com/MaybeTarun/Cognify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 z-30"
                    aria-label="View Cognify project on GitHub"
                  >
                    <CachedImage
                      src={link}
                      alt="Link to Cognify project"
                      className="w-10 h-10"
                      
                      loading="lazy"
                    />
                  </a>
                  <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                    <h3 className="font-bold font-mono text-base capitalize text-center">Cognify</h3>
                    <p className="text-sm font-mono normal-case text-justify">Developed an Android learning platform with Kotlin and OpenAI to simplify how users learn and understand new concepts.</p>
                  </SpeechBoxSolid>
                  <div className="max-w-[40vw] h-auto border-2 md:border-4 border-black overflow-hidden">
                    <CachedImage
                      src={cognify}
                      alt="Cognify - Android learning platform with AI-powered concept explanation"
                      className="w-full h-auto transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
              <article>
                <div className="relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                    <div
                      className="absolute top-0 right-0 pointer-events-none"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '40px solid #fff', 
                        borderLeft: '40px solid transparent',
                      }}
                    />
                  </div>
                  <a
                    href="https://aaargh.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 z-30"
                    aria-label="View AAARGH!! game project"
                  >
                    <CachedImage
                      src={link}
                      alt="Link to AAARGH!!"
                      className="w-10 h-10"
                      
                      loading="lazy"
                    />
                  </a>
                  <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                    <h3 className="font-bold font-mono text-base capitalize text-center">AAARGH!!</h3>
                    <p className="text-sm font-mono normal-case text-justify">Built a game where screaming 'aaaargh' actually makes you fly — no tapping, just weird noises.</p>
                  </SpeechBoxSolid>
                  <video
                    src={aaargh}
                    className="max-w-[40vw] h-auto border-2 md:border-4 border-black"
                    controls
                    playsInline
                    title="AAARGH!! - Voice-controlled flying game demonstration"
                  />
                </div>
              </article>
            </motion.div>
          </div>
        </section>

        {/* page 5 for < md */}
        <section className="w-full flex flex-col items-center justify-center bg-white my-32 md:hidden" aria-label="Portfolio Projects Mobile">
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full flex justify-center">
              <h2 className="text-2xl font-bold gaegu-bold text-black border-2 md:border-4 border-black bg-white px-6 py-2 w-fit">
                #QUESTS
              </h2>
            </div>
            <article className="w-[90vw] h-full">
              <div className="relative group overflow-hidden w-full h-full">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff', 
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://github.com/MaybeTarun/Concrete-Damage-Detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View Concrete Damage Detector project on GitHub"
                >
                  <CachedImage
                    src={link}
                    alt="Link to Concrete Damage Detector project"
                    className="w-10 h-10"
                    
                    loading="lazy"
                  />
                </a>
                <div className="w-full h-auto border-2 md:border-4 border-black overflow-hidden">
                  <CachedImage
                    src={concrete}
                    alt="Concrete Damage Detector - AI-powered crack detection system for infrastructure monitoring"
                    className="w-full h-auto transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <SpeechBoxSolid className="w-full mt-2 text-xs font-mono text-center">
                <h3 className="font-bold font-mono text-sm capitalize text-center">Concrete Damage Detector</h3>
                <p className="text-sm font-mono normal-case text-justify">Built a YOLO-powered damage detector to spot and segment cracks in concrete — keeping buildings strong, one frame at a time.</p>
              </SpeechBoxSolid>
            </article>
            <article className="w-[90vw] h-full">
              <div className="relative group overflow-hidden w-full h-full">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff', 
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://bento-gen.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View Bento Grid Generator project"
                >
                  <CachedImage
                    src={link}
                    alt="Link to Bento Grid Generator project"
                    className="w-10 h-10"
                    
                    loading="lazy"
                  />
                </a>
                <div className="w-full h-auto border-2 md:border-4 border-black overflow-hidden">
                  <CachedImage
                    src={bento}
                    alt="Bento Grid Generator - UI layout tool for creating bento-style designs with live previews"
                    className="w-full h-auto transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <SpeechBoxSolid className="w-full mt-2 text-xs font-mono text-center">
                <h3 className="font-bold font-mono text-sm capitalize text-center">Bento Grid Generator</h3>
                <p className="text-sm font-mono normal-case text-justify">Designed a tool that generates bento-style UI layouts with live previews and exportable code templates.</p>
              </SpeechBoxSolid>
            </article>
            <article className="w-[90vw] h-full">
              <div className="relative group overflow-hidden w-full h-full">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff',
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://github.com/MaybeTarun/Cognify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View Cognify project on GitHub"
                >
                  <CachedImage
                    src={link}
                    alt="Link to Cognify project"
                    className="w-10 h-10"
                    
                    loading="lazy"
                  />
                </a>
                <div className="w-full h-auto border-2 md:border-4 border-black overflow-hidden">
                  <CachedImage
                    src={cognify}
                    alt="Cognify - Android learning platform with AI-powered concept explanation"
                    className="w-full h-auto transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <SpeechBoxSolid className="w-full mt-2 text-xs font-mono text-center">
                <h3 className="font-bold font-mono text-sm capitalize text-center">Cognify</h3>
                <p className="text-sm font-mono normal-case text-justify">Developed an Android learning platform with Kotlin and OpenAI to simplify how users learn and understand new concepts.</p>
              </SpeechBoxSolid>
            </article>
            <article className="w-[90vw] h-full">
              <div className="relative group overflow-hidden w-full h-full">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff', 
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://aaargh.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View AAARGH!! game project"
                >
                  <CachedImage
                    src={link}
                    alt="Link to AAARGH!!"
                    className="w-10 h-10"
                    
                    loading="lazy"
                  />
                </a>
                <div className="w-full h-auto border-2 md:border-4 border-black overflow-hidden">
                  <video
                    src={aaargh}
                    className="w-full h-auto border-2 md:border-4 border-black"
                    controls
                    playsInline
                    title="AAARGH!! - Voice-controlled flying game demonstration"
                  />
                </div>
              </div>
              <SpeechBoxSolid className="w-full mt-2 text-xs font-mono text-center">
                <h3 className="font-bold font-mono text-sm capitalize text-center">AAARGH!!</h3>
                <p className="text-sm font-mono normal-case text-justify">Built a game where screaming 'aaaargh' actually makes you fly — no tapping, just weird noises.</p>
              </SpeechBoxSolid>
            </article>
            <div className="w-full flex justify-center mt-4">
              <Link
                to="/projects"
                className="bg-black text-white border-2 md:border-4 border-black px-6 py-3 font-bold gaegu-regular hover:bg-white hover:text-black transition-colors duration-300 text-xl whitespace-nowrap inline-block"
              >
                Check out more quests/projects
              </Link>
            </div>
          </div>
        </section>

        {/* page 6 */}
        <section className="w-full h-[50vh] md:h-[70vh] mt-32 mb-16 relative">
          <div className="w-full h-full object-cover border-y-4 border-black overflow-hidden">
            <motion.img
              src={looking}
              alt="Tarun Gupta looking for new quests"
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1.0 }}
              transition={{ duration: 1 }}
            />
          </div>
          <SpeechBoxR className="absolute right-[10%] md:right-[20%] -bottom-[28rem]">
            Now, he's bored and on the<br/>lookout for the <span className='gaegu-bold'>next challenge</span>.
          </SpeechBoxR>
          <motion.img
            style={{ y: imgParallaxY }}
            src={boredme}
            alt="Tarun Gupta bored"
            className="absolute top-[20rem] md:top-72 left-16 w-36 md:w-48 h-36 md:h-48 border-2 md:border-4 border-black object-cover"
            loading="lazy"
          />
        </section>

        {/* page 7 */}
        <section className="w-full h-fit my-16 flex flex-col items-center justify-center bg-white">
          <div className="flex flex-row gap-16">
            <div className="flex flex-col items-center">
              <a
                href="https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="box-button"
              >
                <div className="button">
                  <span className="text-2xl font-bold gaegu-regular">Resume</span>
                </div>
              </a>
              <span className="text-[0.75rem] md:text-base font-mono text-black mt-2"></span>
            </div>
            <div className="flex flex-col items-center">
              <a
                href="mailto:tarun234.tg@gmail.com"
                className="box-button"
              >
                <div className="button">
                  <span className="text-2xl font-bold gaegu-regular">Email Me</span>
                </div>
              </a>
              <span className="text-[0.75rem] md:text-base font-mono text-black mt-2">[or send a pigeon]</span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-6 mb-8 md:mb-16 mt-4 md:mt-8">
            <a href="https://linkedin.com/in/maybetarun" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <CachedImage src={LinkedinLogo} alt="LinkedIn" className="w-8 md:w-12 h-8 md:h-12 hover:scale-105 transition-opacity duration-200" loading="lazy" />
            </a>
            <a href="https://github.com/maybetarun" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <CachedImage src={GithubLogo} alt="GitHub" className="w-8 md:w-12 h-8 md:h-12 hover:scale-105 transition-opacity duration-200" loading="lazy" />
            </a>
            <a href="https://twitter.com/maybetarun" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <CachedImage src={XLogo} alt="X (Twitter)" className="w-8 md:w-12 h-8 md:h-12 hover:scale-105 transition-opacity duration-200" loading="lazy" />
            </a>
          </div>
          <PageNumberControl />
        </section>
      </div>
    </>
  );
}

export default App;

function PageNumberControl() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProjects = location.pathname === '/projects';
  const page = isProjects ? 2 : 1;
  const totalPages = 2;
  const handlePrev = () => {
    if (page === 2) navigate('/', { state: { scrollTo: 'bottom' } });
  };
  const handleNext = () => {
    if (page === 1) navigate('/projects');
  };
  return (
    <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
      <button
        onClick={handlePrev}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={page === 1}
        aria-label="Previous Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(-90deg)' }} />
      </button>
      <div className="px-6 py-2 border-2 border-black bg-white text-lg gaegu-bold">
        Page {page} of 6
      </div>
      <button
        onClick={handleNext}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={page === totalPages}
        aria-label="Next Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(90deg)' }} />
      </button>
    </div>
  );
}
