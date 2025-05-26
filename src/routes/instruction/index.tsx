import { CheckCircle, Sparkles, XCircle } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/shared/components/ui/button";

export const Route = createFileRoute("/instruction/")({
  component: InstructionPage,
});

function InstructionPage() {
  const navigate = useNavigate();

  return (
    <main className="w-screen min-h-screen p-6 flex relative">
      <div className="flex items-center justify-between mb-8 absolute top-20 left-20">
        <Button
          variant="ghost"
          onClick={() => {
            navigate({ to: "/" });
          }}
          className="flex items-center gap-2"
        >
          <img src="/img/arrow-back.png" alt="Arrow Back" />
        </Button>
      </div>
      <div className="w-[75dvw] h-[70dvh] relative mx-auto my-auto">
        <img
          src="/img/instr-board.png"
          alt="Instruction Board"
          className="w-full h-full absolute top-6 left-6 right-6 bottom-6 -z-10"
        />
        <div className="w-full h-full py-40 px-80 text-center">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              📘 Petunjuk Permainan
            </h1>
          </div>

          <div className="space-y-6">
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

            <Button
              onClick={() => {
                navigate({ to: "/play" });
              }}
              size={"lg"}
            >
              Mulai Bermain
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
