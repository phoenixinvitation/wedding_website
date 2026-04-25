import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { PHOENIX_WEBSITE_URL } from "@/lib/brand";

const Footer = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  return (
    <footer className="bg-gradient-maroon py-4 text-center text-[hsl(var(--ivory))] sm:py-10" ref={ref}>
      <div className="container mx-auto max-w-2xl px-5">
        <div className="reveal">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent sm:w-40" />
          <p className="mt-4 font-script text-2xl leading-relaxed text-[hsl(var(--ivory))] sm:mt-6 sm:text-3xl">
            "{t.footer_text}"
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[hsl(var(--gold))]/60 sm:mt-6" />
          <p className="mt-3 font-display text-lg tracking-[0.4em] text-[hsl(var(--gold-light))] sm:mt-5 sm:text-xl">
            K &nbsp;&amp;&nbsp; D
          </p>
          <a
            href={PHOENIX_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-xs font-normal tracking-wide text-[hsl(var(--ivory))]/65 transition hover:text-[hsl(var(--gold-light))] sm:mt-8"
          >
            Crafted with care by Phoenix
          </a>
          <p className="mt-1 text-[11px] text-[hsl(var(--ivory))]/40">
            Create a website like this with Phoenix
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
