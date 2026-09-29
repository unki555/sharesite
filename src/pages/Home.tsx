import { Lang, t } from "../i18n";
import { LaunchButton } from "../components/LaunchButton";

export function Home({ lang }: { lang: Lang }) {
  return (
    <div className="hero">
      <img
        className="logo"
        src="/logo.jpg"
        alt="ShareMe"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
        }}
      />
      <h1 className="brand">Share</h1>
      <p className="slogan">{t(lang, "slogan")}</p>
      <LaunchButton lang={lang} />
    </div>
  );
}
