import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type { GpxData, SessionToken, StageId } from "../types";

export function useGpx(stageId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GpxData | null>({
    queryKey: ["gpx", stageId?.toString()],
    queryFn: async () => {
      if (!actor || stageId === null) return null;
      const result = await actor.getGpx(stageId);
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching && stageId !== null,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllGpx(stageIds: bigint[]) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Record<string, GpxData>>({
    queryKey: ["gpx-all", stageIds.map((id) => id.toString()).join(",")],
    queryFn: async () => {
      if (!actor || stageIds.length === 0) return {};
      const entries: [string, GpxData][] = [];
      for (const stageId of stageIds) {
        const result = await actor.getGpx(stageId);
        if (result.__kind__ === "ok") {
          entries.push([stageId.toString(), result.ok]);
        }
      }
      return Object.fromEntries(entries);
    },
    enabled: !!actor && !isFetching && stageIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUploadGpx() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      stageId,
      file,
      token,
      onProgress,
    }: {
      stageId: StageId;
      file: File;
      token: SessionToken;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const bytes = new Uint8Array(await file.arrayBuffer());
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      const result = await actor.uploadGpx(stageId, blob, token);
      if (result.__kind__ === "err") throw new Error(result.err);
      return stageId;
    },
    onSuccess: (stageId) => {
      void queryClient.invalidateQueries({
        queryKey: ["gpx", stageId.toString()],
      });
      void queryClient.invalidateQueries({ queryKey: ["gpx-all"] });
    },
  });
}
