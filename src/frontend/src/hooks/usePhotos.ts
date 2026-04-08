import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Photo, PhotoInput } from "../types";

export function usePhotos(stageId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Photo[]>({
    queryKey: ["photos", stageId?.toString()],
    queryFn: async () => {
      if (!actor || stageId === null) return [];
      return actor.getPhotos(stageId);
    },
    enabled: !!actor && !isFetching && stageId !== null,
    staleTime: 30 * 1000,
  });
}

export function useAddPhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ input }: { input: PhotoInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPhoto(input);
    },
    onSuccess: (photo) => {
      queryClient.invalidateQueries({
        queryKey: ["photos", photo.stageId.toString()],
      });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      photoId,
      stageId,
    }: { photoId: bigint; stageId: bigint }) => {
      if (!actor) throw new Error("Actor not available");
      const ok = await actor.deletePhoto(photoId);
      return { ok, stageId };
    },
    onSuccess: ({ stageId }) => {
      queryClient.invalidateQueries({
        queryKey: ["photos", stageId.toString()],
      });
    },
  });
}
