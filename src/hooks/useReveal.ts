import { useEffect, useRef } from "react";

export const useReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    el.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
};
