import { profile, stats } from '@/data/portfolio';
import InteractiveTerminal from '@/components/InteractiveTerminal';

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading index="01" title="About" subtitle="A quick introduction" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Bio */}
          <div className="reveal rounded-2xl border border-white/10 bg-bg-card/60 p-6 sm:p-8">
            <p className="text-pretty text-lg leading-relaxed text-text-muted">
              {profile.summary}
            </p>
            <p className="mt-5 text-pretty leading-relaxed text-text-dim">
              I treat the backend and the pipeline as first-class citizens — not
              afterthoughts. That means thinking in terms of REST contracts, MVC
              boundaries, containerized services, and automated builds long
              before the first line of UI gets written. When something ships, I
              want it to keep shipping.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"
                >
                  <div className="font-display text-2xl font-bold text-text-main sm:text-3xl">
                    {s.value}
                    <span className="text-accent">{s.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-text-dim">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal card */}
          <div className="reveal">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="reveal flex items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-medium text-accent">{index}</span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:block" />
      {subtitle && (
        <span className="hidden text-sm text-text-dim lg:block">{subtitle}</span>
      )}
    </div>
  );
}
