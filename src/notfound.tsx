import Lottie from 'react-lottie';
import animationData from './assets/notfound.json';

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center p-4">
      <div className="relative aspect-square border-2 border-black" style={{ 
        width: 'min(calc(100vw - 2rem), calc(100dvh - 2rem))',
        height: 'min(calc(100vw - 2rem), calc(100dvh - 2rem))'
      }}>
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black hover:bg-white hover:text-black transition-all duration-400 border-2 border-black gaegu-bold py-1 md:py-2 px-2 md:px-4 text-base md:text-xl z-10"
        >
          Go Back Simon
        </button>
        <Lottie
          options={defaultOptions}
          style={{ 
            pointerEvents: 'none',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;