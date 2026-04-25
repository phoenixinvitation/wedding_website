import heroBg from "@/assets/hero-mandapam.jpg";
import { useLang } from "@/lib/LanguageContext";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { t } = useLang();
  const scrollToInvitation = () => {
    document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 animate-hero-bg">
        <img
          src={heroBg}
          alt="Wedding mandapam"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
      </div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-[hsl(var(--ivory))]">
        <p className="mb-4 animate-fade-soft delay-200 text-xs uppercase tracking-[0.5em] text-[hsl(var(--gold-light))] sm:text-sm">
          The wedding of
        </p>
        <h1 className="font-display text-5xl font-medium uppercase tracking-[0.15em] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block animate-fade-up delay-300">{t.hero_groom}</span>
          <span className="my-2 block animate-fade-soft delay-500 font-script text-3xl normal-case tracking-normal text-[hsl(var(--gold-light))] sm:text-4xl md:text-5xl">
            {t.hero_and}
          </span>
          <span className="block animate-fade-up delay-700">{t.hero_bride}</span>
        </h1>

        <div className="my-6 h-px w-32 origin-center animate-divider delay-900 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent sm:w-40" />

        <p className="animate-fade-soft delay-1000 text-base tracking-[0.3em] sm:text-lg">
          {t.hero_date}
        </p>
        <p className="mt-3 animate-fade-soft delay-1100 font-script text-lg text-[hsl(var(--ivory))]/90 sm:text-xl">
          "{t.hero_tagline}"
        </p>

        <button
          onClick={scrollToInvitation}
          className="mt-10 animate-fade-up delay-1200 group inline-flex items-center gap-3 rounded-full border-2 border-[hsl(var(--gold))] px-8 py-3.5 text-sm uppercase tracking-[0.3em] text-[hsl(var(--ivory))] transition-all duration-500 hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--maroon-deep))] hover:shadow-gold sm:px-10 sm:py-4 sm:text-base"
        >
          {t.hero_cta}
        </button>
      </div>

      <button
        onClick={scrollToInvitation}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-scroll text-[hsl(var(--ivory))]/70"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};
export default Hero;
