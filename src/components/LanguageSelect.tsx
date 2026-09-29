import { useEffect, useRef, useState } from "react";
import { LANGS, Lang, t } from "../i18n";

type Props = { lang: Lang; onChange: (l: Lang) => void };

export function LanguageSelect({ lang, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((x) => x.code === lang) || LANGS[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="top-right" ref={ref}>
      <button type="button" className="lang-btn" onClick={() => setOpen((v) => !v)}>
        <span>{current.flag}</span>
        <span>{t(lang, "lang")}</span>
      </button>
      {open && (
        <div className="lang-pop" role="menu">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`lang-item ${l.code === lang ? "active" : ""}`}
              onClick={() => {
                onChange(l.code);
                setOpen(false);
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
