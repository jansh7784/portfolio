import lil from '../assets/lil.png';
import { useRef, useState, useEffect } from 'react';

function useInView<T extends HTMLElement = HTMLElement>(rootMargin = '0px'): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [rootMargin]);

  return [ref, inView];
}

const Hero = () => {
  const [desktopRef, desktopInView] = useInView<HTMLDivElement>('300px 0px');
  const [mobileRef, mobileInView] = useInView<HTMLDivElement>('300px 0px');

  return (
    <div className='w-full relative'>
      <svg
        className="absolute top-0 left-2/3 h-full w-6 z-0 pointer-events-none"
        style={{ transform: 'translateX(-20%)' }}
        viewBox="0 0 24 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M12 0 Q16 100, 12 200 Q8 300, 12 400 Q16 500, 12 600 Q8 700, 12 800 Q16 900, 12 1000"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute top-0 left-2/3 h-full w-6 z-0 pointer-events-none"
        style={{ transform: 'translateX(-500%)' }}
        viewBox="0 0 24 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M12 0 Q8 100, 12 200 Q16 300, 12 400 Q8 500, 12 600 Q16 700, 12 800 Q8 900, 12 1000"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Desktop Version */}
      <div ref={desktopRef} className="hidden md:block w-full h-dvh z-10 relative overflow-hidden">
        {/* Cool Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float-${i % 3} ${3 + Math.random() * 4}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Main text "ansh" */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl animate-pulse tracking-wider">
                ansh
              </h1>
              <div className="h-2 w-48 mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse mt-4" />
            </div>
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-16 h-16 border-2 border-blue-400 rotate-45 opacity-30 animate-spin" />
          <div className="absolute bottom-32 right-20 w-12 h-12 border-2 border-purple-400 rounded-full opacity-30 animate-bounce" />
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-pink-400 opacity-20 rotate-12 animate-pulse" />
        </div>
        
        <div className='bottom-0 left-0 p-6 absolute barriecito text-white text-6xl text-left z-20'>
          Making the Internet<br/>
          <span className="inline-flex items-end gap-2">less boring<img src={lil} alt="Lil Icon" className="w-auto h-16 -mb-1"/></span>
        </div>
      </div>
      
      {/* Mobile Version */}
      <div ref={mobileRef} className="block md:hidden w-full h-[40vh] relative z-10 overflow-hidden">
        {/* Cool Mobile Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {/* Mobile particles */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float-${i % 3} ${3 + Math.random() * 4}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
          
          {/* Main text "ansh" for mobile */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-[4rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl animate-pulse tracking-wider">
                ansh
              </h1>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse mt-2" />
            </div>
          </div>
        </div>
        
        <div className='bottom-0 left-0 p-6 absolute barriecito text-white text-lg text-left z-20'>
          Making the Internet<br/>
          <span className="inline-flex items-end gap-1">Less boring<img src={lil} alt="Lil Icon" className="w-auto h-6 mb-[2px]"/></span>
        </div>
      </div>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}

export default Hero;