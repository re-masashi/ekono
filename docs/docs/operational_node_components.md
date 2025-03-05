# operational_node_components.jsx Documentation

This module defines a configuration object `NODES_CONFIG` that holds metadata for various operational nodes used in a visual editor, such as AI models, data processing steps, and input/output elements. It is used by `editor.jsx` to define node properties and types.

## Module Overview

This file exports a constant JavaScript object, `NODES_CONFIG`, which serves as a central repository for node configurations used within a React Flow-based editor. Each entry in `NODES_CONFIG` describes a specific type of operational node, including its name, input arguments, output types, and suggested AI models (where applicable). The configurations provided are utilized in the `editor.jsx` file to generate and customize nodes within the editor.

## `NODES_CONFIG` Object

The `NODES_CONFIG` object is a dictionary where each key represents a unique node type (e.g., `AudioTextToText`, `ImageClassification`). The value associated with each key is an object containing the following properties:

- `name`: A human-readable name for the node.
- `arguments`: An array of strings representing the input arguments required by the node.
- `outputs`: An array of strings representing the output types produced by the node.
- `models`: An array of strings representing suggested AI models that can be used with this node (if applicable).

### Example Entry

```javascript
  AudioTextToText: {
    name: "Audio to Text",
    arguments: ["audio"],
    outputs: ["text"],
    models: ["Whisper", "Google Cloud Speech-to-Text", "AssemblyAI"], // Example models
  },
```

This entry defines a node type called `AudioTextToText`. It indicates that this node is named "Audio to Text", it accepts "audio" as an argument, produces "text" as an output, and suggests "Whisper", "Google Cloud Speech-to-Text", and "AssemblyAI" as potential models for this operation.

### Usage in `editor.jsx`

The `NODES_CONFIG` object is imported and utilized within the `editor.jsx` file. Specifically, it's used in the `DnDFlow` component during the `onDrop` event to dynamically create new nodes when elements are dragged and dropped from the sidebar. When a new node is created, the `NODES_CONFIG` object is consulted to retrieve the necessary metadata (name, arguments, outputs, models) for that node type. This metadata is then used to configure the node's properties and behavior within the React Flow editor.

```javascript
// Snippet from editor.jsx
const onDrop = useCallback(
  (event) => {
    event.preventDefault();
    if (!type || type === "inputNode" || type === "outputNode") return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    console.log(type);

    setNodeIdCounter((prevCounter) => {
      const nextCounter = prevCounter + 1;
      const newNode = {
        id: `dndnode_${nextCounter}`,
        type:
          type == "FixedValue"
            ? "FixedValue"
            : type == "ifElse"
              ? "ifElse"
              : "aiModelNode",
        position,
        data: {
          type: type,
          label:
            type == "FixedValue"
              ? "FixedValue"
              : type == "ifElse"
                ? "ifElse"
                : NODES_CONFIG[type].name, // Accessing NODES_CONFIG here
          icon:
            type === "databaseSchemaNode" ? (
              <FiDatabase style={{ color: "var(--text-interactive)" }} />
            ) : type === "aiModelNode" ? (
              <FiCode style={{ color: "var(--text-interactive)" }} />
            ) : (
              <FunctionIcon />
            ),
          subline: "",
          arguments:
            type == "FixedValue"
              ? []
              : type == "ifElse"
                ? []
                : NODES_CONFIG[type].arguments, // Accessing NODES_CONFIG here
          outputs:
            type == "FixedValue"
              ? ["output"]
              : type == "ifElse"
                ? []
                : NODES_CONFIG[type].outputs, // Accessing NODES_CONFIG here
          models:
            type == "FixedValue"
              ? []
              : type == "ifElse"
                ? []
                : NODES_CONFIG[type].models, // Accessing NODES_CONFIG here
        },
      };
      console.log("Creating node with ID:", newNode.id, "type:", newNode.type);
      setNodes((nds) => [...nds, newNode]);
      return nextCounter;
    });
  },
  [screenToFlowPosition, type, setNodes, setNodeIdCounter],
);
```

In this snippet, `NODES_CONFIG[type].name`, `NODES_CONFIG[type].arguments`, `NODES_CONFIG[type].outputs`, and `NODES_CONFIG[type].models` are used to populate the `data` property of the new node.

### Example Usage

1.  **Import the Configuration:**

    ```javascript
    import { NODES_CONFIG } from "./operational_node_components";
    ```

2.  **Access Node Information:**

    ```javascript
    const nodeType = "ImageClassification";
    const nodeName = NODES_CONFIG[nodeType].name; // "Image Classification"
    const nodeArguments = NODES_CONFIG[nodeType].arguments; // ["image"]
    const nodeOutputs = NODES_CONFIG[nodeType].outputs; // ["labels"]
    const nodeModels = NODES_CONFIG[nodeType].models; // ["ResNet", "EfficientNet", "MobileNetV2"]
    ```

3.  **Create a Node in `editor.jsx`:**

    The `editor.jsx` would utilize the imported `NODES_CONFIG` within its drag-and-drop functionality to create new nodes with the appropriate metadata. See the example above in "Usage in `editor.jsx`".

## React Components (Currently Incomplete/Missing)

The original `operational_node_components.jsx` file _intended_ to include React components for rendering individual nodes. However, the provided file _only_ contains the `NODES_CONFIG` object and a comment indicating an intention to export the components. Therefore, there are no explicitly defined and exported React components for each node type _within this specific file_. These components are actually defined in `editor.jsx`. `editor.jsx` imports `NODES_CONFIG` to then parameterize the node components.

If the nodes were defined here, they might look something like this:

```javascript
// THIS CODE IS NOT IN THE operational_node_components.jsx FILE!
// IT IS PROVIDED AS AN EXAMPLE OF WHAT NODE COMPONENTS
// MIGHT LOOK LIKE IF THEY WERE DEFINED HERE.

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const AudioTextToTextNode = memo(({ data }) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <Handle type="target" position={Position.Left} id="audio" />
      <Handle type="source" position={Position.Right} id="text" />
    </div>
  );
});

export default AudioTextToTextNode;
```

### Notes

- The provided `operational_node_components.jsx` file primarily functions as a data definition module.
- The actual React components for rendering the nodes are located in `editor.jsx` (or another file that imports and uses `NODES_CONFIG`).
- The commented out code (e.g., `// export default GenericOpNodeComponent;`) indicates a potential intention to define and export a default node component, but it's not implemented in the provided code.
