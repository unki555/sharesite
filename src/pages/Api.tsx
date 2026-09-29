import { Lang, t } from "../i18n";

export function Api({ lang }: { lang: Lang }) {
  return (
    <div>
      <h2 className="page-title">{t(lang, "api_title")}</h2>
      <p className="page-lead">{t(lang, "api_lead")}</p>
      <p className="page-lead" style={{ marginTop: -8 }}>{t(lang, "api_note")}</p>

      <div className="card">
        <h4>{t(lang, "api_base")}</h4>
        <p>http://localhost:8787/botAPI/&lt;token&gt;/</p>
      </div>

      <div className="card">
        <h4>{t(lang, "api_methods")}</h4>
        <p>
          GET getMe — информация о боте
          {"\n"}GET getUpdates — long polling обновлений
          {"\n"}POST sendMessage — текст, parse_mode, reply_markup
          {"\n"}POST editMessageText / deleteMessage
          {"\n"}POST setMyCommands — список команд
          {"\n"}POST answerCallbackQuery — ответ на inline-кнопку
        </p>
      </div>

      <div className="pre">{`POST /botAPI/<token>/sendMessage
Content-Type: application/json

{
  "chat_id": "<user_id>",
  "text": "<b>Привет</b> из Share",
  "parse_mode": "HTML",
  "reply_markup": {
    "keyboard": [[{"text":"/start"},{"text":"/help"}]],
    "resize_keyboard": true
  }
}`}</div>

      <div className="card">
        <h4>{t(lang, "api_keyboards")}</h4>
        <p>
          Reply keyboard — кнопки под полем ввода (keyboard + resize_keyboard).
          Inline keyboard — прозрачные кнопки под сообщением (inline_keyboard + callback_data).
          Нажатие inline шлёт callback_query в getUpdates.
        </p>
      </div>

      <div className="card">
        <h4>{t(lang, "api_html")}</h4>
        <p>
          parse_mode: &quot;HTML&quot; — теги &lt;b&gt;, &lt;i&gt;, &lt;u&gt;, &lt;s&gt;, &lt;code&gt;, &lt;pre&gt;.
          Остальной HTML экранируется на клиенте.
        </p>
      </div>

      <div className="pre">{`# Python (share.lib)
from share.lib import ShareBot, Context, Keyboard, html

bot = ShareBot(token="...", api="http://localhost:8787")

@bot.command("start")
def start(ctx: Context):
    ctx.reply(html.bold("Привет!"), keyboard=Keyboard(["/help"]), parse_mode="HTML")

bot.run()`}</div>
    </div>
  );
}
