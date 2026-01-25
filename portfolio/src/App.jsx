import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PixelSnow from './PixelSnow.jsx';

function App() {
  const [hideScrollHint, setHideScrollHint] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [showPortfolioButton, setShowPortfolioButton] = useState(false);
  const [showPortfolioPopup, setShowPortfolioPopup] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const words = [
    { text: 'Code', color: 'text-white' },
    { text: 'Create', color: 'text-gray-400' },
    { text: 'Connect', color: 'text-gray-600' },
  ];

  // Hide scroll hint after first scroll
  useEffect(() => {
    const handleScroll = () => setHideScrollHint(true);
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show projects when section enters view
  useEffect(() => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShowProjects(true);
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(projectsSection);
    return () => observer.disconnect();
  }, []);

  // Show experience on view 
  useEffect(() => {
    const experienceSection = document.getElementById('experience');
    if (!experienceSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShowExperience(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    
    observer.observe(experienceSection);
    return () => observer.disconnect();
  }, []);

  // Navbar hide on scroll down
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHideNavbar(currentScroll > lastScroll && currentScroll > 10);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show floating portfolio button only at the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomPosition = document.documentElement.scrollHeight;
      setShowPortfolioButton(scrollPosition >= bottomPosition - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 flex justify-center pt-4 transition-transform duration-300 ${
          hideNavbar ? '-translate-y-full' : 'translate-y-50'
        }`}
      >
        <div className="px-2 py-1 sm:px-4 sm:py-2 bg-black/90 border-2 border-white pixel-box-hard pixel-dungeon-enter">
          <ul className="flex gap-3 sm:gap-6 md:gap-8">
            {[
              { name: 'GitHub', link: 'https://github.com/JustinWangsa', img: '/github.png' },
              { name: 'LinkedIn', link: 'https://www.linkedin.com/in/justinwangsa/', img: '/linkedin.png' },
              { name: 'Instagram', link: 'https://www.instagram.com/justinnwangsa/', img: '/ig.png' },
              { name: 'Email', link: 'mailto:justinwangsa9@gmail.com', img: '/email.png' },
            ].map((item, i) => (
              <li key={i} className="cursor-pointer">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 hover:scale-110 transition-transform"
                >
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* BACKGROUND */}
      <div className="fixed inset-0 w-screen h-screen -z-10">
        <PixelSnow
          pixelResolution={500}
          speed={0.6}
          depthFade={10.5}
          brightness={0.3}
          density={0.35}
          variant="round"
          direction={120}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <p className="dotgothic-font text-white text-[11px] md:text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] mb-2">
          {"Currently Based in Taiwan".split(" ").map((word, i) => (
            <span key={i} className="pixel-letter" style={{ animationDelay: `${i * 0.3}s` }}>
              {word}&nbsp;
            </span>
          ))}
        </p>

        

        <h1 className="dotgothic-font text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] font-bold leading-none mb-2">
          {words.map((word, i) => (
            <span key={i} className={`${word.color} mr-1`}>
              {word.text.split('').map((letter, j) => (
                <span key={j} className="pixel-letter" style={{ animationDelay: `${i * 0.5 + j * 0.1}s` }}>
                  {letter}
                </span>
              ))}
              .
            </span>
          ))}
        </h1>

        <p className="dotgothic-font text-gray-400 text-[7px] md:text-[9px] lg:text-[11px] xl:text-[15px] 2xl:text-[18px] mt-1">
          {"Hi, I'm Justin – a computer science student exploring networks and cybersecurity.".split(" ").map((word, i) => (
            <span key={i} className="pixel-letter" style={{ animationDelay: `${i * 0.2}s` }}>
              {word}&nbsp;
            </span>
          ))}
        </p>

        {/* CV BUTTON */}
        <a
          href="cv.pdf"
          target="_blank"
          className="mt-6 pixel-box-hard pixel-dungeon-enter dotgothic-font text-white text-[10px] md:text-[13px] flex items-center justify-center p-2"
        >
          View Full Resume
        </a>
      </div>

      <div>
        {/* PROJECTS */}
        <div
          id="projects"
          className={`relative z-10 mt-12 mx-auto w-full max-w-[1250px] px-4 sm:px-6 ${showProjects ? 'pixel-pop' : ''}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="dotgothic-font text-white text-[16px] md:text-[20px]">Projects</h2>

            <Link
              to="/projects"
              className="dotgothic-font text-white text-[10px] md:text-[14px] border border-white px-3 py-1 rounded-md hover:bg-white/10 transition-colors"
            >
              Archive Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((project) => (
              <div
                key={project}
                className={`bg-black border border-white rounded-md p-3 flex flex-col items-center hover:bg-white/10 transition-colors ${showProjects ? 'pixel-pop' : ''}`}
                style={{ animationDelay: `${project * 0.15}s` }}
              >
                <a
                  href={
                    project === 1
                      ? "https://github.com/JustinWangsa/Inventory-Management-System-Website"
                      : project === 2
                      ? "https://github.com/JustinWangsa/cashier-network-based"
                      //last project
                      : "https://github.com/JustinWangsa/portfolio"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-3 block"
                >
                  <img
                    src={
                      project === 1
                        ? "/inventory.png"
                        : project === 2
                        ? "/pos.png"
                        //last project
                        : "/website.png"
                    }
                    alt="Project preview"
                    className="w-full h-[250px] object-cover rounded-md hover:scale-105 transition-transform"
                  />
                </a>

                <h3 className="text-white dotgothic-font text-[12px] md:text-[14px] mb-2 text-center">
                  {project === 1
                    ? "INVENTORY MANAGEMENT"
                    : project === 2
                    ? "POS SYSTEM"
                    : "WEBSITE PORTFOLIO"}
                </h3>

                <p className="text-gray-400 text-[10px] md:text-[12px] text-center">
                  {project === 1
                    ? "Inventory tracking and management system."
                    : project === 2
                    ? "Point of sale web application."
                    : "Personal portfolio website."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div
          id="experience"
          className={`relative z-10 mt-110 mb-50 mx-auto w-full max-w-[1250px] px-4 sm:px-6 ${showExperience ? 'pixel-rise' : ''}`}
        >
          <div className="mb-6">
            <h2 className={`dotgothic-font text-white text-[16px] md:text-[20px] mb-3 ${showExperience ? 'pixel-rise' : ''}`}>
              Experience
            </h2>
            <p className={`dotgothic-font text-gray-300 text-[10px] md:text-[20px] text-center ${showExperience ? 'pixel-rise pixel-rise-delay' : ''}`}>
              Looking for a chance for an internship to gain hands on experience :)
            </p>
          </div>
        </div>

        {/* FLOATING PORTFOLIO BUTTON */}
        {showPortfolioButton && (
          <div
            onClick={() => setShowPortfolioPopup(true)}
            className="fixed bottom-8 right-8 z-50 w-20 h-20 sm:w-40 sm:h-40 overflow-hidden cursor-pointer hover:scale-110 transition-transform"
          >
            <model-viewer
              src="/snow_globe.glb"
              alt="Snow Globe"
              camera-controls
              auto-rotate
              auto-rotate-delay="0"
              auto-rotate-speed="2" 
              interaction-prompt="none"
              disable-zoom
              shadow-intensity="0"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        )}

        {/* PORTFOLIO POPUP */}
        {showPortfolioPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/4 backdrop-blur-xl">
            <div className="border-2 border-white rounded-md p-6 max-w-lg w-full relative shadow-5xl">
              <button
                onClick={() => setShowPortfolioPopup(false)}
                className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-400"
              >
                ×
              </button>
              <h2 className="dotgothic-font text-white text-[18px] md:text-[24px] mb-4 text-center">Old Portfolio</h2>
              
              {/* Image container with background */}
              <div className="w-full h-auto bg-white/50 p-4 rounded-md">
                <a href="https://justinwangsa.github.io" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/old-port.png"
                    alt="Old Portfolio"
                    className="w-full h-auto object-cover rounded-md hover:scale-105 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div className={`scroll-indicator ${hideScrollHint ? 'hide' : ''}`}>
        {"Scroll Down I˅".split("").map((char, i) => (
          <span key={i} className="pixel-letter" style={{ animationDelay: `${i * 0.12}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}


export default App;
