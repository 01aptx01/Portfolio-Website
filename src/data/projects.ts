import { Project } from "./types";

export const projectsData: Project[] = [
  {
    slug: "aether-stream",
    title: "AetherStream Engine",
    tagline: "High-throughput distributed event streaming and real-time processing pipeline.",
    description: "A fault-tolerant distributed streaming engine capable of ingesting 120k events/sec with sub-millisecond serialization latency and reliable WebSocket broadcasting.",
    category: "Backend & Systems",
    featured: true,
    role: "Lead Systems Architect",
    timeline: "2024",
    techStack: ["Go", "Apache Kafka", "WebSockets", "Redis", "Docker", "gRPC"],
    githubUrl: "https://github.com/example/aether-stream",
    liveUrl: "https://aether-stream-demo.example.com",
    metrics: [
      "120,000 events/sec peak ingestion",
      "< 1.8ms median pipeline latency",
      "Zero message loss across partition failovers",
      "99.99% service availability"
    ],
    image: "/images/projects/aether-stream.jpg",
    challenges: [
      {
        problem: "Network saturation under high concurrency with standard JSON payloads.",
        solution: "Switched to Protocol Buffers with memory-pooled byte buffers, cutting payload sizes by 64% and CPU serialization overhead by 48%."
      },
      {
        problem: "Consumer group rebalancing lag during dynamic node scaling.",
        solution: "Implemented cooperative sticky partition assignment strategies, shrinking rebalancing down-times from 4.2s to under 180ms."
      }
    ],
    architecture: {
      overview: "Multi-node cluster running Go-based ingestion brokers fronted by an Envoy edge gateway, streaming into Kafka partitions with Redis-cached state projections.",
      keyComponents: [
        "Envoy Edge Proxy: TLS termination, rate limiting, and HTTP/2 multiplexing.",
        "Broker Nodes: Ring-buffered ingestion workers handling schema validation and deduplication.",
        "Kafka Log Layer: 3-replica partitioned storage topic topology.",
        "WebSocket Consumer Gateway: Fanout broadcaster managing 40k concurrent client connections."
      ],
      dataFlow: "Clients → Edge Gateway → Ingestion Broker → Memory Buffer → Kafka Topic → Consumer Gateway → Real-time Subscribers"
    }
  },
  {
    slug: "nova-ui",
    title: "Nova Design System",
    tagline: "Accessible component studio and physics-based micro-interaction engine.",
    description: "A production design system and component architecture powering multi-platform web applications with fluid physics, AAA accessibility, and zero-runtime CSS tokens.",
    category: "Frontend & UI",
    featured: true,
    role: "Frontend Architect",
    timeline: "2024",
    techStack: ["Next.js", "TypeScript", "CSS Modules", "Framer Physics", "Radix UI", "Storybook"],
    githubUrl: "https://github.com/example/nova-ui",
    liveUrl: "https://nova-ui-preview.example.com",
    metrics: [
      "100% WCAG 2.1 AAA accessibility score",
      "60 FPS smooth physics animations on mobile",
      "< 12kB gzipped core bundle size",
      "Adopted across 6 production web applications"
    ],
    image: "/images/projects/nova-ui.jpg",
    challenges: [
      {
        problem: "Layout shifts and jank caused by heavy JavaScript animation libraries.",
        solution: "Re-engineered animations using hardware-accelerated CSS transforms and composited layer boundaries with FLIP calculations."
      },
      {
        problem: "Theme synchronization flickering during SSR hydration.",
        solution: "Engineered an inline CSS custom-property injection script executing prior to DOM render, eliminating flash of incorrect theme (FOIT)."
      }
    ],
    architecture: {
      overview: "Headless primitives wrapped with customizable design tokens, featuring compile-time type generation for color contrasts and interactive states.",
      keyComponents: [
        "Token Engine: Semantic CSS variables with automatic dark/dawn mode mathematical contrast verification.",
        "Headless Primitives: Full keyboard navigation, ARIA roles, and screen reader announcements.",
        "Interaction Layer: Pointer-event driven gesture hooks with inertia and springs.",
        "Documentation Playground: Interactive sandbox with real-time prop tweaking and code export."
      ]
    }
  },
  {
    slug: "cloud-pulse",
    title: "CloudPulse Platform",
    tagline: "Unified infrastructure observability and distributed tracing dashboard.",
    description: "An end-to-end telemetry platform aggregating metrics, logs, and distributed traces from microservices with anomaly detection and interactive topology graphs.",
    category: "Full-Stack",
    featured: true,
    role: "Full-Stack Engineer",
    timeline: "2023 - 2024",
    techStack: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "ClickHouse", "TailwindCSS"],
    githubUrl: "https://github.com/example/cloud-pulse",
    liveUrl: "https://cloudpulse-preview.example.com",
    metrics: [
      "Sub-200ms query times over 50M log entries",
      "Real-time canvas rendering of 1,000+ service nodes",
      "Reduced incident Mean-Time-To-Detect (MTTD) by 45%",
      "Processed 15TB telemetry monthly"
    ],
    image: "/images/projects/cloud-pulse.jpg",
    challenges: [
      {
        problem: "Rendering large-scale distributed service maps caused severe browser frame drops.",
        solution: "Migrated SVG graph renderers to an off-screen HTML5 Canvas with quadtree spatial indexing for instant viewport culling."
      },
      {
        problem: "Aggregation queries across historical time-series data choked the relational database.",
        solution: "Introduced ClickHouse columnar storage for time-series logs, reducing query response times from 14s to 120ms."
      }
    ],
    architecture: {
      overview: "Hybrid architecture utilizing PostgreSQL for transactional metadata and ClickHouse for columnar telemetry, served via Apollo GraphQL federated schemas.",
      keyComponents: [
        "Telemetry Ingest API: Fastify ingestion service with batch buffering.",
        "Columnar Database: ClickHouse partition clusters with TTL data retention policies.",
        "Federated GraphQL API: Flexible querying for dashboards, alerts, and node health.",
        "Observability Dashboard: React application with virtualized grids and WebGL topology visualization."
      ]
    }
  },
  {
    slug: "hyper-log",
    title: "HyperLog Query Store",
    tagline: "Append-only distributed immutable log and query engine.",
    description: "A distributed log engine featuring deterministic replay, write-ahead logging (WAL), snapshot compaction, and lightning-fast segment indexing.",
    category: "Backend & Systems",
    featured: false,
    role: "Core Contributor",
    timeline: "2023",
    techStack: ["TypeScript", "Node.js", "Redis", "Docker", "Jest", "Benchmarking"],
    githubUrl: "https://github.com/example/hyper-log",
    liveUrl: "https://hyperlog-demo.example.com",
    metrics: [
      "25k sequential writes/sec per single core",
      "CRC32 checksum verified data integrity",
      "100% test coverage on recovery mechanisms",
      "Deterministic crash recovery within 1.2s"
    ],
    image: "/images/projects/hyper-log.jpg",
    challenges: [
      {
        problem: "Disk I/O bottlenecks during continuous write-ahead logging.",
        solution: "Implemented grouped write batching and OS page cache flushing (`fdatasync`) in tuned intervals, boosting write throughput 3.2x."
      },
      {
        problem: "Log file bloat requiring extensive memory during state reconstruction.",
        solution: "Designed periodic copy-on-write compaction producing compacted snapshots and pruning redundant mutation events."
      }
    ],
    architecture: {
      overview: "Single-threaded event-loop architecture with asynchronous file segment buffers and binary offset indices.",
      keyComponents: [
        "WAL Writer: Sequential append-only segment writer with CRC32 integrity verification.",
        "Offset Indexer: In-memory sparse index mapping timestamp offsets to byte positions.",
        "Compaction Worker: Background thread generating point-in-time state snapshots."
      ]
    }
  }
];
