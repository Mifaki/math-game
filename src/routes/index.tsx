import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="w-screen min-h-screen flex justify-center items-center">
      <h1>Math Game</h1>
    </main>
  );
}
