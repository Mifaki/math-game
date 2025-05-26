import { Card, CardContent } from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const NoScoreState = () => {
  const navigate = useNavigate();

  const handleStartPlaying = () => {
    navigate({ to: "/play" });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-gray-200">
      <CardContent className="text-center py-8 space-y-6">
        <div className="text-6xl mb-4">🎮</div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Belum Ada Skor
          </h2>
          <p className="text-gray-600">
            Kamu belum menyelesaikan permainan apapun.
          </p>
          <p className="text-sm text-gray-500">
            Ayo mulai bermain untuk mendapatkan skor pertamamu!
          </p>
        </div>

        <Button
          onClick={() => {
            navigate({ to: "/play" });
          }}
        >
          Mulai Bermain
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoScoreState;
