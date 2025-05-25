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
    <main className="w-screen min-h-screen flex flex-col justify-center items-center gap-8">
      <img
        src="/img/banner.png"
        alt="Banner"
        className="aspect-video w-160 h-80"
      />
      <div className="flex flex-col items-center gap-6">
        <Link
          to={"/play"}
          search={{ level: parseInt(selectedLevel) }}
          className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Play className="w-12 h-12 md:w-16 md:h-16 ml-2 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Link>
        <div className="flex items-center gap-6">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-48 text-lg py-6">
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
