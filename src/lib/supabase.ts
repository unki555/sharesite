import { createClient } from "@supabase/supabase-js";

const url =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://dlneweqfmbkcjrjncbaa.supabase.co";

const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_XGaEWpB4wpma0l-no9R6JA_wQrgQkUR";

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/** Table: shareme_launch { id: 1, launch_at: timestamptz } */
export async function fetchLaunchAt(): Promise<Date> {
  try {
    const { data, error } = await supabase
      .from("shareme_launch")
      .select("launch_at")
      .eq("id", 1)
      .maybeSingle();
    if (!error && data?.launch_at) {
      return new Date(data.launch_at);
    }
  } catch {
    /* fallback */
  }
  const env = import.meta.env.VITE_LAUNCH_AT as string | undefined;
  if (env) return new Date(env);
  // default: 24 days from first visit stored in localStorage
  const key = "shareme_launch_fallback";
  let iso = localStorage.getItem(key);
  if (!iso) {
    const d = new Date();
    d.setDate(d.getDate() + 24);
    iso = d.toISOString();
    localStorage.setItem(key, iso);
  }
  return new Date(iso);
}

export type NewsItem = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from("shareme_news")
      .select("id, title, body, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (!error && data) return data as NewsItem[];
  } catch {
    /* local */
  }
  const raw = localStorage.getItem("shareme_news_local");
  if (raw) {
    try {
      return JSON.parse(raw) as NewsItem[];
    } catch {
      /* */
    }
  }
  return [
    {
      id: "1",
      title: "Добро пожаловать в ShareMe",
      body: "Официальный сайт проекта. Следите за новостями здесь.",
      created_at: new Date().toISOString(),
    },
  ];
}

export async function publishNews(title: string, body: string): Promise<NewsItem | null> {
  const item: NewsItem = {
    id: crypto.randomUUID(),
    title: title.trim().slice(0, 120),
    body: body.trim().slice(0, 2000),
    created_at: new Date().toISOString(),
  };
  try {
    const { data, error } = await supabase
      .from("shareme_news")
      .insert({ title: item.title, body: item.body })
      .select("id, title, body, created_at")
      .single();
    if (!error && data) return data as NewsItem;
  } catch {
    /* local fallback */
  }
  const list = await fetchNews();
  const next = [item, ...list.filter((x) => x.id !== "1")];
  localStorage.setItem("shareme_news_local", JSON.stringify(next));
  return item;
}
