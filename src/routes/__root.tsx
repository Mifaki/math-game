import { Outlet, createRootRoute } from "@tanstack/react-router";

import AudioManager from "@/shared/components/AudioManager";
import FloatingAudioControls from "@/shared/components/FloatingAudioControls";
import { GlobalAudioProvider } from "@/shared/components/GlobalAudioProvider";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <AudioManager>
      <GlobalAudioProvider backgroundMusicUrl="/audio/background-music.mp3">
        <Outlet />
        <FloatingAudioControls showGameControls={false} />
        <TanStackRouterDevtools initialIsOpen={false} />
      </GlobalAudioProvider>
    </AudioManager>
  ),
});
