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

/**
 * Parse a GPX XML string and return ElevationPoint[] with cumulative distances.
 * Filters duplicate consecutive points and rounds distance to 2 decimal places.
 */
export function parseGpx(gpxXml: string): ElevationPoint[] {
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
  let cumKm = 0;

  for (let i = 0; i < raw.length; i++) {
    if (i > 0) {
      const prev = raw[i - 1];
      const curr = raw[i];
      cumKm += haversineKm(prev.lat, prev.lon, curr.lat, curr.lon);
    }
    points.push({
      distance: Math.round(cumKm * 100) / 100,
      elevation: Math.round(raw[i].ele),
    });
  }

  return points;
}
