import { useState } from 'react';
import { ArrowUpRight, ExternalLink, GitBranch, Layers, Zap, Cpu, Terminal } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import { SectionHeading } from '@/components/About';
import PipelineSimulator from '@/components/PipelineSimulator';
import ArchitectureModal from '@/components/ArchitectureModal';

const accentMap = {
  emerald: {
    text: 'text-accent',
    bg: 'bg-accent',
    soft: 'bg-accent/10',
    border: 'border-accent/30',
    gradient: 'from-accent/15 to-transparent',
    ring: 'group-hover:border-accent/40',
  },
  cyan: {
    text: 'text-accent-2',
    bg: 'bg-accent-2',
    soft: 'bg-accent-2/10',
    border: 'border-accent-2/30',
    gradient: 'from-accent-2/15 to-transparent',
    ring: 'group-hover:border-accent-2/40',
  },
  violet: {
    text: 'text-accent-3',
    bg: 'bg-accent-3',
    soft: 'bg-accent-3/10',
    border: 'border-accent-3/30',
    gradient: 'from-accent-3/15 to-transparent',
    ring: 'group-hover:border-accent-3/40',
  },
} as const;

export default function Projects() {
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [archProjId, setArchProjId] = useState<'fuzztube' | 'traffic'>('fuzztube');
  const [archProjName, setArchProjName] = useState('');

  const triggerPipeline = () => {
    setPipelineOpen(true);
  };

  const triggerArch = (id: 'fuzztube' | 'traffic', name: string) => {
    setArchProjId(id);
    setArchProjName(name);
    setArchOpen(true);
  };

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading index="03" title="Projects" subtitle="Built end-to-end, deployed for real" />

        <div className="mt-12 space-y-7">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onShowPipeline={triggerPipeline}
              onShowArch={triggerArch}
            />
          ))}
        </div>
      </div>

      <PipelineSimulator isOpen={pipelineOpen} onClose={() => setPipelineOpen(false)} />
      
      <ArchitectureModal
        isOpen={archOpen}
        onClose={() => setArchOpen(false)}
        projectId={archProjId}
        projectName={archProjName}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onShowPipeline,
  onShowArch,
}: {
  project: Project;
  index: number;
  onShowPipeline: () => void;
  onShowArch: (id: 'fuzztube' | 'traffic', name: string) => void;
}) {
  const a = accentMap[project.accent];
  const isFeatured = index === 0;

  return (
    <article
      className={[
        'reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8',
        a.ring,
      ].join(' ')}
    >
      {/* corner glow */}
      <div className={['pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-90', a.gradient].join(' ')} />

      <div className="relative grid gap-7 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
        {/* Left: identity */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {project.badges.map((b) => (
              <span
                key={b}
                className={[
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
                  a.soft, a.text,
                ].join(' ')}
              >
                {b === 'Production' && <Zap className="h-3 w-3" />}
                {b === 'Hackathon' && <Layers className="h-3 w-3" />}
                {(b === 'MERN' || b === 'DevOps' || b === 'Computer Vision' || b === 'Distributed') && <GitBranch className="h-3 w-3" />}
                {b}
              </span>
            ))}
          </div>

          <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
            {project.name}
          </h3>
          <p className={["mt-1.5 font-mono text-sm", a.text].join(' ')}>
            {project.tagline}
          </p>

          {/* Stack */}
          <div className="mt-6">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-dim">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[12px] text-text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03]',
                  a.bg, 'text-bg',
                ].join(' ')}
              >
                <ExternalLink className="h-4 w-4" />
                Visit live site
                <span className="ml-1 font-mono text-xs opacity-70">{project.liveLabel}</span>
              </a>
            )}

            {!project.live && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-text-muted">
                <Layers className="h-4 w-4" />
                SIH 2025 submission
              </div>
            )}

            <button
              onClick={() => onShowArch(project.id as 'fuzztube' | 'traffic', project.name)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-white/20 hover:bg-white/5"
            >
              <Cpu className="h-4 w-4 text-accent-2" />
              System Design
            </button>

            {project.id === 'fuzztube' && (
              <button
                onClick={onShowPipeline}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-white/20 hover:bg-white/5"
              >
                <Terminal className="h-4 w-4 text-accent" />
                CI/CD Run
              </button>
            )}
          </div>
        </div>

        {/* Right: highlights */}
        <div className="relative">
          <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
          <ol className="space-y-4 pl-5 lg:pl-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="relative flex gap-3.5">
                <span className={[
                  'mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold',
                  a.soft, a.text,
                ].join(' ')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-pretty text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
                  {h}
                </p>
              </li>
            ))}
          </ol>

          {isFeatured && (
            <div className="mt-6 flex items-center gap-2 pl-5 lg:pl-6 text-xs text-text-dim">
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              Full SDLC owned — design through deployment
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
