import groomImg from "@/assets/groom.jpg";
import brideImg from "@/assets/bride.jpg";
import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const Couple = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="couple" className="relative bg-background py-20 sm:py-28" ref={ref}>
      <div className="container mx-auto max-w-6xl px-5">
        <div className="reveal text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.5em] text-gold">~ The Couple ~</p>
          <h2 className="section-heading">{t.couple_title}</h2>
          <div className="gold-divider-thick" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Groom */}
          <article className="reveal-left group rounded-2xl border border-gold/30 bg-card p-6 text-center shadow-soft transition-shadow hover:shadow-elegant sm:p-8">
            <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full ring-4 ring-gold/40 ring-offset-4 ring-offset-background sm:h-64 sm:w-64">
              <img
                src={groomImg}
                alt={t.groom_name}
                loading="lazy"
                width={800}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="font-script text-xl text-gold">The Groom</p>
            <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">{t.groom_name}</h3>
            <div className="gold-divider !w-16" />
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.groom_bio}
            </p>
          </article>

          {/* Bride */}
          <article className="reveal-right group rounded-2xl border border-gold/30 bg-card p-6 text-center shadow-soft transition-shadow hover:shadow-elegant sm:p-8">
            <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full ring-4 ring-gold/40 ring-offset-4 ring-offset-background sm:h-64 sm:w-64">
              <img
                src={brideImg}
                alt={t.bride_name}
                loading="lazy"
                width={800}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="font-script text-xl text-gold">The Bride</p>
            <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">{t.bride_name}</h3>
            <div className="gold-divider !w-16" />
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.bride_bio}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
export default Couple;
