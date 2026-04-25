import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const images = [g1, g2, g3, g4];

const Gallery = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="py-8 sm:py-12" style={{ background: "linear-gradient(180deg, hsl(42 50% 92%) 0%, hsl(var(--background)) 100%)" }} ref={ref}>
      <div className="container mx-auto max-w-4xl px-5">
        <div className="reveal text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.5em] text-gold">~ Memories ~</p>
          <h2 className="section-heading">{t.gallery_title}</h2>
          <div className="gold-divider-thick" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setOpen(src)}
              className="reveal group relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft transition-shadow hover:shadow-elegant"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                loading="lazy"
                width={900}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-fade-soft"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-background/10 text-[hsl(var(--ivory))] backdrop-blur-md transition hover:bg-background/20"
            onClick={() => setOpen(null)}
          >
            <X size={20} />
          </button>
          <img src={open} alt="Preview" className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-elegant" />
        </div>
      )}
    </section>
  );
};
export default Gallery;
