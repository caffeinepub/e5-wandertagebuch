import type { backendInterface, Stage, Photo, ExternalBlob, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillInformation, _ImmutableObjectStorageRefillResult } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const makeBlob = (): ExternalBlob =>
  ({
    getBytes: async () => new Uint8Array(),
    getDirectURL: () => "",
    withUploadProgress: function () {
      return this as ExternalBlob;
    },
  }) as unknown as ExternalBlob;

const mockPrincipal = { toString: () => "mock-principal", isAnonymous: () => false } as unknown as Principal;

const stages: Stage[] = [
  {
    id: BigInt(1),
    number: BigInt(1),
    dateFrom: "04.08.2026",
    dateTo: "05.08.2026",
    startLocation: "Oberstdorf",
    startElevation: BigInt(813),
    endLocation: "Kemptner Hütte",
    endElevation: BigInt(1844),
    distanceKm: 13,
    ascentM: BigInt(1100),
    descentM: BigInt(100),
    estimatedTimeH: 5,
    accommodation: "Kemptner Hütte",
    isGipfeltag: false,
  },
  {
    id: BigInt(2),
    number: BigInt(2),
    dateFrom: "05.08.2026",
    dateTo: "06.08.2026",
    startLocation: "Kemptner Hütte",
    startElevation: BigInt(1844),
    endLocation: "Holzgau",
    endElevation: BigInt(1100),
    distanceKm: 13,
    ascentM: BigInt(200),
    descentM: BigInt(900),
    estimatedTimeH: 5,
    accommodation: "Gästehaus Huber, Holzgau",
    isGipfeltag: false,
  },
  {
    id: BigInt(3),
    number: BigInt(3),
    dateFrom: "06.08.2026",
    dateTo: "07.08.2026",
    startLocation: "Holzgau",
    startElevation: BigInt(1100),
    endLocation: "Ansbacher Hütte",
    endElevation: BigInt(2380),
    distanceKm: 10,
    ascentM: BigInt(1300),
    descentM: BigInt(100),
    estimatedTimeH: 5,
    accommodation: "Ansbacher Hütte",
    isGipfeltag: false,
    taxiInfo: {
      phone: "0043/5633 5633",
      departureTime: "08:15 Uhr",
      departureLocation: "Holzgau GH Bären",
      pricePerPerson: "EUR 17,-",
    },
  },
  {
    id: BigInt(4),
    number: BigInt(4),
    dateFrom: "07.08.2026",
    dateTo: "08.08.2026",
    startLocation: "Ansbacher Hütte",
    startElevation: BigInt(2380),
    endLocation: "Venet Gipfelhütte / Zams",
    endElevation: BigInt(1780),
    distanceKm: 14,
    ascentM: BigInt(400),
    descentM: BigInt(1850),
    estimatedTimeH: 6,
    accommodation: "Venet Gipfelhütte, Zams",
    isGipfeltag: false,
  },
  {
    id: BigInt(5),
    number: BigInt(5),
    dateFrom: "08.08.2026",
    dateTo: "09.08.2026",
    startLocation: "Zams / Venet",
    startElevation: BigInt(1780),
    endLocation: "Wenns",
    endElevation: BigInt(870),
    distanceKm: 17,
    ascentM: BigInt(800),
    descentM: BigInt(700),
    estimatedTimeH: 7,
    accommodation: "Hotel Pension Weiratherhof, Wenns",
    isGipfeltag: false,
  },
  {
    id: BigInt(6),
    number: BigInt(6),
    dateFrom: "09.08.2026",
    dateTo: "10.08.2026",
    startLocation: "Wenns",
    startElevation: BigInt(870),
    endLocation: "Braunschweiger Hütte",
    endElevation: BigInt(2759),
    distanceKm: 15,
    ascentM: BigInt(1450),
    descentM: BigInt(350),
    estimatedTimeH: 7,
    accommodation: "Braunschweiger Hütte",
    isGipfeltag: false,
  },
  {
    id: BigInt(7),
    number: BigInt(7),
    dateFrom: "10.08.2026",
    dateTo: "11.08.2026",
    startLocation: "Braunschweiger Hütte",
    startElevation: BigInt(2759),
    endLocation: "Vent",
    endElevation: BigInt(1900),
    distanceKm: 12,
    ascentM: BigInt(200),
    descentM: BigInt(1200),
    estimatedTimeH: 5,
    accommodation: "Hotel Vent",
    isGipfeltag: false,
  },
  {
    id: BigInt(8),
    number: BigInt(8),
    dateFrom: "11.08.2026",
    dateTo: "12.08.2026",
    startLocation: "Vent",
    startElevation: BigInt(1900),
    endLocation: "Hochjoch Hospiz",
    endElevation: BigInt(2413),
    distanceKm: 10,
    ascentM: BigInt(900),
    descentM: BigInt(200),
    estimatedTimeH: 5,
    accommodation: "Hochjoch Hospiz",
    isGipfeltag: false,
  },
  {
    id: BigInt(9),
    number: BigInt(9),
    dateFrom: "12.08.2026",
    dateTo: "12.08.2026",
    startLocation: "Hochjoch Hospiz",
    startElevation: BigInt(2413),
    endLocation: "Mittlere Guslarspitze → Hochjoch Hospiz",
    endElevation: BigInt(3128),
    distanceKm: 8,
    ascentM: BigInt(750),
    descentM: BigInt(750),
    estimatedTimeH: 5,
    accommodation: "Hochjoch Hospiz (2. Nacht)",
    isGipfeltag: true,
  },
  {
    id: BigInt(10),
    number: BigInt(10),
    dateFrom: "13.08.2026",
    dateTo: "14.08.2026",
    startLocation: "Hochjoch Hospiz",
    startElevation: BigInt(2413),
    endLocation: "Vernagthütte",
    endElevation: BigInt(1700),
    distanceKm: 8,
    ascentM: BigInt(100),
    descentM: BigInt(800),
    estimatedTimeH: 4,
    accommodation: "Vernagthütte",
    isGipfeltag: false,
  },
  {
    id: BigInt(11),
    number: BigInt(11),
    dateFrom: "14.08.2026",
    dateTo: "15.08.2026",
    startLocation: "Vernagthütte",
    startElevation: BigInt(1700),
    endLocation: "Gasthof Neuratheis / Schnals",
    endElevation: BigInt(1500),
    distanceKm: 12,
    ascentM: BigInt(600),
    descentM: BigInt(1000),
    estimatedTimeH: 6,
    accommodation: "Gasthof Neuratheis, Schnals",
    isGipfeltag: false,
  },
  {
    id: BigInt(12),
    number: BigInt(12),
    dateFrom: "15.08.2026",
    dateTo: "16.08.2026",
    startLocation: "Schnals",
    startElevation: BigInt(1500),
    endLocation: "Meran",
    endElevation: BigInt(325),
    distanceKm: 20,
    ascentM: BigInt(200),
    descentM: BigInt(1300),
    estimatedTimeH: 6,
    accommodation: "noch offen",
    isGipfeltag: false,
  },
];

export const mockBackend: backendInterface = {
  getStages: async () => stages,

  getStage: async (id: bigint) => {
    return stages.find((s) => s.id === id) ?? null;
  },

  getPhotos: async (_stageId: bigint): Promise<Photo[]> => {
    return [];
  },

  addPhoto: async (input) => {
    const photo: Photo = {
      id: BigInt(1),
      stageId: input.stageId,
      blob: makeBlob(),
      description: input.description,
      elevation: input.elevation,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      uploadedBy: mockPrincipal,
    };
    return photo;
  },

  deletePhoto: async (_photoId) => true,

  getGpx: async (_stageId: bigint) => {
    return null;
  },

  uploadGpx: async (_stageId: bigint, _blob) => {
    return;
  },

  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>): Promise<Array<boolean>> => {
    return [];
  },

  _immutableObjectStorageBlobsToDelete: async (): Promise<Array<Uint8Array>> => {
    return [];
  },

  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>): Promise<void> => {
    return;
  },

  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => {
    return { method: "", blob_hash: "" };
  },

  _immutableObjectStorageRefillCashier: async (_refillInformation: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => {
    return {};
  },

  _immutableObjectStorageUpdateGatewayPrincipals: async (): Promise<void> => {
    return;
  },
};
