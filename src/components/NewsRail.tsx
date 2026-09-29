import { NewsItem } from "../lib/supabase";
import { Lang, t } from "../i18n";

type Props = { lang: Lang; items: NewsItem[] };

function fmt(iso: string, lang: Lang) {
  try {
    return new Date(iso).toLocaleString(lang === "en" ? "en-GB" : "ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function NewsRail({ lang, items }: Props) {
  return (
    <aside className="news-rail">
      <h3>{t(lang, "news")}</h3>
      {items.length === 0 && <p style={{ color: "#6b7280", fontSize: 14 }}>{t(lang, "news_empty")}</p>}
      {items.map((n) => (
        <article key={n.id} className="news-card">
          <time>{fmt(n.created_at, lang)}</time>
          <strong>{n.title}</strong>
          <p>{n.body}</p>
        </article>
      ))}
    </aside>
  );
}
