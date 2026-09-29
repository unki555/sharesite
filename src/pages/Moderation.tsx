import { FormEvent, useState } from "react";
import { Lang, t } from "../i18n";
import { publishNews, NewsItem } from "../lib/supabase";

const ADMIN_USER = "sharemeadmin";
const ADMIN_PASS = "sharemeadmin";

type Props = {
  lang: Lang;
  onPublished: (item: NewsItem) => void;
};

export function Moderation({ lang, onPublished }: Props) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("shareme_admin") === "1"
  );
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  const login = (e: FormEvent) => {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("shareme_admin", "1");
      setAuthed(true);
      setMsg("");
    } else {
      setMsg("Access denied");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("shareme_admin");
    setAuthed(false);
  };

  const publish = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const item = await publishNews(title, body);
    if (item) {
      onPublished(item);
      setTitle("");
      setBody("");
      setMsg("OK");
    } else setMsg("Error");
  };

  return (
    <div>
      <h2 className="page-title">{t(lang, "mod_title")}</h2>
      <p className="page-lead">{t(lang, "mod_lead")}</p>

      <div className="card">
        <p>{t(lang, "mod_text")}</p>
      </div>
      <div className="card">
        <h4>{t(lang, "mod_rules_title")}</h4>
        <p>{t(lang, "mod_rules")}</p>
      </div>
      <div className="card">
        <h4>{t(lang, "mod_how_title")}</h4>
        <p style={{ whiteSpace: "pre-line" }}>{t(lang, "mod_how")}</p>
      </div>
      <div className="card">
        <h4>{t(lang, "mod_time_title")}</h4>
        <p>{t(lang, "mod_time")}</p>
      </div>

      <div className="admin-gate">
        {/* секретная зона: правый верх блока модерации, невидимая */}
        <button
          type="button"
          className="secret-dot"
          aria-label="admin"
          onClick={() => setShowAdmin((v) => !v)}
        />

        {showAdmin && (
          <div className="admin-box">
            <h3 style={{ marginTop: 0 }}>{t(lang, "admin_title")}</h3>
            {!authed ? (
              <form onSubmit={login}>
                <input
                  placeholder={t(lang, "admin_user")}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoComplete="username"
                />
                <input
                  type="password"
                  placeholder={t(lang, "admin_pass")}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  autoComplete="current-password"
                />
                <button className="btn" type="submit">
                  {t(lang, "admin_login")}
                </button>
                {msg && <p style={{ color: "#ff3b30" }}>{msg}</p>}
              </form>
            ) : (
              <form onSubmit={publish}>
                <p style={{ color: "#8e8e93", fontSize: 13 }}>
                  @{ADMIN_USER}{" "}
                  <button type="button" className="btn ghost" style={{ marginLeft: 8 }} onClick={logout}>
                    {t(lang, "admin_logout")}
                  </button>
                </p>
                <h4>{t(lang, "admin_news")}</h4>
                <input
                  placeholder={t(lang, "admin_title_ph")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder={t(lang, "admin_body_ph")}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <button className="btn blue" type="submit">
                  {t(lang, "admin_publish")}
                </button>
                {msg && <p style={{ color: "#34c759" }}>{msg}</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
