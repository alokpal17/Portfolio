import { useEffect, useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { profile } from '@/data/portfolio';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail === 'string') setActive(detail);
    };
    window.addEventListener('active-section', handler);
    return () => window.removeEventListener('active-section', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-white/10' : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-2.5" aria-label="Alok Pal — home">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-bg shadow-lg shadow-accent/20">
            AP
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-text-main sm:block">
            Alok<span className="text-accent">.</span>Pal
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={[
                    'relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-text-main' : 'text-text-muted hover:text-text-main',
                  ].join(' ')}
                >
                  {l.label}
                  <span
                    className={[
                      'absolute inset-x-3 -bottom-px h-px origin-left bg-gradient-to-r from-accent to-accent-2 transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    ].join(' ')}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop socials */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-text-muted transition-all hover:border-white/20 hover:text-text-main"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-text-muted transition-all hover:border-white/20 hover:text-text-main"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-text-main px-3.5 py-2 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-text-main md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={[
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="glass border-t border-white/10 px-5 py-4">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-text-main"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-text-muted">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-text-muted">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${profile.email}`} className="ml-auto inline-flex items-center rounded-lg bg-text-main px-4 py-2.5 text-sm font-semibold text-bg">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
