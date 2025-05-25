import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Gamepad2, Music, Settings, Volume2, VolumeX } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import React, { useState } from "react";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useGlobalAudio } from "./GlobalAudioProvider";

interface FloatingAudioControlsProps {
  gameVolume?: number;
  isGameMuted?: boolean;
  onGameVolumeChange?: (volume: number) => void;
  onGameMuteToggle?: () => void;
  showGameControls?: boolean;
}

const FloatingAudioControls: React.FC<FloatingAudioControlsProps> = ({
  gameVolume = 0.7,
  isGameMuted = false,
  onGameVolumeChange,
  onGameMuteToggle,
  showGameControls = false,
}) => {
  const {
    setMusicVolume,
    toggleMusicMute,
    isMusicMuted,
    musicVolume,
    isPlaying,
  } = useGlobalAudio();

  const [isOpen, setIsOpen] = useState(false);

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVolume(value[0] / 100);
  };

  const handleGameVolumeChange = (value: number[]) => {
    if (onGameVolumeChange) {
      onGameVolumeChange(value[0] / 100);
    }
  };

  const getCurrentIcon = () => {
    if (isMusicMuted && (!showGameControls || isGameMuted)) {
      return <VolumeX className="w-5 h-5" />;
    }
    return <Volume2 className="w-5 h-5" />;
  };

  const getVolumePercentage = () => {
    if (isMusicMuted) return 0;
    return Math.round(musicVolume * 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="rounded-full shadow-lg bg-secondary hover:bg-secondary w-14 h-14 p-0"
          >
            {getCurrentIcon()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 mr-4 mb-2" align="end" side="top">
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5" />
                Audio Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-sm">
                      Background Music
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {isMusicMuted ? "Muted" : `${getVolumePercentage()}%`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMusicMute}
                      className="h-8 w-8 p-0"
                    >
                      {isMusicMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="px-2">
                  <Slider
                    value={[isMusicMuted ? 0 : musicVolume * 100]}
                    onValueChange={handleMusicVolumeChange}
                    max={100}
                    step={5}
                    className="w-full"
                    disabled={isMusicMuted}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 px-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                {isPlaying && (
                  <div className="flex items-center gap-1 text-xs text-green-600 px-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Now Playing
                  </div>
                )}
              </div>

              {showGameControls && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">Game Sounds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {isGameMuted
                            ? "Muted"
                            : `${Math.round(gameVolume * 100)}%`}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onGameMuteToggle}
                          className="h-8 w-8 p-0"
                        >
                          {isGameMuted ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="px-2">
                      <Slider
                        value={[isGameMuted ? 0 : gameVolume * 100]}
                        onValueChange={handleGameVolumeChange}
                        max={100}
                        step={5}
                        className="w-full"
                        disabled={isGameMuted}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 px-2">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleMusicMute();
                    if (showGameControls && onGameMuteToggle) {
                      onGameMuteToggle();
                    }
                  }}
                  className="flex-1 text-xs"
                >
                  {isMusicMuted && (!showGameControls || isGameMuted)
                    ? "Unmute All"
                    : "Mute All"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="px-4 text-xs"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FloatingAudioControls;
