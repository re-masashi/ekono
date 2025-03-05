import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router"; // IMPORT Outlet, but no Link here

import App from "./App";
import Editor from "./editor";
// Import components from Dashboard.jsx (Corrected names!)
import DashboardLayout, {
  DashboardPage,
  WorkflowListPage,
  WorkflowDetailPage,
  WorkflowEditorPage,
} from "./Dashboard"; // Correct import with DashboardLayout and page components

// Root component (layout wrapper)
const RootComponent = () => {
  return <Outlet />;
};

// Create root route
const rootRoute = createRootRoute({
  component: RootComponent,
});

// Create individual routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: <div>abt</div>,
});

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor/$workflowid",
  component: Editor,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayout, // Use DashboardLayout here as the component
});

const dashboardIndexRoute = createRoute({
  // Index route *under* /dashboard
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: DashboardPage,
});

const workflowsRoute = createRoute({
  // workflows route *under* /dashboard
  getParentRoute: () => dashboardRoute,
  path: "/workflows",
});

const workflowListRoute = createRoute({
  // Workflow list under /dashboard/workflows
  getParentRoute: () => workflowsRoute,
  path: "/",
  component: WorkflowListPage,
});

const workflowDetailRoute = createRoute({
  // Workflow detail under /dashboard/workflows/$workflowId
  getParentRoute: () => workflowsRoute,
  path: "/$workflowId",
  component: WorkflowDetailPage,
});

const workflowEditorRoute = createRoute({
  // Workflow create under /dashboard/workflows/create
  getParentRoute: () => workflowsRoute,
  path: "/create",
  component: WorkflowEditorPage,
});
const workflowEditRoute = createRoute({
  // Workflow edit under /dashboard/workflows/edit/$workflowId
  getParentRoute: () => workflowsRoute,
  path: "/edit/$workflowId",
  component: WorkflowEditorPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  editorRoute,
  dashboardRoute.addChildren([
    // Add Dashboard routes as children of dashboardRoute
    dashboardIndexRoute, // Index page for /dashboard
    workflowsRoute.addChildren([
      // Workflows routes under /dashboard/workflows
      workflowListRoute,
      workflowDetailRoute,
      workflowEditorRoute,
      workflowEditRoute,
    ]),
  ]),
]);

// Create the router
export const router = createRouter({ routeTree });
