import { useEffect, useState } from "react";

export interface ScoreData {
  score: number;
  level: number;
  timestamp: string;
  completedAt: Date;
}

const SCORE_STORAGE_KEY = "game-latest-score";

export const useScore = () => {
  const [latestScore, setLatestScore] = useState<ScoreData | null>(null);

  const loadScore = () => {
    try {
      const stored = localStorage.getItem(SCORE_STORAGE_KEY);
      if (stored) {
        const scoreData = JSON.parse(stored) as ScoreData;
        scoreData.completedAt = new Date(scoreData.timestamp);
        setLatestScore(scoreData);
      }
    } catch (error) {
      console.error("Error loading score:", error);
      setLatestScore(null);
    }
  };

  const saveScore = (score: number, level: number) => {
    try {
      const scoreData: ScoreData = {
        score,
        level,
        timestamp: new Date().toISOString(),
        completedAt: new Date(),
      };

      localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scoreData));
      setLatestScore(scoreData);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const clearScore = () => {
    try {
      localStorage.removeItem(SCORE_STORAGE_KEY);
      setLatestScore(null);
    } catch (error) {
      console.error("Error clearing score:", error);
    }
  };

  useEffect(() => {
    loadScore();
  }, []);

  return {
    latestScore,
    saveScore,
    clearScore,
    refreshScore: loadScore,
  };
};
