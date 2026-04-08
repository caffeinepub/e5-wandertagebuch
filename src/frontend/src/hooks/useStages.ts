import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Stage } from "../types";

export function useStages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Stage[]>({
    queryKey: ["stages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}
