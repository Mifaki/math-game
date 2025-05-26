import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatDate, getScoreGrade } from "../lib/utils";

import { Button } from "@/shared/components/ui/button";
import type { ScoreData } from "@/shared/usecase/useScore";
import { useNavigate } from "@tanstack/react-router";

interface ScoreCardProps {
  scoreData: ScoreData;
  onClearScore?: () => void;
}

const ScoreCard = ({ scoreData, onClearScore }: ScoreCardProps) => {
  const navigate = useNavigate();
  const { grade, color, emoji } = getScoreGrade(scoreData.score);

  return (
    <>
      <Card className="w-full mx-auto shadow-lg border-2">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl text-primary flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>Selamat!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg text-gray-700">Kamu menemukan</p>
            <p className="text-sm sm:text-base text-gray-600">
              Pola rahasianya.
            </p>
          </div>

          <div className="py-3 sm:py-4">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
              <span className={color}>{scoreData.score}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg sm:text-xl">
              <span className={color}>{grade}</span>
              <span>{emoji}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-gray-600 border-t pt-3 sm:pt-4">
            <div className="flex justify-between items-center">
              <span>Level:</span>
              <span className="font-semibold">{scoreData.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Diselesaikan pada:</span>
              <span className="font-semibold text-right ml-2">
                {formatDate(scoreData.completedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-3 mt-4 w-full">
        {onClearScore && (
          <Button
            onClick={onClearScore}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Hapus Skor
          </Button>
        )}
        <Button
          onClick={() => {
            navigate({
              to: "/play",
              search: { level: scoreData.level },
            });
          }}
          className="w-full sm:w-auto"
        >
          Main Lagi
        </Button>
      </div>
    </>
  );
};

export default ScoreCard;
