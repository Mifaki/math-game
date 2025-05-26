import NoScoreState from "@/feature/score/components/NoScoreState";
import ScoreBanner from "@/feature/score/components/ScoreBanner";
import ScoreCard from "@/feature/score/components/ScoreCard";
import { createFileRoute } from "@tanstack/react-router";
import { useScore } from "@/shared/usecase/useScore";

export const Route = createFileRoute("/score/")({
  component: Score,
});

function Score() {
  const { latestScore, isLoading, clearScore } = useScore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl text-purple-800">Memuat skor...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 flex flex-col justify-center items-center">
      <ScoreBanner />
      <div className="container mx-auto flex flex-col max-w-lg justify-center">
        {latestScore ? (
          <ScoreCard
            scoreData={latestScore}
            onClearScore={() => clearScore()}
          />
        ) : (
          <NoScoreState />
        )}
      </div>
    </main>
  );
}
