import React, { createContext, useContext, useEffect } from "react";

import { useBackgroundMusic } from "../usecase/useBackgroundMusic";

interface GlobalAudioContextType {
  playMusic: () => void;
  stopMusic: () => void;
  setMusicVolume: (volume: number) => void;
  toggleMusicMute: () => void;
  isMusicMuted: boolean;
  musicVolume: number;
  isMusicLoaded: boolean;
  isPlaying: boolean;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | undefined>(
  undefined
);

interface IGlobalAudio {
  children: React.ReactNode;
  backgroundMusicUrl?: string;
}

export const GlobalAudioProvider = ({
  children,
  backgroundMusicUrl = "/audio/background-music.mp3",
}: IGlobalAudio) => {
  const {
    playMusic,
    stopMusic,
    setVolume: setMusicVolume,
    toggleMute: toggleMusicMute,
    isMuted: isMusicMuted,
    volume: musicVolume,
    isLoaded: isMusicLoaded,
    isPlaying,
  } = useBackgroundMusic(backgroundMusicUrl);

  useEffect(() => {
    if (isMusicLoaded && !isMusicMuted) {
      const timer = setTimeout(() => {
        playMusic();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMusicLoaded, isMusicMuted, playMusic]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (isMusicLoaded && !isMusicMuted && !isPlaying) {
        playMusic();
      }
    };

    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });
    document.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [isMusicLoaded, isMusicMuted, isPlaying, playMusic]);

  const value: GlobalAudioContextType = {
    playMusic,
    stopMusic,
    setMusicVolume,
    toggleMusicMute,
    isMusicMuted,
    musicVolume,
    isMusicLoaded,
    isPlaying,
  };

  return (
    <GlobalAudioContext.Provider value={value}>
      {children}
    </GlobalAudioContext.Provider>
  );
};

export const useGlobalAudio = (): GlobalAudioContextType => {
  const context = useContext(GlobalAudioContext);
  if (context === undefined) {
    throw new Error("useGlobalAudio must be used within a GlobalAudioProvider");
  }
  return context;
};
