import { GraduationCap, Award } from 'lucide-react';
import { education } from '@/data/portfolio';
import { SectionHeading } from '@/components/About';

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading index="04" title="Education" subtitle="Academic foundation" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Main education card */}
          <div className="reveal relative overflow-hidden rounded-2xl border border-white/10 bg-bg-card/60 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-3/10 blur-3xl" />

            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-3">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-text-main">
                    {education.school}
                  </h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-text-muted">
                    {education.period}
                  </span>
                </div>
                <p className="mt-1 text-[15px] text-text-muted">
                  {education.degree}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-dim">
                  {education.detail}
                </p>
              </div>
            </div>

            {/* CGPA bar */}
            <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-text-main">Current CGPA</span>
                </div>
                <span className="font-display text-2xl font-bold text-text-main">
                  {education.cgpa}
                  <span className="text-base text-text-dim">/10</span>
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                  style={{ width: '89%' }}
                />
              </div>
            </div>
          </div>

          {/* Side facts */}
          <div className="reveal grid gap-4">
            <FactCard
              title="Specialization"
              value="CSE"
              detail="Data Structures, System Design, Full-Stack Engineering"
            />
            <FactCard
              title="Timeline"
              value="2024 – 2028"
              detail="Pursuing B.Tech · Currently in program"
            />
            <FactCard
              title="Location"
              value="Ghaziabad, IN"
              detail="Studying at JSS University, Noida"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FactCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-bg-card/60 p-5 transition-colors hover:border-white/20">
      <p className="text-xs font-semibold uppercase tracking-wider text-text-dim">{title}</p>
      <p className="mt-1.5 font-display text-lg font-semibold text-text-main">{value}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{detail}</p>
    </div>
  );
}
