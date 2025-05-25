import { useCallback, useEffect, useRef, useState } from "react";

interface GameAudioConfig {
  correctSound?: string;
  wrongSound?: string;
  gameOverSound?: string;
  victorySound?: string;
  clickSound?: string;
}

interface UseGameAudioReturn {
  playCorrectSound: () => void;
  playWrongSound: () => void;
  playGameOverSound: () => void;
  playVictorySound: () => void;
  playClickSound: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  isMuted: boolean;
  volume: number;
  isLoaded: boolean;
}

/**
 * Custom hook for managing game sound effects
 * @param config - Game audio file paths configuration
 */
export const useGameAudio = (config: GameAudioConfig): UseGameAudioReturn => {
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const gameOverSoundRef = useRef<HTMLAudioElement | null>(null);
  const victorySoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize audio elements
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Initialize sound effects
        if (config.correctSound) {
          correctSoundRef.current = new Audio(config.correctSound);
          correctSoundRef.current.volume = volume;
          correctSoundRef.current.preload = "auto";
        }

        if (config.wrongSound) {
          wrongSoundRef.current = new Audio(config.wrongSound);
          wrongSoundRef.current.volume = volume;
          wrongSoundRef.current.preload = "auto";
        }

        if (config.gameOverSound) {
          gameOverSoundRef.current = new Audio(config.gameOverSound);
          gameOverSoundRef.current.volume = volume;
          gameOverSoundRef.current.preload = "auto";
        }

        if (config.victorySound) {
          victorySoundRef.current = new Audio(config.victorySound);
          victorySoundRef.current.volume = volume;
          victorySoundRef.current.preload = "auto";
        }

        if (config.clickSound) {
          clickSoundRef.current = new Audio(config.clickSound);
          clickSoundRef.current.volume = volume * 0.5; // Quieter for clicks
          clickSoundRef.current.preload = "auto";
        }

        setIsLoaded(true);
      } catch (error) {
        console.warn("Failed to load game audio files:", error);
      }
    };

    initAudio();

    // Cleanup function
    return () => {
      // Stop and cleanup all audio
      [
        correctSoundRef,
        wrongSoundRef,
        gameOverSoundRef,
        victorySoundRef,
        clickSoundRef,
      ].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = "";
        }
      });
    };
  }, [config, volume]);

  // Update volumes when they change
  useEffect(() => {
    const gameVolume = isMuted ? 0 : volume;
    [correctSoundRef, wrongSoundRef, gameOverSoundRef, victorySoundRef].forEach(
      (ref) => {
        if (ref.current) {
          ref.current.volume = gameVolume;
        }
      }
    );

    // Click sound should be quieter
    if (clickSoundRef.current) {
      clickSoundRef.current.volume = isMuted ? 0 : volume * 0.5;
    }
  }, [volume, isMuted]);

  const playSound = useCallback(
    (audioRef: React.RefObject<HTMLAudioElement | null>) => {
      if (!audioRef.current || isMuted) return;

      try {
        // Reset the audio to beginning and play
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();

        // Handle play promise for browsers that require user interaction
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio play failed:", error);
          });
        }
      } catch (error) {
        console.warn("Failed to play sound:", error);
      }
    },
    [isMuted]
  );

  const playCorrectSound = useCallback(() => {
    playSound(correctSoundRef);
  }, [playSound]);

  const playWrongSound = useCallback(() => {
    playSound(wrongSoundRef);
  }, [playSound]);

  const playGameOverSound = useCallback(() => {
    playSound(gameOverSoundRef);
  }, [playSound]);

  const playVictorySound = useCallback(() => {
    playSound(victorySoundRef);
  }, [playSound]);

  const playClickSound = useCallback(() => {
    playSound(clickSoundRef);
  }, [playSound]);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    playCorrectSound,
    playWrongSound,
    playGameOverSound,
    playVictorySound,
    playClickSound,
    setVolume,
    toggleMute,
    isMuted,
    volume,
    isLoaded,
  };
};
