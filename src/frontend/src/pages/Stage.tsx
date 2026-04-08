import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Car,
  Clock,
  Home,
  Loader2,
  LogIn,
  MapPin,
  Mountain,
  Navigation,
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
import { RouteMap } from "../components/RouteMap";
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
import { type GpxResult, parseGpx } from "../utils/parseGpx";

// Fallback elevation waypoints per stage number
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
    { distance: 9, elevation: 1250 },
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

function buildFallbackProfile(
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
    points.push({
      distance: dist,
      elevation: Math.round(midRise * 0.5 + trend * 0.5),
    });
  }
  return points;
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function StageSkeleton() {
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

// ─── GPX upload section ───────────────────────────────────────────────────────

interface GpxUploadProps {
  stageId: bigint;
  hasGpx: boolean;
}

function GpxUploadSection({ stageId, hasGpx }: GpxUploadProps) {
  const uploadGpx = useUploadGpx();
  const [gpxFile, setGpxFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef(0);

  const handleUpload = async () => {
    if (!gpxFile) return;
    setUploading(true);
    setMessage(null);
    setProgress(0);
    progressRef.current = 0;
    try {
      await uploadGpx.mutateAsync({
        stageId,
        file: gpxFile,
        onProgress: (pct: number) => {
          if (pct - progressRef.current >= 5 || pct >= 100) {
            progressRef.current = pct;
            setProgress(pct);
          }
        },
      });
      setGpxFile(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("GPX-Datei hochgeladen!");
      setMessage({ ok: true, text: "GPX-Datei erfolgreich hochgeladen" });
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Fehler beim Hochladen der GPX-Datei";
      setMessage({ ok: false, text });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
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
          ✓ GPX-Höhenprofil aktiv — neue Datei hochladen zum Ersetzen
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
          ref={fileRef}
          type="file"
          accept=".gpx,application/gpx+xml"
          onChange={(e) => {
            setGpxFile(e.target.files?.[0] ?? null);
            setMessage(null);
          }}
          className="cursor-pointer"
          data-ocid="gpx-file-input"
        />
      </div>
      {uploading && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground font-body">
            <span>GPX wird hochgeladen…</span>
            {progress > 0 && <span>{progress}%</span>}
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: progress > 0 ? `${progress}%` : "100%" }}
            />
          </div>
        </div>
      )}
      {message && (
        <p
          className={`text-xs font-body ${message.ok ? "text-primary" : "text-destructive"}`}
        >
          {message.ok ? "✓ " : "✗ "}
          {message.text}
        </p>
      )}
      <Button
        onClick={() => void handleUpload()}
        disabled={!gpxFile || uploading}
        variant="outline"
        size="sm"
        className="border-primary/30 text-primary hover:bg-primary/10"
        data-ocid="gpx-upload-btn"
      >
        <Upload className="w-3.5 h-3.5 mr-1.5" />
        {uploading ? "Wird hochgeladen…" : "GPX hochladen"}
      </Button>
    </section>
  );
}

// ─── Photo upload form ────────────────────────────────────────────────────────

interface PhotoUploadProps {
  stageId: bigint;
  sliderMin: number;
  sliderMax: number;
}

function PhotoUploadForm({ stageId, sliderMin, sliderMax }: PhotoUploadProps) {
  const addPhoto = useAddPhoto();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [elevation, setElevation] = useState<number | "">("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setProgress(0);
    try {
      const buffer = await selectedFile.arrayBuffer();
      const bytes = new Uint8Array(buffer) as Uint8Array<ArrayBuffer>;
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setProgress(pct),
      );
      await addPhoto.mutateAsync({
        input: {
          stageId,
          blob,
          description,
          elevation: elevation !== "" ? Number(elevation) : undefined,
        },
      });
      setDescription("");
      setSelectedFile(null);
      setElevation("");
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Foto hochgeladen!");
    } catch {
      toast.error("Fehler beim Hochladen. Bitte erneut versuchen.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
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
          Beschreibung (max. 200 Zeichen)
        </Label>
        <Textarea
          id="photo-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 200))}
          placeholder="Was war besonders an diesem Moment?"
          rows={2}
          data-ocid="photo-description"
        />
        <p className="text-[10px] text-muted-foreground/60 mt-1 text-right">
          {description.length}/200
        </p>
      </div>
      <div>
        <Label
          htmlFor="photo-elevation"
          className="text-xs text-muted-foreground mb-1.5 block font-medium"
        >
          Höhe des Fotos in Metern (optional)
        </Label>
        <div className="flex items-center gap-3">
          <input
            id="photo-elevation-slider"
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={10}
            value={elevation === "" ? sliderMin : elevation}
            onChange={(e) => setElevation(Number(e.target.value))}
            className="flex-1 accent-primary"
            data-ocid="photo-elevation-slider"
          />
          <Input
            id="photo-elevation"
            type="number"
            min={sliderMin}
            max={sliderMax}
            value={elevation}
            placeholder="m"
            onChange={(e) =>
              setElevation(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24 text-sm"
            data-ocid="photo-elevation-input"
          />
        </div>
        <p className="text-[10px] text-muted-foreground/60 mt-1">
          {sliderMin}–{sliderMax} m
        </p>
      </div>
      {uploading && progress > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground font-body">
            <span>Hochladen…</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
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
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Wird hochgeladen…
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Foto hochladen
          </>
        )}
      </Button>
    </div>
  );
}

// ─── Main Stage page ──────────────────────────────────────────────────────────

export default function Stage() {
  const params = useParams({ from: "/etappe/$id" });
  const navigate = useNavigate();
  const stageId = BigInt(params.id);

  const {
    login: handleLogin,
    isAuthenticated,
    isLoggingIn,
    identity,
  } = useAuth();
  const { data: stage, isLoading: stageLoading } = useStage(stageId);
  const { data: photos, isLoading: photosLoading } = usePhotos(stageId);
  const { data: gpxData, isLoading: gpxLoading } = useGpx(stageId);
  const deletePhoto = useDeletePhoto();

  const [gpxPoints, setGpxPoints] = useState<ElevationPoint[] | null>(null);
  const [gpxStats, setGpxStats] = useState<Pick<
    GpxResult,
    "distanceKm" | "ascentM" | "descentM"
  > | null>(null);
  const [gpxCoords, setGpxCoords] = useState<
    { lat: number; lon: number }[] | null
  >(null);

  // Parse GPX blob into elevation points when data arrives
  useEffect(() => {
    if (!gpxData) {
      setGpxPoints(null);
      setGpxStats(null);
      setGpxCoords(null);
      return;
    }
    let cancelled = false;
    fetch(gpxData.blob.getDirectURL())
      .then((res) => res.text())
      .then((xml) => {
        if (cancelled) return;
        try {
          const result = parseGpx(xml, true);
          setGpxPoints(result.points);
          setGpxStats({
            distanceKm: result.distanceKm,
            ascentM: result.ascentM,
            descentM: result.descentM,
          });
          setGpxCoords(result.coordinates);
        } catch {
          setGpxPoints(null);
          setGpxStats(null);
          setGpxCoords(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGpxPoints(null);
          setGpxStats(null);
          setGpxCoords(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [gpxData]);

  if (stageLoading) return <StageSkeleton />;

  if (!stage) {
    return (
      <div className="text-center py-16" data-ocid="stage-not-found">
        <Mountain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="font-display text-xl text-foreground mb-4">
          Etappe nicht gefunden
        </p>
        <Button variant="outline" onClick={() => navigate({ to: "/" })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const stageNum = Number(stage.number);
  const startElev = Number(stage.startElevation);
  const endElev = Number(stage.endElevation);

  const fallbackPoints = buildFallbackProfile(
    stageNum,
    startElev,
    endElev,
    Number(stage.distanceKm),
    Number(stage.ascentM),
  );

  const elevPoints = gpxPoints ?? fallbackPoints;
  const hasGpx = gpxPoints !== null;

  const sliderMin = Math.min(startElev, endElev);
  const sliderMax = Math.max(...elevPoints.map((p) => p.elevation));

  const photoMarkers = (photos ?? [])
    .filter((p) => p.elevation !== undefined && p.elevation !== null)
    .map((p) => ({ elevation: Number(p.elevation), id: p.id.toString() }));

  const isMyPhoto = (uploadedBy: { toString: () => string }) => {
    if (!identity) return false;
    return uploadedBy.toString() === identity.getPrincipal().toString();
  };

  const handleDelete = async (photoId: bigint) => {
    const confirmed = window.confirm("Foto wirklich löschen?");
    if (!confirmed) return;
    try {
      await deletePhoto.mutateAsync({ photoId, stageId });
      toast.success("Foto gelöscht.");
    } catch {
      toast.error("Fehler beim Löschen.");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        data-ocid="stage-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Alle Etappen
      </button>

      {/* Gipfeltag banner */}
      {stage.isGipfeltag && (
        <div
          className="relative overflow-hidden rounded-xl border-2 border-primary/40 bg-primary/20 px-5 py-4 shadow-warm"
          data-ocid="gipfeltag-banner"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground shadow-md">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-display font-bold text-lg tracking-wide text-foreground">
                  🏔 Gipfeltag
                </span>
                <Badge className="text-xs font-semibold border bg-primary text-primary-foreground border-primary/60">
                  Kein Ortswechsel
                </Badge>
              </div>
              <p className="text-sm font-body text-muted-foreground">
                Tagesausflug auf die Mittlere Guslarspitze (3.128 m) —
                Gletscherfreier Dreitausender
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stage title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary/15 text-primary font-display font-bold text-sm px-2.5 py-1 rounded-full border border-primary/25">
            E{stageNum}
          </span>
          <span className="text-sm text-muted-foreground font-body">
            {stage.isGipfeltag
              ? stage.dateFrom
              : `${stage.dateFrom} – ${stage.dateTo}`}
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
          {stage.startLocation} → {stage.endLocation}
        </h1>
      </div>

      {/* Taxi notice */}
      {stage.taxiInfo && (
        <div
          className="rounded-xl border-2 border-primary/40 bg-primary/20 p-4 shadow-warm"
          data-ocid="taxi-notice"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground shadow">
              <Car className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-base mb-1 text-foreground">
                🚕 Taxi-Transfer Feuerstein
              </p>
              <p className="text-sm font-semibold font-body text-foreground">
                Tel. {stage.taxiInfo.phone}
              </p>
              <p className="text-sm font-body mt-0.5 text-muted-foreground">
                Abfahrt <strong>{stage.taxiInfo.departureTime}</strong> ab{" "}
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
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
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

      {/* Info cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <InfoCard
          label="Datum"
          value={
            stage.isGipfeltag
              ? stage.dateFrom
              : `${stage.dateFrom} – ${stage.dateTo}`
          }
          icon={<Calendar className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Start"
          value={`${stage.startLocation} (${startElev} m)`}
          icon={<MapPin className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Ziel"
          value={
            stage.isGipfeltag
              ? `Mittlere Guslarspitze (${endElev} m)`
              : `${stage.endLocation} (${endElev} m)`
          }
          icon={<Mountain className="w-3.5 h-3.5" />}
        />
        <InfoCard
          label="Strecke"
          value={
            gpxStats
              ? `${gpxStats.distanceKm} km`
              : `${Number(stage.distanceKm)} km`
          }
          icon={<TrendingUp className="w-3.5 h-3.5" />}
          highlight={!!gpxStats}
        />
        <InfoCard
          label="Aufstieg"
          value={
            gpxStats ? `+${gpxStats.ascentM} m` : `+${Number(stage.ascentM)} m`
          }
          icon={<TrendingUp className="w-3.5 h-3.5" />}
          highlight={!!gpxStats}
        />
        <InfoCard
          label="Abstieg"
          value={
            gpxStats
              ? `−${gpxStats.descentM} m`
              : `−${Number(stage.descentM)} m`
          }
          icon={<TrendingDown className="w-3.5 h-3.5" />}
          highlight={!!gpxStats}
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

      {/* Route map (only when GPX coordinates available) */}
      {gpxCoords && gpxCoords.length >= 2 && (
        <section className="bg-card border border-border rounded-xl p-4 shadow-warm space-y-3">
          <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            Routenkarte
            <Badge
              variant="outline"
              className="text-[10px] px-2 py-0.5 border-primary/30 text-primary ml-1"
            >
              GPX
            </Badge>
          </h2>
          <RouteMap coordinates={gpxCoords} />
          <p className="text-[10px] text-muted-foreground/60 font-body text-right">
            Karte: OpenStreetMap-Mitwirkende
          </p>
        </section>
      )}

      {/* GPX upload (auth required) */}
      {isAuthenticated && (
        <GpxUploadSection stageId={stageId} hasGpx={hasGpx} />
      )}

      {/* Foto-Tagebuch */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display font-semibold text-xl text-foreground">
            Foto-Tagebuch
          </h2>
          {!isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleLogin()}
              disabled={isLoggingIn}
              className="flex items-center gap-1.5 text-xs"
              data-ocid="stage-login-btn"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Anmelden…
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  Anmelden zum Hochladen
                </>
              )}
            </Button>
          )}
        </div>

        {/* Photo upload form (auth required) */}
        {isAuthenticated && (
          <PhotoUploadForm
            stageId={stageId}
            sliderMin={sliderMin}
            sliderMax={sliderMax}
          />
        )}

        {/* Login prompt */}
        {!isAuthenticated && (
          <div
            className="flex items-center gap-3 bg-muted/40 border border-border rounded-xl p-4"
            data-ocid="upload-login-prompt"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <LogIn className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-body flex-1">
              Melde dich mit Internet Identity an, um Fotos und GPX-Dateien
              hochzuladen.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => void handleLogin()}
              disabled={isLoggingIn}
              data-ocid="upload-login-btn"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Anmelden…
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Anmelden
                </>
              )}
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
            <p className="text-sm text-muted-foreground/70 mt-1">
              {isAuthenticated
                ? "Lade das erste Foto hoch!"
                : "Melde dich an, um Fotos hinzuzufügen."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
