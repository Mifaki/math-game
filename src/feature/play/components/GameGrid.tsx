import { GAME_CONFIG } from "../data/config";
import type { Position } from "../types";

interface IGameGrid {
  gridNumbers: number[];
  gameNumbers: number[];
  clickedSeq: number[];
  onNumClick: (number: number) => void;
  isOver: boolean;
  wrongClick: number | null;
  linePos: Position[];
}

const GameGrid = ({
  gridNumbers,
  gameNumbers,
  clickedSeq,
  onNumClick,
  isOver,
  wrongClick,
  linePos,
}: IGameGrid) => {
  /**
   * Determines what number to display in each cell:
   * - If the cell position matches a pattern position, shows the corresponding game number
   * - Otherwise shows a random number from the grid
   * @param index - The cell's position in the grid
   * @returns The number to display in the cell
   */
  const getCellContent = (index: number): number => {
    const row = Math.floor(index / GAME_CONFIG.GRID_SIZE);
    const col = index % GAME_CONFIG.GRID_SIZE;

    const posIndex = linePos.findIndex(
      (pos) => pos.row === row && pos.col === col
    );

    if (posIndex !== -1 && gameNumbers[posIndex] !== undefined) {
      return gameNumbers[posIndex];
    }

    return gridNumbers[index];
  };

  const getCellStyle = (number: number): string => {
    const isClicked = clickedSeq.includes(number);
    const isFirst = number === gameNumbers[0];
    const isWrong = wrongClick === number;

    let className =
      "w-16 h-16 border border-gray-300 flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-100";

    if (isOver) {
      className += " cursor-not-allowed opacity-75";
    } else if (isFirst && clickedSeq.length === 0) {
      className += " bg-green-500 text-white ring-4 ring-green-300";
    } else if (isClicked) {
      className += " bg-blue-500 text-white";
    } else if (isWrong) {
      className += " bg-red-500 text-white animate-pulse";
    }

    return className;
  };

  return (
    <div className="grid grid-cols-10 gap-1 p-4 bg-background rounded-lg shadow-lg">
      {Array.from(
        { length: GAME_CONFIG.GRID_SIZE * GAME_CONFIG.GRID_SIZE },
        (_, index) => {
          const number = getCellContent(index);
          return (
            <div
              key={index}
              className={getCellStyle(number)}
              onClick={() => !isOver && onNumClick(number)}
            >
              {number.toLocaleString()}
            </div>
          );
        }
      )}
    </div>
  );
};

export default GameGrid;
