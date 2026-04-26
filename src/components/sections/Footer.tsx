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
            aria-label="Visit Phoenix Invitation website"
            className="mx-auto mt-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[hsl(var(--gold))]/60 bg-[hsl(var(--ivory))]/95 p-1 shadow-soft transition hover:scale-105 hover:shadow-gold sm:h-16 sm:w-16"
          >
            <img
              src="/logo.jpeg"
              alt="Phoenix Invitation logo"
              className="h-full w-full rounded-full object-cover"
              width={64}
              height={64}
            />
          </a>
          <a
            href={PHOENIX_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-xs font-normal tracking-wide text-[hsl(var(--ivory))]/65 transition hover:text-[hsl(var(--gold-light))] sm:text-sm"
          >
            Crafted with care by Phoenix Invitation
          </a>
          <a
            href={PHOENIX_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-[11px] text-[hsl(var(--ivory))]/45 transition hover:text-[hsl(var(--gold-light))]"
          >
            phoenix-invitation.vercel.app
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
