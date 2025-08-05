import { ReactNode } from 'react';
import vect from '../assets/vect.webp';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

interface SpeechBoxProps {
  children: ReactNode;
  className?: string;
}

export function SpeechBox({ children, className = '' }: SpeechBoxProps) {
  return (
    <div className={`border-2 border-dashed border-black bg-white px-6 py-4 text-justify absolute ${className}`}>
      <span className="text-xl md:text-4xl gaegu-regular uppercase">{children}</span>
    </div>
  );
} 

export function SpeechBoxSolid({ children, className = '' }: SpeechBoxProps) {
  return (
    <div className={`border-2 border-solid border-black bg-white px-6 py-4 text-justify relative md:absolute ${className}`}>
      <span className="text-sm md:text-4xl gaegu-regular uppercase">{children}</span>
    </div>
  );
} 

export function SpeechBoxR({ children, className = '' }: SpeechBoxProps) {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, value => -value * 0.09);
  return (
    <motion.div style={{ y }} className={`border-2 border-black bg-white rounded-xl px-4 py-1 text-justify absolute ${className}`}>
      <img
        src={vect}
        alt=""
        className="absolute -top-6 right-4 w-6 h-6"
      />
      <span className="text-base md:text-3xl gaegu-regular uppercase">{children}</span>
    </motion.div>
  );
}

export function SpeechBoxL({ children, className = '' }: SpeechBoxProps) {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, value => -value * 0.09);
  return (
    <motion.div style={{ y }} className={`border-2 border-black bg-white rounded-xl px-4 py-1 text-justify absolute ${className}`}>
      <img
        src={vect}
        alt=""
        className="absolute -top-6 left-4 w-6 h-6 scale-x-[-1]"
      />
      <span className="text-base md:text-3xl gaegu-regular uppercase">{children}</span>
    </motion.div>
  );
}

export function SpeechBoxLL({ children, className = '' }: SpeechBoxProps) {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, value => -value * 0.09);
  return (
    <motion.div style={{ y }} className={`border-2 border-black bg-white rounded-xl px-4 py-1 text-justify absolute ${className}`}>
      <img
        src={vect}
        alt=""
        className="absolute bottom-6 -left-6 w-6 h-6 rotate-90 scale-y-[-1]"
      />
      <span className="text-base md:text-3xl gaegu-regular uppercase">{children}</span>
    </motion.div>
  );
}
