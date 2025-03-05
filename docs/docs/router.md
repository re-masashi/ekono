# `router.jsx` Documentation

This module defines the routing configuration for the React application using `@tanstack/react-router`. It sets up the route hierarchy and associates React components with specific URL paths. The module interacts with other modules such as `App.jsx`, `Editor.jsx`, and `Dashboard.jsx` by importing components defined in them and using them as the components to render for specific routes.

## Module Contents

### Imports

The module imports necessary components and functions from `@tanstack/react-router` and other local modules:

*   `createRouter`, `createRootRoute`, `createRoute`: Functions from `@tanstack/react-router` for creating the router and routes.
*   `Outlet`:  A component from `@tanstack/react-router` used for rendering child routes within a layout component.
*   `App`: The main application component from `./App.jsx`.
*   `Editor`: The editor component from `./editor.jsx`.
*   `DashboardLayout`, `DashboardPage`, `WorkflowListPage`, `WorkflowDetailPage`, `WorkflowEditorPage`: Components from `./Dashboard.jsx` for the dashboard section.

### RootComponent

```python
const RootComponent = () => {
  return <Outlet />;
};
```

This is a functional component that serves as a layout wrapper.  It renders the `Outlet` component, which is a placeholder for child routes to be rendered within this layout. This allows for a consistent layout across multiple pages.

### Route Definitions

The module defines the following routes:

*   **Root Route (`rootRoute`)**: The base route for the application.
*   **Index Route (`indexRoute`)**:  The route for the root path ("/"). It renders the `App` component.
*   **About Route (`aboutRoute`)**:  The route for the "/about" path. It renders a simple "abt" div.
*   **Editor Route (`editorRoute`)**: The route for the "/editor/:workflowid" path. It renders the `Editor` component, passing `workflowid` as a parameter.
*   **Dashboard Route (`dashboardRoute`)**:  The route for the "/dashboard" path.  It renders the `DashboardLayout` component.
*   **Dashboard Index Route (`dashboardIndexRoute`)**: The index route under "/dashboard" (i.e., "/dashboard/"). Renders the `DashboardPage` component.
*   **Workflows Route (`workflowsRoute`)**: A parent route under "/dashboard" at path "/workflows"
*   **Workflow List Route (`workflowListRoute`)**: The route for "/dashboard/workflows/". It renders the `WorkflowListPage` component.
*   **Workflow Detail Route (`workflowDetailRoute`)**: The route for "/dashboard/workflows/:workflowId".  It renders the `WorkflowDetailPage` component, passing `workflowId` as a parameter.
*   **Workflow Editor Route (`workflowEditorRoute`)**: The route for "/dashboard/workflows/create". It renders the `WorkflowEditorPage` component.
*   **Workflow Edit Route (`workflowEditRoute`)**: The route for "/dashboard/workflows/edit/:workflowId". It renders the `WorkflowEditorPage` component, passing `workflowId` as a parameter.

#### Route Creation
Each route is created using the `createRoute` function from `@tanstack/react-router`.  The `getParentRoute` option specifies the parent route in the hierarchy, and the `path` option defines the URL path for the route. The `component` option associates a React component with the route.

```python
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});
```

### Route Tree

The `routeTree` constant defines the overall route hierarchy by adding routes as children of the root route. This structure is used by the router to match URLs to components.

```python
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
```

### Router Instance

The `router` constant is created using the `createRouter` function, passing in the `routeTree` to configure the router with the defined route structure.  This router instance is then exported for use in the main application.

```python
export const router = createRouter({ routeTree });
```

## Interaction with Other Modules

*   **`App.jsx`**: The `indexRoute` renders the `App` component, which is the main application component responsible for the home page, layout, and core functionality.  The `App.jsx` file defines the visual structure and interactive elements of the home page.
*   **`Editor.jsx`**: The `editorRoute` renders the `Editor` component, which is likely a workflow editor. The `$workflowid` parameter in the path is used to identify the specific workflow being edited.
*   **`Dashboard.jsx`**: The `dashboardRoute` and its child routes render components defined in the `Dashboard.jsx` file. This includes the `DashboardLayout`, `DashboardPage`, `WorkflowListPage`, `WorkflowDetailPage`, and `WorkflowEditorPage` components, which represent the different sections and functionalities within the dashboard.

## Example Usage

In `main.jsx`, the `router` is used within the `RouterProvider` to enable routing within the React application.  The `App` component from `./App.jsx` renders the main application structure, including navigation and content areas that change based on the current route.

```python
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

The `RouterProvider` component uses the configured `router` instance to manage the application's routes, rendering the appropriate components based on the current URL.  The `App` component serves as the entry point, with its content dynamically updated by the router.  The end user would navigate to different URLs (/, /about, /dashboard, etc.) and the router will update the view accordingly.
