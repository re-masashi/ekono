import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

import App from "./App";
import Editor from "./editor";
import signin from "./signin";
import signup from "./signup";
import { LogoutRoute } from './logout';
// import DashboardLayout, {
//   // DashboardPage,
//   // WorkflowListPage,
//   // WorkflowDetailPage,
//   // WorkflowEditorPage,
// } from "./Dashboard";
import { Dashboard, DashboardHome, Workflows, Models, Usage, Credits } from "./Dashboard";

import NotFoundPage from './404';

// Authentication check function
const isAuthenticated = () => !!localStorage.getItem('jwt_token');

// Root component
const RootComponent = () => <Outlet />;

const rootRoute = createRootRoute({
  component: RootComponent,
});

// Public routes
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

// Authentication routes with redirects for logged-in users
const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: signin,
  beforeLoad: ({ search }) => {
    if (isAuthenticated()) {
      throw redirect({
        to: search.redirect || '/',
      });
    }
  },
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: signup,
  beforeLoad: ({ search }) => {
    if (isAuthenticated()) {
      throw redirect({
        to: search.redirect || '/',
      });
    }
  },
});

const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logout",
  component: LogoutRoute,
  beforeLoad: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});


// Protected routes
const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor/$workflowid",
  component: Editor,
  beforeLoad: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
  beforeLoad: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

const dashboardHomeRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: DashboardHome,
});

const workflowsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/workflows",
  component: Workflows,
});

const modelsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/models",
  component: Models,
});

const usageRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/usage",
  component: Usage,
});

const creditsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/credits",
  component: Credits,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  signinRoute,
  signupRoute,
  logoutRoute,
  editorRoute,
  // dashboardRoute.addChildren([
  //   dashboardIndexRoute,
  //   // workflowsRoute.addChildren([
  //   //   workflowListRoute,
  //   //   workflowDetailRoute,
  //   //   workflowEditorRoute,
  //   //   workflowEditRoute,
  //   // ]),
  // ]),
  dashboardRoute.addChildren([
    dashboardHomeRoute,
    workflowsRoute,
    modelsRoute,
    usageRoute,
    creditsRoute,
  ]),
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
