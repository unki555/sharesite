import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { LanguageSelect } from "./components/LanguageSelect";
import { NewsRail } from "./components/NewsRail";
import { Home } from "./pages/Home";
import { Faq } from "./pages/Faq";
import { Api } from "./pages/Api";
import { Moderation } from "./pages/Moderation";
import { Lang, t } from "./i18n";
import { fetchNews, NewsItem } from "./lib/supabase";

const TABS = [
  { path: "/", key: "nav_home" },
  { path: "/faq", key: "nav_faq" },
  { path: "/api", key: "nav_api" },
  { path: "/moderation", key: "nav_mod" },
] as const;

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const s = localStorage.getItem("shareme_lang") as Lang | null;
    return s && ["ru", "en", "uk", "kz"].includes(s) ? s : "ru";
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const loc = useLocation();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 4, width: 80 });

  useEffect(() => {
    localStorage.setItem("shareme_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  const activeIndex = useMemo(() => {
    const i = TABS.findIndex((x) => x.path === loc.pathname);
    return i < 0 ? 0 : i;
  }, [loc.pathname]);

  useEffect(() => {
    const el = tabsRef.current[activeIndex];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeIndex, lang]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <nav className="nav-tabs">
          <div className="nav-pill" style={{ left: pill.left, width: pill.width }} />
          {TABS.map((tab, i) => (
            <NavLink key={tab.path} to={tab.path} end={tab.path === "/"}>
              {({ isActive }) => (
                <button
                  type="button"
                  ref={(n) => {
                    tabsRef.current[i] = n;
                  }}
                  className={`nav-tab ${isActive ? "on" : ""}`}
                >
                  {t(lang, tab.key)}
                </button>
              )}
            </NavLink>
          ))}
        </nav>
        <LanguageSelect lang={lang} onChange={setLang} />
      </header>

      <div className="layout">
        <main className="main">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/faq" element={<Faq lang={lang} />} />
            <Route path="/api" element={<Api lang={lang} />} />
            <Route
              path="/moderation"
              element={
                <Moderation
                  lang={lang}
                  onPublished={(item) => setNews((prev) => [item, ...prev])}
                />
              }
            />
          </Routes>
        </main>
        <NewsRail lang={lang} items={news} />
      </div>

      <footer className="footer">{t(lang, "footer")}</footer>
    </div>
  );
}
