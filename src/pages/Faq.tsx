import { Lang, t } from "../i18n";

export function Faq({ lang }: { lang: Lang }) {
  const items = [
    ["faq_q1", "faq_a1"],
    ["faq_q2", "faq_a2"],
    ["faq_q3", "faq_a3"],
    ["faq_q4", "faq_a4"],
    ["faq_q5", "faq_a5"],
    ["faq_q6", "faq_a6"],
  ] as const;
  return (
    <div>
      <h2 className="page-title">{t(lang, "faq_title")}</h2>
      <p className="page-lead">{t(lang, "faq_lead")}</p>
      {items.map(([q, a]) => (
        <div className="card" key={q}>
          <h4>{t(lang, q)}</h4>
          <p>{t(lang, a)}</p>
        </div>
      ))}
    </div>
  );
}
