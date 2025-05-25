import { Alert, AlertDescription } from "@/shared/components/ui/alert";

import { Button } from "@/shared/components/ui/button";
import { GAME_CONFIG } from "../data/config";
import GameGrid from "./GameGrid";
import HealthDisplay from "./HealthDisplay";
import React from "react";
import { useGame } from "../usecase/useGame";

interface Props {
  level: number;
}

const GameContainer: React.FC<Props> = ({ level }) => {
  const currentLvl =
    GAME_CONFIG.LEVELS.find((l) => l.level === level) || GAME_CONFIG.LEVELS[0];
  const { state, handleClick, resetGame } = useGame(currentLvl);

  if (
    !state.isInit ||
    state.numbers.length === 0 ||
    state.gridNumbers.length === 0
  ) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔢</div>
          <div className="text-xl text-purple-800">Memuat permainan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto">
        {state.msg && (
          <Alert
            variant={state.isOver ? "destructive" : "default"}
            className="mb-4"
          >
            <AlertDescription
              className={`text-center text-lg font-medium ${
                state.isOver ? "text-red-800" : "text-blue-800"
              }`}
            >
              {state.msg}
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-4">
          <HealthDisplay
            health={state.health}
            maxHealth={GAME_CONFIG.MAX_HEALTH}
          />
        </div>

        <div className="flex justify-center mb-6 relative">
          <GameGrid
            gridNumbers={state.gridNumbers}
            gameNumbers={state.numbers}
            clickedSeq={state.clickedSeq}
            onNumClick={handleClick}
            isOver={state.isOver}
            wrongClick={state.wrongClick}
            linePos={state.linePos}
          />
        </div>

        <div className="text-center">
          <Button onClick={resetGame}>
            {state.isComplete || state.isOver ? "Main Lagi" : "Mulai Ulang"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
