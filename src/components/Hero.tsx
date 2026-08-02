import { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data/portfolio';

const codeLines = [
  { t: 'const', c: 'text-violet-300' },
  { t: ' alok = {', c: 'text-text-main' },
  { t: '  role:', c: 'text-text-main' },
  { t: ' "Full-Stack Developer"', c: 'text-accent' },
  { t: ',', c: 'text-text-muted' },
  { t: '  stack:', c: 'text-text-main' },
  { t: ' ["React", "Node", "MongoDB"]', c: 'text-accent-2' },
  { t: ',', c: 'text-text-muted' },
  { t: '  devops:', c: 'text-text-main' },
  { t: ' ["Docker", "K8s", "CI/CD"]', c: 'text-accent-3' },
  { t: ',', c: 'text-text-muted' },
  { t: '  available:', c: 'text-text-main' },
  { t: ' true', c: 'text-accent' },
  { t: ',', c: 'text-text-muted' },
  { t: '}', c: 'text-text-main' },
];

function CodeWindow() {
  const [typed, setTyped] = useState(0);
  const total = codeLines.length;

  useEffect(() => {
    if (typed >= total) return;
    const delay = typed < 2 ? 500 : 95;
    const id = setTimeout(() => setTyped((n) => n + 1), delay);
    return () => clearTimeout(id);
  }, [typed, total]);

  return (
    <div className="relative w-full">
      {/* glow */}
      <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-accent/20 via-accent-2/15 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-bg-elev/80 shadow-2xl shadow-black/40 backdrop-blur">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-3 font-mono text-xs text-text-dim">developer.ts</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> TS
          </span>
        </div>
        {/* code */}
        <div className="flex gap-4 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          <div className="select-none text-text-dim">
            {codeLines.slice(0, typed).map((_, i) => (
              <div key={i}>{String(i + 1).padStart(2, '0')}</div>
            ))}
          </div>
          <div className="min-h-[19rem]">
            {codeLines.slice(0, typed).map((l, i) => (
              <div key={i}>
                <span className={l.c}>{l.t}</span>
              </div>
            ))}
            {typed < total && <span className="caret ml-px inline-block h-4 w-2 bg-accent align-middle" />}
            {typed >= total && (
              <div className="mt-2 text-text-dim">
                <span className="text-accent">$</span> npm run build{' '}
                <span className="caret inline-block h-4 w-2 bg-accent align-middle" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');

  const role = profile.roles[roleIdx];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1600);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 300);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length - 1)), 28);
      } else {
        setRoleIdx((i) => (i + 1) % profile.roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, role, roleIdx]);

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      {/* background */}
      <div className="absolute inset-0 -z-10 card-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-24 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="absolute right-[5%] top-40 -z-10 h-72 w-72 rounded-full bg-accent-2/15 blur-[100px] float-slow" />
      <div className="absolute left-[5%] top-72 -z-10 h-64 w-64 rounded-full bg-accent-3/15 blur-[100px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left */}
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </div>

          <h1 className="reveal mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tightest text-text-main sm:text-6xl lg:text-[68px]">
            Hi, I'm <span className="text-gradient">Alok Pal</span>
          </h1>

          <div className="reveal mt-4 flex items-center font-mono text-lg text-text-muted sm:text-xl">
            <span className="text-accent">{'>'}</span>
            <span className="ml-2">{displayed}</span>
            <span className="caret ml-1 inline-block h-5 w-[2px] bg-accent" />
          </div>

          <p className="reveal mt-6 max-w-xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
            {profile.summary}
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-bg shadow-lg shadow-accent/20 transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-text-main transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Contact me
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-text-muted transition-colors hover:text-text-main"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-text-muted transition-colors hover:text-text-main"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right: code window */}
        <div className="reveal lg:pl-2">
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}
