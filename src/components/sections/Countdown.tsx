import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const TARGET = Date.UTC(2026, 8, 12, 6, 30);

const Countdown = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const blocks = [
    { v: days, l: t.cd_days },
    { v: hours, l: t.cd_hours },
    { v: minutes, l: t.cd_min },
    { v: seconds, l: t.cd_sec },
  ];
  return (
    <section className="bg-gradient-maroon py-20 sm:py-28 text-[hsl(var(--ivory))]" ref={ref}>
      <div className="container mx-auto max-w-5xl px-5">
        <div className="reveal in-view text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.5em] text-[hsl(var(--gold-light))]">~ The big day ~</p>
          <h2 className="section-heading !text-[hsl(var(--ivory))]">{t.countdown_title}</h2>
          <div className="gold-divider-thick" />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {blocks.map((b, i) => (
            <div
              key={b.l}
              className="reveal in-view rounded-2xl border border-gold/40 bg-[hsl(var(--maroon-deep))]/40 p-6 text-center shadow-elegant backdrop-blur-sm sm:p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-5xl font-medium tabular-nums text-[hsl(var(--gold-light))] sm:text-6xl md:text-7xl">
                {String(b.v).padStart(2, "0")}
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-[hsl(var(--ivory))]/80 sm:text-sm">
                {b.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Countdown;
