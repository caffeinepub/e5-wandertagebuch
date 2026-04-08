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
    distanceKm: BigInt(13),
    elevationGainM: BigInt(1100),
    elevationLossM: BigInt(100),
    estimatedTimeH: BigInt(5),
    accommodation: "Kemptner Hütte",
    highlight: "Start des E5, Sperrbachtobel, erste Hüttennacht",
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
    distanceKm: BigInt(13),
    elevationGainM: BigInt(200),
    elevationLossM: BigInt(900),
    estimatedTimeH: BigInt(5),
    accommodation: "Gästehaus Huber, Holzgau",
    highlight: "Mädelejoch (Grenze D/A), Simms-Wasserfall, Holzgauer Hängebrücke",
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
    distanceKm: BigInt(10),
    elevationGainM: BigInt(1300),
    elevationLossM: BigInt(100),
    estimatedTimeH: BigInt(5),
    accommodation: "Ansbacher Hütte",
    highlight: "Transfer Holzgau → Parkplatz Memminger Hütte, danach Aufstieg zur Ansbacher Hütte",
    isGipfeltag: false,
    taxiInfo: {
      company: "Taxi Feuerstein",
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
    distanceKm: BigInt(14),
    elevationGainM: BigInt(400),
    elevationLossM: BigInt(1850),
    estimatedTimeH: BigInt(6),
    accommodation: "Venet Gipfelhütte, Zams",
    highlight: "Seescharte (2.599 m), langer Abstieg durchs Zammer Loch, Inntal",
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
    distanceKm: BigInt(17),
    elevationGainM: BigInt(800),
    elevationLossM: BigInt(700),
    estimatedTimeH: BigInt(7),
    accommodation: "Hotel Pension Weiratherhof, Wenns",
    highlight: "Venetberg (2.208 m), Panoramablick Ötztaler Alpen, Pitztal",
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
    distanceKm: BigInt(15),
    elevationGainM: BigInt(1450),
    elevationLossM: BigInt(350),
    estimatedTimeH: BigInt(7),
    accommodation: "Braunschweiger Hütte",
    highlight: "Königsetappe, höchstgelegener Schlafplatz des E5, Gletscherblick Pitztal",
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
    distanceKm: BigInt(12),
    elevationGainM: BigInt(200),
    elevationLossM: BigInt(1200),
    estimatedTimeH: BigInt(5),
    accommodation: "Hotel Vent",
    highlight: "Pitztaler Jöchl (~3.000 m), Abstieg nach Vent",
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
    distanceKm: BigInt(10),
    elevationGainM: BigInt(900),
    elevationLossM: BigInt(200),
    estimatedTimeH: BigInt(5),
    accommodation: "Hochjoch Hospiz",
    highlight: "Rofental, Rofenhöfe, Gletscherwelt Ötztaler Alpen",
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
    distanceKm: BigInt(8),
    elevationGainM: BigInt(750),
    elevationLossM: BigInt(750),
    estimatedTimeH: BigInt(5),
    accommodation: "Hochjoch Hospiz (2. Nacht)",
    highlight: "Gletscherfreier Dreitausender, markierter Steig, Gipfeltag mit Kindern (8 & 12 Jahre)",
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
    distanceKm: BigInt(8),
    elevationGainM: BigInt(100),
    elevationLossM: BigInt(800),
    estimatedTimeH: BigInt(4),
    accommodation: "Vernagthütte",
    highlight: "Vernagt-Stausee, Guslarspitzen",
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
    distanceKm: BigInt(12),
    elevationGainM: BigInt(600),
    elevationLossM: BigInt(1000),
    estimatedTimeH: BigInt(6),
    accommodation: "Gasthof Neuratheis, Schnals",
    highlight: "Similaun-Hütte (3.019 m) — höchster Punkt der Tour, Übergang nach Südtirol, Ötzi-Fundstelle",
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
    distanceKm: BigInt(20),
    elevationGainM: BigInt(200),
    elevationLossM: BigInt(1300),
    estimatedTimeH: BigInt(6),
    accommodation: "noch offen",
    highlight: "Meraner Höhenweg, Waalwege, Ziel in Meran — You made it!",
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
    return { __kind__: "err" as const, err: "No GPX data" };
  },

  uploadGpx: async (_stageId: bigint, _blob) => {
    return { __kind__: "ok" as const, ok: null };
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
