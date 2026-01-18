import { Link } from 'react-router-dom';
import PixelSnow from './PixelSnow.jsx';

const projects = [ 
  // Add latest projects here
  
  {  
    year: 2025,
    name: "Current Website Portfolio",
    builtWith: ["Html", "TailwindCSS", "JavaScript", "React", "Vite"],
    link: "https://github.com/JustinWangsa/portfolio",
    displayText: "GitHub ↗",
  },
  {  
    year: 2025,
    name: "POS system",
    builtWith: ["Html", "TailwindCSS", "JavaScript", "Electron.js", "Node.js","MySQL"],
    link: "https://github.com/JustinWangsa/cashier-network-based",
    displayText: "GitHub ↗",
  },
  {  
    year: 2025,
    name: "Website Based Timer",
    builtWith: ["Html", "CSS" ,"JavaScript", "Juris.js",],
    link: "https://github.com/JustinWangsa/Web-based-Timer-in-JurisJS",
    displayText: "GitHub ↗", 
  },
  {  
    year: 2025,
    name: "First Portfolio Website",
    builtWith: ["Html", "CSS" ,"JavaScript"],
    link: "https://justinwangsa.github.io/", 
    displayText: "justinwangsa.github.io",
    
  },
  {  
    year: 2025,
    name: "Website Inventory Management System",
    builtWith: ["Html", "CSS", "JavaScript", "PHP", "MySQL", "Raspberry Pi"],
    link: "https://github.com/JustinWangsa/Inventory-Management-System-Website",
    displayText: "GitHub ↗", 
  },
  {  
    year: 2025,
    name: "Open Source Project",
    builtWith: ["Html","CSS", "JavaScript"],
    link: "https://github.com/JustinWangsa/opensource-ass-1",
    displayText: "GitHub ↗", 

  },

];

export default function Project() {

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 space-y-8">

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

      {/* Header */}
      <div className="dotgothic-font w-full max-w-[1200px] mx-auto mt-20 mb-8 flex items-center">
        {/* Left button */}
        <Link
          to="/"
          className="
            px-3 py-1.5 sm:px-4 sm:py-2
            text-sm sm:text-base
            border border-white rounded-md text-white
            hover:bg-white/10 transition-colors
            whitespace-nowrap
          "
        >
          ← Back to Home
        </Link>

        {/* Title */}
        <h1 className="dotgothic-font text-white text-4xl text-center flex-1">
          Projects Archive
        </h1>

        {/* Right button */}
        <a
          href="https://github.com/JustinWangsa"
          target="_blank"
          rel="noopener noreferrer"
          className="
            px-3 py-1.5 sm:px-4 sm:py-2
            text-sm sm:text-base
            border border-white rounded-md text-white
            hover:bg-white/10 transition-colors
            whitespace-nowrap
          "
        >
          GitHub ↗
        </a>
      </div>

      <div className="flex justify-center w-full text-[20px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <table className="min-w-full border-collapse text-left text-white">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Project</th>
                <th className="px-4 py-2">Built with</th>
                <th className="px-4 py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-white/10 transition-colors text-left"> {/* center each row */}
                  <td className="px-4 py-2 text-[16px] dotgothic-font">{proj.year}</td>
                  <td className="px-4 py-2 font-semibold text-[13px] dotgothic-font">{proj.name}</td>
                  <td className="px-6 py-4 flex flex-wrap justify-left gap-1 text-[11px] dotgothic-font"> {/* center tech tags */}
                    {proj.builtWith.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-teal-700 text-[13px] px-3 py-2 rounded-full dotgothic-font"
                      >
                        {tech}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:underline dotgothic-font text-[13px]"
                  >
                    {proj.displayText ? proj.displayText : proj.link.replace(/^https?:\/\//, '')}
                  </a>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      

    </div>
  );
}
