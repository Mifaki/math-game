import { useCallback, useEffect, useRef, useState } from "react";

interface UseBackgroundMusicReturn {
  playMusic: () => void;
  stopMusic: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  isMuted: boolean;
  volume: number;
  isLoaded: boolean;
  isPlaying: boolean;
}

export const useBackgroundMusic = (
  musicUrl?: string
): UseBackgroundMusicReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!musicUrl) return;

    const initAudio = async () => {
      try {
        audioRef.current = new Audio(musicUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.preload = "auto";

        audioRef.current.addEventListener("loadeddata", () => {
          setIsLoaded(true);
        });

        audioRef.current.addEventListener("play", () => {
          setIsPlaying(true);
        });

        audioRef.current.addEventListener("pause", () => {
          setIsPlaying(false);
        });

        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });

        audioRef.current.addEventListener("canplaythrough", () => {
          if (!isMuted) {
            audioRef.current?.play().catch(() => {});
          }
        });
      } catch (error) {
        console.warn("Failed to load background music:", error);
      }
    };

    initAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadeddata", () => {});
        audioRef.current.removeEventListener("play", () => {});
        audioRef.current.removeEventListener("pause", () => {});
        audioRef.current.removeEventListener("ended", () => {});
        audioRef.current.removeEventListener("canplaythrough", () => {});
        audioRef.current.src = "";
      }
    };
  }, [musicUrl, volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playMusic = useCallback(() => {
    if (!audioRef.current || isMuted) return;

    try {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Background music play failed:", error);
        });
      }
    } catch (error) {
      console.warn("Failed to play background music:", error);
    }
  }, [isMuted]);

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    playMusic,
    stopMusic,
    setVolume,
    toggleMute,
    isMuted,
    volume,
    isLoaded,
    isPlaying,
  };
};
