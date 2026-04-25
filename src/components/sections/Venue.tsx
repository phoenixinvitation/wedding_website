import { MapPin } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const Venue = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-20 sm:py-28" ref={ref}>
      <div className="container mx-auto max-w-3xl px-5">
        <div className="reveal text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.5em] text-gold">~ Where it happens ~</p>
          <h2 className="section-heading">{t.venue_title}</h2>
          <div className="gold-divider-thick" />
        </div>
        <article className="reveal mt-12 rounded-2xl border border-gold/40 bg-card p-8 text-center shadow-elegant sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-primary">
            <MapPin size={24} />
          </div>
          <h3 className="font-display text-3xl text-primary sm:text-4xl">{t.venue_name}</h3>
          <div className="gold-divider !w-16" />
          <p className="text-base text-foreground">{t.venue_address}</p>
          <p className="mt-2 text-sm italic text-muted-foreground">{t.venue_landmark}</p>
          <a
            href="https://maps.google.com/?q=ABC+Mahal+Chennai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:scale-105 hover:bg-[hsl(var(--maroon-deep))] hover:shadow-elegant"
          >
            <MapPin size={16} /> {t.event_directions}
          </a>
        </article>
      </div>
    </section>
  );
};
export default Venue;
