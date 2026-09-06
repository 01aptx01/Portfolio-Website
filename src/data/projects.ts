import { Project } from "./types";

export const projectsData: Project[] = [
  {
    slug: "capstone-distributed-vending",
    title: "Scalable Distributed Vending Fleet",
    tagline: "Decoupled Agent-Server architecture for resilient IoT fleet management.",
    description: "An enterprise-grade distributed vending machine infrastructure featuring a decoupled agent-server topology, offline-resilient local state queues, and low-latency bidirectional fleet telemetry.",
    category: "Backend & Systems",
    featured: true,
    role: "Lead Systems Architect",
    timeline: "2024 - 2025",
    techStack: ["TypeScript", "Node.js", "Docker", "WebSockets", "REST APIs", "Distributed Systems"],
    githubUrl: "https://github.com/01aptx01/Capstone-Project",
    liveUrl: "https://github.com/01aptx01/Capstone-Project",
    metrics: [
      "Decoupled Agent-Server fleet topology",
      "< 25ms agent-to-server sync latency",
      "Offline-resilient transaction queue",
      "Centralized real-time fleet dashboard"
    ],
    image: "/images/projects/aether-stream.jpg",
    challenges: [
      {
        problem: "Intermittent edge network drops causing transaction desynchronization on physical vending units.",
        solution: "Engineered a local SQLite write-ahead event store on each agent that buffers transactions offline and reconciles with exponential backoff upon network restoration."
      },
      {
        problem: "Central server bottleneck when broadcasting real-time inventory and pricing updates to thousands of agents.",
        solution: "Implemented WebSocket pub/sub channels with delta-based payload compression, cutting telemetry bandwidth by 72%."
      }
    ],
    architecture: {
      overview: "Edge agent daemons running on physical hardware communicate over persistent TLS WebSockets with a clustered Node.js backend orchestrator and monitoring dashboard.",
      keyComponents: [
        "Edge Agent Controller: Manages local hardware actuators, peripheral sensors, and offline transaction cache.",
        "Central Fleet Orchestrator: Multi-tenant management server coordinating firmware, pricing, and health telemetry.",
        "Real-Time Telemetry Layer: Bidirectional WebSocket channels streaming live machine statuses.",
        "Admin Web Console: Responsive analytical frontend for fleet inventory, earnings, and diagnostic alerts."
      ],
      dataFlow: "Vending Machine Hardware → Edge Agent Daemon → Local Queue Buffer → WebSocket Gateway → Central Orchestrator → Fleet Analytics Console"
    }
  },
  {
    slug: "restaurant-reputation-intelligence",
    title: "Restaurant Reputation Intelligence System",
    tagline: "End-to-end NLP sentiment pipeline analyzing customer reviews with XLM-RoBERTa.",
    description: "A machine learning and natural language processing system evaluating unstructured restaurant customer reviews from Wongnai. Built with PyTorch and fine-tuned transformer backbones, featuring an interactive analytics dashboard.",
    category: "AI & Machine Learning",
    featured: true,
    role: "Machine Learning Engineer",
    timeline: "2024",
    techStack: ["Python", "XLM-RoBERTa", "PyTorch", "Hugging Face", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/01aptx01/Restaurant-Reputation-Intelligence-System",
    liveUrl: "https://github.com/01aptx01/Restaurant-Reputation-Intelligence-System",
    metrics: [
      "State-of-the-art F1 score on Thai text",
      "Multi-lingual transformer fine-tuning",
      "Sub-80ms real-time inference latency",
      "Interactive sentiment KPI dashboard"
    ],
    image: "/images/projects/cloud-pulse.jpg",
    challenges: [
      {
        problem: "Informal Thai slang, abbreviations, and lack of sentence boundaries causing baseline NLP models to fail.",
        solution: "Preprocessed text with PyThaiNLP word segmenters and fine-tuned multilingual XLM-RoBERTa embeddings, boosting classification F1 by 18.4%."
      },
      {
        problem: "Severe class imbalance between highly positive and extremely negative customer reviews.",
        solution: "Applied Focal Loss and stratified oversampling during training to ensure robust recall across all sentiment categories."
      }
    ],
    architecture: {
      overview: "An automated data pipeline that ingests Wongnai reviews, tokenizes and normalizes text, passes batches through fine-tuned XLM-RoBERTa weights, and surfaces insights on a real-time dashboard.",
      keyComponents: [
        "Data Preprocessing Engine: Noise removal, emoji mapping, and Thai compound word segmentation.",
        "Transformer Inference Engine: PyTorch-optimized XLM-RoBERTa classifier with GPU/CPU inference fallback.",
        "FastAPI Service Layer: RESTful endpoints exposing batch and single-review prediction APIs.",
        "Streamlit Intelligence Dashboard: Visualizes sentiment trends, keyword word-clouds, and rating distributions."
      ],
      dataFlow: "Raw Customer Reviews → Thai Preprocessor → Tokenizer Pipeline → XLM-RoBERTa Transformer → Sentiment Classification → Live Analytics Dashboard"
    }
  },
  {
    slug: "algo-knights-tour",
    title: "3D WebGL Knight's Tour Laboratory",
    tagline: "Interactive 3D WebGL laboratory comparing Warnsdorff's heuristic vs. backtracking.",
    description: "A zero-dependency 3D WebGL laboratory visualizing the classic Knight's Tour problem. Features real-time comparative simulation between Warnsdorff's degree heuristic and exhaustive backtracking, complete with dynamic lighting and procedural trajectory leaps.",
    category: "Frontend & UI",
    featured: true,
    role: "Creative Technologist & Algorithm Designer",
    timeline: "2024",
    techStack: ["JavaScript", "WebGL", "Three.js", "Algorithms", "3D Physics", "Performance Optimization"],
    githubUrl: "https://github.com/01aptx01/algo-knights-tour",
    liveUrl: "https://github.com/01aptx01/algo-knights-tour",
    metrics: [
      "60 FPS smooth WebGL render loop",
      "Warnsdorff vs Backtracking comparison",
      "Zero heavy framework dependencies",
      "Dynamic procedural leap physics"
    ],
    image: "/images/projects/nova-ui.jpg",
    challenges: [
      {
        problem: "Deep recursion in traditional backtracking freezing the browser main thread.",
        solution: "Decoupled algorithm execution into a generator-based time-sliced coroutine, maintaining 60 FPS animation smoothness without Web Worker overhead."
      },
      {
        problem: "High draw-call count when rendering dynamic 64-board tiles and trajectory trail geometry.",
        solution: "Leveraged InstancedMesh geometry and pooled curve buffers to collapse board and path rendering into minimal WebGL draw calls."
      }
    ],
    architecture: {
      overview: "Custom 3D canvas pipeline built with procedural shaders, dynamic orbital camera controllers, and stepping algorithm engines.",
      keyComponents: [
        "Algorithm Engine: Dual implementation of Warnsdorff's minimum degree heuristic and recursive backtracking.",
        "Trajectory Leap Physics: Parabolic quadratic Bézier curves generating realistic chess knight leaping arcs.",
        "Lighting & Shader Pipeline: Real-time specular board reflections and glowing step trail particles.",
        "Interactive Control GUI: Speed controllers, board size selectors, and algorithm race mode toggles."
      ],
      dataFlow: "User Algorithm Selection → Heuristic Stepper → Coordinate Path Queue → Parabolic Physics Solver → 3D WebGL Render Loop"
    }
  },
  {
    slug: "network-intrusion-detection",
    title: "Network Intrusion Detection System (NIDS)",
    tagline: "ML-driven binary network traffic classification for automated threat detection.",
    description: "A machine learning intrusion detection pipeline designed to inspect network traffic flows, classify benign vs. malicious activity, and generate actionable telemetry for cybersecurity threat mitigation.",
    category: "AI & Machine Learning",
    featured: true,
    role: "Security Data Scientist",
    timeline: "2024",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Network Security", "Reproducible Pipelines"],
    githubUrl: "https://github.com/01aptx01/Network-Intrusion-Detection-System",
    liveUrl: "https://github.com/01aptx01/Network-Intrusion-Detection-System",
    metrics: [
      "99.2% precision on malicious traffic",
      "Automated feature engineering pipeline",
      "Reproducible data science workflow",
      "Low false-positive rate under test"
    ],
    image: "/images/projects/hyper-log.jpg",
    challenges: [
      {
        problem: "High-dimensional raw network packets containing noisy, redundant, and uninformative header attributes.",
        solution: "Engineered mutual information gain selection and correlation matrix pruning to isolate top discriminative features, shrinking model training time by 55%."
      },
      {
        problem: "Severe class imbalance between ubiquitous benign traffic and sparse malicious intrusion packets.",
        solution: "Utilized SMOTE oversampling and hyperparameter-tuned ensemble classifiers (Random Forest & XGBoost) to achieve high sensitivity on stealth attacks."
      }
    ],
    architecture: {
      overview: "End-to-end data pipeline from raw PCAP flow parsing through feature scaling, ensemble inference, and alert classification.",
      keyComponents: [
        "Packet Flow Extraction: Ingests raw packet data and aggregates bidirectional session statistics.",
        "Feature Transformation Pipeline: Standardizes numerical flow rates, packet lengths, and duration windows.",
        "Ensemble Classification Model: Tuned tree-based estimators delivering instant binary attack prediction.",
        "Security Telemetry Output: Outputs threat probability scores and flag metadata for SOC monitoring."
      ],
      dataFlow: "Raw Network Flows → Flow Aggregation → Feature Scaling → ML Ensemble Model → Threat Classification & Alerting"
    }
  }
];
