import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { Button } from "@/shared/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("1");

  const levels = [
    { value: "1", label: "Level 1 - Mudah" },
    { value: "2", label: "Level 2 - Sedang" },
    { value: "3", label: "Level 3 - Sulit" },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 py-8 relative overflow-hidden">
      <img
        src="/img/banner.png"
        alt="Banner"
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto aspect-video object-contain"
      />

      <div className="flex flex-col items-center gap-4 sm:gap-6 z-10">
        <Link
          to={"/play"}
          search={{ level: parseInt(selectedLevel) }}
          className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 mb-4 sm:mb-6 md:mb-8"
        >
          <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-1 sm:ml-2 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-md">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-48 text-base sm:text-lg py-4 sm:py-6">
              <SelectValue placeholder="Pilih Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="lg"
            onClick={() => {
              navigate({ to: "/instruction" });
            }}
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-semibold whitespace-nowrap"
          >
            Petunjuk
          </Button>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 right-0 lg:right-4 xl:right-8">
        <img
          src="/img/pirate.png"
          alt="Pirate Character"
          className="w-48 lg:w-64 xl:w-80 h-auto aspect-auto"
        />
      </div>
    </main>
  );
}
