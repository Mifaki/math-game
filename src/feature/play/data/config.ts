import type { LevelConfig } from "../types";

export const GAME_CONFIG = {
  GRID_SIZE: 10,
  MAX_HEALTH: 4,
  LEVELS: [
    {
      level: 1,
      name: "Mudah",
      startNumber: 8000,
      totalNumbers: 10,
      pattern: "straight",
      description: "Garis Lurus - 10 angka",
    },
    {
      level: 2,
      name: "Sedang",
      startNumber: 7000,
      totalNumbers: 14,
      pattern: "heart",
      description: "Bentuk Hati - 15 angka",
    },
    {
      level: 3,
      name: "Sulit",
      startNumber: 5000,
      totalNumbers: 28,
      pattern: "star",
      description: "Bentuk Bintang - 28 angka",
    },
  ] as LevelConfig[],
};

export const AUDIO_CONFIG = {
  backgroundMusic: "/audio/background-music.mp3",
  correctSound: "/audio/correct.mp3",
  wrongSound: "/audio/wrong.mp3",
  gameOverSound: "/audio/game-over.mp3",
  victorySound: "/audio/victory.mp3",
  clickSound: "/audio/click.mp3",
};
