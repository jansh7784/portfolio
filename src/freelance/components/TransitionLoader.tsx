import { useState, useEffect } from 'react';

interface TransitionLoaderProps {
  onTransitionComplete: () => void;
}

const TransitionLoader = ({ onTransitionComplete }: TransitionLoaderProps) => {
  const [scale, setScale] = useState(0);
  
  useEffect(() => {
    setScale(0);
    
    const timeout1 = setTimeout(() => {
      setScale(100);
      
      const timeout2 = setTimeout(() => {
        onTransitionComplete();
      }, 1200);
      
      return () => clearTimeout(timeout2);
    }, 100);
    
    return () => clearTimeout(timeout1);
  }, [onTransitionComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div 
        className="bg-[#0c0c0c] transition-transform duration-[2000ms] ease-in-out"
        style={{
          width: '50px',
          height: '50px',
          transform: `scale(${scale})`,
          transformOrigin: 'center'
        }}
      />
    </div>
  );
};

export default TransitionLoader; 