import { Card, CardContent } from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const NoScoreState = () => {
  const navigate = useNavigate();

  return (
    <Card className="w-full mx-auto shadow-lg border-2 border-gray-200">
      <CardContent className="text-center py-6 sm:py-8 space-y-4 sm:space-y-6 px-4 sm:px-6">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎮</div>
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Belum Ada Skor
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Kamu belum menyelesaikan permainan apapun.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Ayo mulai bermain untuk mendapatkan skor pertamamu!
          </p>
        </div>

        <Button
          onClick={() => {
            navigate({ to: "/play" });
          }}
          className="w-full sm:w-auto"
          size="sm"
        >
          Mulai Bermain
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoScoreState;
