import React from "react";
import {
  useRef,
  useCallback,
  useContext,
  createContext,
  useState,
  memo,
} from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  useOnSelectionChange,
  Handle,
  Position,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
} from "@xyflow/react";
import {
  FiFile,
  FiCloud,
  FiActivity,
  FiDatabase,
  FiCode,
  FiX,
} from "react-icons/fi";
// Add at the top of editor.jsx
import { NODES_CONFIG } from "./operational_node_components";
import Sidebar from "./editor_sidebar";

import "@xyflow/react/dist/style.css";
import "./reactflow.css";

// --- CSS Styles (Embedded in Component) ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --editor-bg: #1e1e1e; /* Primary Background */
      --panel-bg: #282828; /* Secondary Backgrounds (Panels, Toolbars) */
      --panel-bg-lighter: #333333; /* Lighter Panel Background */
      --accent-primary-purple: #a020f0; /* Vibrant Purple */
      --accent-primary-purple-rgb:
        160, 32, 240; /* RGB value for vibrant purple */
      --accent-hover-purple: #c778f7; /* Lighter Purple for Hover */
      --accent-gradient-button: linear-gradient(
        to right,
        #800080,
        #4b0082
      ); /* Button Gradient */
      --accent-secondary-cyan: #00ced1; /* Muted Teal/Cyan (optional) */
      --accent-secondary-hover-cyan: #48d1cc;
      --text-primary: #ffffff; /* White Text */
      --text-secondary: #aaaaaa; /* Medium Gray Text */
      --text-interactive: #d8b4fe; /* Light Purple Interactive Text */
      --canvas-bg: #181818; /* Canvas Background */
      --grid-lines: #282828; /* Grid Lines */
      --shadow-color: rgba(107, 33, 168, 0.3); /* Purple Shadow */
    }

    .react-flow {
      --bg-color: var(--editor-bg); /* Using CSS variable for background */
      --text-color: var(--text-primary); /* Using CSS variable for text */
      --node-border-radius: 10px;
      --node-box-shadow: var(
        --shadow-color-strong
      ); /* Using Ekono shadow variable - STRONG version */
      background-color: var(--bg-color);
      color: var(--text-color);
    }

    .react-flow__node-ekono,
    .react-flow__node-databaseSchemaNode,
    .react-flow__node-aiModelNode,
    .react-flow__node-inputNode,
    .react-flow__node-outputNode {
      border-radius: var(--node-border-radius);
      display: flex;
      font-family: "Fira Mono", Monospace;
      font-weight: 500;
      letter-spacing: -0.2px;
      box-shadow: var(--node-box-shadow);
      background-color: var(--panel-bg); /* Node background color */
      border: 1px solid #444444; /* Darker border for node separation - keep dark gray */
    }

    .react-flow__node-ekono .wrapper,
    .react-flow__node-databaseSchemaNode .wrapper,
    .react-flow__node-aiModelNode .wrapper,
    .react-flow__node-FixedValue .wrapper,
    .react-flow__node-inputNode .wrapper,
    .react-flow__node-outputNode .wrapper {
      overflow: hidden;
      display: flex;
      padding: 2px;
      position: relative;
      border-radius: var(--node-border-radius);
      flex-grow: 1;
    }

    .gradient:before {
      background: conic-gradient(
        from -160deg at 50% 50%,
        #a020f0 0deg,          /* Start with purple */
        #2a8af6 120deg,        /* Transition to blue */
        #ff00ff 240deg,        /* Then to fuchsia */
        #a020f0 360deg         /* Back to purple */
      );
      animation: spinner 4s linear infinite;
      transform: translate(-50%, -50%) rotate(0deg); /* Initial rotation */
    }

    .react-flow__node-ekono.selected .wrapper.gradient:before,
    .react-flow__node-databaseSchemaNode.selected .wrapper.gradient:before,
    .react-flow__node-aiModelNode.selected .wrapper.gradient:before,
    .react-flow__node-FixedValue.selected .wrapper.gradient:before,
    .react-flow__node-inputNode.selected .wrapper.gradient:before,
    .react-flow__node-outputNode.selected .wrapper.gradient:before {
      background: conic-gradient(
        from -160deg at 50% 50%,
        #a020f0 0deg,          /* Purple start */
        #2a8af6 120deg,        /* Blue mid */
        #ff00ff 240deg,        /* Fuchsia mid */
        rgba(160, 32, 240, 0) 360deg  /* Purple transparent end */
      );
    }

    /* Update the edge gradient in the SVG */
    svg linearGradient#edge-gradient stop:first-child {
      stop-color: #ff00ff; /* Fuchsia */
    }

    svg linearGradient#edge-gradient stop:last-child {
      stop-color: #2a8af6; /* Blue */
    }

    @keyframes spinner {
      100% {
        transform: translate(-50%, -50%) rotate(-360deg);
      }
    }

    .react-flow__node-ekono .inner,
    .react-flow__node-databaseSchemaNode .inner,
    .react-flow__node-aiModelNode .inner,
    .react-flow__node-FixedValue .inner,
    .react-flow__node-inputNode .inner,
    .react-flow__node-outputNode .inner {
      background: var(
        --editor-bg
      ); /* Inner node background - same as editor bg */
      padding: 16px 20px;
      border-radius: var(--node-border-radius);
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      position: relative;
    }

    .react-flow__node-ekono .icon,
    .react-flow__node-databaseSchemaNode .icon,
    .react-flow__node-aiModelNode .icon,
    .react-flow__node-FixedValue .icon,
    {
      margin-right: 8px;
      color: var(--text-interactive); /* Icon color - light purple */
    }

    .react-flow__node-ekono .body,
    .react-flow__node-databaseSchemaNode .body,
    .react-flow__node-aiModelNode .body,
    .react-flow__node-FixedValue .body {
      display: flex;
    }

    .react-flow__node-ekono .title,
    .react-flow__node-databaseSchemaNode .title,
    .react-flow__node-aiModelNode .title,
    .react-flow__node-FixedValue .title,
    .react-flow__node-inputNode .title,
    .react-flow__node-outputNode .title {
      font-size: 16px;
      margin-bottom: 2px;
      line-height: 1;
      color: var(--text-primary); /* Node title text color - white */
    }

    .react-flow__node-ekono .subline,
    .react-flow__node-databaseSchemaNode .subline,
    .react-flow__node-aiModelNode .subline,
    .react-flow__node-FixedValue .subline,
    .react-flow__node-ekono .input-type-selector {
      font-size: 12px;
      color: var(--text-secondary); /* Subline text - medium gray */
    }

    .react-flow__node-ekono .cloud,
    .react-flow__node-databaseSchemaNode .cloud,
    .react-flow__node-aiModelNode .cloud,
    .react-flow__node-FixedValue .cloud,
    .react-flow__node-inputNode .cloud,
    .react-flow__node-outputNode .cloud {
      border-radius: 100%;
      width: 30px;
      height: 30px;
      right: 0;
      position: absolute;
      top: 0;
      transform: translate(50%, -50%);
      display: flex;
      transform-origin: center center;
      padding: 2px;
      overflow: hidden;
      box-shadow: var(--node-box-shadow);
      z-index: 1;
    }

    .react-flow__node-ekono .cloud div,
    .react-flow__node-databaseSchemaNode .cloud div,
    .react-flow__node-aiModelNode .cloud div,
    .react-flow__node-inputNode .cloud div,
    .react-flow__node-FixedValue .cloud div,
    .react-flow__node-outputNode .cloud div {
      background-color: var(
        --panel-bg
      ); /* Cloud icon background - panel background */
      flex-grow: 1;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: var(--text-interactive); /* Cloud icon color - light purple */
    }

    /* Specific styles for DatabaseSchemaNode, AI Model, Input and Output Node Tables */
    .react-flow__node-databaseSchemaNode .react-flow__node-table-wrapper,
    .react-flow__node-aiModelNode .react-flow__node-table-wrapper,
    .react-flow__node-inputNode .react-flow__node-table-wrapper,
    .react-flow__node-FixedValue .react-flow__node-table-wrapper,
    .react-flow__node-outputNode .react-flow__node-table-wrapper {
      overflow-x: auto;
    }

    .react-flow__node-databaseSchemaNode table,
    .react-flow__node-aiModelNode table,
    .react-flow__node-FixedValue table,
    .react-flow__node-inputNode table,
    .react-flow__node-outputNode table {
      border-spacing: 0;
      width: 100%;
      min-width: 200px;
      border-collapse: collapse;
    }

    .react-flow__node-databaseSchemaNode th,
    .react-flow__node-databaseSchemaNode td,
    .react-flow__node-aiModelNode th,
    .react-flow__node-aiModelNode td,
    .react-flow__node-inputNode th,
    .react-flow__node-inputNode td,
    .react-flow__node-outputNode th,
    .react-flow__node-outputNode td,
    .react-flow__node-FixedValue table,
     {
      padding: 8px 10px;
      text-align: left;
      border-bottom: 1px solid #444; /* Keep table border dark gray */
      color: var(--text-primary); /* Table cell text - white */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }

    .react-flow__node-databaseSchemaNode th,
    .react-flow__node-aiModelNode th,
    .react-flow__node-inputNode th,
    .react-flow__node-outputNode th {
      font-weight: bold;
      background-color: #222; /* Table header background - slightly lighter dark gray */
      color: var(--text-primary); /* Table header text - white */
    }

    .react-flow__node-databaseSchemaNode tr:last-child td,
    .react-flow__node-aiModelNode tr:last-child td,
    .react-flow__node-inputNode tr:last-child td,
    .react-flow__node-outputNode tr:last-child td {
      border-bottom: none;
    }

    /* --- CORRECTED HANDLE STYLES - Including InputNode and OutputNode specific handles --- */
    .react-flow__node-databaseSchemaNode .react-flow__handle-target,
    .react-flow__node-databaseSchemaNode .react-flow__handle-source,
    .react-flow__node-aiModelNode .react-flow__handle-target,
    .react-flow__node-aiModelNode .react-flow__handle-source,
    .react-flow__node-ekono.react-flow__node-default .react-flow__handle-target,
    .react-flow__node-ekono.react-flow__node-default .react-flow__handle-source,
    .react-flow__node-inputNode .react-flow__handle-source, /* InputNode handle - only source */
    .react-flow__node-outputNode .react-flow__handle-target {
      /* OutputNode handle - only target */
      opacity: 1;
      background: var(
        --accent-primary-purple
      ); /* Handle color - vibrant purple */
      border-radius: 3px;
      width: 8px;
      height: 8px;
      border: none;
      top: auto;
      bottom: auto;
      margin-top: -4px;
    }
    .react-flow__node-databaseSchemaNode .react-flow__handle-target,
    .react-flow__node-aiModelNode .react-flow__handle-target,
    .react-flow__node-ekono.react-flow__node-default .react-flow__handle-target,
    .react-flow__node-inputNode .react-flow__handle-target, /* InputNode - NO target handle */
    .react-flow__node-outputNode .react-flow__handle-target {
      /* OutputNode - target handle position */
      left: -5px;
    }

    .react-flow__node-databaseSchemaNode .react-flow__handle-source,
    .react-flow__node-aiModelNode .react-flow__handle-source,
    .react-flow__node-ekono.react-flow__node-default .react-flow__handle-source,
    .react-flow__node-inputNode .react-flow__handle-source, /* InputNode - source handle position */
    .react-flow__node-outputNode .react-flow__handle-source {
      /* OutputNode - NO source handle */
      right: -5px;
    }

    .react-flow__node-ekono .react-flow__input-type-select {
      background-color: #333; /* Keep input select background dark gray */
      color: var(--text-primary); /* Input select text color - white */
      border: 1px solid #555; /* Keep input select border dark gray */
      border-radius: 5px;
      padding: 4px 8px;
      font-size: 12px;
      margin-top: 5px;
      width: 100%;
      box-sizing: border-box;
    }

    .react-flow__edge-button {
      /* Style for the disconnect button on edges */
      cursor: pointer;
      background-color: rgba(
        20,
        20,
        20,
        0.8
      ); /* Dark background for visibility - keep this dark for button visibility on edge */
      color: var(--text-primary); /* Button text - white */
      border: none;
      border-radius: 50%; /* Make it circular */
      width: 20px; /* Small button size */
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      opacity: 0; /* Hidden by default */
      transition: opacity 0.2s ease-in-out;
      position: absolute; /* Position it on the edge */
      transform: translate(-50%, -50%); /* Center on the calculated position */
      z-index: 2; /* Ensure it's above the edge */
    }

    .react-flow__edge:hover .react-flow__edge-button, /* Show button on edge hover */
    .react-flow__edge-button:hover {
      /* Keep button visible when hovered */
      opacity: 1;
    }

    .custom-edge-button {
      /* Style for the button itself, can be adjusted */
      background-color: rgba(
        50,
        50,
        50,
        0.7
      ); /* Slightly different background - keep this for button visual differentiation */
      color: var(--text-primary); /* Button text - white */
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
      opacity: 0.8; /* Slightly less opaque */
      transition: background-color 0.2s ease;
    }

    .custom-edge-button:hover {
      background-color: rgba(
        70,
        70,
        70,
        0.9
      ); /* Darken on hover - keep dark for button hover effect */
      opacity: 1;
    }

    /* ... (rest of your GlobalStyles from previous code, if any) ... */

    :root {
      --shadow-color-strong:
        10px 0 15px var(--shadow-color), -10px 0 15px var(--shadow-color);
    }
  `}</style>
);

// --- Function Icon Component ---
const FunctionIcon = () => <FiActivity />;

// --- Ekono Node Component ---  // Renamed from TurboNode to EkonoNode
const EkonoNode = memo(({ data, isSelected, id, onNodeDataChange }) => {
  // Renamed to EkonoNode
  const handleInputChange = useCallback(
    (event) => {
      onNodeDataChange(id, { ...data, inputType: event.target.value });
    },
    [id, data, onNodeDataChange],
  );

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiCloud style={{ color: "var(--text-interactive)" }} />{" "}
          {/* Icon color light purple */}
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner">
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
          <Handle
            type="target"
            position={Position.Left}
            className="react-flow__node-default"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="react-flow__node-default"
          />
        </div>
      </div>
    </>
  );
});

// --- Custom Button Component for Edge ---
const EdgeButton = ({ onClick, children }) => (
  <button className="custom-edge-button" onClick={onClick}>
    {children}
  </button>
);

// 1. CREATE CONTEXT
const EdgeDisconnectContext = createContext(null);

// --- Button Edge Component (Consuming Context) ---
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
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    // 2. CONSUME CONTEXT
    const onEdgeDisconnect = useContext(EdgeDisconnectContext);

    const handleDisconnectClick = useCallback(
      (event) => {
        event.stopPropagation();
        if (onEdgeDisconnect) {
          onEdgeDisconnect(id); // Now should have access to the function from context
        } else {
          console.warn("onEdgeDisconnect CONTEXT is missing in ButtonEdge!");
        }
      },
      [id, onEdgeDisconnect],
    );

    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-auto absolute"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            <EdgeButton onClick={handleDisconnectClick}>
              <FiX size={12} /> Disconnect
            </EdgeButton>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  },
);

// --- Ekono Edge Component --- // Renamed from TurboEdge to EkonoEdge
const EkonoEdge = ButtonEdge; // Renamed to EkonoEdge

// --- DatabaseSchemaNodeComponent, AIModelNodeComponent, InputNodeComponent, OutputNodeComponent, DnDContext, DnDProvider, Sidebar, DnDFlow ---
// ... (Rest of your Node and Sidebar components - same as before) ...
const DatabaseSchemaNodeComponent = memo(({ data, isSelected }) => {
  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiDatabase style={{ color: "var(--text-interactive)" }} />{" "}
          {/* Icon color light purple */}
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner react-flow__node-table-wrapper">
          <h2 className="title rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
            {data.label}
          </h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.schema.map((entry) => (
                <tr key={entry.title} className="relative text-xs">
                  <td>
                    <Handle
                      id={entry.title}
                      type="target"
                      position={Position.Left}
                      style={{
                        opacity: 1,
                        background:
                          "var(--accent-primary-purple)" /* Handle color purple */,
                        borderRadius: "3px",
                        width: "8px",
                        height: "8px",
                        border: "none",
                        top: "auto",
                        bottom: "auto",
                        marginTop: "-4px",
                        left: "-5px",
                      }}
                    />
                    {entry.title}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {entry.type}
                    <Handle
                      id={entry.title}
                      type="source"
                      position={Position.Right}
                      style={{
                        opacity: 1,
                        background:
                          "var(--accent-primary-purple)" /* Handle color purple */,
                        borderRadius: "3px",
                        width: "8px",
                        height: "8px",
                        border: "none",
                        top: "auto",
                        bottom: "auto",
                        marginTop: "-4px",
                        right: "-5px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

const AIModelNodeComponent = memo(({ data, isSelected }) => {
  const [selectedModel, setSelectedModel] = React.useState(
    data.models?.[0] || "",
  ); // Initialize with the first model or empty string

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    // You can add logic here to update the node data or trigger other actions
    // based on the selected model if needed.
    console.log("Selected model:", event.target.value);
  };

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiCode style={{ color: "var(--text-interactive)" }} />{" "}
          {/* Icon color light purple */}
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner react-flow__node-table-wrapper">
          <h2 className="title rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
            {data.label}
          </h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>
                  <select
                    className="model-select w-full " // Add a class for styling if needed
                    value={selectedModel}
                    onChange={handleModelChange}
                  >
                    {data.models?.map((modelName) => (
                      <option key={modelName} value={modelName}>
                        {modelName}
                      </option>
                    ))}
                  </select>
                </th>
                <th></th> {/* Empty header for the 'Type' column */}
              </tr>
            </thead>
            <tbody>
              {data.arguments &&
                data.arguments.map((arg, index) => (
                  <tr key={arg} className="relative text-xs">
                    <td>
                      <Handle
                        id={arg}
                        type="target"
                        position={Position.Left}
                        style={{
                          opacity: 1,
                          background:
                            "var(--accent-primary-purple)" /* Handle color purple */,
                          borderRadius: "3px",
                          width: "8px",
                          height: "8px",
                          border: "none",
                          top: "auto",
                          bottom: "auto",
                          marginTop: "-4px",
                          left: "-5px",
                        }}
                      />
                      {arg}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {index === 0 && (
                        <Handle
                          id="output"
                          type="source"
                          position={Position.Right}
                          style={{
                            opacity: 1,
                            background:
                              "var(--accent-primary-purple)" /* Handle color purple */,
                            borderRadius: "3px",
                            width: "8px",
                            height: "8px",
                            border: "none",
                            top: "auto",
                            bottom: "auto",
                            marginTop: "-4px",
                            right: "-5px",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

const ModelNodeBaseComponent = memo(({ data, isSelected }) => {
  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiCode style={{ color: "var(--text-interactive)" }} />{" "}
          {/* Icon color light purple */}
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner react-flow__node-table-wrapper">
          <h2 className="title rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
            {data.label}
          </h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>Argument</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.arguments &&
                data.arguments.map((arg, index) => (
                  <tr key={arg} className="relative text-xs">
                    <td>
                      <Handle
                        id={arg}
                        type="target"
                        position={Position.Left}
                        style={{
                          opacity: 1,
                          background:
                            "var(--accent-primary-purple)" /* Handle color purple */,
                          borderRadius: "3px",
                          width: "8px",
                          height: "8px",
                          border: "none",
                          top: "auto",
                          bottom: "auto",
                          marginTop: "-4px",
                          left: "-5px",
                        }}
                      />
                      {arg}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {index === 0 && (
                        <Handle
                          id="output"
                          type="source"
                          position={Position.Right}
                          style={{
                            opacity: 1,
                            background:
                              "var(--accent-primary-purple)" /* Handle color purple */,
                            borderRadius: "3px",
                            width: "8px",
                            height: "8px",
                            border: "none",
                            top: "auto",
                            bottom: "auto",
                            marginTop: "-4px",
                            right: "-5px",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

const FixedValueNodeComponent = memo(({ data, isSelected }) => {
  const [valueType, setValueType] = useState(data.valueType || "string");
  const [fixedValue, setFixedValue] = useState(data.fixedValue || "");

  const handleTypeChange = (e) => {
    setValueType(e.target.value);
  };

  const handleValueChange = (e) => {
    setFixedValue(e.target.value);
  };

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiCode style={{ color: "var(--text-interactive)" }} />
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner react-flow__node-table-wrapper">
          <h2 className="title rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
            Fixed Value
          </h2>
          <table className="w-full">
            <tbody>
              <tr className="relative text-xs">
                <td>Type</td>
                <td>
                  <input
                    type="text"
                    className="react-flow__input-type-select"
                    value={valueType}
                    onChange={handleTypeChange}
                    placeholder="e.g., string, number, boolean"
                    style={{
                      backgroundColor: "var(--panel-bg-lighter)",
                      color: "var(--text-primary)",
                      borderColor: "var(--text-secondary)",
                    }}
                  />
                </td>
              </tr>
              <tr className="relative text-xs">
                <td>Value</td>
                <td>
                  <input
                    type="text"
                    className="react-flow__input-type-select"
                    value={fixedValue}
                    onChange={handleValueChange}
                    placeholder="Enter fixed value"
                    style={{
                      backgroundColor: "var(--panel-bg-lighter)",
                      color: "var(--text-primary)",
                      borderColor: "var(--text-secondary)",
                    }}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <Handle
                    id="output"
                    type="source"
                    position={Position.Right}
                    style={{
                      opacity: 1,
                      background: "var(--accent-primary-purple)",
                      borderRadius: "3px",
                      width: "8px",
                      height: "8px",
                      border: "none",
                      marginTop: "-4px",
                      right: "-5px",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

const InputNodeComponent = memo(({ data, isSelected, id }) => {
  const [inputs, setInputs] = useState(data.inputs || [{ type: "string" }]);

  const handleAddInput = useCallback(() => {
    setInputs((prev) => [...prev, { type: "string" }]);
  }, []);

  const handleTypeChange = useCallback((index, newType) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index].type = newType;
      return newInputs;
    });
  }, []);

  const handleRemoveInput = useCallback((index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiFile style={{ color: "var(--text-interactive)" }} />
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner react-flow__node-table-wrapper">
          <h2 className="title rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
            {data.label}
          </h2>
          <table className="w-full">
            <tbody>
              {inputs.map((input, index) => (
                <tr key={index} className="relative text-xs">
                  <td>Input Type {index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="react-flow__input-type-select"
                      value={input.type}
                      onChange={(e) => handleTypeChange(index, e.target.value)}
                      placeholder="e.g., string, number, dataframe"
                      style={{
                        backgroundColor: "var(--panel-bg-lighter)",
                        color: "var(--text-primary)",
                        borderColor: "var(--text-secondary)",
                      }}
                    />
                  </td>
                  <td style={{ textAlign: "left", width: "30px" }}>
                    <button
                      onClick={() => handleRemoveInput(index)}
                      className="text-red-100 hover:text-red-500 font-bold text-lg"
                    >
                      x
                    </button>
                  </td>
                  <td style={{ textAlign: "right", width: "30px" }}>
                    <Handle
                      id={`output-${index}`}
                      type="source"
                      position={Position.Right}
                      style={{
                        opacity: 1,
                        background: "var(--accent-primary-purple)",
                        borderRadius: "3px",
                        width: "8px",
                        height: "8px",
                        border: "none",
                        marginTop: "4px",
                        right: "-5px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="hover:bg-white/20 rounded-md"
            onClick={handleAddInput}
          >
            Add more +
          </button>
        </div>
      </div>
    </>
  );
});

const OutputNodeComponent = memo(({ data, isSelected, id }) => {
  const [outputs, setOutputs] = useState(data.outputs || [{ type: "string" }]);

  const handleAddOutput = useCallback(() => {
    setOutputs((prev) => [...prev, { type: "string" }]);
  }, []);

  const handleTypeChange = useCallback((index, newType) => {
    setOutputs((prev) => {
      const newOutputs = [...prev];
      newOutputs[index].type = newType;
      return newOutputs;
    });
  }, []);

  const handleRemoveOutput = useCallback((index) => {
    setOutputs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiFile style={{ color: "var(--text-interactive)" }} />
        </div>
      </div>
      <div className={`wrapper gradient ${isSelected ? "selected" : ""}`}>
        <div className="inner react-flow__node-table-wrapper">
          <h2 className="title rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
            {data.label}
          </h2>
          <table className="w-full">
            <tbody>
              {outputs.map((output, index) => (
                <tr key={index} className="relative text-xs">
                  <td>Output Type {index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="react-flow__output-type-select"
                      value={output.type}
                      onChange={(e) => handleTypeChange(index, e.target.value)}
                      placeholder="e.g., string, number, dataframe"
                      style={{
                        backgroundColor: "var(--panel-bg-lighter)",
                        color: "var(--text-primary)",
                        borderColor: "var(--text-secondary)",
                      }}
                    />
                  </td>
                  <td style={{ textAlign: "right", width: "30px" }}>
                    <Handle
                      id={`input-handle-${index}`} // Unique handle ID
                      type="target"
                      position={Position.Left}
                      style={{
                        opacity: 1,
                        background: "var(--accent-primary-purple)",
                        borderRadius: "3px",
                        width: "8px",
                        height: "8px",
                        border: "none",
                        left: "-5px",
                      }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleRemoveOutput(index)}
                      className="text-red-200 hover:text-red-500 text-lg font-black"
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="hover:bg-white/20 rounded-md"
            onClick={handleAddOutput}
          >
            Add more +
          </button>
        </div>
      </div>
    </>
  );
});

const DnDContext = createContext([null, () => {}]);
const DnDProvider = ({ children }) => (
  <DnDContext.Provider value={useState(null)}>{children}</DnDContext.Provider>
);
const useDnD = () => useContext(DnDContext);

export { useDnD };

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "input-node",
      type: "inputNode",
      position: { x: 50, y: 100 },
      data: {
        type: "inputNode",
        label: "Input Node",
        icon: <FiFile />,
        inputType: "string",
      },
    },
    {
      id: "output-node",
      type: "outputNode",
      position: { x: 800, y: 100 },
      data: { type: "outputNode", label: "Output Node", icon: <FiFile /> },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(0);

  const nodeToJSON = () => ({
    nodes: nodes.map((node) => {
      const { icon, ...restData } = node.data;
      return {
        id: node.id,
        type: node.type,
        position: node.position,
        data: restData,
      };
    }),
    edges: edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })),
  });

  const onConnect = useCallback(
    (params) => {
      const { source, target, sourceHandle, targetHandle } = params;

      const targetHandleConnected = edges.some(
        (edge) => edge.target === target && edge.targetHandle === targetHandle,
      );

      if (targetHandleConnected) {
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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
                  : NODES_CONFIG[type].name,
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
                  : NODES_CONFIG[type].arguments,
            outputs:
              type == "FixedValue"
                ? ["output"]
                : type == "ifElse"
                  ? []
                  : NODES_CONFIG[type].outputs,
            models:
              type == "FixedValue"
                ? []
                : type == "ifElse"
                  ? []
                  : NODES_CONFIG[type].models,
          },
        };
        console.log(
          "Creating node with ID:",
          newNode.id,
          "type:",
          newNode.type,
        );
        setNodes((nds) => [...nds, newNode]);
        return nextCounter;
      });
    },
    [screenToFlowPosition, type, setNodes, setNodeIdCounter],
  );

  const onNodeDataChange = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: newData };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  const handleEdgeDisconnect = useCallback(
    (edgeIdToRemove) => {
      console.log("handleEdgeDisconnect called for edge ID:", edgeIdToRemove);
      setEdges((edges) => edges.filter((edge) => edge.id !== edgeIdToRemove));
    },
    [setEdges],
  );

  const onDeleteSelected = useCallback(() => {
    const nodeIdsToDelete = selectedNodes;
    const edgeIdsToDelete = selectedEdges;

    setNodes((nodes) =>
      nodes.filter(
        (node) =>
          !nodeIdsToDelete.includes(node.id) ||
          node.type == "inputNode" ||
          node.type == "outputNode",
      ),
    );
    setEdges((edges) =>
      edges.filter(
        (edge) =>
          !edgeIdsToDelete.includes(edge.id) &&
          !nodeIdsToDelete.includes(edge.source) &&
          !nodeIdsToDelete.includes(edge.target),
      ),
    );
    setSelectedNodes([]);
    setSelectedEdges([]);
  }, [
    selectedNodes,
    selectedEdges,
    edges,
    setNodes,
    setEdges,
    setSelectedNodes,
    setSelectedEdges,
  ]);

  const onChange = useCallback(({ nodes: flowNodes, edges: flowEdges }) => {
    setSelectedNodes(
      flowNodes.filter((node) => node.selected).map((node) => node.id),
    );
    setSelectedEdges(
      flowEdges.filter((edge) => edge.selected).map((edge) => edge.id),
    );
  }, []);

  useOnSelectionChange({ onChange });

  const nodeTypes = React.useMemo(
    () => ({
      ekono: EkonoNode,
      databaseSchemaNode: DatabaseSchemaNodeComponent,
      aiModelNode: AIModelNodeComponent,
      inputNode: InputNodeComponent,
      outputNode: OutputNodeComponent,
      FixedValue: FixedValueNodeComponent,
    }),
    [],
  );
  const edgeTypes = React.useMemo(
    () => ({
      ekono: EkonoEdge,
      buttonedge: ButtonEdge,
    }),
    [],
  );
  const defaultEdgeOptions = React.useMemo(
    () => ({ type: "ekono", markerEnd: null, animated: true }),
    [],
  );

  const proOptions = { hideAttribution: true };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        onDeleteSelected();
      }
    },
    [onDeleteSelected],
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="dndflow bg-zinc-900 w-screen h-screen text-white p-2 shadow-2xl flex flex-row gap-2"
      style={{
        backgroundColor: "var(--editor-bg)",
        color: "var(--text-primary)",
      }}
    >
      {/* Main DnDFlow container background and text */}
      <GlobalStyles />
      <Sidebar />
      <div
        className="reactflow-wrapper rounded-xl border border-zinc-800 overflow-hidden flex-grow shadow-xl"
        style={{
          height: "98vh",
          backgroundColor: "var(--canvas-bg)",
          borderColor: "#4B0082",
        }} // Canvas wrapper background and border - using purple border as example, adjust if needed
        ref={reactFlowWrapper}
      >
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={onDeleteSelected}
            className="transition-all text-white font-bold py-2 px-4 rounded shadow-md disabled:opacity-50 text-sm mr-2"
            disabled={selectedNodes.length === 0 && selectedEdges.length === 0}
            style={{
              backgroundColor: "var(--accent-primary-purple)",
              hoverBackgroundColor: "var(--accent-hover-purple)",
            }} // Example button colors - purple accents - adjust as you see fit
          >
            Delete
          </button>
          <button
            onClick={() => console.log(nodeToJSON())}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md disabled:opacity-50 text-sm mr-2"
            style={{
              backgroundColor: "var(--accent-primary-purple)",
              hoverBackgroundColor: "var(--accent-hover-purple)",
            }} // Example button colors - purple accents - adjust as you see fit
          >
            Print JSON
          </button>
        </div>
        {/* 3. PROVIDE CONTEXT */}
        <EdgeDisconnectContext.Provider value={handleEdgeDisconnect}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            className="bg-zinc-800 rounded-xl"
            style={{
              backgroundColor: "transparent",
              border: "1px solid transparent",
            }} // Removed redundant bg and border, canvas wrapper already styled
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onNodeDoubleClick={(event, node) => {
              if (node.id === "input-node") {
                // Example action on double click of input node (optional)
                console.log("Input Node Double Clicked", node);
              } else {
                console.log(node.data);
              }
            }}
            edgeTypes={edgeTypes}
            proOptions={proOptions}
            // edgeProps={{ onEdgeDisconnect: handleEdgeDisconnect }} // REMOVE edgeProps
          >
            <Controls showInteractive={false} />
            <Background
              variant="dots"
              color="#666"
              gap={18}
              size={1}
              style={{ color: "var(--text-secondary)" }}
            />{" "}
            {/* Background dots - medium gray */}
            <svg>
              <defs>
                <linearGradient id="edge-gradient">
                  <stop offset="0%" stopColor="#ae53ba" />
                  <stop offset="100%" stopColor="#2a8af6" />
                </linearGradient>
              </defs>
            </svg>
          </ReactFlow>
        </EdgeDisconnectContext.Provider>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow onNodeDataChange={() => {}} />
    </DnDProvider>
  </ReactFlowProvider>
);
