import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Stage } from "../types";

export function useStage(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Stage | null>({
    queryKey: ["stage", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getStage(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 5 * 60 * 1000,
  });
}
