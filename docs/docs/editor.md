# editor.jsx Documentation

This module defines a React-based visual editor for creating and manipulating dataflow graphs. It leverages the `@xyflow/react` library for the core graph editing functionality and provides custom node and edge components tailored to a specific application domain (implied to be data processing and automation, given the node types).  The editor integrates with a sidebar (`editor_sidebar.jsx`) for node creation and utilizes custom styling for a cohesive user experience.  It also includes drag-and-drop functionality, node and edge management, and the ability to export the graph as JSON.  The editor is integrated into the application through the `router.jsx` file, accessible via the `/editor/$workflowid` route. It also makes use of the dashboard under the route `/dashboard`. The main entry point for the entire application can be found in `main.jsx` and the home page itself is found in `App.jsx`.

## Dependencies

*   **React:** Core UI library.
*   **@xyflow/react:** Library for creating interactive flow diagrams.
*   **react-icons:** Library for including icons.
*   **./operational_node_components:** Configuration for available nodes.
*   **./editor_sidebar:** Sidebar component for node palette.
*   **./reactflow.css:** Custom styles for the React Flow editor.

## Core Components and Functionality

### Global Styles

```jsx
const GlobalStyles = () => (
  <style>{`
    /* ... CSS styles ... */
  `}</style>
);
```

This component injects global CSS styles into the application.  These styles define the visual appearance of the editor, including background colors, text colors, node styles, edge styles, and handle styles. CSS variables are heavily used for theming and consistency. These styles ensure a dark theme with purple accents, intended to provide a visually appealing and consistent user experience.

### FunctionIcon Component

```jsx
const FunctionIcon = () => <FiActivity />;
```

A simple functional component that renders a `FiActivity` icon from the `react-icons` library.  This icon is likely used to represent generic function or processing nodes in the graph.

### EkonoNode Component

```jsx
const EkonoNode = memo(({ data, isSelected, id, onNodeDataChange }) => {
  // ... implementation ...
});
```

This component represents a generic node in the dataflow graph.  It displays a title, subline, and icon based on the `data` prop. It also includes input and output handles for connecting nodes with edges.  The `memo` higher-order component is used to optimize rendering by preventing unnecessary updates.  The `onNodeDataChange` callback allows updating the node's data, enabling dynamic modification of node properties.

**Props:**

*   `data`: An object containing node-specific data (title, subline, icon, etc.).
*   `isSelected`: A boolean indicating whether the node is currently selected.
*   `id`: The unique identifier of the node.
*    `onNodeDataChange`: Callback function to handle changes to node data.

**Example Usage:**

```jsx
<EkonoNode
    data={{ title: "My Node", subline: "A simple node", icon: <FiFile /> }}
    isSelected={true}
    id="node-1"
    onNodeDataChange={(nodeId, newData) => { console.log(`Node ${nodeId} updated with:`, newData) }}
/>
```

### EdgeButton Component

```jsx
const EdgeButton = ({ onClick, children }) => (
  <button className="custom-edge-button" onClick={onClick}>
    {children}
  </button>
);
```

A simple button component used within edges. The button will render some `children`, and when clicked, it calls the `onClick` prop function.  It is used to provide an interactive element within the edges of the graph, likely for disconnecting or manipulating edges.

### ButtonEdge Component (and related context)

```jsx
const EdgeDisconnectContext = createContext(null);

const ButtonEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    markerEnd,
  }) => {
    // ... implementation ...
  },
);
```

This component renders a custom edge with a button to disconnect it.  It uses `getBezierPath` from `@xyflow/react` to calculate the edge path.  It also uses `EdgeLabelRenderer` to position the disconnect button along the edge. `EdgeDisconnectContext` provides a way to pass the `onEdgeDisconnect` callback down to the `ButtonEdge` component without prop drilling.  This improves modularity and maintainability. The `ButtonEdge` component renders the Bezier path using the `BaseEdge` and adds an interactive "Disconnect" button using the `EdgeLabelRenderer`.

**Props:**

*   `id`: The unique identifier of the edge.
*   `sourceX`: The x-coordinate of the source node.
*   `sourceY`: The y-coordinate of the source node.
*   `targetX`: The x-coordinate of the target node.
*   `targetY`: The y-coordinate of the target node.
*   `sourcePosition`: The position of the source handle (e.g., `Position.Right`).
*   `targetPosition`: The position of the target handle (e.g., `Position.Left`).
*   `style`: Additional styles for the edge.
*   `markerEnd`: Marker at the end of the edge.

**Context Usage:**

1.  **Create Context:** `EdgeDisconnectContext = createContext(null)`
2.  **Consume Context:** `const onEdgeDisconnect = useContext(EdgeDisconnectContext);` inside `ButtonEdge` component.
3.  **Provide Context:**  `EdgeDisconnectContext.Provider value={handleEdgeDisconnect}` within the main ReactFlow component, passing the `handleEdgeDisconnect` function.

### EkonoEdge Component

```jsx
const EkonoEdge = ButtonEdge;
```

A simple alias for the `ButtonEdge` component.  This is likely used to provide a consistent naming convention within the application.

### DatabaseSchemaNodeComponent

```jsx
const DatabaseSchemaNodeComponent = memo(({ data, isSelected }) => {
  // ... implementation ...
});
```

This component represents a database schema node.  It displays a table containing the fields and types of the schema. Each row in the table includes handles (using the Handle component) for connecting the fields to other nodes.

**Props:**

*   `data`: An object containing the schema data (label, schema array).
*   `isSelected`: A boolean indicating whether the node is currently selected.

**Example Data:**

```json
{
  "label": "Users",
  "schema": [
    { "title": "id", "type": "integer" },
    { "title": "name", "type": "string" },
    { "title": "email", "type": "string" }
  ]
}
```

### AIModelNodeComponent

```jsx
const AIModelNodeComponent = memo(({ data, isSelected }) => {
    // ... implementation ...
});
```
This component represents an AI Model.  It displays a dropdown select to allow the user to select from available models, as well as a table of arguments for the selected model. It uses handles to show inputs and outputs.

**Props:**

*   `data`: An object containing the model data (label, models array, arguments array).
*   `isSelected`: A boolean indicating whether the node is currently selected.

**Example Data:**

```json
{
  "label": "Chat Model",
  "models": ["gpt-4", "claude-2", "llama-2"],
  "arguments": ["prompt", "temperature", "max_tokens"]
}
```

### ModelNodeBaseComponent
```jsx
const ModelNodeBaseComponent = memo(({ data, isSelected }) => {
  return (
    <>
      {/* ... implementation ... */}
    </>
  );
});
```
This is a base component for Model Nodes that displays a generic argument table.  It uses `Handle`s on the left side of the argument table to act as the inputs.  The right side of the table has a single `Handle` to act as the node's output.
### FixedValueNodeComponent

```jsx
const FixedValueNodeComponent = memo(({ data, isSelected }) => {
  // ... implementation ...
});
```

This component allows the user to define a fixed value (string, number, boolean, etc.) to output from the node.  It includes input fields for specifying the value type and the value itself.

**Props:**

*   `data`: An object containing the fixed value data (valueType, fixedValue).
*   `isSelected`: A boolean indicating whether the node is currently selected.

### InputNodeComponent

```jsx
const InputNodeComponent = memo(({ data, isSelected, id }) => {
  // ... implementation ...
});
```

This component represents an input node, allowing the user to define multiple input types.  It includes input fields for specifying the types and a button to add more inputs.

**Props:**

*   `data`: An object containing the input data (inputs array).
*   `isSelected`: A boolean indicating whether the node is currently selected.
*   `id`: The unique identifier of the node.

### OutputNodeComponent

```jsx
const OutputNodeComponent = memo(({ data, isSelected, id }) => {
  // ... implementation ...
});
```

This component represents an output node, allowing the user to define multiple output types. It includes input fields for specifying the types and a button to add more outputs.

**Props:**

*   `data`: An object containing the output data (outputs array).
*   `isSelected`: A boolean indicating whether the node is currently selected.
*   `id`: The unique identifier of the node.

### DnDContext and DnDProvider

```jsx
const DnDContext = createContext([null, () => {}]);
const DnDProvider = ({ children }) => (
  <DnDContext.Provider value={useState(null)}>{children}</DnDContext.Provider>
);
const useDnD = () => useContext(DnDContext);
```

These components provide drag-and-drop context for the application. `DnDContext` provides drag and drop context that allows the component to update its state as drag and drop events occur. The function `useDnD` enables components to easily access these context values using the `useContext` hook.

### DnDFlow Component

```jsx
const DnDFlow = () => {
  // ... implementation ...
};
```

This component is the main container for the React Flow editor.  It manages the state of the nodes and edges, handles connecting nodes, implements drag-and-drop functionality, and renders the React Flow component.  It also includes controls for deleting selected nodes and exporting the graph as JSON.

#### State Management

*   `nodes`: An array of node objects, managed by `useNodesState`.
*   `edges`: An array of edge objects, managed by `useEdgesState`.
*   `selectedNodes`: An array of IDs for currently selected nodes.
*   `selectedEdges`: An array of IDs for currently selected edges.
*   `nodeIdCounter`: Counter used to generate unique node IDs for drag-and-drop nodes.

#### Event Handlers

*   `onConnect`: Handles connecting nodes by creating new edges.
*   `onDragOver`: Handles drag-over events for drag-and-drop.
*   `onDrop`: Handles drop events for drag-and-drop, creating new nodes based on the dragged type.
*   `onNodeDataChange`: Handles changes to node data, updating the node state.
*   `handleEdgeDisconnect`: Handles disconnecting edges by removing them from the edge state.
*   `onDeleteSelected`: Handles deleting selected nodes and edges.
*   `onChange`: Handles node and edge selection changes.

#### Node and Edge Types

The `nodeTypes` and `edgeTypes` variables define the custom node and edge components used in the editor.  This allows the editor to render the custom node and edge types defined in this module.

#### Keybindings

The `handleKeyDown` function handles the "Delete" and "Backspace" keys, triggering the `onDeleteSelected` function to delete selected nodes and edges.

#### Context Provided

The `handleEdgeDisconnect` is provided via the `EdgeDisconnectContext` so that edges know how to disconnect.

## Example Usage

```jsx
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow onNodeDataChange={() => {}} />
    </DnDProvider>
  </ReactFlowProvider>
);
```

This code snippet demonstrates how to use the `DnDFlow` component within a React application.  It wraps the `DnDFlow` component with `ReactFlowProvider` and `DnDProvider` to provide the necessary context for the React Flow editor and drag-and-drop functionality. This code likely resides in another file (e.g., `App.js` or a dedicated editor page component) and is rendered within the application's UI. The root node `root` is rendered in `main.jsx`. The application structure is defined by `router.jsx`.
