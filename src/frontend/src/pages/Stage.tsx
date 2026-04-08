import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Car,
  Clock,
  Home,
  LogIn,
  MapPin,
  Mountain,
  TrendingDown,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { ElevationChart } from "../components/ElevationChart";
import { InfoCard } from "../components/InfoCard";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Skeleton } from "../components/ui/skeleton";
import { Textarea } from "../components/ui/textarea";
import { useAuth } from "../hooks/useAuth";
import { useGpx, useUploadGpx } from "../hooks/useGpx";
import { useAddPhoto, useDeletePhoto, usePhotos } from "../hooks/usePhotos";
import { useStage } from "../hooks/useStage";
import type { ElevationPoint } from "../types";
import { parseGpx } from "../utils/parseGpx";

// Stage-specific waypoint data for realistic elevation profiles (fallback)
const STAGE_WAYPOINTS: Record<
  number,
  { distance: number; elevation: number; label?: string }[]
> = {
  1: [
    { distance: 0, elevation: 813, label: "Oberstdorf" },
    { distance: 2, elevation: 900 },
    { distance: 4, elevation: 1050 },
    { distance: 6, elevation: 1200 },
    { distance: 8, elevation: 1400 },
    { distance: 10, elevation: 1600 },
    { distance: 11.5, elevation: 1750 },
    { distance: 13, elevation: 1844, label: "Kemptner Hütte" },
  ],
  2: [
    { distance: 0, elevation: 1844, label: "Kemptner Hütte" },
    { distance: 2, elevation: 1950, label: "Mädelejoch" },
    { distance: 4, elevation: 1750 },
    { distance: 7, elevation: 1400 },
    { distance: 9, elevation: 1250, label: "Simms-Wasserfall" },
    { distance: 11, elevation: 1150 },
    { distance: 13, elevation: 1100, label: "Holzgau" },
  ],
  3: [
    { distance: 0, elevation: 1100, label: "Holzgau" },
    { distance: 1, elevation: 1200 },
    { distance: 3, elevation: 1600 },
    { distance: 5, elevation: 1900 },
    { distance: 7, elevation: 2100 },
    { distance: 9, elevation: 2280 },
    { distance: 10, elevation: 2380, label: "Ansbacher Hütte" },
  ],
  4: [
    { distance: 0, elevation: 2380, label: "Ansbacher Hütte" },
    { distance: 2, elevation: 2500 },
    { distance: 4, elevation: 2599, label: "Seescharte" },
    { distance: 6, elevation: 2300 },
    { distance: 9, elevation: 1950 },
    { distance: 12, elevation: 1850 },
    { distance: 14, elevation: 1780, label: "Venet Gipfelhütte" },
  ],
  5: [
    { distance: 0, elevation: 1780, label: "Venet / Zams" },
    { distance: 3, elevation: 1950 },
    { distance: 6, elevation: 2208, label: "Venetberg" },
    { distance: 9, elevation: 1850 },
    { distance: 12, elevation: 1400 },
    { distance: 15, elevation: 1050 },
    { distance: 17, elevation: 870, label: "Wenns" },
  ],
  6: [
    { distance: 0, elevation: 870, label: "Wenns" },
    { distance: 2, elevation: 1100 },
    { distance: 5, elevation: 1600 },
    { distance: 8, elevation: 2050 },
    { distance: 11, elevation: 2400 },
    { distance: 13, elevation: 2650 },
    { distance: 15, elevation: 2759, label: "Braunschweiger Hütte" },
  ],
  7: [
    { distance: 0, elevation: 2759, label: "Braunschweiger Hütte" },
    { distance: 2, elevation: 2900 },
    { distance: 3.5, elevation: 3000, label: "Pitztaler Jöchl" },
    { distance: 5, elevation: 2700 },
    { distance: 8, elevation: 2250 },
    { distance: 10, elevation: 2050 },
    { distance: 12, elevation: 1900, label: "Vent" },
  ],
  8: [
    { distance: 0, elevation: 1900, label: "Vent" },
    { distance: 2, elevation: 2050, label: "Rofenhöfe" },
    { distance: 4, elevation: 2150 },
    { distance: 7, elevation: 2280 },
    { distance: 8.5, elevation: 2380 },
    { distance: 10, elevation: 2413, label: "Hochjoch Hospiz" },
  ],
  9: [
    { distance: 0, elevation: 2413, label: "Hochjoch Hospiz" },
    { distance: 1.5, elevation: 2600 },
    { distance: 2.5, elevation: 2800 },
    { distance: 3.5, elevation: 2980 },
    { distance: 4, elevation: 3128, label: "Mittlere Guslarspitze" },
    { distance: 4.5, elevation: 2980 },
    { distance: 5.5, elevation: 2800 },
    { distance: 6.5, elevation: 2600 },
    { distance: 8, elevation: 2413, label: "Hochjoch Hospiz" },
  ],
  10: [
    { distance: 0, elevation: 2413, label: "Hochjoch Hospiz" },
    { distance: 2, elevation: 2300 },
    { distance: 4, elevation: 2100 },
    { distance: 5.5, elevation: 1900 },
    { distance: 7, elevation: 1780 },
    { distance: 8, elevation: 1700, label: "Vernagthütte" },
  ],
  11: [
    { distance: 0, elevation: 1700, label: "Vernagthütte" },
    { distance: 2, elevation: 1950 },
    { distance: 4, elevation: 2400 },
    { distance: 5.5, elevation: 3019, label: "Similaun-Hütte" },
    { distance: 7, elevation: 2600 },
    { distance: 9, elevation: 2100 },
    { distance: 11, elevation: 1700 },
    { distance: 12, elevation: 1500, label: "Schnals" },
  ],
  12: [
    { distance: 0, elevation: 1500, label: "Schnals" },
    { distance: 3, elevation: 1650 },
    { distance: 6, elevation: 1700, label: "Meraner Höhenweg" },
    { distance: 9, elevation: 1400 },
    { distance: 13, elevation: 900 },
    { distance: 17, elevation: 600 },
    { distance: 20, elevation: 325, label: "Meran 🎉" },
  ],
};

function generateFallbackProfile(
  stageNumber: number,
  startElev: number,
  endElev: number,
  distKm: number,
  gainM: number,
): ElevationPoint[] {
  const waypoints = STAGE_WAYPOINTS[stageNumber];
  if (waypoints) {
    return waypoints.map((wp) => ({
      distance: wp.distance,
      elevation: wp.elevation,
      label: wp.label,
    }));
  }
  const points: ElevationPoint[] = [];
  const steps = Math.max(10, distKm * 2);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const dist = Number.parseFloat((t * distKm).toFixed(1));
    const midRise = startElev + gainM * Math.sin(Math.PI * t);
    const trend = startElev + (endElev - startElev) * t;
    const elev = Math.round(midRise * 0.5 + trend * 0.5);
    points.push({ distance: dist, elevation: elev });
  }
  return points;
}

export default function Stage() {
  const params = useParams({ from: "/etappe/$id" });
  const navigate = useNavigate();
  const stageId = BigInt(params.id);

  const { login: handleLogin, isAuthenticated, identity } = useAuth();

  const { data: stage, isLoading: stageLoading } = useStage(stageId);
  const { data: photos, isLoading: photosLoading } = usePhotos(stageId);
  const { data: gpxData, isLoading: gpxLoading } = useGpx(stageId);
  const addPhoto = useAddPhoto();
  const deletePhoto = useDeletePhoto();
  const uploadGpx = useUploadGpx();

  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoElevation, setPhotoElevation] = useState<number | "">("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // GPX upload state
  const [gpxFile, setGpxFile] = useState<File | null>(null);
  const [gpxUploading, setGpxUploading] = useState(false);
  const [gpxProgress, setGpxProgress] = useState(0);
  const [gpxUploadMsg, setGpxUploadMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const gpxFileRef = useRef<HTMLInputElement>(null);
  // Throttle progress updates to avoid excessive re-renders
  const gpxProgressRef = useRef(0);

  // Parsed GPX elevation points
  const [gpxElevPoints, setGpxElevPoints] = useState<ElevationPoint[] | null>(
    null,
  );

  // Fetch and parse GPX blob when available
  useEffect(() => {
    if (!gpxData) {
      setGpxElevPoints(null);
      return;
    }
    let cancelled = false;
    const url = gpxData.blob.getDirectURL();
    fetch(url)
      .then((res) => res.text())
      .then((xml) => {
        if (cancelled) return;
        try {
          setGpxElevPoints(parseGpx(xml));
        } catch {
          setGpxElevPoints(null);
        }
      })
      .catch(() => {
        if (!cancelled) setGpxElevPoints(null);
      });
    return () => {
      cancelled = true;
    };
  }, [gpxData]);

  if (stageLoading) {
    return (
      <div className="space-y-5 py-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-52 w-full rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["a", "b", "c", "d", "e", "f", "g", "h"] as const).map((k) => (
            <Skeleton key={k} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="text-center py-16" data-ocid="stage-not-found">
        <Mountain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="font-display text-xl text-foreground mb-4">
          Etappe nicht gefunden
        </p>
        <Button variant="outline" onClick={() => navigate({ to: "/" })}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const stageNum = Number(stage.number);
  const fallbackPoints = generateFallbackProfile(
    stageNum,
    Number(stage.startElevation),
    Number(stage.endElevation),
    Number(stage.distanceKm),
    Number(stage.elevationGainM),
  );

  // Use GPX-parsed points if available, else fallback
  const elevPoints = gpxElevPoints ?? fallbackPoints;
  const hasGpx = gpxElevPoints !== null;

  const startElevNum = Number(stage.startElevation);
  const endElevNum = Number(stage.endElevation);
  const maxElevOnRoute = Math.max(...elevPoints.map((p) => p.elevation));
  const sliderMin = Math.min(startElevNum, endElevNum);
  const sliderMax = maxElevOnRoute;

  // Build photo markers for elevation chart
  const photoMarkers = (photos ?? [])
    .filter((p) => p.elevation !== undefined && p.elevation !== null)
    .map((p) => ({
      elevation: Number(p.elevation),
      id: p.id.toString(),
    }));

  // Check if current user is the uploader of a photo
  const isMyPhoto = (uploadedBy: { toString: () => string }) => {
    if (!identity) return false;
    return uploadedBy.toString() === identity.getPrincipal().toString();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      await addPhoto.mutateAsync({
        input: {
          stageId,
          blob,
          description,
          elevation: photoElevation !== "" ? BigInt(photoElevation) : undefined,
        },
      });
      setDescription("");
      setSelectedFile(null);
      setPhotoElevation("");
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Foto hochgeladen!");
    } catch {
      toast.error("Fehler beim Hochladen. Bitte erneut versuchen.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (photoId: bigint) => {
    try {
      await deletePhoto.mutateAsync({ photoId, stageId });
      toast.success("Foto gelöscht.");
    } catch {
      toast.error("Fehler beim Löschen.");
    }
  };

  const handleGpxUpload = async () => {
    if (!gpxFile) return;
    setGpxUploading(true);
    setGpxUploadMsg(null);
    setGpxProgress(0);
    gpxProgressRef.current = 0;
    try {
      await uploadGpx.mutateAsync({
        stageId,
        file: gpxFile,
        onProgress: (pct: number) => {
          // Throttle: only update state if progress jumped by ≥5% to avoid excessive re-renders
          if (pct - gpxProgressRef.current >= 5 || pct >= 100) {
            gpxProgressRef.current = pct;
            setGpxProgress(pct);
          }
        },
      });
      setGpxFile(null);
      if (gpxFileRef.current) gpxFileRef.current.value = "";
      setGpxUploadMsg({
        type: "success",
        text: "GPX erfolgreich hochgeladen",
      });
    } catch (err) {
      setGpxUploadMsg({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Fehler beim Hochladen der GPX-Datei",
      });
    } finally {
      setGpxUploading(false);
      setGpxProgress(0);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back navigation */}
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        data-ocid="stage-back"
      >
        <ArrowLeft className="w-4 h-4" /> Alle Etappen
      </button>

      {/* Gipfeltag Banner — Stage 9 only */}
      {stage.isGipfeltag && (
        <div
          className="relative overflow-hidden rounded-xl border-2 border-primary/40 bg-primary/20 px-5 py-4 shadow-warm"
          data-ocid="gipfeltag-banner"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-primary text-primary-foreground">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-display font-bold text-lg tracking-wide text-foreground">
                  🏔 Gipfeltag
                </span>
                <Badge className="text-xs font-semibold border bg-primary text-primary-foreground border-primary/60">
                  Kein Ortswechsel
                </Badge>
              </div>
              <p className="text-sm font-body text-muted-foreground">
                Tagesausflug auf die Mittlere Guslarspitze (3.128 m) —
                Gletscherfreier Dreitausender mit Kindern (8 &amp; 12 Jahre)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stage header */}
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-primary/15 text-primary font-display font-bold text-sm px-2.5 py-1 rounded-full border border-primary/25">
              E{stageNum}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mt-2 leading-tight">
            {stage.startLocation} → {stage.endLocation}
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1 leading-relaxed">
            {stage.highlight}
          </p>
        </div>
      </div>

      {/* Taxi notice — Stage 3 */}
      {stage.taxiInfo && (
        <div
          className="rounded-xl border-2 border-primary/40 bg-primary/20 p-4 shadow-warm"
          data-ocid="taxi-notice"
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow bg-primary text-primary-foreground">
              <Car className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-base mb-1 text-foreground">
                🚕 Taxi-Transfer erforderlich
              </p>
              <p className="text-sm font-semibold font-body text-foreground">
                {stage.taxiInfo.company} · Tel. {stage.taxiInfo.phone}
              </p>
              <p className="text-sm font-body mt-0.5 text-muted-foreground">
                Abfahrt <strong>{stage.taxiInfo.departureTime} Uhr</strong> ab{" "}
                {stage.taxiInfo.departureLocation}
                {" · "}
                <strong>{stage.taxiInfo.pricePerPerson}</strong> pro Person
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Elevation chart */}
      <section className="bg-card border border-border rounded-xl p-4 shadow-warm">
        <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
          <h2 className="font-display font-semibold text-base text-foreground">
            Höhenprofil
            {stage.isGipfeltag && (
              <span className="ml-2 text-xs font-body font-normal text-primary/70">
                Hin- und Rückweg
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            {gpxLoading && (
              <span className="text-xs text-muted-foreground font-body animate-pulse">
                GPX wird geladen…
              </span>
            )}
            {!gpxLoading && hasGpx && (
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0.5 border-primary/30 text-primary"
              >
                GPX-Daten
              </Badge>
            )}
            {!gpxLoading && !hasGpx && (
              <span className="text-[10px] text-muted-foreground/60 font-body">
                Schätzung
              </span>
            )}
          </div>
        </div>
        <ElevationChart
          elevationPoints={elevPoints}
          height={200}
          photoMarkers={photoMarkers}
        />
      </section>

      {/* Info cards grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <InfoCard
          label="Datum"
          value={
            stage.isGipfeltag
              ? stage.dateFrom
              : `${stage.dateFrom} → ${stage.dateTo}`
          }
          icon={<Calendar className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Start"
          value={`${stage.startLocation} (${Number(stage.startElevation)} m)`}
          icon={<MapPin className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Ziel"
          value={
            stage.isGipfeltag
              ? `Mittlere Guslarspitze (${Number(stage.endElevation)} m)`
              : `${stage.endLocation} (${Number(stage.endElevation)} m)`
          }
          icon={<Mountain className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Distanz"
          value={`${Number(stage.distanceKm)} km`}
          icon={<TrendingUp className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Aufstieg"
          value={`+${Number(stage.elevationGainM)} m`}
          icon={<TrendingUp className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Abstieg"
          value={`−${Number(stage.elevationLossM)} m`}
          icon={<TrendingDown className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Gehzeit"
          value={`~${Number(stage.estimatedTimeH)} Std.`}
          icon={<Clock className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Unterkunft"
          value={stage.accommodation}
          icon={<Home className="w-3.5 h-3.5" />}
          highlight
        />
      </section>

      {/* GPX upload section (auth required) */}
      {isAuthenticated ? (
        <section
          className="bg-card border border-border rounded-xl p-4 shadow-warm space-y-3"
          data-ocid="gpx-upload"
        >
          <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
            <Mountain className="w-4 h-4 text-primary" />
            GPX-Datei für diese Etappe
          </h3>
          {hasGpx && (
            <p className="text-xs text-primary font-body">
              ✓ GPX-Höhenprofil ist aktiv — neue Datei hochladen zum Ersetzen
            </p>
          )}
          <div>
            <Label
              htmlFor="gpx-file"
              className="text-xs text-muted-foreground mb-1.5 block font-medium"
            >
              GPX-Datei auswählen (.gpx)
            </Label>
            <Input
              id="gpx-file"
              ref={gpxFileRef}
              type="file"
              accept=".gpx,application/gpx+xml"
              onChange={(e) => {
                setGpxFile(e.target.files?.[0] ?? null);
                setGpxUploadMsg(null);
              }}
              className="cursor-pointer"
              data-ocid="gpx-file-input"
            />
          </div>
          {gpxUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground font-body">
                <span>GPX wird hochgeladen…</span>
                {gpxProgress > 0 && <span>{gpxProgress}%</span>}
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: gpxProgress > 0 ? `${gpxProgress}%` : "100%",
                  }}
                />
              </div>
            </div>
          )}
          {gpxUploadMsg && (
            <p
              className={`text-xs font-body ${gpxUploadMsg.type === "success" ? "text-primary" : "text-destructive"}`}
            >
              {gpxUploadMsg.type === "success" ? "✓ " : "✗ "}
              {gpxUploadMsg.text}
            </p>
          )}
          <Button
            onClick={() => void handleGpxUpload()}
            disabled={!gpxFile || gpxUploading}
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10"
            data-ocid="gpx-upload-btn"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            {gpxUploading ? "Wird hochgeladen…" : "Hochladen"}
          </Button>
        </section>
      ) : null}

      {/* Photos section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display font-semibold text-xl text-foreground">
            Fotos &amp; Notizen
          </h2>
          {!isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleLogin()}
              className="flex items-center gap-1.5 text-xs"
              data-ocid="stage-login-btn"
            >
              <LogIn className="w-3.5 h-3.5" />
              Anmelden zum Hochladen
            </Button>
          )}
        </div>

        {/* Upload area (auth required) */}
        {isAuthenticated && (
          <div
            className="bg-card border border-border rounded-xl p-4 space-y-4 shadow-warm"
            data-ocid="photo-upload"
          >
            <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              Foto hinzufügen
            </h3>
            <div>
              <Label
                htmlFor="photo-file"
                className="text-xs text-muted-foreground mb-1.5 block font-medium"
              >
                Foto auswählen (JPG, PNG, HEIC)
              </Label>
              <Input
                id="photo-file"
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                className="cursor-pointer"
                data-ocid="photo-file-input"
              />
            </div>
            <div>
              <Label
                htmlFor="photo-desc"
                className="text-xs text-muted-foreground mb-1.5 block font-medium"
              >
                Beschreibung (optional)
              </Label>
              <Textarea
                id="photo-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Was war besonders an diesem Moment?"
                rows={2}
                data-ocid="photo-description"
              />
            </div>
            <div>
              <Label
                htmlFor="photo-elevation"
                className="text-xs text-muted-foreground mb-1.5 block font-medium"
              >
                Höhe des Fotos (optional, {sliderMin}–{sliderMax} m)
              </Label>
              <div className="flex items-center gap-3">
                <input
                  id="photo-elevation-slider"
                  type="range"
                  min={sliderMin}
                  max={sliderMax}
                  step={10}
                  value={photoElevation === "" ? sliderMin : photoElevation}
                  onChange={(e) => setPhotoElevation(Number(e.target.value))}
                  className="flex-1 accent-primary"
                  data-ocid="photo-elevation-slider"
                />
                <Input
                  id="photo-elevation"
                  type="number"
                  min={sliderMin}
                  max={sliderMax}
                  value={photoElevation}
                  placeholder="m"
                  onChange={(e) =>
                    setPhotoElevation(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-24 text-sm"
                  data-ocid="photo-elevation-input"
                />
                <span className="text-sm text-muted-foreground font-body">
                  m
                </span>
              </div>
            </div>
            {uploading && uploadProgress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground font-body">
                  <span>Hochladen…</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            <Button
              onClick={() => void handleUpload()}
              disabled={!selectedFile || uploading}
              className="w-full sm:w-auto"
              data-ocid="photo-upload-btn"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Wird hochgeladen…" : "Foto hochladen"}
            </Button>
          </div>
        )}

        {/* Login prompt when not authenticated */}
        {!isAuthenticated && (
          <div
            className="flex items-center gap-3 bg-muted/40 border border-border rounded-xl p-4"
            data-ocid="upload-login-prompt"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <LogIn className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-body flex-1">
              Melde dich mit Internet Identity an, um Fotos und Notizen
              hinzuzufügen.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => void handleLogin()}
              data-ocid="upload-login-btn"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              Anmelden
            </Button>
          </div>
        )}

        {/* Photos grid */}
        {photosLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(["a", "b", "c"] as const).map((k) => (
              <Skeleton key={k} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : photos && photos.length > 0 ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            data-ocid="photos-grid"
          >
            {photos.map((photo) => (
              <div
                key={photo.id.toString()}
                className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-warm transition-smooth hover:shadow-warm-elevated"
              >
                <img
                  src={photo.blob.getDirectURL()}
                  alt={photo.description || "Etappenfoto"}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                {(photo.description ||
                  (photo.elevation !== undefined &&
                    photo.elevation !== null)) && (
                  <div className="p-2.5 bg-card border-t border-border/60">
                    {photo.elevation !== undefined &&
                      photo.elevation !== null && (
                        <div className="flex items-center gap-1 mb-1">
                          <Mountain className="w-3 h-3 flex-shrink-0 text-primary" />
                          <span className="text-[11px] font-semibold font-body text-primary">
                            {Number(photo.elevation)} m
                          </span>
                        </div>
                      )}
                    {photo.description && (
                      <p className="text-xs text-muted-foreground font-body line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                  </div>
                )}
                {isAuthenticated && isMyPhoto(photo.uploadedBy) && (
                  <button
                    type="button"
                    onClick={() => void handleDelete(photo.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-destructive/80 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-smooth hover:bg-destructive"
                    aria-label="Foto löschen"
                    data-ocid="photo-delete-btn"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-12 bg-muted/30 rounded-xl border border-border"
            data-ocid="photos-empty"
          >
            <Mountain className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-display text-base text-muted-foreground">
              Noch keine Fotos für diese Etappe
            </p>
            {isAuthenticated ? (
              <p className="text-sm text-muted-foreground/70 mt-1">
                Lade das erste Foto hoch!
              </p>
            ) : (
              <p className="text-sm text-muted-foreground/70 mt-1">
                Melde dich an, um Fotos hinzuzufügen.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
