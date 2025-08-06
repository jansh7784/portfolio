import linkedin from '../assets/LinkedinLogo.svg';
import twitter from '../assets/XLogo.svg';
import github from '../assets/GithubLogo.svg';
import email from '../assets/EnvelopeSimple.svg';
import ansh from '../assets/ansh.png';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-200">
      <div className={`transition-all duration-200 ease-in-out ${
        isScrolled ? 'w-[calc(100%-2rem)] md:w-1/2 rounded-full bg-white/20 backdrop-blur-md mx-4 my-4' : 'w-full'
      } h-12 flex flex-row px-6 md:px-8 items-center justify-between gap-8 md:gap-12`}>
        <div className='font-mono text-base md:text-lg cursor-pointer whitespace-nowrap basis-[150px] md:basis-[200px] text-white flex items-center gap-2'>
          <a href='/' className='flex justify-center items-center gap-1'>
          <svg
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          Menu
          </a>
        </div>

        {isScrolled && (
          <div className="font-mono text-base md:text-lg whitespace-nowrap text-white flex items-center">
            <a href="/">
              <img
                src={ansh}
                alt="Ansh Jain"
                className="w-auto h-8 md:h-10 object-cover"
              />
            </a>
          </div>
        )}
        
        <div className="flex flex-row justify-end basis-[150px] md:basis-[200px] text-white">
          <a 
            href="http://www.linkedin.com/in/ansh--jain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-1 py-2 md:p-2 rounded-full transition-transform duration-200 hover:scale-110 color-white"
          >
            <img src={linkedin} alt="LinkedIn" className="h-4 w-4 md:h-6 md:w-6" />
          </a>
          
          <a 
            href="https://twitter.com/jansh7784" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-1 py-2 md:p-2 rounded-full transition-transform duration-200 hover:scale-110"
          >
            <img src={twitter} alt="Twitter/X" className="h-4 w-4 md:h-6 md:w-6" />
          </a>
          
          <a 
            href="https://github.com/MaybeTarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-1 py-2 md:p-2 rounded-full transition-transform duration-200 hover:scale-110"
          >
            <img src={github} alt="GitHub" className="h-4 w-4 md:h-6 md:w-6" />
          </a>
          
          <a 
            href="mailto:tarun234.tg@gmail.com"
            className="px-1 py-2 md:p-2 rounded-full transition-transform duration-200 hover:scale-110"
          >
            <img src={email} alt="Email" className="h-4 w-4 md:h-6 md:w-6" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Nav;