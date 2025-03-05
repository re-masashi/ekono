import React from "react";
import { useDnD } from "./editor";
import { FiMenu, FiEdit } from "react-icons/fi";

function timedCounter(setRunningPercent) {
  let intervalId;
  let currentPercentage = 0; // Keep track of percentage within the timer

  function startCounter() {
    currentPercentage = 0; // Reset local percentage
    setRunningPercent(0); // Initialize React state to 0%

    intervalId = setInterval(() => {
      currentPercentage += 30; // Increment local percentage
      console.log(currentPercentage);
      if (currentPercentage > 100) {
        currentPercentage = 100; // Cap at 100%
        clearInterval(intervalId); // Stop the counter when 100% is reached
        console.log("Counter reached 100% and stopped.");
        setTimeout(() => setRunningPercent(null), 500);
      }
      setRunningPercent(currentPercentage); // Update React state with local percentage
    }, 1000); // Run every 1000 milliseconds (1 second)
  }

  function stopCounter() {
    clearInterval(intervalId);
  }

  function resetCounter() {
    stopCounter();
    currentPercentage = 0; // Reset local percentage
    setRunningPercent(0); // Reset React state to 0%
  }

  return {
    start: startCounter,
    stop: stopCounter,
    reset: resetCounter,
  };
}

const Sidebar = () => {
  const setType = useDnD()[1];

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const [runningPercent, setRunningPercent] = React.useState(null);
  const counterRef = React.useRef(null); // Ref to store the counter object

  React.useEffect(() => {
    // Initialize the timed counter when the component mounts
    counterRef.current = timedCounter(setRunningPercent); // Pass only setRunningPercent
  }, [setRunningPercent]); // Dependency on setRunningPercent in case it changes (though unlikely)

  const run = () => {
    if (runningPercent !== null) {
      console.log("tryna stop");
      counterRef.current.reset();
      counterRef.current.stop();
      setRunningPercent(null);
      return;
    } else {
      console.log("running");
    }
    if (counterRef.current) {
      counterRef.current.start(); // Start the timed counter
    } else {
      console.error("Counter not initialized!"); // Handle case where counterRef is not set
    }
  };

  const stop = () => {
    if (counterRef.current) {
      counterRef.current.stop();
    }
  };

  const reset = () => {
    if (counterRef.current) {
      counterRef.current.reset();
    }
  };

  return (
    <aside
      className="bg-zinc-800 flex flex-col h-full rounded-xl shadow-lg w-64"
      style={{
        backgroundColor: "var(--panel-bg)",
        color: "var(--text-primary)",
      }}
    >
      <div className="overflow-y-scroll p-4 ">
        <div
          className="description text-zinc-400 mb-4 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <h1
            className="font-black text-2xl pb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Ekono Graphical Editor
          </h1>
          Drag nodes from here
        </div>

        {/* Basic Nodes */}
        <div
          className="sidebar-group-title text-zinc-400 mt-2 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Logic
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {/*{" "}*/}
          {/*    <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "IfElse")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            If Else
          </div>*/}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "FixedValue")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Fixed Value
          </div>
        </div>
        {/* Operational Nodes - Natural Language Processing */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          NLP
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for NLP nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextClassification")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TokenClassification")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Token Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "TableQuestionAnswering")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Table QA
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "QuestionAnswering")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Question Answ.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "ZeroShotClassification")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Zero-Shot Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "Translation")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Translation
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "Summarization")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Summarization
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "NLPFeatureExtraction")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            NLP Feat. Extract.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextGeneration")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text Gen.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "HumanizeText")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Humanize Text
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "SentenceSimilarity")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            AI Text Detection
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "Text2TextGeneration")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text2Text Gen.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "FillMask")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Fill Mask
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "SentenceSimilarity")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Sent. Sim.
          </div>
        </div>

        {/* Operational Nodes - Multimodal */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Multimodal
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for Multimodal nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "AudioTextToText")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Audio to Text
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageTextToText")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Image to Text
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "VisualQuestionAnswering")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            VQA
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "DocumentQuestionAnswering")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Doc QA
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "VideoTextToText")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Video to Text
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "VisualDocumentRetrieval")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Vis. Doc Retrieval
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "AnyToAny")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Any to Any
          </div>
        </div>

        {/* Operational Nodes - Computer Vision */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Computer Vision
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for Computer Vision nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "DepthEstimation")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Depth Est.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageClassification")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ObjectDetection")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Obj. Detect.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageSegmentation")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img Segm.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextToImage")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text2Img
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageToText")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img2Text
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageToImage")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img2Img
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageToVideo")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img2Video
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "UnconditionalImageGeneration")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Uncond. Img Gen.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "VideoClassification")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Vid Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextToVideo")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text2Video
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "ZeroShotImageClassification")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Zero-Shot Img Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "MaskGeneration")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Mask Gen.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "ZeroShotObjectDetection")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Zero-Shot Obj Detect.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextTo3D")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text23D
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ImageTo3D")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img23D
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "ImageFeatureExtraction")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Img Feat. Extract.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "KeypointDetection")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Keypoint Detect.
          </div>
        </div>

        {/* Operational Nodes - Audio */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Audio
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for Audio nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextToSpeech")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text2Speech
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TextToAudio")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Text2Audio
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "AutomaticSpeechRecognition")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            ASR
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "AudioToAudio")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Audio2Audio
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "AudioClassification")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Audio Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) =>
              onDragStart(event, "VoiceActivityDetection")
            }
            draggable
            style={{ ...badgeNodeStyle }}
          >
            VAD
          </div>
        </div>

        {/* Operational Nodes - Tabular */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Tabular
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for Tabular nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TabularClassification")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Tab. Classif.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TabularRegression")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Tab. Regr.
          </div>
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "TimeSeriesForecasting")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Time Series
          </div>
        </div>

        {/* Operational Nodes - Reinforcement Learning */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Reinforcement Learning
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for Reinforcement Learning nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "ReinforcementLearning")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            RL
          </div>
        </div>

        {/* Operational Nodes - Other */}
        <div
          className="sidebar-group-title text-zinc-400 mt-4 mb-1 text-xs uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Other
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {" "}
          {/* Flexbox container for Other nodes */}
          <div
            className="dndnode badge bg-zinc-700 text-gray-200 rounded-full p-2 cursor-grab shadow-md hover:bg-zinc-600 transition duration-200 text-sm"
            onDragStart={(event) => onDragStart(event, "GraphMachineLearning")}
            draggable
            style={{ ...badgeNodeStyle }}
          >
            Graph ML
          </div>
        </div>
      </div>
      <div
        className={
          "text-xs bg-zinc-900 backdrop-blur-md transition-all rounded-t-lg py-4 px-2 h-20 flex flex-col gap-1.5 overflow-hidden " +
          (runningPercent !== null ? "h-30 bg-zinc-950" : "")
        }
      >
        <div className="flex flex-row gap-1">
          <input
            className="bg-transparent outline-none w-[50%]"
            placeholder="filename"
            value="example_workflow"
            readOnly={true}
          />
          <button className="hover:bg-zinc-800 px-2 rounded">saved</button>
          <button className="hover:bg-zinc-800 px-2 rounded" onClick={run}>
            {runningPercent === null ? "run" : "stop"}
          </button>
          <button className="hover:bg-zinc-800 px-2 rounded">
            <FiMenu />
          </button>
        </div>
        <div className="w-full h-1.5 bg-zinc-600 rounded-full">
          <div
            className="h-full bg-white animate-pulse transition-all rounded-full"
            style={{ width: `${runningPercent}%` }}
          ></div>
        </div>
      </div>
    </aside>
  );
};

const badgeNodeStyle = {
  backgroundColor: "var(--panel-bg-lighter)",
  color: "var(--text-primary)",
  boxShadow: "0 2px 4px var(--shadow-color)",
  hoverBackgroundColor: "var(--panel-bg)",
  fontSize: "0.8rem", // Adjust font size for badges
  padding: "0.5rem 0.75rem", // Adjust padding for badges
  borderRadius: "9999px", // Make them rounded badges
};

export default Sidebar;
