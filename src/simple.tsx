import { useState } from "react";
import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope } from "react-icons/fa6";
import skill from './assets/skill.webp';
import DarkVeil from "./components/Backgrounds/DarkVeil/DarkVeil";

const Tooltip = ({
  children,
  text,
  variant = "right",
}: {
  children: React.ReactNode;
  text: string;
  variant?: "right" | "left";
}) => {
  const [show, setShow] = useState(false);

  const boxPosition =
    variant === "right"
      ? "top-full mt-2 left-2/3"
      : "top-full mt-2 right-1/3";

  const trianglePosition =
    variant === "right"
      ? "absolute -top-1 left-[10%] w-3 h-3 bg-[#1e1e1e] rotate-45"
      : "absolute -top-1 right-[10%] w-3 h-3 bg-[#1e1e1e] rotate-45";

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="underline-offset-2 underline cursor-pointer"
      >
        {children}
      </span>

      {show && (
        <div
          className={`absolute ${boxPosition} bg-[#1e1e1e] text-white text-sm px-3 py-2 rounded-md z-[100] whitespace-nowrap`}
        >
          <div className={trianglePosition} />
          {text}
        </div>
      )}
    </span>
  );
};

const Simple = () => (
  <div className="h-screen w-screen overflow-hidden bg-black text-white font-mono select-text relative">
    <div className="absolute inset-0 z-0">
      <DarkVeil />
    </div>
    
    <div className="relative z-50 h-full w-full max-w-[700px] mx-auto flex flex-col p-2 sm:p-4 bg-black/85 backdrop-blur-lg">

      <div className="flex justify-between items-center mb-8">
        <a 
          href="/" 
          className="text-2xl font-bold cursor-pointer hover:scale-105 transition-all duration-100"
        >
          TG
        </a>
        <a 
          href="https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-white hover:text-black hover:bg-white transition-colors border border-white px-4 py-2"
        >
          View Resume
        </a>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-1">Tarun Gupta</h2>
        <p className="text-[#9f9f9f] text-sm sm:text-xl leading-relaxed">
          <a href="/projects">
            <Tooltip text="certified by my projects" variant="left">
              Software Developer
            </Tooltip>
          </a>
          {" "}and{" "}
          <a 
            href="https://www.credly.com/badges/712255f1-8bbc-4878-b80a-8282844ec96f/public_url" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Tooltip text="certified by AWS" variant="right">
              Cloud Solutions Architect
            </Tooltip>
          </a>
          <br />
          <span className="text-xs sm:text-lg">&lt; Proficient in React.js and AWS &gt;</span>
        </p>
      </div>

      <div className="mb-6 text-center">
        <p className="text-white text-sm sm:text-base mb-2">
          Reach out to me on any of the following platforms
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-2xl text-[#9f9f9f]">
          <a 
            href="https://linkedin.com/in/maybetarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/maybetarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaXTwitter />
          </a>
          <a 
            href="https://github.com/maybetarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaGithub />
          </a>
          <a 
            href="mailto:tarun234.tg@gmail.com"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 mt-2">
        <div className="relative w-full h-full flex items-start justify-center">
          <img 
            src={skill}
            alt="skill diagram" 
            className="w-full h-auto max-h-full object-contain select-none"
          />
        </div>
      </div>

    </div>
  </div>
);

export default Simple;