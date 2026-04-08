import { useEffect, useRef } from "react";

// Leaflet is loaded via CDN script tag in index.html
declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: Leaflet CDN global
    L: any;
  }
}

export interface RouteCoordinate {
  lat: number;
  lon: number;
}

interface RouteMapProps {
  coordinates: RouteCoordinate[];
  className?: string;
}

/**
 * Interactive route map using Leaflet + OpenStreetMap tiles.
 * Renders the GPX track as a polyline with start (green) and end (red) markers.
 * Requires Leaflet to be loaded via CDN (index.html script tag).
 */
export function RouteMap({ coordinates, className = "" }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: Leaflet map instance
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || coordinates.length < 2) return;

    // Wait for Leaflet to be available (CDN may still be loading)
    const init = () => {
      const L = window.L;
      if (!L) return;

      // Destroy existing map instance if any
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const latLngs = coordinates.map(
        (c) => [c.lat, c.lon] as [number, number],
      );

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false, // prevent accidental zoom while scrolling page
        attributionControl: true,
      });

      mapRef.current = map;

      // OpenStreetMap tiles — neutral/clean look
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Route polyline — warm brown matching design system
      const polyline = L.polyline(latLngs, {
        color: "oklch(0.55 0.12 55)",
        weight: 3.5,
        opacity: 0.85,
        lineJoin: "round",
        lineCap: "round",
      }).addTo(map);

      // Start marker — green
      const startIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:14px;height:14px;border-radius:50%;
          background:#22c55e;border:2.5px solid #fff;
          box-shadow:0 1px 4px rgba(0,0,0,0.4);
        "></div>`,
        iconAnchor: [7, 7],
        iconSize: [14, 14],
      });

      // End marker — red
      const endIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:14px;height:14px;border-radius:50%;
          background:#ef4444;border:2.5px solid #fff;
          box-shadow:0 1px 4px rgba(0,0,0,0.4);
        "></div>`,
        iconAnchor: [7, 7],
        iconSize: [14, 14],
      });

      const start = latLngs[0];
      const end = latLngs[latLngs.length - 1];

      L.marker(start, { icon: startIcon }).addTo(map).bindTooltip("Start", {
        permanent: false,
        direction: "top",
        className: "leaflet-tooltip-warm",
      });
      L.marker(end, { icon: endIcon }).addTo(map).bindTooltip("Ziel", {
        permanent: false,
        direction: "top",
        className: "leaflet-tooltip-warm",
      });

      // Fit map to track bounds with padding
      map.fitBounds(polyline.getBounds(), { padding: [20, 20] });
    };

    if (window.L) {
      init();
    } else {
      // Poll until Leaflet CDN finishes loading
      const interval = setInterval(() => {
        if (window.L) {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates]);

  return (
    <>
      <style>{`
        .leaflet-tooltip-warm {
          background: var(--color-card, #f5f0e8);
          border: 1px solid var(--color-border, #d4c9b0);
          color: var(--color-foreground, #2c1f0e);
          border-radius: 6px;
          font-size: 12px;
          font-family: var(--font-body, sans-serif);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .leaflet-tooltip-warm::before {
          border-top-color: var(--color-border, #d4c9b0);
        }
        .leaflet-container {
          border-radius: inherit;
          font-family: var(--font-body, sans-serif);
        }
      `}</style>
      <div
        ref={containerRef}
        className={`w-full h-64 sm:h-80 rounded-xl overflow-hidden ${className}`}
        data-ocid="route-map"
        aria-label="Routenkarte"
      />
    </>
  );
}
