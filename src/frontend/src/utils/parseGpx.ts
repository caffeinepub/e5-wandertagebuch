import type { ElevationPoint } from "../types";

/**
 * Haversine distance between two lat/lon points, returns km.
 */
function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface GpxResult {
  /** Elevation profile points with cumulative distance */
  points: ElevationPoint[];
  /** Total track distance in km (rounded to 2 decimal places) */
  distanceKm: number;
  /** Total ascent in meters (sum of all positive elevation gains ≥ 2 m) */
  ascentM: number;
  /** Total descent in meters (sum of all negative elevation drops ≥ 2 m, always positive) */
  descentM: number;
  /** Raw lat/lon coordinates for map rendering */
  coordinates: { lat: number; lon: number }[];
}

/**
 * Parse a GPX XML string and return elevation points, statistics, and coordinates.
 * - Filters duplicate consecutive points
 * - Calculates cumulative distance using Haversine formula
 * - Calculates ascent/descent with a minimum threshold of 2 m
 */
export function parseGpx(gpxXml: string): ElevationPoint[];
export function parseGpx(gpxXml: string, full: true): GpxResult;
export function parseGpx(
  gpxXml: string,
  full?: true,
): ElevationPoint[] | GpxResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(gpxXml, "application/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("GPX-Datei konnte nicht gelesen werden (XML-Fehler).");
  }

  const trkpts = Array.from(doc.querySelectorAll("trkpt"));
  if (trkpts.length === 0) {
    throw new Error("Keine Wegpunkte in der GPX-Datei gefunden.");
  }

  interface RawPoint {
    lat: number;
    lon: number;
    ele: number;
  }

  const raw: RawPoint[] = [];
  for (const pt of trkpts) {
    const lat = Number.parseFloat(pt.getAttribute("lat") ?? "");
    const lon = Number.parseFloat(pt.getAttribute("lon") ?? "");
    const eleEl = pt.querySelector("ele");
    const ele = eleEl ? Number.parseFloat(eleEl.textContent ?? "") : Number.NaN;

    if (Number.isNaN(lat) || Number.isNaN(lon) || Number.isNaN(ele)) continue;

    // Filter duplicate consecutive points
    const prev = raw[raw.length - 1];
    if (prev && prev.lat === lat && prev.lon === lon) continue;

    raw.push({ lat, lon, ele });
  }

  if (raw.length === 0) {
    throw new Error("Keine gültigen Wegpunkte in der GPX-Datei.");
  }

  const points: ElevationPoint[] = [];
  const coordinates: { lat: number; lon: number }[] = [];
  let cumKm = 0;
  let ascentM = 0;
  let descentM = 0;

  for (let i = 0; i < raw.length; i++) {
    if (i > 0) {
      const prev = raw[i - 1];
      const curr = raw[i];
      cumKm += haversineKm(prev.lat, prev.lon, curr.lat, curr.lon);

      // Ascent/descent calculation with 2 m threshold
      const elevDiff = curr.ele - prev.ele;
      if (elevDiff >= 2) {
        ascentM += elevDiff;
      } else if (elevDiff <= -2) {
        descentM += Math.abs(elevDiff);
      }
    }
    points.push({
      distance: Math.round(cumKm * 100) / 100,
      elevation: Math.round(raw[i].ele),
    });
    coordinates.push({ lat: raw[i].lat, lon: raw[i].lon });
  }

  if (!full) {
    return points;
  }

  return {
    points,
    distanceKm: Math.round(cumKm * 100) / 100,
    ascentM: Math.round(ascentM),
    descentM: Math.round(descentM),
    coordinates,
  };
}
