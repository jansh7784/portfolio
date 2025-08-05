import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sperm from './assets/sperm.gif';
import CachedImage from './components/CachedImage';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'center' | 'left' | 'right'>('center');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(window.innerWidth * 0.4);
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setPhase('left'), 1000)); 
    timers.push(setTimeout(() => setPhase('right'), 3000));
    timers.push(setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 500);
    }, 4000)); 
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  let animateProps = { x: 0, scale: 1 };
  let transitionProps = { duration: 0.5 };
  if (phase === 'center') {
    animateProps = { x: 0, scale: 1 };
    transitionProps = { duration: 1 };
  } else if (phase === 'left') {
    animateProps = { x: -offset, scale: 0.5 };
    transitionProps = { duration: 2 };
  } else if (phase === 'right') {
    animateProps = { x: offset, scale: 1.1 };
    transitionProps = { duration: 1 };
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FF98A2]"
        >
          {(phase === 'left' || phase === 'right') && (
            <motion.div
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="fixed right-0 pointer-events-none h-[80vh] w-[80vh] -translate-y-1/2 z-10 overflow-hidden"
            >
              <div className="absolute top-0 h-full w-full bg-[#ffe5e8] rounded-full -right-[65vh] md:-right-[40vh]"/>
            </motion.div>
          )}
          <motion.div animate={animateProps} transition={transitionProps}>
            <CachedImage
              src={sperm}
              alt="Loading animation"
              className="w-32 h-32 object-contain"
              style={{ pointerEvents: 'none', zIndex: 5 }}
              loading="eager"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 