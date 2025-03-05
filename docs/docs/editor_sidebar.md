# Documentation for `editor_sidebar.jsx`

This file defines the `Sidebar` component for the Ekono Graphical Editor. The sidebar provides a drag-and-drop interface for adding nodes to the editor canvas. It uses the `useDnD` hook (defined in `editor.jsx`) to manage the type of node being dragged. The sidebar also includes a simple timed counter with run, stop, and reset functionalities for workflow execution visualization.

## Table of Contents

1.  [Dependencies](#dependencies)
2.  [Timed Counter Function (`timedCounter`)](#timed-counter-function-timedcounter)
    *   [Inner Functions](#inner-functions)
        *   [`startCounter`](#startcounter)
        *   [`stopCounter`](#stopcounter)
        *   [`resetCounter`](#resetcounter)
    *   [Example Usage (within Sidebar component)](#example-usage-within-sidebar-component)
3.  [Sidebar Component (`Sidebar`)](#sidebar-component-sidebar)
    *   [Drag and Drop Handling](#drag-and-drop-handling)
    *   [Counter Integration](#counter-integration)
    *   [Return Value (JSX)](#return-value-jsx)
4.  [Badge Node Style (`badgeNodeStyle`)](#badge-node-style-badgenodestyle)
5.  [Interaction with Other Modules](#interaction-with-other-modules)

## Dependencies

*   `React` from "react":  The core React library for building UI components.
*   `useDnD` from "./editor": A custom hook that manages the drag and drop state, specifically the type of node being dragged.
*   `FiMenu, FiEdit` from "react-icons/fi":  Icon components from the Feather Icons library.

## Timed Counter Function (`timedCounter`)

The `timedCounter` function creates a timer that simulates the progress of a workflow.  It returns an object with methods to start, stop, and reset the counter.  It's designed to update a React state (`runningPercent`) representing the percentage of completion.

```python
function timedCounter(setRunningPercent) { ... }
```

**Parameters:**

*   `setRunningPercent`: A function to update a React state variable.  This function is expected to accept a numerical percentage (0-100) or `null`.

**Returns:**

*   An object with the following methods:
    *   `start`: Starts the counter.
    *   `stop`: Stops the counter.
    *   `reset`: Resets the counter to 0.

### Inner Functions

#### `startCounter`

Starts the timed counter.

```python
function startCounter() { ... }
```

*   Resets `currentPercentage` to 0.
*   Initializes the React state `setRunningPercent(0)` to 0%.
*   Sets an interval that increments `currentPercentage` by 30 every 1000 milliseconds (1 second).
*   Caps `currentPercentage` at 100% and stops the interval when reached.
*   After reaching 100%, it sets `setRunningPercent(null)` after a 500ms delay.

#### `stopCounter`

Stops the timed counter.

```python
function stopCounter() { ... }
```

*   Clears the interval using `clearInterval(intervalId)`.

#### `resetCounter`

Resets the timed counter.

```python
function resetCounter() { ... }
```

*   Calls `stopCounter()` to clear the interval.
*   Resets `currentPercentage` to 0.
*   Resets the React state `setRunningPercent(0)` to 0%.

### Example Usage (within Sidebar component)

```python
  const [runningPercent, setRunningPercent] = React.useState(null);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    counterRef.current = timedCounter(setRunningPercent);
  }, [setRunningPercent]);

  const run = () => {
    if (runningPercent !== null) {
      counterRef.current.reset();
      counterRef.current.stop();
      setRunningPercent(null);
      return;
    }
    if (counterRef.current) {
      counterRef.current.start();
    } else {
      console.error("Counter not initialized!");
    }
  };
```

## Sidebar Component (`Sidebar`)

The `Sidebar` component provides the user interface for dragging nodes onto the React Flow canvas.  It also includes the timed counter functionality to visualize workflow execution.

```python
const Sidebar = () => { ... }
```

**Returns:**

*   JSX representing the sidebar.

### Drag and Drop Handling

*   Uses the `useDnD` hook to get the `setType` function, which updates the type of node being dragged.
*   The `onDragStart` function is called when a node in the sidebar starts being dragged.
    *   It sets the node type using `setType(nodeType)`.
    *   It sets the `effectAllowed` property of the `dataTransfer` object to "move".

```python
  const setType = useDnD()[1];

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
```

### Counter Integration

*   Uses `React.useState` to manage the `runningPercent` state, which represents the progress of the counter (or null when stopped).
*   Uses `React.useRef` to store a reference to the `timedCounter` object. This prevents the counter from being recreated on every render.
*   Uses `React.useEffect` to initialize the `timedCounter` object when the component mounts.
*   The `run`, `stop`, and `reset` functions call the corresponding methods on the `timedCounter` object.

### Return Value (JSX)

The `Sidebar` component returns JSX that defines the structure and appearance of the sidebar. It includes:

*   A title: "Ekono Graphical Editor".
*   Instructions: "Drag nodes from here".
*   Categorized lists of draggable nodes: "Logic", "NLP", "Multimodal", "Computer Vision", "Audio", "Tabular", "Reinforcement Learning", and "Other". Each node is represented by a `div` with the class "dndnode". The `onDragStart` event handler is attached to each node, allowing users to drag these elements onto the React Flow canvas.
*   A footer containing controls for running, stopping and saving. Also displays a progress bar using `runningPercent`. The footer's height and background change based on the `runningPercent` value.

## Badge Node Style (`badgeNodeStyle`)

This constant defines the CSS style for the draggable nodes (badges) in the sidebar. It sets the background color, text color, shadow, hover background color, font size, padding, and border radius.

```python
const badgeNodeStyle = {
  backgroundColor: "var(--panel-bg-lighter)",
  color: "var(--text-primary)",
  boxShadow: "0 2px 4px var(--shadow-color)",
  hoverBackgroundColor: "var(--panel-bg)",
  fontSize: "0.8rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "9999px",
};
```

## Interaction with Other Modules

*   **`editor.jsx`**: The `Sidebar` component uses the `useDnD` hook from `editor.jsx` to manage the drag and drop state.  This allows the React Flow canvas in `editor.jsx` to know what type of node is being dragged.  The file `editor.jsx` also defines the various node components that can be dragged from the sidebar onto the canvas. When a node is dropped, `editor.jsx` instantiates the correct node based on the `type` that was set in `editor_sidebar.jsx`.
*   **`operational_node_components.jsx`**: The sidebar's draggable elements use names from `NODES_CONFIG` in this file. Also, when a node is dropped from the sidebar, `editor.jsx` reads the node definition from this file based on the `type` selected.
*   **`App.jsx`, `main.jsx`, `router.jsx`**: These files deal with application-level setup, routing, and presentation.  They do not directly interact with `editor_sidebar.jsx`.

**Example Usage (Overall Flow)**

1.  The `App.jsx` file uses `router.jsx` to setup application routes including `/editor/$workflowid`.
2.  When the user navigates to `/editor/$workflowid`, the `Editor` component from `editor.jsx` is rendered.
3.  The `Editor` component renders the `Sidebar` component from `editor_sidebar.jsx`.
4.  The user drags a node from the sidebar. The `onDragStart` function in `editor_sidebar.jsx` calls `setType` to update the drag and drop state in the `useDnD` hook.
5.  The user drops the node onto the React Flow canvas in `editor.jsx`. The `onDrop` function in `editor.jsx` reads the type from the `useDnD` hook. Based on this `type`, a new node is created of the correct type (e.g., `AIModelNodeComponent`, `FixedValueNodeComponent`, etc.), with arguments and outputs as defined in `operational_node_components.jsx`. The canvas is updated by adding this new node.
6.  The user presses the run button on the sidebar, the `run` function initializes the timer, causing the workflow progress bar to be updated.
