import GameContainer from "@/feature/play/components/GameContainer";
import { createFileRoute } from "@tanstack/react-router";

interface SearchParams {
  level?: number;
}

export const Route = createFileRoute("/play/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      level: search.level ? Number(search.level) : 1,
    };
  },
  component: Play,
});

function Play() {
  const { level } = Route.useSearch();
  return <GameContainer level={level ?? 1} />;
}
