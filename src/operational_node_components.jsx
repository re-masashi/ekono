import React, { memo, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  FiFile,
  FiCloud,
  FiActivity,
  FiDatabase,
  FiCode,
  FiX,
  FiImage,
  // FiAudio,
  FiVideo,
  FiFileText,
  FiCpu,
  FiSearch,
  FiList,
  // FiTranslate,
  FiEdit,
  FiSpeaker,
  FiMic,
  FiEye,
  FiGrid,
  FiBookOpen,
  FiLayers,
  FiKey,
  FiGitBranch,
  // FiLearning,
} from "react-icons/fi";
import useDnD from "./editor";

export const NODES_CONFIG = {
  AudioTextToText: {
    name: "Audio to Text",
    arguments: ["audio"],
    outputs: ["text"],
    models: ["Whisper", "Google Cloud Speech-to-Text", "AssemblyAI"], // Example models
  },
  ImageTextToText: {
    name: "Image to Text",
    arguments: ["image"],
    outputs: ["text"],
    models: ["CLIP", "BLIP", "Vision Transformer"], // Example models
  },
  VisualQuestionAnswering: {
    name: "Visual Question Answering",
    arguments: ["image", "question"],
    outputs: ["answer"],
    models: ["VQAv2 Model", "ViLT", "VisualBERT"], // Example models
  },
  DocumentQuestionAnswering: {
    name: "Document Question Answering",
    arguments: ["document", "question"],
    outputs: ["answer"],
    models: ["LayoutLM", "Donut", "TAPAS"], // Example models
  },
  VideoTextToText: {
    name: "Video to Text",
    arguments: ["video"],
    outputs: ["text"],
    models: ["VideoCLIP", "TimeSformer", "MSR-VTT"], // Example models
  },
  VisualDocumentRetrieval: {
    name: "Visual Document Retrieval",
    arguments: ["query_image", "document_database"],
    outputs: ["relevant_documents"],
    models: ["CLIP Retrieval", "Image-Text Embedding Model"], // Example models
  },
  AnyToAny: {
    name: "Any to Any",
    arguments: ["input"],
    outputs: ["output"],
    models: ["Generic Model"], // Example - could be a very flexible model
  },
  DepthEstimation: {
    name: "Depth Estimation",
    arguments: ["image"],
    outputs: ["depth_map"],
    models: ["MiDaS", "DepthFormer", "ManyDepth"], // Example models
  },
  ImageClassification: {
    name: "Image Classification",
    arguments: ["image"],
    outputs: ["labels"],
    models: ["ResNet", "EfficientNet", "MobileNetV2"], // Example models
  },
  ObjectDetection: {
    name: "Object Detection",
    arguments: ["image"],
    outputs: ["bounding_boxes", "labels"],
    models: ["YOLOv5", "Faster R-CNN", "SSD"], // Example models
  },
  ImageSegmentation: {
    name: "Image Segmentation",
    arguments: ["image"],
    outputs: ["segmentation_mask"],
    models: ["U-Net", "DeepLab", "Mask R-CNN"], // Example models
  },
  TextToImage: {
    name: "Text to Image",
    arguments: ["text_prompt"],
    outputs: ["image"],
    models: ["Stable Diffusion", "DALL-E 2", "Imagen"], // Example models
  },
  ImageToText: {
    name: "Image to Text",
    arguments: ["image"],
    outputs: ["text_description"],
    models: ["BLIP", "CLIP", "Vision Transformer"], // Example models
  },
  ImageToImage: {
    name: "Image to Image",
    arguments: ["input_image", "style_image"],
    outputs: ["output_image"],
    models: ["StyleGAN", "GauGAN", "CycleGAN"], // Example models
  },
  ImageToVideo: {
    name: "Image to Video",
    arguments: ["image"],
    outputs: ["video"],
    models: ["ModelScope Text-to-Video", "RunwayML Gen-1", "Pika Labs"], // Example Models
  },
  UnconditionalImageGeneration: {
    name: "Unconditional Image Generation",
    arguments: [], // or maybe ["seed"] if applicable
    outputs: ["image"],
    models: ["GAN", "VQ-VAE", "Autoregressive Models"], // Example models
  },
  VideoClassification: {
    name: "Video Classification",
    arguments: ["video"],
    outputs: ["labels"],
    models: ["3D-ResNet", "SlowFast Networks", "Timesformer"], // Example models
  },
  TextToVideo: {
    name: "Text to Video",
    arguments: ["text_prompt"],
    outputs: ["video"],
    models: ["Make-A-Video", "Imagen Video", "Phenaki"], // Example Models
  },
  ZeroShotImageClassification: {
    name: "Zero-Shot Image Classification",
    arguments: ["image", "candidate_labels"],
    outputs: ["predicted_label"],
    models: ["CLIP", "VL-BERT", "DeViL"], // Example models
  },
  MaskGeneration: {
    name: "Mask Generation",
    arguments: ["image"],
    outputs: ["mask"],
    models: [
      "SAM (Segment Anything Model)",
      "DeepMask",
      "Boundary-preserving Mask R-CNN",
    ], // Example models
  },
  ZeroShotObjectDetection: {
    name: "Zero-Shot Object Detection",
    arguments: ["image", "classes_to_detect"],
    outputs: ["detected_objects"],
    models: ["OWL-ViT", "Detic", "GLIP"], // Example models
  },
  TextTo3D: {
    name: "Text to 3D",
    arguments: ["text_prompt"],
    outputs: ["3d_model"],
    models: ["Point-E", "DreamFusion", "Magic3D"], // Example models
  },
  ImageTo3D: {
    name: "Image to 3D",
    arguments: ["image"],
    outputs: ["3d_model"],
    models: ["Neural Radiance Fields (NeRF)", "Mesh R-CNN", "Pixel2Mesh"], // Example models
  },
  ImageFeatureExtraction: {
    name: "Image Feature Extraction",
    arguments: ["image"],
    outputs: ["image_features"],
    models: ["ResNet", "VGG", "EfficientNet"], // Common Feature Extractors
  },
  KeypointDetection: {
    name: "Keypoint Detection",
    arguments: ["image"],
    outputs: ["keypoints"],
    models: ["OpenPose", "HRNet", "Simple Baselines"], // Example models
  },
  TextClassification: {
    name: "Text Classification",
    arguments: ["text"],
    outputs: ["label"],
    models: ["BERT", "RoBERTa", "DistilBERT"], // Common Transformers
  },
  TokenClassification: {
    name: "Token Classification",
    arguments: ["text"],
    outputs: ["tokens_with_labels"],
    models: ["BERT-CRF", "Flair", "SpaCy"], // Example models
  },
  TableQuestionAnswering: {
    name: "Table Question Answering",
    arguments: ["table", "question"],
    outputs: ["answer"],
    models: ["TAPAS", " টেবিল-BERT", "SQLNet"], // Example models
  },
  QuestionAnswering: {
    name: "Question Answering",
    arguments: ["context_text", "question"],
    outputs: ["answer"],
    models: ["BERT", "RoBERTa", "ELECTRA"], // Common QA Models
  },
  ZeroShotClassification: {
    name: "Zero-Shot Classification",
    arguments: ["text", "candidate_labels"],
    outputs: ["predicted_label"],
    models: ["Zero-Shot CLIP", "BART", "GPT-3"], // Example models
  },
  Translation: {
    name: "Translation",
    arguments: ["text", "target_language"],
    outputs: ["translated_text"],
    models: ["MarianMT", "T5", "NLLB-200"], // Example models
  },
  Summarization: {
    name: "Summarization",
    arguments: ["text"],
    outputs: ["summary"],
    models: ["BART", "T5", "Pegasus"], // Abstractive Summarization Models
  },
  NLPFeatureExtraction: {
    name: "NLP Feature Extraction",
    arguments: ["text"],
    outputs: ["text_features"],
    models: ["Word2Vec", "GloVe", "FastText"], // Common Word Embeddings
  },
  TextGeneration: {
    name: "Text Generation",
    arguments: ["text_prompt"],
    outputs: ["generated_text"],
    models: ["GPT-3", "GPT-2", "Transformer-XL"], // Generative Language Models
  },
  Text2TextGeneration: {
    name: "Text-to-Text Generation",
    arguments: ["input_text"],
    outputs: ["output_text"],
    models: ["T5", "BART", "Seq2Seq"], // General Text-to-Text Models
  },
  FillMask: {
    name: "Fill Mask",
    arguments: ["masked_text"],
    outputs: ["filled_text"],
    models: ["BERT", "RoBERTa", "DistilBERT"], // Masked Language Models
  },
  SentenceSimilarity: {
    name: "Sentence Similarity",
    arguments: ["sentence1", "sentence2"],
    outputs: ["similarity_score"],
    models: ["Sentence-BERT", "Universal Sentence Encoder", "InferSent"], // Sentence Embedding Models
  },
  TextToSpeech: {
    name: "Text to Speech",
    arguments: ["text"],
    outputs: ["audio"],
    models: ["Tacotron 2", "FastSpeech 2", "WaveNet"], // Popular TTS Models
  },
  TextToAudio: {
    name: "Text to Audio",
    arguments: ["text"],
    outputs: ["audio"],
    models: ["Bark", "AudioLDM", "VALLE-X"], // Example Audio Generation Models
  },
  AutomaticSpeechRecognition: {
    name: "Automatic Speech Recognition",
    arguments: ["audio"],
    outputs: ["transcription"],
    models: ["Whisper", "DeepSpeech", "Kaldi"], // ASR Frameworks/Models
  },
  AudioToAudio: {
    name: "Audio to Audio",
    arguments: ["input_audio", "style_audio"], // Example - adjust based on function
    outputs: ["output_audio"],
    models: ["Voice Conversion Model", "Audio Style Transfer Model"], // Generic placeholders
  },
  AudioClassification: {
    name: "Audio Classification",
    arguments: ["audio"],
    outputs: ["labels"],
    models: ["PANNs", "VGGish", "YamNet"], // Audio Event Classification Models
  },
  VoiceActivityDetection: {
    name: "Voice Activity Detection",
    arguments: ["audio"],
    outputs: ["voice_segments"],
    models: ["pyannote.audio", "WebRTC VAD", "Silero VAD"], // VAD Tools/Models
  },
  TabularClassification: {
    name: "Tabular Classification",
    arguments: ["tabular_data", "target_feature"],
    outputs: ["predicted_class"],
    models: ["Logistic Regression", "Random Forest", "Gradient Boosting"], // Classic ML Models
  },
  TabularRegression: {
    name: "Tabular Regression",
    arguments: ["tabular_data", "target_feature"],
    outputs: ["predicted_value"],
    models: ["Linear Regression", "Support Vector Regression", "XGBoost"], // Classic ML Models
  },
  TimeSeriesForecasting: {
    name: "Time Series Forecasting",
    arguments: ["time_series_data", "forecast_horizon"],
    outputs: ["forecast"],
    models: ["ARIMA", "LSTM", "Prophet"], // Time Series Models
  },
  ReinforcementLearning: {
    name: "Reinforcement Learning",
    arguments: ["environment_state"], // Could be more complex
    outputs: ["action", "next_state"], // Or just "agent_policy"
    models: ["PPO", "DQN", "A3C"], // Common RL Algorithms
  },
  GraphMachineLearning: {
    name: "Graph Machine Learning",
    arguments: ["graph_data"],
    outputs: ["graph_embeddings"], // Or task-specific outputs
    models: ["Graph Neural Networks (GNNs)", "GraphSAGE", "GAT"], // GNN Architectures
  },
  HumanizeText: {
    name: "Text Humanization",
    arguments: ["text"],
    outputs: ["humanized_text"], // Or task-specific outputs
    models: ["Ekono TextHum", "Ekono TextHum Pro"], // GNN Architectures
  },
  GenericOp: {
    // Default for the Generic Component itself
    name: "Generic Operation",
    arguments: ["input1", "input2"], // Example defaults
    outputs: ["output"], // Example default
    models: ["Custom Model", "Pre-trained Model", "Algorithm"], // Placeholders
  },
};

// console.log(
//   Object.keys(NODES_CONFIG)
//     .map((k, v) => k)
//     .join("\n"),
// );

// export default GenericOpNodeComponent;
