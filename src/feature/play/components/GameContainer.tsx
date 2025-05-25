import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";
import ChatBubble from "./ChatBubble";
import FloatingAudioControls from "@/shared/components/FloatingAudioControls";
import { GAME_CONFIG } from "../data/config";
import GameGrid from "./GameGrid";
import HealthDisplay from "./HealthDisplay";
import { useGame } from "../usecase/useGame";
import { useUIState } from "../usecase/useUIState";

interface IGameContainer {
  level: number;
}

const GameContainer = ({ level }: IGameContainer) => {
  const currentLvl =
    GAME_CONFIG.LEVELS.find((l) => l.level === level) || GAME_CONFIG.LEVELS[0];

  const { state, handleClick, resetGame, gameAudio } = useGame(currentLvl);
  const { showChatBubble, showDialog, setShowDialog, chatType } =
    useUIState(state);

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
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-end gap-8 h-full">
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
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {state.isComplete ? (
                  <>✅ Yeay Kamu Berhasil ✅</>
                ) : (
                  <>❌ Ooops ❌</>
                )}
              </DialogTitle>
              <DialogDescription className="text-center text-lg mt-4">
                {state.isComplete
                  ? "Selamat kamu berhasil menemukan angka ajaib nya !"
                  : "Wahhh kesempatanmu udah abis nih, Coba lagi yuk !"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button
                onClick={() => {
                  setShowDialog(false);
                  resetGame();
                }}
                className={
                  state.isComplete
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {state.isComplete ? "Hasil" : "Coba Lagi"}
              </Button>
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
