import { useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { PuffLoader } from "react-spinners";

import { getFurious } from "@/api/furious";
import TimeLine from "@/components/TimeLine";
import { useQuery } from "@tanstack/react-query";
import { useTimelineActions } from "@/store/timeline";
import { getConfig } from "@/api/config";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: async ({ context }) => {
    if (!context.auth) {
      throw redirect({ to: "/login" });
    }
  },
});

function App() {
  const { configureWeeks } = useTimelineActions();
  const { data: furious, isLoading } = useQuery({
    queryKey: ["furious"],
    queryFn: getFurious,
  });
  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getConfig,
  });

  useEffect(() => {
    if (furious && settings) {
      configureWeeks({
        ...settings,
        furious,
      });
    }
  }, [furious, settings, configureWeeks]);

  if (isLoading || isLoadingSettings) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <PuffLoader size={160} color="#3A2BC0" />
      </div>
    );
  }

  return <TimeLine />;
}

export default App;
