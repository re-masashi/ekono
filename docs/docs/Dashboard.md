# Documentation for `Dashboard.jsx`

This file defines React components for a dashboard interface, including a layout, sidebar, workflow cards, and pages for managing workflows. It uses React Router for navigation, Framer Motion for animations, and Tailwind CSS for styling. The dashboard has a dark theme with purple accents and a zinc base. It depends on the `App.css` file for global styles. It interacts with `router.jsx` to define the routes for dashboard pages. Mock data is used for workflows.

## Module Overview

The `Dashboard.jsx` file is a React component that builds out the main layout and functionalities of a dashboard application. It includes components such as the `DashboardLayout` which provides the basic structure, `Sidebar` for navigation, `WorkflowCard` to display individual workflows, and various pages for the core dashboard functionalities like viewing a list of workflows, workflow details, and an editor for creating/editing workflows. The file uses Tailwind CSS for styling and Framer Motion for animations to enhance the user experience. The dashboard interface is built with a dark theme featuring purple accents.

## Dependencies

This file relies on the following external libraries:

*   `react` and `useState`, `useEffect`: Core React functionalities for creating components and managing state.
*   `@tanstack/react-router`: For routing and navigation within the dashboard.
*   `framer-motion`: For animations and transitions.
*   `./App.css`: For global CSS styling.
*   `./router.jsx` - interacts to define the routes to the dashboard page.

## Components

### 1. `WorkflowCard`

Displays a single workflow with its name, description, status, and actions.

```javascript
const WorkflowCard = ({ workflow }) => { ... };
```

#### Parameters

*   `workflow`: An object containing the workflow's data, including:
    *   `id`: A unique identifier for the workflow.
    *   `name`: The name of the workflow.
    *   `description`: A brief description of the workflow.
    *   `status`: The current status of the workflow.

#### Functionality

*   Displays workflow information within a visually appealing card.
*   Provides links to edit or view the workflow.
*   Includes a button to delete the workflow.

#### Example Usage

```javascript
<WorkflowCard workflow={mockWorkflows[0]} />
```

#### Interactions

*   Navigates to different routes using `<Link>` components from `@tanstack/react-router` for editing and viewing workflows.

### 2. `Sidebar`

The sidebar navigation component.

```javascript
const Sidebar = () => { ... };
```

#### Functionality

*   Provides navigation links to the dashboard and workflows pages.
*   Styling is done using Tailwind CSS, offering a dark mode aesthetic with purple accents.

#### Example Usage

```javascript
<Sidebar />
```

#### Interactions

*   Utilizes `<Link>` components from `@tanstack/react-router` to handle navigation between different dashboard sections.

### 3. `DashboardLayout`

The main layout component for the dashboard, including the header and sidebar.

```javascript
const DashboardLayout = () => { ... };
```

#### Functionality

*   Sets up the basic structure of the dashboard with a sidebar and main content area.
*   Includes a header with a title and a button to create new workflows.
*   Uses `<Outlet>` from `@tanstack/react-router` to render the content of the currently active route.

#### Example Usage

This component serves as a layout wrapper for the dashboard pages.

```javascript
<DashboardLayout>
  <DashboardPage />
</DashboardLayout>
```

#### Interactions

*   Uses `<Link>` components from `@tanstack/react-router` for navigation.
*   Renders different pages based on the current route using `<Outlet>`.

### 4. `DashboardPage`

The main dashboard page, displaying key metrics and recent workflow executions.

```javascript
const DashboardPage = () => { ... };
```

#### Functionality

*   Displays key metrics such as total workflows, active workflows, and recently completed workflows.
*   Shows a table of recent workflow executions with their names, statuses, and start times.

#### Example Usage

```javascript
<DashboardPage />
```

### 5. `WorkflowListPage`

Displays a list of workflow cards.

```javascript
const WorkflowListPage = () => { ... };
```

#### Functionality

*   Maps over the `mockWorkflows` array and renders a `WorkflowCard` component for each workflow.

#### Example Usage

```javascript
<WorkflowListPage />
```

#### Interactions

*   Utilizes the `WorkflowCard` component to display individual workflows.

### 6. `WorkflowDetailPage`

Displays the details of a specific workflow.

```javascript
const WorkflowDetailPage = () => { ... };
```

#### Functionality

*   Fetches workflow details based on the `workflowId` parameter from the URL.
*   Shows the workflow's name, description, status, and execution history.

#### Example Usage

```javascript
<WorkflowDetailPage />
```

#### Interactions

*   Uses the `useParams` hook from `@tanstack/react-router` to extract the `workflowId` from the route.

### 7. `WorkflowEditorPage`

A form for creating or editing workflows.

```javascript
const WorkflowEditorPage = () => { ... };
```

#### Functionality

*   Provides a form with fields for the workflow's name and description.
*   Includes a submit button that logs the form data to the console and displays an alert.

#### Example Usage

```javascript
<WorkflowEditorPage />
```

#### Interactions

*   Handles form submission and displays an alert with the form data.

## Mock Data

The `mockWorkflows` array provides sample data for workflows.

```javascript
const mockWorkflows = [ ... ];
```

#### Data Structure

Each workflow object has the following properties:

*   `id`: A unique identifier.
*   `name`: The name of the workflow.
*   `description`: A description of the workflow.
*   `status`: The current status.

## Global Styles

The file imports `App.css`, which likely contains global styles used throughout the application. The components in `Dashboard.jsx` use Tailwind CSS utility classes for styling, adhering to a dark theme with purple accents and a zinc base.

## Example Usage

To render the dashboard, you would typically include the `DashboardLayout` component in your main application, with React Router configured to render the appropriate child components based on the current URL.

```javascript
// In App.jsx or similar root component:
import DashboardLayout from './Dashboard';
import { Router, Route, Switch } from 'react-router-dom'; // Example, adjust as needed

function App() {
  return (
    //<Router>
    //  <Switch>
    //    <Route path="/dashboard">
    //      <DashboardLayout />
    //    </Route>
        // Other routes
    //  </Switch>
    //</Router>
  );
}

export default App;
```

## Summary

The `Dashboard.jsx` file defines the structure, layout, and core functionalities of a dashboard application. It uses React, React Router, Framer Motion, and Tailwind CSS to create a visually appealing and interactive user interface for managing workflows.
