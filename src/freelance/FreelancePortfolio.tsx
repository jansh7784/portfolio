import { useState } from "react";
import TransitionLoader from './components/TransitionLoader';
import Nav from './components/Nav';
import Hero from './components/Hero';

function FreelancePortfolio() {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [contentOpacity, setContentOpacity] = useState(0);

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setContentOpacity(1);
    }, 100);
  };

  return (
    <div className="bg-[#0c0c0c] min-h-screen">
      {isTransitioning ? (
        <TransitionLoader onTransitionComplete={handleTransitionComplete} />
      ) : (
        <div 
          className="relative min-h-screen w-full"
          style={{
            opacity: contentOpacity,
            transition: 'opacity 500ms ease-in-out'
          }}
        >
          <Nav />
          <Hero />
          <div className="relative w-full h-dvh bg-[#0c0c0c]">
            
          </div>
        </div>
      )}
    </div>
  );
}

export default FreelancePortfolio;