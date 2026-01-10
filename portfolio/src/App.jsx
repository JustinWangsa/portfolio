import { useEffect, useState } from 'react';
import PixelSnow from './PixelSnow.jsx';
import { useAudioToggle, useHideOnScroll } from './main.jsx';

function App() {
  const { audioRef, isPlaying, toggleAudio, volume, changeVolume } = useAudioToggle();
  const hideNavbar = useHideOnScroll(10); // hide after 50px scroll down
  const [showSoundNotify, setShowSoundNotify] = useState(true);

  // Hide notification after 4,5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSoundNotify(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  const words = [
    {text: 'Code', color: 'text-white'},
    {text: 'Create', color: 'text-gray-400'},
    {text: 'Connect', color: 'text-gray-600'},
  ];

  return (

    <div>

      
      {/* NAVBAR */}
      <nav 
          className={`fixed top-0 left-0 w-full z-20 flex justify-center pt-4 transition-transform duration-300 ${
            hideNavbar ? '-translate-y-full' : 'translate-y-50'
          }`}
      >
        <div 
          className="px-4 py-1 sm:px-6 sm:py-3 bg-black/90 border-2 border-white pixel-box-hard pixel-dungeon-enter"
        >
        <ul className="flex gap-4 sm:gap-10">
          {['Home', 'Projects', 'Skills', 'Contact'].map((item, i) => (
            <li key={i} className="dotgothic-font text-white text-[10px] sm:text-[10px] md:text-[14px] cursor-pointer hover:text-gray-400 transition-colors">
              {item === 'Projects' ? (
                <a href="#projects" className="cursor-pointer">Projects</a>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
        </div>
      </nav>
          
      

      {/* BACKGROUND */}
      <div 
        className="fixed inset-0 w-screen h-screen -z-10"
      >
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
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen"
      >
        <p 
          className="dotgothic-font text-white text-[11px] md:text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] mb-2"
        >
          {"Currently Based in Taiwan".split(" ").map((word, i) => (
          <span 
            key={i} 
            className="pixel-letter" 
            style={{ animationDelay: `${i * 0.3}s` }}
          >
              {word}&nbsp;
            </span>
          ))}
        </p>

        <h1 
          className="dotgothic-font text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] font-bold leading-none mb-2"
        >
          {words.map((word, i) => (
            <span key={i} className={`${word.color} mr-1`}>
              {word.text.split('').map((letter, j) => (
                <span
                  key={j}
                  className="pixel-letter"
                  style={{ animationDelay: `${i * 0.5 + j * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
              .
            </span>
          ))}
        </h1>

        <p 
          className="dotgothic-font text-gray-400 text-[7px] md:text-[9px] lg:text-[11px] xl:text-[15px] 2xl:text-[18px] mt-1"
        >
          {"Hi, I'm Justin – a computer science student exploring networks and cybersecurity.".split(" ").map((word, i) => (
            <span 
              key={i} 
              className="pixel-letter" 
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>

        {/* CV BUTTON */}       
        <a
          href="/Justin_Wangsa_CV.pdf"
          download
          className="mt-6 pixel-box-hard pixel-dungeon-enter dotgothic-font text-white text-[10px] md:text-[12px] flex items-center justify-center p-2 "
        >
          Download CV
        </a>
      </div>

      {/* AUDIO */}
        <audio ref={audioRef} src="/dungeon.mp3" loop />

      {/* AUDIO CONTROLS */}
      <div 
        className="fixed bottom-4 left-4 z-20 flex flex-col items-center m-4 space-y-2"
      >
        <div onClick={toggleAudio} className="cursor-pointer">
          <img
            src={isPlaying ? '/audio-on.png' : '/audio-off.png'}
            alt="Audio Toggle"
            className="w-9 h-9 md:w-11 md:h-11"
          />

          {/* Notification Bubble on page load */}
          {showSoundNotify && (
            <div 
              className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-ping "
            >
              !
            </div>
          )}

        </div>
        
        {isPlaying && (
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-18 md:w-25"
          />
        )}
      </div>
      


      <div>
        {/* PROJECTS */}
        <div
          id="projects"
          className="relative z-10 mt-12 mx-auto w-full max-w-[1250px] px-4 sm:px-6"
        >
          <h2 className="dotgothic-font text-white text-[16px] md:text-[20px] mb-6">
            Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((project) => (
              <div
                key={project}
                className="bg-black/80 border border-white rounded-md p-3 flex flex-col items-center hover:bg-white/10 transition-colors"
              >
                <a
                  href={
                    project === 1
                      ? "https://github.com/JustinWangsa/Inventory-Management-System-Website"
                      : project === 2
                      ? "https://github.com/JustinWangsa/cashier-network-based"
                      //last
                      : "https://your-portfolio-site.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-3 block"
                >
                  <img
                    src={
                      project === 1
                        ? "/public/inventory.png"
                        : project === 2
                        ? "/public/pos.png"
                        //last
                        : "/public/website.png"
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
                    //last
                    : "WEBSITE PORTFOLIO"}
                </h3>

                <p className="text-gray-400 text-[10px] md:text-[12px] text-center">
                  {project === 1
                    ? "Inventory tracking and management system."
                    : project === 2
                    ? "Point of sale web application."
                    //last
                    : "Personal portfolio website."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
}

export default App;
