import type { LevelConfig, Position } from "../types";

import { GAME_CONFIG } from "../data/config";

export const genRandomStart = (baseNum: number, totalNums: number): number => {
  const maxStart = 10000 - totalNums;
  const rangeStart = Math.min(baseNum, maxStart);
  const rangeSize = Math.min(1000, maxStart - rangeStart + 1);
  return rangeStart + Math.floor(Math.random() * rangeSize);
};

export const shuffle = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generates positions for numbers in a straight line pattern (horizontal, vertical, or diagonal)
 * The pattern is randomly selected from available options and ensures numbers fit within grid bounds
 * @param totalNums - Total number of positions to generate
 * @returns Object containing the positions array and the selected pattern type
 */
export const genStraightPos = (
  totalNums: number
): { positions: Position[]; pattern: string } => {
  const patterns = ["horizontal", "vertical", "diagonal-down", "diagonal-up"];
  const selected = patterns[Math.floor(Math.random() * patterns.length)];
  let pos: Position[] = [];

  switch (selected) {
    case "horizontal":
      const row = Math.floor(Math.random() * (GAME_CONFIG.GRID_SIZE - 2)) + 1;
      const startCol = Math.floor(
        Math.random() * (GAME_CONFIG.GRID_SIZE - totalNums + 1)
      );
      for (let i = 0; i < totalNums; i++) {
        pos.push({ row, col: startCol + i });
      }
      break;

    case "vertical":
      const col = Math.floor(Math.random() * (GAME_CONFIG.GRID_SIZE - 2)) + 1;
      const startRow = Math.floor(
        Math.random() * (GAME_CONFIG.GRID_SIZE - totalNums + 1)
      );
      for (let i = 0; i < totalNums; i++) {
        pos.push({ row: startRow + i, col });
      }
      break;

    case "diagonal-down":
      const maxStart = GAME_CONFIG.GRID_SIZE - totalNums;
      const startRowDiag = Math.floor(Math.random() * maxStart);
      const startColDiag = Math.floor(Math.random() * maxStart);
      for (let i = 0; i < totalNums; i++) {
        pos.push({ row: startRowDiag + i, col: startColDiag + i });
      }
      break;

    case "diagonal-up":
      const startRowUp =
        totalNums -
        1 +
        Math.floor(Math.random() * (GAME_CONFIG.GRID_SIZE - totalNums));
      const startColUp = Math.floor(
        Math.random() * (GAME_CONFIG.GRID_SIZE - totalNums)
      );
      for (let i = 0; i < totalNums; i++) {
        pos.push({ row: startRowUp - i, col: startColUp + i });
      }
      break;
  }

  return { positions: shuffle(pos), pattern: selected };
};

export const genHeartPos = (
  totalNums: number
): { positions: Position[]; pattern: string } => {
  const heartPattern = [
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 2, col: 6 },
    { row: 2, col: 7 },
    { row: 3, col: 2 },
    { row: 3, col: 5 },
    { row: 3, col: 8 },
    { row: 4, col: 2 },
    { row: 4, col: 8 },
    { row: 5, col: 3 },
    { row: 5, col: 7 },
    { row: 6, col: 4 },
    { row: 6, col: 6 },
    { row: 7, col: 5 },
    { row: 1, col: 5 },
  ];

  const basePos = heartPattern.slice(0, totalNums);
  return { positions: shuffle(basePos), pattern: "heart" };
};

export const genStarPos = (
  totalNums: number
): { positions: Position[]; pattern: string } => {
  const starPattern = [
    { row: 0, col: 4 },
    { row: 1, col: 3 },
    { row: 2, col: 3 },
    { row: 2, col: 2 },
    { row: 2, col: 1 },
    { row: 2, col: 0 },
    { row: 3, col: 1 },
    { row: 4, col: 2 },
    { row: 5, col: 3 },
    { row: 6, col: 2 },
    { row: 7, col: 1 },
    { row: 8, col: 1 },
    { row: 8, col: 2 },
    { row: 7, col: 3 },
    { row: 6, col: 4 },
    { row: 7, col: 5 },
    { row: 8, col: 6 },
    { row: 8, col: 7 },
    { row: 7, col: 7 },
    { row: 6, col: 6 },
    { row: 5, col: 5 },
    { row: 4, col: 6 },
    { row: 3, col: 7 },
    { row: 2, col: 8 },
    { row: 2, col: 7 },
    { row: 2, col: 6 },
    { row: 2, col: 5 },
    { row: 1, col: 5 },
  ];

  const basePos = starPattern.slice(0, totalNums);
  return { positions: shuffle(basePos), pattern: "star" };
};

export const genPatternPos = (
  lvlConfig: LevelConfig
): { positions: Position[]; pattern: string } => {
  switch (lvlConfig.pattern) {
    case "straight":
      return genStraightPos(lvlConfig.totalNumbers);
    case "heart":
      return genHeartPos(lvlConfig.totalNumbers);
    case "star":
      return genStarPos(lvlConfig.totalNumbers);
    default:
      return genStraightPos(lvlConfig.totalNumbers);
  }
};

/**
 * HEALTH PENALTY SYSTEM:
 * - Start with 100 points (perfect score)
 * - Every wrong answer costs you 1 health + 10 points
 *
 * SCORING BREAKDOWN:
 * - Perfect play (4/4 health): 100 points (always max)
 * - 1 mistake (3/4 health): 90 points  (lose 10)
 * - 2 mistakes (2/4 health): 80 points (lose 20)
 * - 3 mistakes (1/4 health): 70 points (lose 30)
 * - 4 mistakes (0/4 health): Game Over
 *
 * LEVEL BONUSES (only applied if not perfect):
 * - Level 1: No bonus (base difficulty)
 * - Level 2+: +10 per level above 1, but only if you made mistakes
 * - This helps offset penalties on harder levels
 * - Perfect play always = 100 (no matter the level)
 *
 * EXAMPLES:
 * - Perfect Level 1: 100 - 0 + 0 = 100 points
 * - Perfect Level 5: 100 - 0 + 40 = 100 points
 * - Level 3 with 2 mistakes: 100 - 20 + 20 = 100 points
 * - Level 2 with 3 mistakes: 100 - 30 + 10 = 80 points
 */
export const calculateScore = (
  health: number,
  maxHealth: number,
  level: number
) => {
  const perfectScore = 100;
  const healthPenalty = (maxHealth - health) * 10;
  const levelBonus = Math.max(0, level - 1) * 10;
  const baseScore = perfectScore - healthPenalty + levelBonus;
  return Math.max(20, Math.min(100, baseScore));
};
