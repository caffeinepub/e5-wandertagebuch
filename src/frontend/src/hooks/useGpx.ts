import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type { GpxData, StageId } from "../types";

export function useGpx(stageId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GpxData | null>({
    queryKey: ["gpx", stageId?.toString()],
    queryFn: async () => {
      if (!actor || stageId === null) return null;
      return actor.getGpx(stageId);
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
        if (result !== null) {
          entries.push([stageId.toString(), result]);
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
      onProgress,
    }: {
      stageId: StageId;
      file: File;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("Actor not available");

      // Yield to UI thread before heavy processing so browser doesn't freeze
      await new Promise<void>((resolve) => setTimeout(resolve, 0));

      let bytes: Uint8Array<ArrayBuffer>;
      try {
        const buffer = await file.arrayBuffer();
        bytes = new Uint8Array(buffer) as Uint8Array<ArrayBuffer>;
      } catch (e) {
        throw new Error(
          `GPX-Datei konnte nicht gelesen werden: ${e instanceof Error ? e.message : String(e)}`,
        );
      }

      let blob: ExternalBlob;
      try {
        blob = ExternalBlob.fromBytes(bytes);
      } catch (e) {
        throw new Error(
          `GPX-Datei konnte nicht verarbeitet werden: ${e instanceof Error ? e.message : String(e)}`,
        );
      }

      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      await actor.uploadGpx(stageId, blob);
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
