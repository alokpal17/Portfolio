import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-bg">
              AP
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-text-main">
                Alok Pal
              </p>
              <p className="text-xs text-text-dim">
                Full-Stack Developer · MERN + DevOps
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-text-muted transition-colors hover:text-text-main">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-text-muted transition-colors hover:text-text-main">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-text-muted transition-colors hover:text-text-main">
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Back to top */}
          <a
            href="#hero"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text-main"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-text-dim sm:flex-row">
          <p>© {year} Alok Pal. Built with React, TypeScript & Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}
