import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, X, CheckCircle2, AlertCircle, Loader2, GitBranch, Terminal } from 'lucide-react';

type StepId = 'checkout' | 'setup' | 'lint' | 'test' | 'docker-build' | 'docker-push' | 'deploy';

type StepInfo = {
  id: StepId;
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  logs: string[];
  durationMs: number;
};

const INITIAL_STEPS: StepInfo[] = [
  {
    id: 'checkout',
    name: 'Checkout Repository',
    status: 'idle',
    durationMs: 900,
    logs: [
      'Initializing git repository...',
      'Setting origin to https://github.com/alokpal17/fuzztube.git',
      'Fetching ref/heads/main...',
      'HEAD is now at 8f72a1b feat: containerize backend and frontend services',
      'Git checkout completed.'
    ]
  },
  {
    id: 'setup',
    name: 'Setup Node.js & Cache',
    status: 'idle',
    durationMs: 1200,
    logs: [
      'Configuring Node.js runtime environment (v20.11.0 LTS)...',
      'Checking package lock file...',
      'Restoring npm package cache from local store...',
      'Found 142 packages cached, matching keys.',
      'npm ci successful. Added 142 packages in 1.1s.',
      '✓ Environment initialized successfully.'
    ]
  },
  {
    id: 'lint',
    name: 'Run ESLint Check',
    status: 'idle',
    durationMs: 1000,
    logs: [
      'Starting code linter...',
      'npx eslint . --ext .js,.ts,.tsx',
      'Scanning 34 files in project src...',
      'No style or syntax violations found.',
      '✓ ESLint passed. Codebase conforms to rules.'
    ]
  },
  {
    id: 'test',
    name: 'API Integration Tests',
    status: 'idle',
    durationMs: 1800,
    logs: [
      'Bootstrapping MERN stack integration testing suite...',
      'Running Newman test suites targeting Express MVC routes...',
      '  ➔ POST /api/v1/users/register - 201 Created (142ms) [PASS]',
      '  ➔ POST /api/v1/users/login - 200 OK (96ms) [PASS]',
      '  ➔ GET /api/v1/videos/feed - 200 OK (110ms) [PASS]',
      '  ➔ POST /api/v1/videos/upload - 201 Created (290ms) [PASS]',
      '  ➔ POST /api/v1/comments - 201 Created (64ms) [PASS]',
      '  ➔ POST /api/v1/subscriptions - 200 OK (52ms) [PASS]',
      '✓ 15 REST API integration test routes completed.',
      '✓ Result: 15/15 passed, 0 failures, 0 warnings.'
    ]
  },
  {
    id: 'docker-build',
    name: 'Docker Multi-Stage Build',
    status: 'idle',
    durationMs: 2200,
    logs: [
      'Parsing local Dockerfiles...',
      'Building Backend Docker image (alokpal17/fuzztube-backend)...',
      '  [1/8] FROM node:20-alpine AS builder',
      '  [2/8] WORKDIR /usr/src/app',
      '  [3/8] COPY package*.json ./',
      '  [4/8] RUN npm ci --only=production',
      '  [5/8] COPY . .',
      '  [6/8] FROM node:20-alpine AS runner',
      '  [7/8] COPY --from=builder /usr/src/app /usr/src/app',
      '  [8/8] CMD ["node", "src/server.js"]',
      '✓ Backend image compiled: 114MB. Shrink factor: 8x',
      'Building Frontend Static content Docker image (alokpal17/fuzztube-frontend)...',
      '  [1/4] FROM node:20-alpine AS build',
      '  [2/4] WORKDIR /app',
      '  [3/4] RUN npm build',
      '  [4/4] FROM nginx:alpine',
      '✓ Frontend static image compiled: 42MB.',
      '✓ Multi-service containerization complete.'
    ]
  },
  {
    id: 'docker-push',
    name: 'Push to Docker Hub',
    status: 'idle',
    durationMs: 1400,
    logs: [
      'Preparing docker repository push...',
      'Authenticating credentials with docker.io...',
      'Login succeeded as user "alokpal17".',
      'Pushing backend container layers...',
      '  alokpal17/fuzztube-backend:latest (digest: sha256:df46b1a size: 114MB)',
      'Pushing frontend container layers...',
      '  alokpal17/fuzztube-frontend:latest (digest: sha256:cf892da size: 42MB)',
      '✓ Docker Hub repository successfully updated.'
    ]
  },
  {
    id: 'deploy',
    name: 'Netlify & Render Deploy',
    status: 'idle',
    durationMs: 1500,
    logs: [
      'Sending deployment webhooks...',
      'Netlify: Frontend production deploy hook triggered.',
      '  ➔ Pulling static web elements... Completed.',
      'Render: Backend container deploy webhook triggered.',
      '  ➔ Pulling alokpal17/fuzztube-backend:latest from Docker Hub...',
      '  ➔ Spinning up node cluster container...',
      '  ➔ Production SSL certificate binding...',
      'Pinging health check endpoints...',
      '  ➔ GET https://fuzztube-api.render.com/health - 200 OK (210ms)',
      '  ➔ GET https://fuzztube.netlify.app - 200 OK (45ms)',
      '🎉 All services online and verified. App is Live!'
    ]
  }
];

interface PipelineSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PipelineSimulator({ isOpen, onClose }: PipelineSimulatorProps) {
  const [steps, setSteps] = useState<StepInfo[]>(INITIAL_STEPS);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Handle modal closing resetting state
  useEffect(() => {
    if (!isOpen) {
      setIsRunning(false);
      setActiveStepIdx(-1);
      setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: 'idle' })));
      setTerminalLogs([]);
    }
  }, [isOpen]);

  const runPipeline = async () => {
    setIsRunning(true);
    setTerminalLogs(['🚀 CI/CD Pipeline triggered by commit 8f72a1b from main.', 'Starting job...']);
    const updatedSteps = INITIAL_STEPS.map((s) => ({ ...s, status: 'idle' as const }));
    setSteps(updatedSteps);

    for (let i = 0; i < updatedSteps.length; i++) {
      if (!isOpen) break;
      setActiveStepIdx(i);
      
      // Update step status to running
      setSteps((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: 'running' };
        return next;
      });

      const currentStep = updatedSteps[i];
      setTerminalLogs((prev) => [...prev, `\n[STEP: ${currentStep.name.toUpperCase()}]`]);

      // Print logs line by line
      for (const line of currentStep.logs) {
        await new Promise((r) => setTimeout(r, currentStep.durationMs / currentStep.logs.length));
        setTerminalLogs((prev) => [...prev, `  ${line}`]);
      }

      // Mark success
      setSteps((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: 'success' };
        return next;
      });
    }

    if (isOpen) {
      setIsRunning(false);
      setActiveStepIdx(-1);
      setTerminalLogs((prev) => [
        ...prev,
        '\n───────────────────────────────────────────────────',
        '✅ SUCCESS: GitHub Actions workflow completed.',
        '🚀 Deployed: FuzzTube is live in production.'
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/25 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <GitBranch className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-text-main">DevOps Pipeline Simulator</h3>
              <p className="font-mono text-[11px] text-text-dim">GitHub Actions Workflow: fuzztube-ci-cd.yml</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close simulator"
            className="rounded-lg border border-white/10 p-1.5 text-text-dim transition-colors hover:bg-white/5 hover:text-text-main"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Info bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/5 bg-white/[0.01] px-5 py-3 font-mono text-[11px] text-text-muted">
          <div>Branch: <span className="text-text-main">main</span></div>
          <div>Commit: <span className="text-accent">8f72a1b</span></div>
          <div>Actor: <span className="text-accent-2">alokpal17</span></div>
          <div>Trigger: <span className="text-accent-3">git push</span></div>
          <div className="ml-auto flex items-center gap-2">
            {!isRunning ? (
              <button
                onClick={runPipeline}
                className="flex items-center gap-1.5 rounded bg-emerald-500 px-3 py-1 text-xs font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                {terminalLogs.length > 0 ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {terminalLogs.length > 0 ? 'Run Again' : 'Trigger Build'}
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Executing Pipeline...
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid h-[420px] md:grid-cols-[280px_1fr]">
          {/* Left panel: Steps */}
          <div className="border-r border-white/10 bg-black/10 p-4 space-y-2 overflow-y-auto">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-dim mb-3">
              Workflow Steps
            </p>
            {steps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <div
                  key={step.id}
                  className={[
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5 font-mono text-[12px] transition-colors',
                    isActive
                      ? 'border-accent/40 bg-accent/5 text-text-main font-semibold'
                      : step.status === 'success'
                      ? 'border-white/5 bg-white/[0.01] text-text-muted'
                      : 'border-transparent text-text-dim'
                  ].join(' ')}
                >
                  {step.status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                  {step.status === 'failed' && <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                  {step.status === 'running' && <Loader2 className="h-4 w-4 text-accent animate-spin shrink-0" />}
                  {step.status === 'idle' && <span className="h-4 w-4 rounded-full border-2 border-white/10 shrink-0" />}
                  <span className="truncate">{step.name}</span>
                </div>
              );
            })}
          </div>

          {/* Right panel: Terminal logs */}
          <div className="flex flex-col bg-black/90 p-4 font-mono text-[12px] leading-relaxed text-text-muted">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-[10px] text-text-dim select-none">
              <Terminal className="h-3 w-3" />
              <span>console logs</span>
            </div>
            <div className="flex-1 overflow-y-auto pt-2 space-y-0.5 custom-scrollbar">
              {terminalLogs.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center text-text-dim">
                  <Terminal className="h-8 w-8 opacity-20 mb-2" />
                  <p>Pipeline runner idle.</p>
                  <p className="text-[10px]">Click "Trigger Build" above to run the CI/CD pipeline simulation.</p>
                </div>
              )}
              {terminalLogs.map((log, index) => {
                let colorClass = 'text-text-muted';
                if (log.startsWith('🚀') || log.startsWith('✅')) {
                  colorClass = 'text-accent font-semibold';
                } else if (log.includes('[PASS]')) {
                  colorClass = 'text-emerald-400';
                } else if (log.startsWith('  [') || log.includes('Step ')) {
                  colorClass = 'text-text-dim';
                } else if (log.startsWith('✓')) {
                  colorClass = 'text-emerald-400';
                } else if (log.startsWith('[STEP:')) {
                  colorClass = 'text-accent-3 font-semibold mt-2 block';
                } else if (log.includes('🎉')) {
                  colorClass = 'text-accent-2 font-bold';
                }
                return (
                  <div key={index} className={[colorClass, 'break-all'].join(' ')}>
                    {log}
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
