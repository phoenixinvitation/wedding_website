import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { PHOENIX_WEBSITE_URL } from "@/lib/brand";

const TopBar = () => {
  const { lang, setLang } = useLang();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/wedding-song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <a
        href={PHOENIX_WEBSITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Phoenix Invitation website"
        className="fixed left-3 top-3 z-50 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gold/60 bg-background/90 p-1.5 shadow-soft backdrop-blur-md transition-all hover:scale-105 hover:shadow-gold sm:left-5 sm:top-5 sm:h-12 sm:w-12"
      >
        <img
          src="/logo.jpeg"
          alt="Phoenix Invitation logo"
          className="h-full w-full rounded-full object-cover"
          width={48}
          height={48}
        />
      </a>

      <div className="fixed top-3 right-3 z-50 flex items-center gap-2 sm:top-5 sm:right-5">
        <button
          onClick={toggleMusic}
          aria-label="Toggle music"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-background/80 text-primary backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground shadow-soft"
        >
          {playing ? <Music2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "en" ? "ta" : "en")}
          aria-label="Toggle language"
          className="flex h-10 items-center justify-center rounded-full border border-gold/60 bg-background/80 px-4 text-sm font-medium text-primary backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground shadow-soft"
        >
          {lang === "en" ? "EN | தமிழ்" : "தமிழ் | EN"}
        </button>
      </div>
    </>
  );
};

export default TopBar;
