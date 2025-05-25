import { useEffect, useRef } from "react";

/**
 * AudioManager component to handle global audio initialization
 */
const AudioManager = ({ children }: { children: React.ReactNode }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const initAudioContext = () => {
      if (isInitializedRef.current) return;

      try {
        if (typeof window !== "undefined" && "AudioContext" in window) {
          audioContextRef.current = new AudioContext();

          if (audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
          }

          isInitializedRef.current = true;
          console.log("Audio context initialized");
        }
      } catch (error) {
        console.warn("Failed to initialize audio context:", error);
      }
    };

    const handleUserInteraction = () => {
      initAudioContext();

      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return <>{children}</>;
};

export default AudioManager;
