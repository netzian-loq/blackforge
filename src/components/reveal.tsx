"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveals its children once they scroll into view.
 *
 * `data-shown` is set imperatively rather than through state: this component
 * never re-renders for any other reason, and going through state would mean a
 * cascading render per row on a page that has fourteen of them.
 *
 * Reduced motion is handled entirely in CSS, and the `<noscript>` rule in the
 * root layout keeps the content visible when scripting never runs.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.dataset.shown = "true";
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`u-reveal ${className}`}
    >
      {children}
    </div>
  );
}
