import { useEffect, useState } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import CachedImage from './components/CachedImage';

import concrete from './assets/concrete.webp';
import bento from './assets/bento.webp';
import foresty from './assets/Foresty.webp';
import finance from './assets/Finance.webp';
import aaargh from './assets/Aaargh.webp';
import mana from './assets/Mana.webp';
import surgeon from './assets/surgeon.webp';
import cognify from './assets/cognify.png';
import holostry from './assets/Holostry.png';
import Sentiment from './assets/Sentiment.png';
import Colorizer from './assets/Colorizer.png';
import Revo from './assets/Revo.webp';
import knowabout from './assets/knowabout.png';
import payback from './assets/payback.png';
import soon from './assets/soon.png';

const TABS = [
  { key: 'web', label: 'Web Development' },
  { key: 'android', label: 'Android Development' },
  { key: 'python', label: 'Python' },
  { key: 'npm', label: 'NPM Packages' },
  // { key: 'cloud', label: 'Cloud Computing' },
  { key: 'uiux', label: 'UI/UX' },
] as const;

type TabKey = typeof TABS[number]['key'];

type Project = {
  image: string;
  name: string;
  desc: string;
  link: string;
};

const PROJECTS = {
  concrete: {
    image: concrete,
    name: 'Concrete Damage Detector',
    desc: 'Built a YOLO-powered damage detector to spot and segment cracks in concrete — keeping buildings strong, one frame at a time.',
    link: 'https://github.com/MaybeTarun/Concrete-Damage-Detector',
  },
  bento: {
    image: bento,
    name: 'BentoGen',
    desc: 'Designed a tool that generates bento-style UI layouts with live previews and exportable code templates.',
    link: 'https://bento-gen.vercel.app/',
  },
  foresty: {
    image: foresty,
    name: 'Foresty',
    desc: 'Created a user-friendly platform that helps users easily discover vulnerabilities—such as open ports and other security risks—on their websites, empowering them to secure their online presence.',
    link: 'https://github.com/MaybeTarun/Foresty',
  },
  finance: {
    image: finance,
    name: 'Finance Tracker',
    desc: 'A full-featured MERN stack application for tracking personal finances. Includes intuitive dashboards, transaction management, and uses Clerk for secure user authentication and management.',
    link: 'https://financetracker-neon.vercel.app/',
  },
  aaargh: {
    image: aaargh,
    name: 'Aaargh!!',
    desc: 'A voice-controlled game inspired by Flappy Bird, where you guide the player by making weird noises like "aaaah" or "aargh". Fun, chaotic, and a great way to test your vocal skills!',
    link: 'https://aaargh.vercel.app/', 
  },
  mana: {
    image: mana,
    name: 'Mana House',
    desc: 'A service-based startup that creates 3D projects for brands and agencies. We build games, 3D models, animations, and more to help businesses stand out with immersive digital experiences.',
    link: 'https://www.manahouse.in/', 
  },
  surgeon: {
    image: surgeon,
    name: 'Portfolio for a Surgeon',
    desc: 'A modern, responsive portfolio website designed and developed for a doctor as part of my freelance work. Highlights expertise, services, and achievements in a clean, professional layout.',
    link: 'https://www.surgeonrkl.com/', 
  },
  cognify: {
    image: cognify,
    name: 'Cognify',
    desc: 'A cloud-based learning platform built with Kotlin and XML that automates and personalizes learning. Integrates OpenAI to make understanding new topics easy and engaging for users.',
    link: 'https://github.com/MaybeTarun/Cognify', 
  },
  holostry: {
    image: holostry,
    name: 'Holostry',
    desc: 'Developed for a 24hr hackathon (MOZOHACK), Holostry lets students visualize 3D holographic models of carbon compounds, making chemistry interactive and easier to understand.',
    link: 'https://github.com/MaybeTarun/Holostry', 
  },
  sentiment: {
    image: Sentiment,
    name: 'Sentiment Analyzer',
    desc: 'A Python application with a Tkinter GUI that uses Amazon Comprehend (via Boto3) to analyze the sentiment of text. Instantly see if your content is positive, negative, or neutral.',
    link: 'https://github.com/MaybeTarun/SentimentAnalyzer', 
  },
  colorizer: {
    image: Colorizer,
    name: 'Image Colorizer',
    desc: 'A web app that colorizes black and white photos using a machine learning model by Rich Zhang. Upload your old photos and bring them to life with vibrant colors!',
    link: 'https://github.com/MaybeTarun/ImageColorizer', 
  },
  revo: {
    image: Revo,
    name: 'Revo',
    desc: 'A custom React project setup tool built on top of Vite. Streamlines your workflow with a clean project structure, pre-configured with Tailwind CSS and Framer Motion.',
    link: 'https://www.npmjs.com/package/create-revo', 
  },
  knowabout: {
    image: knowabout,
    name: 'Know-About',
    desc: 'An NPM package that gives you info about people when you run the command "npx know-about [name]". Currently features a few profiles—DM me on Twitter to add yours!',
    link: 'https://www.npmjs.com/package/know-about', 
  },
  payback: {
    image: payback,
    name: 'Payback-to-ya',
    desc: 'A playful NPM package for web devs: if your client doesn’t pay on time, add Payback-to-ya to their site and watch it slowly disappear over 7 days. ShIk sHaK ShOk!',
    link: 'https://www.npmjs.com/package/payback-to-ya', 
  },
  soon: {
    image: soon,
    name: 'Coming Soon',
    desc: '',
    link: '', 
  },
};

const DUMMY_PROJECTS: Record<TabKey, Project[]> = {
  web: [PROJECTS.bento, PROJECTS.aaargh, PROJECTS.mana, PROJECTS.foresty, PROJECTS.surgeon, PROJECTS.finance,],
  android: [PROJECTS.cognify, PROJECTS.holostry],
  python: [PROJECTS.concrete, PROJECTS.sentiment, PROJECTS.colorizer],
  npm: [PROJECTS.revo, PROJECTS.knowabout, PROJECTS.payback],
  // cloud: [PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento],
  uiux: [PROJECTS.soon, PROJECTS.soon, PROJECTS.soon, PROJECTS.soon, PROJECTS.soon, PROJECTS.soon],
};

const tabOrder: TabKey[] = TABS.map(t => t.key);
const totalPages = tabOrder.length + 1;

const AllProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialPage = () => {
    if (location.state && typeof location.state.page === 'number') {
      return location.state.page;
    }
    return 2;
  };
  const [page, setPage] = useState(getInitialPage);
  const [tabKey, setTabKey] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>(tabOrder[getInitialPage() - 2] || 'web');

  useEffect(() => {
    if (page === 1) return;
    const tabIdx = page - 2;
    if (tabOrder[tabIdx] && activeTab !== tabOrder[tabIdx]) {
      setActiveTab(tabOrder[tabIdx]);
      setTabKey(prev => prev + 1);
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const tabIdx = tabOrder.indexOf(activeTab);
    if (tabIdx !== -1 && page !== tabIdx + 2) {
      setPage(tabIdx + 2);
    }
    // eslint-disable-next-line
  }, [activeTab]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setTabKey(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    if (page === 2) {
      navigate('/', { state: { page: 1 } });
    } else {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page === totalPages) return;
    if (page === 1) {
      navigate('/projects', { state: { page: 2 } });
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ x: '100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100vw', opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col items-center bg-white px-4"
    >
      <div className="w-full bg-white pt-4 flex flex-col items-center justify-center z-10">
        <h1 className="w-fit text-2xl md:text-3xl font-bold gaegu-bold text-black border-2 md:border-4 border-black bg-white px-6 py-2 mb-2 md:mb-4 text-center z-20 relative">
          #PROJECTS
        </h1>
        <div className="w-full md:w-[80vw] mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-2 md:mb-4 bg-white py-2 md:p-2 z-20 relative">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`w-full p-2 border-2 border-black font-mono text-[0.8rem] md:text-base transition-colors duration-200 ${activeTab === tab.key ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + '-' + tabKey}
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          exit={{ y: -1200 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full z-0"
        >
          {activeTab !== 'uiux' ? (
            <div className="w-full md:w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center md:p-2 mb-8 md:mb-16">
              {DUMMY_PROJECTS[activeTab].map((proj, idx) => (
                <div
                  key={idx}
                  className="w-full relative flex items-center justify-center group overflow-hidden border-4 border-black"
                >
                  <div className="absolute top-2 left-2 md:left-4 z-20 gaegu-bold uppercase text-base md:text-2xl font-bold text-white">
                    {proj.name}
                  </div>
                  <CachedImage
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-auto object-contain bg-white cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10" />
                  <div className="absolute top-10 md:top-16 left-2 md:left-4 flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 w-[80%]">
                    <p className="text-base md:text-2xl text-white mb-4 md:mb-8 w-full gaegu-regular">
                      {proj.desc}
                    </p>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm md:text-base px-2 py-1 md:px-4 md:py-2 bg-white text-black font-mono border-2 border-black hover:bg-black hover:text-white transition-colors duration-200"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2 -mb-24">
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                {DUMMY_PROJECTS[activeTab].slice(0, 3).map((proj, idx) => {
                  let clip = '';
                  if (idx === 0) {
                    clip = 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)';
                  } else if (idx === 1) {
                    clip = 'polygon(0 20%, 100% 0, 100% 95%, 0% 90%)';
                  } else {
                    clip = 'polygon(0 10%, 100% 15%, 100% 100%, 0% 100%)';
                  }
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center${idx === 1 ? ' project-shiftL' : ''}${idx === 2 ? ' project-shiftL2' : ''}`}
                      style={{
                        clipPath: clip,
                        background: 'black',
                        padding: '4px',
                      }}
                    >
                      <CachedImage
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        style={{
                          clipPath: clip,
                        }}
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-[4.5rem] md:mt-0">
                {DUMMY_PROJECTS[activeTab].slice(3, 6).map((proj, idx) => {
                  let clip = '';
                  if (idx === 0) {
                    clip = 'polygon(0 0, 100% 0%, 100% 100%, 0 70%)';
                  } else if (idx === 1) {
                    clip = 'polygon(0 0, 100% 30%, 100% 90%, 0% 100%)';
                  } else {
                    clip = 'polygon(0 10%, 100% 0, 100% 100%, 0% 100%)';
                  }
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center${idx === 1 ? ' project-shiftR' : ''}${idx === 2 ? ' project-shiftR2' : ''}`}
                      style={{
                        clipPath: clip,
                        background: 'black',
                        padding: '4px',
                      }}
                    >
                      <CachedImage
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{
                          clipPath: clip,
                        }}
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <PageNumberControl
        page={page}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        disablePrev={page === 1}
        disableNext={page === totalPages}
      />
    </motion.div>
  );
};

export default AllProjects;

function PageNumberControl({ page, totalPages, onPrev, onNext, disablePrev, disableNext }: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 mb-8 md:mb-16">
      <button
        onClick={onPrev}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={disablePrev}
        aria-label="Previous Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(-90deg)' }} />
      </button>
      <div className="px-6 py-2 border-2 border-black bg-white text-lg gaegu-bold">
        Page {page} of {totalPages}
      </div>
      <button
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={disableNext}
        aria-label="Next Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(90deg)' }} />
      </button>
    </div>
  );
} 