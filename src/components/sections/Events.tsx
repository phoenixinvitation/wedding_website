import { Gem, Leaf, Sparkles, Flame, MapPin } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const Events = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  const events = [
    { icon: Gem, name: t.event_engagement, date: t.event_date_eng, time: t.event_time_eng, loc: t.event_loc_eng, map: "https://maps.google.com/?q=Sri+Krishna+Hall+Chennai" },
    { icon: Leaf, name: t.event_mehendi, date: t.event_date_meh, time: t.event_time_meh, loc: t.event_loc_meh, map: "https://maps.google.com/?q=Mylapore+Chennai" },
    { icon: Flame, name: t.event_muhurtham, date: t.event_date_muh, time: t.event_time_muh, loc: t.event_loc_muh, map: "https://maps.google.com/?q=ABC+Mahal+Chennai", featured: true },
    { icon: Sparkles, name: t.event_reception, date: t.event_date_rec, time: t.event_time_rec, loc: t.event_loc_rec, map: "https://maps.google.com/?q=ABC+Mahal+Chennai" },
  ];
  return (
    <section className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(42 50% 92%) 100%)" }} ref={ref}>
      <div className="container mx-auto max-w-6xl px-5">
        <div className="reveal text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.5em] text-gold">~ Save the dates ~</p>
          <h2 className="section-heading">{t.events_title}</h2>
          <div className="gold-divider-thick" />
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((ev, i) => {
            const Icon = ev.icon;
            return (
              <article
                key={i}
                className={`reveal group flex flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant ${ev.featured ? "border-gold ring-2 ring-gold/30" : "border-gold/30"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${ev.featured ? "bg-gradient-maroon text-[hsl(var(--gold-light))]" : "bg-gradient-gold text-primary"}`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-display text-xl text-primary sm:text-2xl">{ev.name}</h3>
                <div className="gold-divider !w-12 !my-3" />
                <p className="text-sm font-medium text-foreground">{ev.date}</p>
                <p className="mt-1 text-sm text-muted-foreground">{ev.time}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ev.loc}</p>
                <a
                  href={ev.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold px-4 py-2 text-xs uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <MapPin size={12} /> {t.event_directions}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Events;
