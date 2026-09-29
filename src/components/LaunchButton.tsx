import { useEffect, useState } from "react";
import { fetchLaunchAt } from "../lib/supabase";
import { Lang, t } from "../i18n";

type Props = { lang: Lang };

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function LaunchButton({ lang }: Props) {
  const [launchAt, setLaunchAt] = useState<Date | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let alive = true;
    fetchLaunchAt().then((d) => {
      if (alive) setLaunchAt(d);
    });
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const ready = launchAt ? now >= launchAt.getTime() : false;
  const left = launchAt ? Math.max(0, launchAt.getTime() - now) : 0;
  const days = Math.floor(left / 86400000);
  const hours = Math.floor((left % 86400000) / 3600000);
  const mins = Math.floor((left % 3600000) / 60000);
  const secs = Math.floor((left % 60000) / 1000);

  return (
    <>
      <button
        type="button"
        className={`enter-btn ${ready ? "ready" : ""}`}
        disabled={!ready}
        onClick={() => {
          if (!ready) return;
          window.location.href = import.meta.env.VITE_APP_URL || "http://localhost:5173";
        }}
      >
        {ready ? t(lang, "enter") : t(lang, "enter_soon")}
      </button>

      <div className="timer">
        <div className="timer-label">
          {ready ? t(lang, "launched") : t(lang, "until_launch")}
        </div>
        {!ready && (
          <div className="timer-row" aria-live="polite">
            <b>{pad(days)}</b>
            <span>{t(lang, "days")}</span>
            <span className="timer-sep">:</span>
            <b>{pad(hours)}</b>
            <span>{t(lang, "hours")}</span>
            <span className="timer-sep">:</span>
            <b>{pad(mins)}</b>
            <span>{t(lang, "mins")}</span>
            <span className="timer-sep">:</span>
            <b>{pad(secs)}</b>
            <span>{t(lang, "secs")}</span>
          </div>
        )}
      </div>
    </>
  );
}
