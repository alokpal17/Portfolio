import { useEffect, useRef, type RefObject } from 'react';

/**
 * Adds the `is-visible` class to any descendant `.reveal` element
 * (and the element itself) when it scrolls into view. Runs once.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = new Set<Element>();
    targets.add(root);
    root.querySelectorAll<HTMLElement>('.reveal').forEach((el) => targets.add(el));

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Tracks the active section id in view for nav highlighting.
 */
export function useActiveSection(ids: string[]) {
  const activeRef = useRef<string>(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          activeRef.current = visible[0].target.id;
          window.dispatchEvent(new CustomEvent('active-section', { detail: visible[0].target.id }));
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return activeRef;
}
