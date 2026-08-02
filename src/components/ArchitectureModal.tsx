import React, { useState } from 'react';
import { X, Server, Database, Globe, Cpu, ArrowRight, Activity, Cpu as ChipIcon, HelpCircle } from 'lucide-react';

interface NodeInfo {
  id: string;
  label: string;
  type: 'client' | 'server' | 'database' | 'media' | 'pipeline' | 'gateway';
  description: string;
  tech: string;
  details: string[];
}

const FUZZTUBE_NODES: NodeInfo[] = [
  {
    id: 'client',
    label: 'Client (Web UI)',
    type: 'client',
    tech: 'React, TypeScript, CSS',
    description: 'Single-page application featuring smooth scrolling, interactive video grids, and notifications.',
    details: [
      'Deployed on Netlify globally with edge CDN hosting.',
      'Communicates with Express API via structured REST endpoints.',
      'Handles video uploading chunk-by-chunk with stateful progress feedback.',
      'Secures client-side routing and parses session state via stored JWTs.'
    ]
  },
  {
    id: 'pipeline',
    label: 'GitHub Actions CI/CD',
    type: 'pipeline',
    tech: 'YAML, Git, Docker Hub',
    description: 'Automation server executing builds and unit validations on push events.',
    details: [
      'Triggers instantly on git push to the main branch.',
      'Installs cached node dependencies, runs ESLint code validations, and executes Newman API tests.',
      'Triggers parallel multi-stage Docker builds to compress image volumes.',
      'Pushes build images automatically to Docker Hub, triggering downstream deployment hooks.'
    ]
  },
  {
    id: 'api',
    label: 'Express API (Server)',
    type: 'gateway',
    tech: 'Node.js, Express, JWT, MVC',
    description: 'Core web API microservice managing business logic, notification broadcasts, and db transactions.',
    details: [
      'Encapsulated in a Docker container, deployed as a containerized web service on Render.',
      'Implements secure MVC layout separating route control from database queries.',
      'Enforces JWT authentication guards and hashes passwords using bcrypt.',
      'Configured with production CORS middleware and compression for fast payload speeds.'
    ]
  },
  {
    id: 'db',
    label: 'MongoDB Atlas',
    type: 'database',
    tech: 'MongoDB, Mongoose ORM',
    description: 'Cloud document database holding users, video info, likes, comments, and notifications.',
    details: [
      'Configured with index optimizations on common query paths (like search terms & feed timelines).',
      'Uses Mongoose schema validations to verify document consistency before saving.',
      'Organizes database queries with connection pooling, keeping request latencies under 50ms.'
    ]
  },
  {
    id: 'media',
    label: 'Cloudinary CDN',
    type: 'media',
    tech: 'Cloudinary SDK',
    description: 'Media management service that stores uploaded video assets and handles transcoding.',
    details: [
      'Supports high-speed video uploads directly through API stream pipes.',
      'Transcodes raw video streams into mobile/desktop friendly display resolutions.',
      'Uses global edge networks to cached files, delivering buffer-free stream streaming.'
    ]
  }
];

const TRAFFIC_NODES: NodeInfo[] = [
  {
    id: 'camera',
    label: 'Intersection Cameras',
    type: 'client',
    tech: 'RTSP Video Streams',
    description: 'Physical or simulated cameras capturing visual feed from multiple intersection approaches.',
    details: [
      'Pipes raw frame inputs into localized edge computing nodes.',
      'Feeds frame snapshots at constant intervals to avoid network congestions.'
    ]
  },
  {
    id: 'edge',
    label: 'Edge AI Processing',
    type: 'server',
    tech: 'Python, OpenCV, NumPy',
    description: 'Localized vision node executing contour detection algorithms to identify and count vehicles.',
    details: [
      'Applies background subtraction to isolate moving traffic objects.',
      'Estimates vehicle density across lanes in less than 30ms per frame.',
      'Dynamically calculates adjusted signal duration depending on density ratios.',
      'Aggregates traffic data points and routes them to backend database queues.'
    ]
  },
  {
    id: 'gateway',
    label: 'REST API Middleware',
    type: 'gateway',
    tech: 'Express.js, REST APIs',
    description: 'Backend gateway orchestrating the communication between Edge analytic nodes and dashboards.',
    details: [
      'Maintains active endpoints for nodes to write real-time density numbers.',
      'Aggregates data across intersections to build historic traffic flow reports.'
    ]
  },
  {
    id: 'dashboard',
    label: 'React Control Center',
    type: 'client',
    tech: 'React, Tailwind, Recharts',
    description: 'Administrative client dashboard visualising flow statistics, active timing adjustments, and device health.',
    details: [
      'Uses dynamic maps to pinpoint camera and intersection statuses.',
      'Graphs flow bottlenecks and computed timings using Recharts visual modules.',
      'Provides security controls for system operators to manually override signal phases.'
    ]
  }
];

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: 'fuzztube' | 'traffic';
  projectName: string;
}

export default function ArchitectureModal({ isOpen, onClose, projectId, projectName }: ArchitectureModalProps) {
  const isFuzz = projectId === 'fuzztube';
  const nodes = isFuzz ? FUZZTUBE_NODES : TRAFFIC_NODES;
  const [selectedNode, setSelectedNode] = useState<NodeInfo>(nodes[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl md:h-[550px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/25 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-2/10 text-accent-2">
              <Cpu className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-text-main">System Architecture Visualizer</h3>
              <p className="text-xs text-text-dim">{projectName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="rounded-lg border border-white/10 p-1.5 text-text-dim transition-colors hover:bg-white/5 hover:text-text-main"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Workspace */}
        <div className="grid flex-1 overflow-hidden md:grid-cols-[1.5fr_1fr]">
          {/* Left panel: Diagram Canvas */}
          <div className="relative flex flex-col items-center justify-center bg-black/35 p-6 overflow-y-auto">
            <p className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-wider text-text-dim">
              Interactive Blueprint (Click component to inspect)
            </p>

            {isFuzz ? (
              /* FuzzTube Architecture layout */
              <div className="flex flex-col gap-6 w-full max-w-md items-center py-4">
                {/* CI/CD flow at the top */}
                <button
                  onClick={() => setSelectedNode(nodes.find((n) => n.id === 'pipeline')!)}
                  className={[
                    'group relative flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-all',
                    selectedNode.id === 'pipeline'
                      ? 'border-accent-3 bg-accent-3/10 text-text-main glow-accent-3'
                      : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                  ].join(' ')}
                >
                  <Activity className="h-3.5 w-3.5 text-accent-3" />
                  <span>GitHub Actions CI/CD Pipeline</span>
                  <div className="absolute -bottom-4 left-1/2 h-4 w-px border-l border-dashed border-white/20" />
                </button>

                <div className="h-2" />

                {/* Primary Data Flow: Client <-> Express API <-> DB */}
                <div className="flex flex-col sm:flex-row gap-8 items-center w-full justify-between relative px-2">
                  {/* Client */}
                  <button
                    onClick={() => setSelectedNode(nodes.find((n) => n.id === 'client')!)}
                    className={[
                      'z-10 group flex flex-col items-center justify-center h-20 w-28 rounded-xl border transition-all text-center p-2',
                      selectedNode.id === 'client'
                        ? 'border-accent bg-accent/10 text-text-main'
                        : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                    ].join(' ')}
                  >
                    <Globe className="h-5 w-5 text-accent mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-display text-[11px] font-bold">React Frontend</span>
                    <span className="font-mono text-[8px] text-text-dim mt-0.5">Netlify Edge</span>
                  </button>

                  <div className="absolute left-[28%] right-[28%] h-px border-t border-dashed border-white/20 top-1/2 -translate-y-1/2 hidden sm:block" />

                  {/* API */}
                  <button
                    onClick={() => setSelectedNode(nodes.find((n) => n.id === 'api')!)}
                    className={[
                      'z-10 group flex flex-col items-center justify-center h-20 w-28 rounded-xl border transition-all text-center p-2',
                      selectedNode.id === 'api'
                        ? 'border-accent-2 bg-accent-2/10 text-text-main'
                        : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                    ].join(' ')}
                  >
                    <Server className="h-5 w-5 text-accent-2 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-display text-[11px] font-bold">Express API</span>
                    <span className="font-mono text-[8px] text-text-dim mt-0.5">Render Container</span>
                  </button>

                  <div className="absolute left-[72%] right-[10%] h-px border-t border-dashed border-white/20 top-1/2 -translate-y-1/2 hidden sm:block" />

                  {/* MongoDB */}
                  <button
                    onClick={() => setSelectedNode(nodes.find((n) => n.id === 'db')!)}
                    className={[
                      'z-10 group flex flex-col items-center justify-center h-20 w-28 rounded-xl border transition-all text-center p-2',
                      selectedNode.id === 'db'
                        ? 'border-emerald-400 bg-emerald-400/10 text-text-main'
                        : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                    ].join(' ')}
                  >
                    <Database className="h-5 w-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-display text-[11px] font-bold">MongoDB Atlas</span>
                    <span className="font-mono text-[8px] text-text-dim mt-0.5">Database Cluster</span>
                  </button>
                </div>

                {/* Cloudinary below API */}
                <div className="flex flex-col items-center mt-2 relative">
                  <div className="h-6 w-px border-l border-dashed border-white/20" />
                  <button
                    onClick={() => setSelectedNode(nodes.find((n) => n.id === 'media')!)}
                    className={[
                      'group flex flex-col items-center justify-center h-20 w-28 rounded-xl border transition-all text-center p-2',
                      selectedNode.id === 'media'
                        ? 'border-accent-3 bg-accent-3/10 text-text-main'
                        : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                    ].join(' ')}
                  >
                    <Globe className="h-5 w-5 text-accent-3 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-display text-[11px] font-bold">Cloudinary</span>
                    <span className="font-mono text-[8px] text-text-dim mt-0.5">Media Assets CDN</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Traffic System Architecture Layout */
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xl py-6 relative">
                {/* Cameras */}
                <button
                  onClick={() => setSelectedNode(nodes.find((n) => n.id === 'camera')!)}
                  className={[
                    'z-10 group flex flex-col items-center justify-center h-20 w-24 rounded-xl border transition-all text-center p-2',
                    selectedNode.id === 'camera'
                      ? 'border-accent bg-accent/10 text-text-main'
                      : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                  ].join(' ')}
                >
                  <Globe className="h-5 w-5 text-accent mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-display text-[10px] font-bold">RTSP Cameras</span>
                  <span className="font-mono text-[8px] text-text-dim mt-0.5">Traffic Feed</span>
                </button>

                <ArrowRight className="text-text-dim h-4 w-4 hidden sm:block" />

                {/* Edge Analytics */}
                <button
                  onClick={() => setSelectedNode(nodes.find((n) => n.id === 'edge')!)}
                  className={[
                    'z-10 group flex flex-col items-center justify-center h-20 w-28 rounded-xl border transition-all text-center p-2',
                    selectedNode.id === 'edge'
                      ? 'border-accent-3 bg-accent-3/10 text-text-main'
                      : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                  ].join(' ')}
                >
                  <ChipIcon className="h-5 w-5 text-accent-3 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-display text-[10px] font-bold">Edge AI Node</span>
                  <span className="font-mono text-[8px] text-text-dim mt-0.5">Python + OpenCV</span>
                </button>

                <ArrowRight className="text-text-dim h-4 w-4 hidden sm:block" />

                {/* Gateway */}
                <button
                  onClick={() => setSelectedNode(nodes.find((n) => n.id === 'gateway')!)}
                  className={[
                    'z-10 group flex flex-col items-center justify-center h-20 w-24 rounded-xl border transition-all text-center p-2',
                    selectedNode.id === 'gateway'
                      ? 'border-accent-2 bg-accent-2/10 text-text-main'
                      : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                  ].join(' ')}
                >
                  <Server className="h-5 w-5 text-accent-2 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-display text-[10px] font-bold">REST API</span>
                  <span className="font-mono text-[8px] text-text-dim mt-0.5">Node Gateway</span>
                </button>

                <ArrowRight className="text-text-dim h-4 w-4 hidden sm:block" />

                {/* Dashboard */}
                <button
                  onClick={() => setSelectedNode(nodes.find((n) => n.id === 'dashboard')!)}
                  className={[
                    'z-10 group flex flex-col items-center justify-center h-20 w-28 rounded-xl border transition-all text-center p-2',
                    selectedNode.id === 'dashboard'
                      ? 'border-emerald-400 bg-emerald-400/10 text-text-main'
                      : 'border-white/10 bg-white/[0.02] text-text-muted hover:border-white/20'
                  ].join(' ')}
                >
                  <Globe className="h-5 w-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-display text-[10px] font-bold">Control Center</span>
                  <span className="font-mono text-[8px] text-text-dim mt-0.5">React Client</span>
                </button>
              </div>
            )}
          </div>

          {/* Right panel: Details Sidebar */}
          <div className="flex flex-col border-t border-white/10 bg-bg-card p-5 overflow-y-auto md:border-t-0">
            <h4 className="font-display text-sm font-bold text-text-main flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded bg-accent/15 text-accent">
                <HelpCircle className="h-3.5 w-3.5" />
              </span>
              Component Inspector
            </h4>

            <div className="mt-4 flex-1 space-y-4">
              <div>
                <h5 className="font-display text-lg font-bold text-text-main">
                  {selectedNode.label}
                </h5>
                <p className="mt-1 font-mono text-[11px] text-accent-2">
                  Stack: {selectedNode.tech}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-text-muted">
                {selectedNode.description}
              </p>

              <div className="border-t border-white/5 pt-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-dim mb-2">
                  Engineering Notes
                </p>
                <ul className="space-y-2">
                  {selectedNode.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs text-text-muted">
                      <span className="text-accent mt-0.5 shrink-0">▪</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
