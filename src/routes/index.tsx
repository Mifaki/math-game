import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/shared/components/ui/button";
import { Play } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  return (
    <main className="w-screen min-h-screen flex flex-col justify-center items-center gap-8">
      <img
        src="/img/banner.png"
        alt="Banner"
        className="aspect-video w-160 h-80"
      />

      <div className="flex flex-col items-center gap-6">
        <Link
          to={"/play"}
          className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Play className="w-12 h-12 md:w-16 md:h-16 ml-2 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Link>

        <div className="flex items-center gap-6">
          <Button
            size="lg"
            onClick={() => {
              navigate({ to: "/play" });
            }}
            className="text-lg px-8 py-6 font-semibold"
          >
            Level 1
          </Button>

          <Button
            size="lg"
            onClick={() => {
              navigate({ to: "/instruction" });
            }}
            className="text-lg px-8 py-6 font-semibold"
          >
            Petunjuk
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 -translate-x-1/2">
        <img
          src="/img/pirate.png"
          alt="Pirate Character"
          className="w-90 h-120 aspect-auto"
        />
      </div>
    </main>
  );
}
