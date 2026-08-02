import { skillGroups } from '@/data/portfolio';
import { Icon } from '@/components/Icon';
import { SectionHeading } from '@/components/About';

export default function Skills() {
  const marquee = skillGroups.flatMap((g) => g.items);

  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 dotted [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-60" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading index="02" title="Skills" subtitle="Grouped by domain" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} delay={i * 60} />
          ))}

          {/* CTA card */}
          <div className="reveal flex flex-col justify-center rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-accent/[0.06] to-transparent p-6">
            <p className="font-display text-lg font-semibold text-text-main">
              Always shipping
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Production MERN apps, containerized end-to-end, deployed through
              automated CI/CD pipelines.
            </p>
            <a
              href="#projects"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-2"
            >
              See it in action →
            </a>
          </div>
        </div>

        {/* Marquee */}
        <div className="reveal mt-12 marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...marquee, ...marquee].map((tech, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  delay,
}: {
  group: { title: string; icon: string; items: string[] };
  delay: number;
}) {
  return (
    <div
      className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent">
          <Icon name={group.icon} className="h-5 w-5" />
        </span>
        <h3 className="font-display text-base font-semibold text-text-main">
          {group.title}
        </h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[13px] font-medium text-text-muted transition-colors hover:border-accent/40 hover:text-text-main"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
