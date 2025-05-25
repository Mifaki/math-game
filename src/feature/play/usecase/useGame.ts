import type { GameState, LevelConfig } from "../types";
import { genPatternPos, genRandomStart } from "../lib/utlis";
import { useCallback, useEffect, useState } from "react";

import { GAME_CONFIG } from "../data/config";

/**
 * Custom hook that manages the game state and logic
 * @param lvl - Level configuration containing difficulty settings
 */
export const useGame = (lvl: LevelConfig) => {
  // Initialize game state with default values
  const [state, setState] = useState<GameState>({
    numbers: [],
    gridNumbers: [],
    clickedSeq: [],
    isComplete: false,
    isOver: false,
    health: GAME_CONFIG.MAX_HEALTH,
    wrongClick: null,
    msg: "",
    isInit: false,
    linePos: [],
    pattern: "",
    startNum: GAME_CONFIG.LEVELS[0].startNumber,
  });

  /**
   * Initializes a new game by:
   * 1. Generating a sequence of numbers to find
   * 2. Creating a grid with random numbers
   * 3. Placing the sequence numbers in a pattern
   * 4. Setting up initial game state
   */
  const initGame = useCallback((): void => {
    const totalCells = GAME_CONFIG.GRID_SIZE * GAME_CONFIG.GRID_SIZE;
    const startNum = genRandomStart(lvl.startNumber, lvl.totalNumbers);

    const gameNums: number[] = [];
    for (let i = 0; i < lvl.totalNumbers; i++) {
      gameNums.push(startNum + i);
    }

    const { positions, pattern } = genPatternPos(lvl);
    const usedNums = new Set<number>();
    const allGridNums: number[] = [];

    gameNums.forEach((num) => usedNums.add(num));

    while (allGridNums.length < totalCells) {
      const randomNum =
        Math.floor(Math.random() * 3000) + startNum + lvl.totalNumbers;
      if (!usedNums.has(randomNum) && randomNum <= 10000) {
        allGridNums.push(randomNum);
        usedNums.add(randomNum);
      }
    }

    for (let i = allGridNums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allGridNums[i], allGridNums[j]] = [allGridNums[j], allGridNums[i]];
    }

    setState({
      numbers: gameNums,
      gridNumbers: allGridNums,
      clickedSeq: [],
      isComplete: false,
      isOver: false,
      health: GAME_CONFIG.MAX_HEALTH,
      wrongClick: null,
      msg: "Klik angka secara berurutan mulai dari yang dilingkari hijau!",
      isInit: true,
      linePos: positions,
      pattern,
      startNum,
    });
  }, [lvl]);

  /**
   * Handles number click events with the following logic:
   * 1. Validates if the clicked number is the next expected number
   * 2. Updates game state based on correct/incorrect clicks
   * 3. Manages health system and game over conditions
   * 4. Provides feedback messages to the player
   * @param clickedNum - The number that was clicked by the player
   */
  const handleClick = useCallback(
    (clickedNum: number): void => {
      if (state.isComplete || state.isOver) return;

      const expectedNum = state.numbers[state.clickedSeq.length];

      if (clickedNum === expectedNum) {
        const newSeq = [...state.clickedSeq, clickedNum];

        setState((prev) => ({
          ...prev,
          clickedSeq: newSeq,
          isComplete: newSeq.length === state.numbers.length,
          msg:
            newSeq.length === state.numbers.length
              ? `Selamat! Kamu berhasil menyelesaikan Level ${lvl.level}! 🎉`
              : `Benar! Lanjutkan ke angka ${state.numbers[newSeq.length].toLocaleString()}`,
          wrongClick: null,
        }));
      } else {
        const newHealth = state.health - 1;

        setState((prev) => ({
          ...prev,
          health: newHealth,
          wrongClick: clickedNum,
          isOver: newHealth <= 0,
          msg:
            newHealth <= 0
              ? "Game Over! Nyawa habis. Klik 'Mulai Ulang' untuk bermain lagi. 💔"
              : `Salah! Sisa nyawa: ${newHealth}. Coba lagi!`,
        }));

        setTimeout(() => {
          setState((prev) => ({ ...prev, wrongClick: null }));
        }, 1000);
      }
    },
    [state, lvl.level]
  );

  const resetGame = (): void => {
    initGame();
  };

  useEffect(() => {
    initGame();
  }, [initGame]);

  return {
    state,
    handleClick,
    resetGame,
  };
};
