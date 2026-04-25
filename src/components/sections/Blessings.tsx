import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Wish = { name: string; relation: string; message: string };
const COLLAPSED_WISH_COUNT = 4;
const STORAGE_KEY = "wedding-blessings";
const BLESSINGS_API_URL = import.meta.env.VITE_BLESSINGS_API_URL?.trim();

const seed: Wish[] = [
  { name: "Anitha Subramanian", relation: "Family", message: "Wishing you a lifetime of love, laughter and joy. May your bond grow stronger with every passing day." },
  { name: "Ravi Krishnan", relation: "Friend", message: "So happy for both of you! May your journey together be as beautiful as your love story." },
  { name: "Priya Mohan", relation: "Colleague", message: "Congratulations Karthik & Divya! Wishing you a marriage full of warmth, kindness and many adventures." },
  { name: "Suresh Iyer", relation: "Family", message: "Blessings from all of us. May Lord Ganesha shower his choicest blessings on the new beginning." },
  { name: "Meera Venkat", relation: "Friend", message: "Two beautiful souls becoming one. So thrilled to celebrate this with you." },
  { name: "Arun Pillai", relation: "Colleague", message: "Wishing the both of you a happily ever after. Many congratulations!" },
];

const normalizeWish = (wish: Partial<Wish>): Wish | null => {
  const name = wish.name?.trim();
  const relation = wish.relation?.trim();
  const message = wish.message?.trim();
  if (!name || !message) return null;
  return { name, relation: relation || "Guest", message };
};

const normalizeWishList = (value: unknown): Wish[] => {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeWish).filter((wish): wish is Wish => Boolean(wish));
};

const parseStoredWishes = (value: string | null): Wish[] | null => {
  if (!value) return null;
  try {
    return normalizeWishList(JSON.parse(value));
  } catch {
    return null;
  }
};

const parseRemoteWishes = (value: unknown): Wish[] => {
  if (Array.isArray(value)) return normalizeWishList(value);
  if (!value || typeof value !== "object") return [];

  const payload = value as { wishes?: unknown; record?: unknown };

  if (Array.isArray(payload.wishes)) {
    return normalizeWishList(payload.wishes);
  }

  if (payload.record && typeof payload.record === "object") {
    const record = payload.record as { wishes?: unknown };
    if (Array.isArray(record.wishes)) {
      return normalizeWishList(record.wishes);
    }
    return normalizeWishList(payload.record);
  }

  return [];
};

const Blessings = () => {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  const [wishes, setWishes] = useState<Wish[]>(() => parseStoredWishes(localStorage.getItem(STORAGE_KEY)) ?? seed);
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Friend");
  const [otherRelation, setOtherRelation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    if (!BLESSINGS_API_URL) return;

    const controller = new AbortController();

    const loadWishes = async () => {
      try {
        const response = await fetch(BLESSINGS_API_URL, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) return;

        const data = await response.json();
        const normalized = parseRemoteWishes(data);
        if (normalized.length === 0) return;

        setWishes(normalized);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        // Keep local wishes when the remote source is unavailable.
      }
    };

    loadWishes();

    return () => controller.abort();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rel = relation === "Other" ? otherRelation || "Other" : relation;
    const wish = normalizeWish({ name, relation: rel, message });
    if (!wish) return;

    setWishes((current) => [wish, ...current]);
    setExpanded(false);
    setName("");
    setMessage("");
    setOtherRelation("");
    setRelation("Friend");
    toast.success(t.bless_thanks);

    if (!BLESSINGS_API_URL) return;

    try {
      const response = await fetch(BLESSINGS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wish),
      });
      if (!response.ok) return;

      const data = await response.json();
      const normalized = parseRemoteWishes(data);
      if (normalized.length > 0) {
        setWishes(normalized);
      }
    } catch {
      // The wish is already shown locally; remote sync can be retried on the next valid setup.
    }
  };

  const visibleWishes = expanded ? wishes : wishes.slice(0, COLLAPSED_WISH_COUNT);
  const canToggleWishes = wishes.length > COLLAPSED_WISH_COUNT;
  const deleteWish = (index: number) => {
    setWishes((current) => current.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <section className="bg-background py-20 sm:py-28" ref={ref}>
      <div className="container mx-auto max-w-4xl px-5">
        <div className="reveal text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.5em] text-gold">~ With love ~</p>
          <h2 className="section-heading">{t.bless_title}</h2>
          <p className="mt-3 font-script text-lg text-muted-foreground sm:text-xl">{t.bless_subtitle}</p>
          <div className="gold-divider-thick" />
        </div>

        <form
          onSubmit={submit}
          className="reveal mx-auto mt-10 max-w-2xl rounded-2xl border border-gold/40 bg-card p-6 shadow-soft sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{t.bless_name}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gold/30 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{t.bless_relation}</label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full rounded-lg border border-gold/30 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              >
                <option value="Friend">{t.bless_relation_friend}</option>
                <option value="Family">{t.bless_relation_family}</option>
                <option value="Colleague">{t.bless_relation_colleague}</option>
                <option value="Other">{t.bless_relation_other}</option>
              </select>
            </div>
          </div>
          {relation === "Other" && (
            <div className="mt-4 animate-fade-soft">
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{t.bless_relation_specify}</label>
              <input
                value={otherRelation}
                onChange={(e) => setOtherRelation(e.target.value)}
                className="w-full rounded-lg border border-gold/30 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>
          )}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{t.bless_message}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-gold/30 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-all hover:shadow-gold sm:w-auto"
          >
            {t.bless_submit}
          </button>
        </form>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {visibleWishes.map((w, i) => (
            <article
              key={i}
              className="reveal in-view relative rounded-2xl border border-gold/30 bg-card p-6 shadow-soft transition-shadow hover:shadow-elegant"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <button
                type="button"
                onClick={() => deleteWish(i)}
                aria-label={t.bless_delete}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-muted-foreground transition hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 size={14} />
              </button>
              <Heart size={18} className="mb-3 text-gold" fill="currentColor" />
              <p className="text-sm leading-relaxed text-foreground sm:text-base">"{w.message}"</p>
              <div className="gold-divider !w-12 !my-4 !mx-0" />
              <p className="font-display text-lg text-primary">{w.name}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{w.relation}</p>
            </article>
          ))}
        </div>

        {canToggleWishes && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setExpanded((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-8 py-3 text-sm uppercase tracking-[0.2em] text-primary transition-all hover:bg-gold hover:shadow-gold"
            >
              {expanded ? t.bless_less : t.bless_more} {expanded ? "^" : "v"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Blessings;
