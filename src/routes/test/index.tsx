import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test/")({
  component: index,
});

function index() {
  return <div>Test</div>;
}
