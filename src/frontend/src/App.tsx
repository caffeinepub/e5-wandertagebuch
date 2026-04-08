import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { Skeleton } from "./components/ui/skeleton";

const HomePage = lazy(() => import("./pages/Home"));
const StagePage = lazy(() => import("./pages/Stage"));

function PageFallback() {
  return (
    <div className="space-y-4 py-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-48 w-full" />
      <div className="grid grid-cols-2 gap-3">
        {(["a", "b", "c", "d"] as const).map((k) => (
          <Skeleton key={k} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const stageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/etappe/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <StagePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute, stageRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
