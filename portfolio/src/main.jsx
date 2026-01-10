import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useRef, useState } from 'react';
import { useEffect} from 'react';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


export function useAudioToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const changeVolume = (value) => {
    if (!audioRef.current) return;
    const vol = Math.min(Math.max(value, 0), 1); // clamp 0-1
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return { audioRef, isPlaying, toggleAudio, volume, changeVolume, isMuted, toggleMute };
}

// New hook for navbar hide on scroll
export function useHideOnScroll(threshold = 50) {
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > threshold) {
        setHideNavbar(true); // scrolling down
      } else {
        setHideNavbar(false); // scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hideNavbar;
}

