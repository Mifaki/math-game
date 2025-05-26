import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import ChatBubble from "./ChatBubble";
import FloatingAudioControls from "@/shared/components/FloatingAudioControls";
import { GAME_CONFIG } from "../data/config";
import GameGrid from "./GameGrid";
import HealthDisplay from "./HealthDisplay";
import { calculateScore } from "../lib/utlis";
import { useGame } from "../usecase/useGame";
import { useNavigate } from "@tanstack/react-router";
import { useScore } from "@/shared/usecase/useScore";
import { useUIState } from "../usecase/useUIState";

interface IGameContainer {
  level: number;
}

const GameContainer = ({ level }: IGameContainer) => {
  const navigate = useNavigate();
  const { saveScore } = useScore();
  const [score, setScore] = useState<number>();
  const [selectedNewLevel, setSelectedNewLevel] = useState("1");

  const levels = [
    { value: "1", label: "Level 1 - Mudah" },
    { value: "2", label: "Level 2 - Sedang" },
    { value: "3", label: "Level 3 - Sulit" },
  ];

  const currentLvl =
    GAME_CONFIG.LEVELS.find((l) => l.level === level) || GAME_CONFIG.LEVELS[0];

  const { state, handleClick, resetGame, gameAudio } = useGame(currentLvl);
  const { showChatBubble, showDialog, setShowDialog, chatType } =
    useUIState(state);

  useEffect(() => {
    if (state.isComplete && !state.isOver) {
      const finalScore = calculateScore(
        state.health,
        GAME_CONFIG.MAX_HEALTH,
        level
      );
      setScore(finalScore);
      saveScore(finalScore, level);
    }
  }, [state.isComplete, state.isOver, level, state.health]);

  const handlePlayNewLevel = () => {
    setShowDialog(false);
    navigate({
      to: "/play",
      search: { level: parseInt(selectedNewLevel) },
    });
  };

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
          {!gameAudio.audioLoaded && (
            <div className="text-sm text-gray-600 mt-2">Memuat audio...</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-2 sm:p-4">
      <div className="w-full max-w-5xl mx-auto relative">
        <div className="block lg:hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 max-w-xl mx-auto">
              <HealthDisplay
                health={state.health}
                maxHealth={GAME_CONFIG.MAX_HEALTH}
              />
              <Button
                onClick={resetGame}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2"
              >
                {state.isComplete || state.isOver ? "Main Lagi" : "Mulai Ulang"}
              </Button>
            </div>

            <div className="px-2">
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

            <div className="flex justify-center relative">
              <div className="relative mt-16">
                <img
                  src="/img/pirate.png"
                  alt="Pirate Character"
                  className="w-32 h-auto"
                />
                <ChatBubble type={chatType} show={showChatBubble} />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-end gap-8 h-full">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <HealthDisplay
                health={state.health}
                maxHealth={GAME_CONFIG.MAX_HEALTH}
              />

              <Button
                onClick={resetGame}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {state.isComplete || state.isOver ? "Main Lagi" : "Mulai Ulang"}
              </Button>
            </div>

            <div className="mb-6">
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
          </div>

          <div className="flex-shrink-0 relative pl-12">
            <img
              src="/img/pirate-left.png"
              alt="Pirate Character"
              className="w-64 h-auto"
            />
            <ChatBubble type={chatType} show={showChatBubble} />
          </div>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-lg sm:text-xl">
                {state.isComplete ? (
                  <>✅ Yeay Kamu Berhasil ✅</>
                ) : (
                  <>❌ Ooops ❌</>
                )}
              </DialogTitle>
              <DialogDescription className="text-center text-base sm:text-lg mt-4">
                {state.isComplete
                  ? `Selamat kamu berhasil menemukan angka ajaib nya! Skor: ${score}`
                  : "Wahhh kesempatanmu udah abis nih, Coba lagi yuk !"}
              </DialogDescription>
            </DialogHeader>

            {state.isComplete && (
              <div className="my-4">
                <label className="block text-sm font-medium mb-2 text-center">
                  Pilih Level Selanjutnya:
                </label>
                <Select
                  value={selectedNewLevel}
                  onValueChange={setSelectedNewLevel}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((levelOption) => (
                      <SelectItem
                        key={levelOption.value}
                        value={levelOption.value}
                      >
                        {levelOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-2">
              <Button
                onClick={() => {
                  setShowDialog(false);
                  resetGame();
                }}
                variant={state.isComplete ? "outline" : "default"}
                className={`w-full sm:w-auto ${
                  state.isComplete ? "" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {state.isComplete ? "Main Level Ini Lagi" : "Coba Lagi"}
              </Button>

              {state.isComplete && (
                <>
                  <Button
                    onClick={handlePlayNewLevel}
                    className="w-full sm:w-auto bg-secondary hover:bg-secondary"
                  >
                    Main Level Terpilih
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDialog(false);
                      navigate({ to: "/score" });
                    }}
                    variant="outline"
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white"
                  >
                    Lihat Skor
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <FloatingAudioControls
        gameVolume={gameAudio.volume}
        isGameMuted={gameAudio.isMuted}
        onGameVolumeChange={gameAudio.setVolume}
        onGameMuteToggle={gameAudio.toggleMute}
        showGameControls={true}
      />
    </div>
  );
};

export default GameContainer;
