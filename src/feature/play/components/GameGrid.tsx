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
      "aspect-square border border-gray-300 flex items-center justify-center text-[10px] sm:text-sm font-medium cursor-pointer transition-all duration-200 rounded";

    if (isOver) {
      className += " cursor-not-allowed opacity-75";
    } else if (isFirst && clickedSeq.length === 0) {
      className +=
        " bg-green-500 text-white ring-2 sm:ring-4 ring-green-300 hover:bg-green-200";
    } else if (isClicked) {
      className += " bg-blue-500 text-white hover:bg-blue-500";
    } else if (isWrong) {
      className += " bg-red-500 text-white animate-pulse hover:bg-red-300";
    }

    return className;
  };

  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto">
      <div className="grid grid-cols-10 gap-0.5 sm:gap-1 p-1 sm:p-4 bg-background rounded-lg shadow-lg">
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
                <span className="text-center leading-none px-0.5 break-all">
                  {number.toLocaleString()}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default GameGrid;
