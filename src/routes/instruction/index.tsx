import { CheckCircle, Sparkles, XCircle } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/shared/components/ui/button";

export const Route = createFileRoute("/instruction/")({
  component: InstructionPage,
});

function InstructionPage() {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen p-4 sm:p-6 flex flex-col relative">
      <div className="flex items-center justify-start absolute top-10 md:top-20 lg:top-20 left-4 lg:left-18">
        <Button
          variant="ghost"
          onClick={() => {
            navigate({ to: "/" });
          }}
          className="flex items-center gap-2 p-2 sm:p-3"
        >
          <img
            src="/img/arrow-back.png"
            alt="Arrow Back"
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl h-[80dvh] md:h-full relative mx-auto">
          <img
            src="/img/instr-board-mobile.png"
            alt="Instruction Board Mobile"
            className="block md:hidden w-full h-full absolute top-0 left-0 -z-10 opacity-80"
          />
          <img
            src="/img/instr-board.png"
            alt="Instruction Board"
            className="hidden md:block w-full h-full absolute top-0 left-0 -z-10 opacity-80"
          />

          <div className="w-full h-full flex items-center justify-center">
            <div className="py-16 sm:py-12 md:py-24 px-18 sm:px-18 md:px-12 lg:px-20 xl:px-32 text-center rounded-lg md:rounded-none">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-primary sm:mb-2 flex items-center justify-center gap-2 flex-wrap">
                  📘 Petunjuk Permainan
                </h1>
              </div>

              <div className="sm:space-y-8">
                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-primary">
                  Cara Bermain:
                </h2>

                <ol className="space-y-3 sm:space-y-4 text-foreground/90 text-left max-w-2xl mx-auto">
                  <li className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-xs sm:text-base lg:text-lg">
                      Cari angka awal yang diberi lingkaran hijau.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-xs sm:text-base lg:text-lg">
                      Klik angka selanjutnya (misalnya: 8.731 → 8.732 → 8.733).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span className="text-xs sm:text-base lg:text-lg">
                      Klik terus sampai semua angka benar dan membuat suatu
                      pola!
                    </span>
                  </li>
                </ol>

                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-primary">
                  Ingat ya:
                </h2>

                <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-foreground/90 text-xs sm:text-base lg:text-lg">
                      Kalau benar, akan muncul lingkaran hijau
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive flex-shrink-0" />
                    <span className="text-foreground/90 text-xs sm:text-base lg:text-lg">
                      Kalau salah, akan muncul notifikasi salah coba lagi ya!
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                    <span className="text-foreground/90 text-xs sm:text-base lg:text-lg">
                      Kalau semua benar, akan muncul pola unik!
                    </span>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <Button
                    onClick={() => {
                      navigate({ to: "/play" });
                    }}
                    className="w-full sm:w-auto text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  >
                    Mulai Bermain
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
