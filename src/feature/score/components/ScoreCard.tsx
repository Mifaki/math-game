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
      <Card className="w-full max-w-lg mx-auto shadow-lg border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>Selamat!</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-gray-700">Kamu menemukan</p>
            <p className="text-base text-gray-600">Pola rahasianya.</p>
          </div>

          <div className="py-4">
            <div className="text-6xl font-bold mb-2">
              <span className={color}>{scoreData.score}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xl">
              <span className={color}>{grade}</span>
              <span>{emoji}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
            <div className="flex justify-between">
              <span>Level:</span>
              <span className="font-semibold">{scoreData.level}</span>
            </div>
            <div className="flex justify-between">
              <span>Diselesaikan pada:</span>
              <span className="font-semibold">
                {formatDate(scoreData.completedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-2 mt-4">
        {onClearScore && (
          <Button onClick={onClearScore} variant="outline">
            Hapus Skor
          </Button>
        )}
        <Button
          onClick={() => {
            navigate({ to: "/play" });
          }}
        >
          Main Lagi
        </Button>
      </div>
    </>
  );
};

export default ScoreCard;
