export type Lang = "ru" | "en" | "uk" | "kz";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "kz", label: "Қазақша", flag: "🇰🇿" },
];

type Dict = Record<string, string>;

const ru: Dict = {
  nav_home: "Главная",
  nav_faq: "FAQ",
  nav_api: "API",
  nav_mod: "Модерация",
  slogan: "Такого вы еще не видели",
  enter: "Зайти в ShareMe",
  enter_soon: "Скоро открытие",
  news: "Свежие новости",
  news_empty: "Пока нет новостей",
  lang: "Язык",
  faq_title: "Частые вопросы",
  faq_lead:
    "Коротко о ShareMe: что это, когда открытие, как работают боты и куда писать, если что-то пошло не так.",
  api_title: "Share Bot API",
  api_lead:
    "HTTP API для ботов Share. Создайте бота через @CreateBot в приложении, получите token и вызывайте методы ниже.",
  mod_title: "Модерация",
  mod_lead:
    "Правила сообщества и как связаться с командой. Мы не просим пароли и коды — никогда.",
  mod_text:
    "Модерация ShareMe следит за безопасностью. Жалобы на каналы, спам, мошенничество и блокировки обрабатываются через бота поддержки в приложении и эту страницу.",
  mod_rules_title: "Основные правила",
  mod_rules:
    "Запрещены мошенничество, угрозы, распространение вредоносного ПО, нелегальный контент и массовый спам. Нарушение может привести к ограничению аккаунта или канала.",
  mod_how_title: "Как пожаловаться",
  mod_how:
    "1) Откройте чат с ботом поддержки в Share.\n2) Выберите «Жалоба» или «Обращение».\n3) Укажите @username или ссылку и кратко опишите ситуацию.\n\nДля разблокировки аккаунта используйте сценарий «Разблокировка» в том же боте.",
  mod_time_title: "Сроки",
  mod_time:
    "Обычные обращения — до 72 часов. Срочные жалобы на мошенничество рассматриваем в приоритете.",
  admin_secret: "·",
  admin_title: "Админ-панель",
  admin_user: "Логин",
  admin_pass: "Пароль",
  admin_login: "Войти",
  admin_logout: "Выйти",
  admin_news: "Опубликовать новость",
  admin_title_ph: "Заголовок",
  admin_body_ph: "Текст новости",
  admin_publish: "Опубликовать",
  days: "д",
  hours: "ч",
  mins: "м",
  secs: "с",
  until_launch: "До открытия ShareMe",
  launched: "ShareMe открыт",
  faq_q1: "Что такое ShareMe?",
  faq_a1:
    "ShareMe — мессенджер с собственным протоколом, чатами, каналами и ботами. Официальный сайт рассказывает о запуске, API и модерации. Само приложение открывается кнопкой на главной после даты релиза.",
  faq_q2: "Когда можно зайти в приложение?",
  faq_a2:
    "Кнопка «Зайти в ShareMe» серая, пока идёт отсчёт. Когда таймер дойдёт до нуля, она станет синей (#007aff) и откроет приложение. Дата хранится в Supabase (или 24 дня от первого визита, если сервер недоступен).",
  faq_q3: "Как создать бота?",
  faq_a3:
    "В приложении найдите @CreateBot → /newbot → username и имя. Вам выдадут API token. Дальше используйте методы из раздела API: getUpdates, sendMessage, клавиатуры и HTML-разметку.",
  faq_q4: "Аккаунт заблокировали — что делать?",
  faq_a4:
    "Откройте бота поддержки и подайте заявку на разблокировку: укажите username, причину и детали. Статус можно смотреть в «Мои заявки». Пароль поддержка никогда не спрашивает.",
  faq_q5: "Где читать новости проекта?",
  faq_a5:
    "Справа на сайте — лента «Свежие новости». Публикации делает команда ShareMe. На телефоне лента находится под основным контентом.",
  faq_q6: "На каких языках сайт?",
  faq_a6:
    "Русский, English, українська и қазақша. Переключатель справа вверху. Выбор сохраняется в браузере.",
  api_base: "Базовый URL",
  api_methods: "Методы",
  api_keyboards: "Клавиатуры",
  api_html: "HTML",
  api_note:
    "Все запросы идут с token бота в пути: /botAPI/<token>/method. Для sendMessage передайте chat_id пользователя и text. parse_mode: HTML включает жирный, курсив и код.",
  footer: "© ShareMe",
};

const en: Dict = {
  nav_home: "Home",
  nav_faq: "FAQ",
  nav_api: "API",
  nav_mod: "Moderation",
  slogan: "You've never seen anything like this",
  enter: "Enter ShareMe",
  enter_soon: "Opening soon",
  news: "Latest news",
  news_empty: "No news yet",
  lang: "Language",
  faq_title: "FAQ",
  faq_lead: "What ShareMe is, when it opens, bots, and how to get help.",
  api_title: "Share Bot API",
  api_lead: "HTTP API for Share bots. Create a bot via @CreateBot, get a token, call the methods below.",
  mod_title: "Moderation",
  mod_lead: "Community rules and how to reach the team. We never ask for passwords or codes.",
  mod_text:
    "ShareMe moderation keeps the community safe. Reports about channels, spam, scams and bans are handled via the in-app support bot and this page.",
  mod_rules_title: "Rules",
  mod_rules:
    "Scams, threats, malware, illegal content and mass spam are forbidden. Violations may lead to account or channel limits.",
  mod_how_title: "How to report",
  mod_how:
    "1) Open the support bot in Share.\n2) Choose Report or Appeal.\n3) Send @username or a link and a short description.\n\nFor unbans use the Unblock flow in the same bot.",
  mod_time_title: "Timing",
  mod_time: "Typical replies within 72 hours. Scam reports are prioritized.",
  admin_secret: "·",
  admin_title: "Admin panel",
  admin_user: "Username",
  admin_pass: "Password",
  admin_login: "Sign in",
  admin_logout: "Sign out",
  admin_news: "Publish news",
  admin_title_ph: "Title",
  admin_body_ph: "News text",
  admin_publish: "Publish",
  days: "d",
  hours: "h",
  mins: "m",
  secs: "s",
  until_launch: "Until ShareMe opens",
  launched: "ShareMe is open",
  faq_q1: "What is ShareMe?",
  faq_a1:
    "ShareMe is a messenger with its own protocol, chats, channels and bots. This site covers launch, API and moderation. The app opens from the Home button after release.",
  faq_q2: "When can I join?",
  faq_a2:
    "The Enter button stays gray during the countdown. At zero it turns blue (#007aff) and opens the app. Launch date comes from Supabase (or 24 days from first visit offline).",
  faq_q3: "How do I create a bot?",
  faq_a3:
    "In the app open @CreateBot → /newbot → pick username and name. You get an API token. Then use getUpdates, sendMessage, keyboards and HTML from the API page.",
  faq_q4: "My account is banned — what now?",
  faq_a4:
    "Open the support bot and submit an unblock request with username, reason and details. Track status under My tickets. Support never asks for your password.",
  faq_q5: "Where is the news?",
  faq_a5: "The Latest news rail on the right (below content on mobile).",
  faq_q6: "Which languages?",
  faq_a6: "Russian, English, Ukrainian and Kazakh. Switcher is top-right; choice is saved.",
  api_base: "Base URL",
  api_methods: "Methods",
  api_keyboards: "Keyboards",
  api_html: "HTML",
  api_note:
    "All calls include the bot token in the path: /botAPI/<token>/method. sendMessage needs chat_id and text. parse_mode HTML enables bold, italic and code.",
  footer: "© ShareMe",
};

const uk: Dict = {
  ...en,
  nav_home: "Головна",
  slogan: "Такого ви ще не бачили",
  enter: "Увійти в ShareMe",
  enter_soon: "Скоро відкриття",
  news: "Свіжі новини",
  lang: "Мова",
  faq_title: "Питання",
  mod_title: "Модерація",
  until_launch: "До відкриття ShareMe",
  launched: "ShareMe відкрито",
  days: "д",
  hours: "г",
  mins: "хв",
  secs: "с",
};

const kz: Dict = {
  ...en,
  nav_home: "Басты",
  slogan: "Мұндайды әлі көрмедіңіз",
  enter: "ShareMe-ге кіру",
  enter_soon: "Жақында",
  news: "Жаңалықтар",
  lang: "Тіл",
  until_launch: "ShareMe ашылғанша",
  launched: "ShareMe ашық",
};

const maps: Record<Lang, Dict> = { ru, en, uk, kz };

export function t(lang: Lang, key: string): string {
  return maps[lang][key] ?? maps.en[key] ?? maps.ru[key] ?? key;
}
