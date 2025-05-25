import { ArrowLeft, CheckCircle, Sparkles, Star, XCircle } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/shared/components/ui/button";

export const Route = createFileRoute("/instruction/")({
  component: InstructionPage,
});

function InstructionPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate({ to: "/" });
  };

  const handlePlayClick = () => {
    navigate({ to: "/play" });
  };

  return (
    <main className="w-screen min-h-screen p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>

          <div className="flex justify-center">
            <img
              src="/img/pirate.png"
              alt="Pirate Character"
              className="w-16 h-16"
            />
          </div>
        </div>

        {/* Instructions Content */}
        <div className="bg-card rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              📘 Petunjuk Permainan
            </h1>
          </div>

          <div className="space-y-6">
            {/* How to Play Section */}
            <div className="bg-secondary/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Cara Bermain:
              </h2>
              <ol className="space-y-3 text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Cari angka awal yang diberi lingkaran hijau.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Klik angka selanjutnya (misalnya: 8.731 → 8.732 → 8.733).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Klik terus sampai semua angka benar dan membuat suatu pola!
                  </span>
                </li>
              </ol>
            </div>

            {/* Rules Section */}
            <div className="bg-accent/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Ingat ya:
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground/90">
                    Kalau benar, akan muncul lingkaran hijau
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-foreground/90">
                    Kalau salah, akan muncul notifikasi salah coba lagi ya!
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground/90">
                    Kalau semua benar, akan muncul pola unik!
                  </span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-primary/10 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-lg font-medium">
                  Ayo mulai dan temukan pola ajaibnya!
                </span>
                <Star className="w-5 h-5 text-accent" />
              </div>

              <Button
                onClick={handlePlayClick}
                size="lg"
                className="px-8 py-6 text-lg font-semibold"
              >
                Mulai Bermain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
