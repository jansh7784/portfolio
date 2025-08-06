// import Spline from '@splinetool/react-spline';
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

      <div ref={desktopRef} className="hidden md:block w-full h-dvh z-10 relative">
        {desktopInView && (
          <Spline scene="https://prod.spline.design/2mxkQh0cYFty0m6L/scene.splinecode" />
        )}
        <div className='w-40 bottom-0 right-0 h-[10%] bg-[#0c0c0c] absolute'/>
        <div className='bottom-0 left-0 p-6 absolute barriecito text-white text-6xl text-left'>
          Making the Internet<br/>
          <span className="inline-flex items-end gap-2">less boring<img src={lil} alt="Lil Icon" className="w-auto h-16 -mb-1"/></span>
        </div>
      </div>
      
      <div ref={mobileRef} className="block md:hidden w-full h-[40vh] bg-[#0c0c0c] relative z-10">
        {mobileInView && (
          <Spline scene="https://prod.spline.design/uNEfd7k0nlu7q3ld/scene.splinecode" />
        )}
        <div className='w-40 bottom-0 right-0 h-[20%] bg-[#0c0c0c] absolute'></div>
        <div className='bottom-0 left-0 p-6 absolute barriecito text-white text-lg text-left'>
          Making the Internet<br/>
          <span className="inline-flex items-end gap-1">Less boring<img src={lil} alt="Lil Icon" className="w-auto h-6 mb-[2px]"/></span>
        </div>
      </div>
    </div>
  );
}

export default Hero;