import { c as createLucideIcon, j as jsxRuntimeExports, S as Slot, a as cn, b as cva, r as reactExports, d as createSlot, e as useQueryClient, f as useParams, u as useNavigate, g as useAuth, h as Skeleton, M as Mountain, B as Button, L as LogIn, i as ue } from "./index-xv5N8Qko.js";
import { R as ResponsiveContainer, A as AreaChart, d as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, f as Area, g as ReferenceDot, u as useActor, a as useQuery, h as useMutation, c as createActor, i as useGpx, j as useUploadGpx, p as parseGpx, C as Car, E as ExternalBlob } from "./parseGpx-CrIWL889.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function CustomTooltip({ active, payload, label }) {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const pointLabel = (_b = (_a = payload[0]) == null ? void 0 : _a.payload) == null ? void 0 : _b.label;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded px-3 py-2 shadow-warm text-sm max-w-[160px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body text-xs", children: [
      label,
      " km"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground", children: [
      payload[0].value,
      " m"
    ] }),
    pointLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-body mt-0.5 leading-tight", children: pointLabel })
  ] });
}
function findClosestDistance(elevationPoints, targetElevation) {
  let closest = elevationPoints[0];
  let minDiff = Math.abs(elevationPoints[0].elevation - targetElevation);
  for (const pt of elevationPoints) {
    const diff = Math.abs(pt.elevation - targetElevation);
    if (diff < minDiff) {
      minDiff = diff;
      closest = pt;
    }
  }
  return closest.distance;
}
function ElevationChart({
  elevationPoints,
  height = 200,
  photoMarkers = []
}) {
  if (!elevationPoints.length) return null;
  const minElev = Math.min(...elevationPoints.map((p) => p.elevation));
  const maxElev = Math.max(...elevationPoints.map((p) => p.elevation));
  const padding = Math.max(100, (maxElev - minElev) * 0.15);
  const domainMin = Math.floor((minElev - padding) / 100) * 100;
  const domainMax = Math.ceil((maxElev + padding * 0.3) / 100) * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AreaChart,
    {
      data: elevationPoints,
      margin: { top: 10, right: 16, left: 0, bottom: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "elevGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "5%",
              stopColor: "oklch(0.38 0.08 40)",
              stopOpacity: 0.45
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "95%",
              stopColor: "oklch(0.38 0.08 40)",
              stopOpacity: 0.03
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "oklch(0.88 0.02 75)",
            vertical: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "distance",
            tickFormatter: (v) => `${v} km`,
            tick: {
              fontSize: 11,
              fill: "oklch(0.5 0.02 50)",
              fontFamily: "var(--font-body)"
            },
            axisLine: { stroke: "oklch(0.88 0.02 75)" },
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            domain: [domainMin, domainMax],
            tickFormatter: (v) => `${v}m`,
            tick: {
              fontSize: 11,
              fill: "oklch(0.5 0.02 50)",
              fontFamily: "var(--font-body)"
            },
            axisLine: false,
            tickLine: false,
            width: 52
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Area,
          {
            type: "monotone",
            dataKey: "elevation",
            stroke: "oklch(0.38 0.08 40)",
            strokeWidth: 2.5,
            fill: "url(#elevGradient)",
            dot: false,
            activeDot: { r: 5, fill: "oklch(0.38 0.08 40)", strokeWidth: 0 }
          }
        ),
        photoMarkers.map((marker) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReferenceDot,
          {
            x: findClosestDistance(elevationPoints, marker.elevation),
            y: marker.elevation,
            r: 6,
            fill: "oklch(0.52 0.1 70)",
            stroke: "white",
            strokeWidth: 2,
            label: {
              value: "📷",
              position: "top",
              fontSize: 12,
              offset: 4
            }
          },
          marker.id
        ))
      ]
    }
  ) });
}
function InfoCard({
  label,
  value,
  icon,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "flex flex-col gap-1 p-3 rounded-lg border transition-smooth",
        highlight ? "bg-primary/8 border-primary/25" : "bg-card border-border"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 flex-shrink-0", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-body font-medium uppercase tracking-wide", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground text-sm leading-snug", children: value })
      ]
    }
  );
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function usePhotos(stageId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["photos", stageId == null ? void 0 : stageId.toString()],
    queryFn: async () => {
      if (!actor || stageId === null) return [];
      return actor.getPhotos(stageId);
    },
    enabled: !!actor && !isFetching && stageId !== null,
    staleTime: 30 * 1e3
  });
}
function useAddPhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPhoto(input);
    },
    onSuccess: (photo) => {
      queryClient.invalidateQueries({
        queryKey: ["photos", photo.stageId.toString()]
      });
    }
  });
}
function useDeletePhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      photoId,
      stageId
    }) => {
      if (!actor) throw new Error("Actor not available");
      const ok = await actor.deletePhoto(photoId);
      return { ok, stageId };
    },
    onSuccess: ({ stageId }) => {
      queryClient.invalidateQueries({
        queryKey: ["photos", stageId.toString()]
      });
    }
  });
}
function useStage(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stage", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getStage(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 5 * 60 * 1e3
  });
}
const STAGE_WAYPOINTS = {
  1: [
    { distance: 0, elevation: 813, label: "Oberstdorf" },
    { distance: 2, elevation: 900 },
    { distance: 4, elevation: 1050 },
    { distance: 6, elevation: 1200 },
    { distance: 8, elevation: 1400 },
    { distance: 10, elevation: 1600 },
    { distance: 11.5, elevation: 1750 },
    { distance: 13, elevation: 1844, label: "Kemptner Hütte" }
  ],
  2: [
    { distance: 0, elevation: 1844, label: "Kemptner Hütte" },
    { distance: 2, elevation: 1950, label: "Mädelejoch" },
    { distance: 4, elevation: 1750 },
    { distance: 7, elevation: 1400 },
    { distance: 9, elevation: 1250, label: "Simms-Wasserfall" },
    { distance: 11, elevation: 1150 },
    { distance: 13, elevation: 1100, label: "Holzgau" }
  ],
  3: [
    { distance: 0, elevation: 1100, label: "Holzgau" },
    { distance: 1, elevation: 1200 },
    { distance: 3, elevation: 1600 },
    { distance: 5, elevation: 1900 },
    { distance: 7, elevation: 2100 },
    { distance: 9, elevation: 2280 },
    { distance: 10, elevation: 2380, label: "Ansbacher Hütte" }
  ],
  4: [
    { distance: 0, elevation: 2380, label: "Ansbacher Hütte" },
    { distance: 2, elevation: 2500 },
    { distance: 4, elevation: 2599, label: "Seescharte" },
    { distance: 6, elevation: 2300 },
    { distance: 9, elevation: 1950 },
    { distance: 12, elevation: 1850 },
    { distance: 14, elevation: 1780, label: "Venet Gipfelhütte" }
  ],
  5: [
    { distance: 0, elevation: 1780, label: "Venet / Zams" },
    { distance: 3, elevation: 1950 },
    { distance: 6, elevation: 2208, label: "Venetberg" },
    { distance: 9, elevation: 1850 },
    { distance: 12, elevation: 1400 },
    { distance: 15, elevation: 1050 },
    { distance: 17, elevation: 870, label: "Wenns" }
  ],
  6: [
    { distance: 0, elevation: 870, label: "Wenns" },
    { distance: 2, elevation: 1100 },
    { distance: 5, elevation: 1600 },
    { distance: 8, elevation: 2050 },
    { distance: 11, elevation: 2400 },
    { distance: 13, elevation: 2650 },
    { distance: 15, elevation: 2759, label: "Braunschweiger Hütte" }
  ],
  7: [
    { distance: 0, elevation: 2759, label: "Braunschweiger Hütte" },
    { distance: 2, elevation: 2900 },
    { distance: 3.5, elevation: 3e3, label: "Pitztaler Jöchl" },
    { distance: 5, elevation: 2700 },
    { distance: 8, elevation: 2250 },
    { distance: 10, elevation: 2050 },
    { distance: 12, elevation: 1900, label: "Vent" }
  ],
  8: [
    { distance: 0, elevation: 1900, label: "Vent" },
    { distance: 2, elevation: 2050, label: "Rofenhöfe" },
    { distance: 4, elevation: 2150 },
    { distance: 7, elevation: 2280 },
    { distance: 8.5, elevation: 2380 },
    { distance: 10, elevation: 2413, label: "Hochjoch Hospiz" }
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
    { distance: 8, elevation: 2413, label: "Hochjoch Hospiz" }
  ],
  10: [
    { distance: 0, elevation: 2413, label: "Hochjoch Hospiz" },
    { distance: 2, elevation: 2300 },
    { distance: 4, elevation: 2100 },
    { distance: 5.5, elevation: 1900 },
    { distance: 7, elevation: 1780 },
    { distance: 8, elevation: 1700, label: "Vernagthütte" }
  ],
  11: [
    { distance: 0, elevation: 1700, label: "Vernagthütte" },
    { distance: 2, elevation: 1950 },
    { distance: 4, elevation: 2400 },
    { distance: 5.5, elevation: 3019, label: "Similaun-Hütte" },
    { distance: 7, elevation: 2600 },
    { distance: 9, elevation: 2100 },
    { distance: 11, elevation: 1700 },
    { distance: 12, elevation: 1500, label: "Schnals" }
  ],
  12: [
    { distance: 0, elevation: 1500, label: "Schnals" },
    { distance: 3, elevation: 1650 },
    { distance: 6, elevation: 1700, label: "Meraner Höhenweg" },
    { distance: 9, elevation: 1400 },
    { distance: 13, elevation: 900 },
    { distance: 17, elevation: 600 },
    { distance: 20, elevation: 325, label: "Meran 🎉" }
  ]
};
function generateFallbackProfile(stageNumber, startElev, endElev, distKm, gainM) {
  const waypoints = STAGE_WAYPOINTS[stageNumber];
  if (waypoints) {
    return waypoints.map((wp) => ({
      distance: wp.distance,
      elevation: wp.elevation,
      label: wp.label
    }));
  }
  const points = [];
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
function Stage() {
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
  const [description, setDescription] = reactExports.useState("");
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [photoElevation, setPhotoElevation] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const fileRef = reactExports.useRef(null);
  const [gpxFile, setGpxFile] = reactExports.useState(null);
  const [gpxUploading, setGpxUploading] = reactExports.useState(false);
  const [gpxProgress, setGpxProgress] = reactExports.useState(0);
  const [gpxUploadMsg, setGpxUploadMsg] = reactExports.useState(null);
  const gpxFileRef = reactExports.useRef(null);
  const gpxProgressRef = reactExports.useRef(0);
  const [gpxElevPoints, setGpxElevPoints] = reactExports.useState(
    null
  );
  reactExports.useEffect(() => {
    if (!gpxData) {
      setGpxElevPoints(null);
      return;
    }
    let cancelled = false;
    const url = gpxData.blob.getDirectURL();
    fetch(url).then((res) => res.text()).then((xml) => {
      if (cancelled) return;
      try {
        setGpxElevPoints(parseGpx(xml));
      } catch {
        setGpxElevPoints(null);
      }
    }).catch(() => {
      if (!cancelled) setGpxElevPoints(null);
    });
    return () => {
      cancelled = true;
    };
  }, [gpxData]);
  if (stageLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-72" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, k)) })
    ] });
  }
  if (!stage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "stage-not-found", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground mb-4", children: "Etappe nicht gefunden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => navigate({ to: "/" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        " Zurück zur Übersicht"
      ] })
    ] });
  }
  const stageNum = Number(stage.number);
  const fallbackPoints = generateFallbackProfile(
    stageNum,
    Number(stage.startElevation),
    Number(stage.endElevation),
    Number(stage.distanceKm),
    Number(stage.elevationGainM)
  );
  const elevPoints = gpxElevPoints ?? fallbackPoints;
  const hasGpx = gpxElevPoints !== null;
  const startElevNum = Number(stage.startElevation);
  const endElevNum = Number(stage.endElevation);
  const maxElevOnRoute = Math.max(...elevPoints.map((p) => p.elevation));
  const sliderMin = Math.min(startElevNum, endElevNum);
  const sliderMax = maxElevOnRoute;
  const photoMarkers = (photos ?? []).filter((p) => p.elevation !== void 0 && p.elevation !== null).map((p) => ({
    elevation: Number(p.elevation),
    id: p.id.toString()
  }));
  const isMyPhoto = (uploadedBy) => {
    if (!identity) return false;
    return uploadedBy.toString() === identity.getPrincipal().toString();
  };
  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setUploadProgress(pct)
      );
      await addPhoto.mutateAsync({
        input: {
          stageId,
          blob,
          description,
          elevation: photoElevation !== "" ? BigInt(photoElevation) : void 0
        }
      });
      setDescription("");
      setSelectedFile(null);
      setPhotoElevation("");
      if (fileRef.current) fileRef.current.value = "";
      ue.success("Foto hochgeladen!");
    } catch {
      ue.error("Fehler beim Hochladen. Bitte erneut versuchen.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  const handleDelete = async (photoId) => {
    try {
      await deletePhoto.mutateAsync({ photoId, stageId });
      ue.success("Foto gelöscht.");
    } catch {
      ue.error("Fehler beim Löschen.");
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
        onProgress: (pct) => {
          if (pct - gpxProgressRef.current >= 5 || pct >= 100) {
            gpxProgressRef.current = pct;
            setGpxProgress(pct);
          }
        }
      });
      setGpxFile(null);
      if (gpxFileRef.current) gpxFileRef.current.value = "";
      setGpxUploadMsg({
        type: "success",
        text: "GPX erfolgreich hochgeladen"
      });
    } catch (err) {
      setGpxUploadMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Fehler beim Hochladen der GPX-Datei"
      });
    } finally {
      setGpxUploading(false);
      setGpxProgress(0);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/" }),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
        "data-ocid": "stage-back",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          " Alle Etappen"
        ]
      }
    ),
    stage.isGipfeltag && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative overflow-hidden rounded-xl border-2 border-primary/40 bg-primary/20 px-5 py-4 shadow-warm",
        "data-ocid": "gipfeltag-banner",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg tracking-wide text-foreground", children: "🏔 Gipfeltag" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs font-semibold border bg-primary text-primary-foreground border-primary/60", children: "Kein Ortswechsel" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: "Tagesausflug auf die Mittlere Guslarspitze (3.128 m) — Gletscherfreier Dreitausender mit Kindern (8 & 12 Jahre)" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-primary/15 text-primary font-display font-bold text-sm px-2.5 py-1 rounded-full border border-primary/25", children: [
        "E",
        stageNum
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mt-2 leading-tight", children: [
        stage.startLocation,
        " → ",
        stage.endLocation
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1 leading-relaxed", children: stage.highlight })
    ] }) }),
    stage.taxiInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl border-2 border-primary/40 bg-primary/20 p-4 shadow-warm",
        "data-ocid": "taxi-notice",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base mb-1 text-foreground", children: "🚕 Taxi-Transfer erforderlich" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold font-body text-foreground", children: [
              stage.taxiInfo.company,
              " · Tel. ",
              stage.taxiInfo.phone
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body mt-0.5 text-muted-foreground", children: [
              "Abfahrt ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                stage.taxiInfo.departureTime,
                " Uhr"
              ] }),
              " ab",
              " ",
              stage.taxiInfo.departureLocation,
              " · ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: stage.taxiInfo.pricePerPerson }),
              " pro Person"
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-4 shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1 gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground", children: [
          "Höhenprofil",
          stage.isGipfeltag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-body font-normal text-primary/70", children: "Hin- und Rückweg" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          gpxLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body animate-pulse", children: "GPX wird geladen…" }),
          !gpxLoading && hasGpx && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] px-2 py-0.5 border-primary/30 text-primary",
              children: "GPX-Daten"
            }
          ),
          !gpxLoading && !hasGpx && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60 font-body", children: "Schätzung" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ElevationChart,
        {
          elevationPoints: elevPoints,
          height: 200,
          photoMarkers
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Datum",
          value: stage.isGipfeltag ? stage.dateFrom : `${stage.dateFrom} → ${stage.dateTo}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Start",
          value: `${stage.startLocation} (${Number(stage.startElevation)} m)`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Ziel",
          value: stage.isGipfeltag ? `Mittlere Guslarspitze (${Number(stage.endElevation)} m)` : `${stage.endLocation} (${Number(stage.endElevation)} m)`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Distanz",
          value: `${Number(stage.distanceKm)} km`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Aufstieg",
          value: `+${Number(stage.elevationGainM)} m`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Abstieg",
          value: `−${Number(stage.elevationLossM)} m`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Gehzeit",
          value: `~${Number(stage.estimatedTimeH)} Std.`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoCard,
        {
          label: "Unterkunft",
          value: stage.accommodation,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" }),
          highlight: true
        }
      )
    ] }),
    isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded-xl p-4 shadow-warm space-y-3",
        "data-ocid": "gpx-upload",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-4 h-4 text-primary" }),
            "GPX-Datei für diese Etappe"
          ] }),
          hasGpx && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-body", children: "✓ GPX-Höhenprofil ist aktiv — neue Datei hochladen zum Ersetzen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "gpx-file",
                className: "text-xs text-muted-foreground mb-1.5 block font-medium",
                children: "GPX-Datei auswählen (.gpx)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gpx-file",
                ref: gpxFileRef,
                type: "file",
                accept: ".gpx,application/gpx+xml",
                onChange: (e) => {
                  var _a;
                  setGpxFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  setGpxUploadMsg(null);
                },
                className: "cursor-pointer",
                "data-ocid": "gpx-file-input"
              }
            )
          ] }),
          gpxUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GPX wird hochgeladen…" }),
              gpxProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                gpxProgress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full transition-all duration-300",
                style: {
                  width: gpxProgress > 0 ? `${gpxProgress}%` : "100%"
                }
              }
            ) })
          ] }),
          gpxUploadMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-xs font-body ${gpxUploadMsg.type === "success" ? "text-primary" : "text-destructive"}`,
              children: [
                gpxUploadMsg.type === "success" ? "✓ " : "✗ ",
                gpxUploadMsg.text
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => void handleGpxUpload(),
              disabled: !gpxFile || gpxUploading,
              variant: "outline",
              size: "sm",
              className: "border-primary/30 text-primary hover:bg-primary/10",
              "data-ocid": "gpx-upload-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 mr-1.5" }),
                gpxUploading ? "Wird hochgeladen…" : "Hochladen"
              ]
            }
          )
        ]
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: "Fotos & Notizen" }),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => void handleLogin(),
            className: "flex items-center gap-1.5 text-xs",
            "data-ocid": "stage-login-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-3.5 h-3.5" }),
              "Anmelden zum Hochladen"
            ]
          }
        )
      ] }),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 space-y-4 shadow-warm",
          "data-ocid": "photo-upload",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary" }),
              "Foto hinzufügen"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "photo-file",
                  className: "text-xs text-muted-foreground mb-1.5 block font-medium",
                  children: "Foto auswählen (JPG, PNG, HEIC)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "photo-file",
                  ref: fileRef,
                  type: "file",
                  accept: "image/*",
                  capture: "environment",
                  onChange: (e) => {
                    var _a;
                    return setSelectedFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: "cursor-pointer",
                  "data-ocid": "photo-file-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "photo-desc",
                  className: "text-xs text-muted-foreground mb-1.5 block font-medium",
                  children: "Beschreibung (optional)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "photo-desc",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Was war besonders an diesem Moment?",
                  rows: 2,
                  "data-ocid": "photo-description"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "photo-elevation",
                  className: "text-xs text-muted-foreground mb-1.5 block font-medium",
                  children: [
                    "Höhe des Fotos (optional, ",
                    sliderMin,
                    "–",
                    sliderMax,
                    " m)"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "photo-elevation-slider",
                    type: "range",
                    min: sliderMin,
                    max: sliderMax,
                    step: 10,
                    value: photoElevation === "" ? sliderMin : photoElevation,
                    onChange: (e) => setPhotoElevation(Number(e.target.value)),
                    className: "flex-1 accent-primary",
                    "data-ocid": "photo-elevation-slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "photo-elevation",
                    type: "number",
                    min: sliderMin,
                    max: sliderMax,
                    value: photoElevation,
                    placeholder: "m",
                    onChange: (e) => setPhotoElevation(
                      e.target.value === "" ? "" : Number(e.target.value)
                    ),
                    className: "w-24 text-sm",
                    "data-ocid": "photo-elevation-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body", children: "m" })
              ] })
            ] }),
            uploading && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hochladen…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  uploadProgress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary rounded-full transition-all duration-300",
                  style: { width: `${uploadProgress}%` }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => void handleUpload(),
                disabled: !selectedFile || uploading,
                className: "w-full sm:w-auto",
                "data-ocid": "photo-upload-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                  uploading ? "Wird hochgeladen…" : "Foto hochladen"
                ]
              }
            )
          ]
        }
      ),
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 bg-muted/40 border border-border rounded-xl p-4",
          "data-ocid": "upload-login-prompt",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body flex-1", children: "Melde dich mit Internet Identity an, um Fotos und Notizen hinzuzufügen." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => void handleLogin(),
                "data-ocid": "upload-login-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Anmelden"
                ]
              }
            )
          ]
        }
      ),
      photosLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, k)) }) : photos && photos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-3 gap-3",
          "data-ocid": "photos-grid",
          children: photos.map((photo) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "group relative rounded-xl overflow-hidden border border-border bg-card shadow-warm transition-smooth hover:shadow-warm-elevated",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: photo.blob.getDirectURL(),
                    alt: photo.description || "Etappenfoto",
                    className: "w-full aspect-square object-cover",
                    loading: "lazy"
                  }
                ),
                (photo.description || photo.elevation !== void 0 && photo.elevation !== null) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-card border-t border-border/60", children: [
                  photo.elevation !== void 0 && photo.elevation !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-3 h-3 flex-shrink-0 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold font-body text-primary", children: [
                      Number(photo.elevation),
                      " m"
                    ] })
                  ] }),
                  photo.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body line-clamp-2", children: photo.description })
                ] }),
                isAuthenticated && isMyPhoto(photo.uploadedBy) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleDelete(photo.id),
                    className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-destructive/80 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-smooth hover:bg-destructive",
                    "aria-label": "Foto löschen",
                    "data-ocid": "photo-delete-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ]
            },
            photo.id.toString()
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 bg-muted/30 rounded-xl border border-border",
          "data-ocid": "photos-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-muted-foreground", children: "Noch keine Fotos für diese Etappe" }),
            isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70 mt-1", children: "Lade das erste Foto hoch!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70 mt-1", children: "Melde dich an, um Fotos hinzuzufügen." })
          ]
        }
      )
    ] })
  ] });
}
export {
  Stage as default
};
