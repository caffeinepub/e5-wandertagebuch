import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Photo {
    id: PhotoId;
    elevation?: bigint;
    stageId: StageId;
    blob: ExternalBlob;
    description: string;
    timestamp: Timestamp;
}
export interface Stage {
    id: StageId;
    dateTo: string;
    endElevation: bigint;
    startElevation: bigint;
    taxiInfo?: TaxiInfo;
    accommodation: string;
    estimatedTimeH: bigint;
    elevationLossM: bigint;
    distanceKm: bigint;
    isGipfeltag: boolean;
    endLocation: string;
    elevationGainM: bigint;
    number: bigint;
    dateFrom: string;
    startLocation: string;
    highlight: string;
}
export type Timestamp = bigint;
export type PhotoId = bigint;
export type SessionToken = string;
export interface TaxiInfo {
    departureLocation: string;
    departureTime: string;
    pricePerPerson: string;
    company: string;
    phone: string;
}
export interface PhotoInput {
    elevation?: bigint;
    stageId: StageId;
    blob: ExternalBlob;
    description: string;
}
export interface GpxData {
    stageId: StageId;
    blob: ExternalBlob;
    uploadedAt: Timestamp;
}
export type StageId = bigint;
export interface backendInterface {
    addPhoto(input: PhotoInput, token: SessionToken): Promise<Photo>;
    deletePhoto(photoId: PhotoId, token: SessionToken): Promise<boolean>;
    getGpx(stageId: StageId): Promise<{
        __kind__: "ok";
        ok: GpxData;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPhotos(stageId: StageId): Promise<Array<Photo>>;
    getStage(id: StageId): Promise<Stage | null>;
    getStages(): Promise<Array<Stage>>;
    uploadGpx(stageId: StageId, blob: ExternalBlob, token: SessionToken): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateSession(token: SessionToken): Promise<boolean>;
    verifyPassword(password: string): Promise<SessionToken | null>;
}
