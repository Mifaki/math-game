import NoScoreState from "@/feature/score/components/NoScoreState";
import ScoreBanner from "@/feature/score/components/ScoreBanner";
import ScoreCard from "@/feature/score/components/ScoreCard";
import { createFileRoute } from "@tanstack/react-router";
import { useScore } from "@/shared/usecase/useScore";

export const Route = createFileRoute("/score/")({
  component: Score,
});

function Score() {
  const { latestScore, clearScore } = useScore();

  return (
    <main className="min-h-screen py-4 sm:py-6 lg:py-8 flex flex-col justify-center items-center px-4">
      <ScoreBanner />
      <div className="container mx-auto flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg justify-center">
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
