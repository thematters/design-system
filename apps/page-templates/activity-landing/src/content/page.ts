/**
 * Edit this file to customise your activity / event landing page.
 * No JSX / .astro changes required — re-run `pnpm dev` after saving.
 *
 * Anything optional can be set to `undefined` (or just deleted from
 * the object) to hide the corresponding section.
 */

export interface CTA {
  label: string;
  href: string;
}

export interface Avatar {
  /** Display name (used in title and as initials fallback). */
  name: string;
  /** Image URL. If omitted, the wall renders the first 2 chars of `name`. */
  src?: string;
  /** Optional Matters handle for linking. */
  handle?: string;
}

export interface DayPrompt {
  /** Day label, e.g. "D1" or "第一天". */
  day: string;
  /** Short prompt copy (≤ 24 chars looks best). */
  prompt: string;
  /** Optional state for visual styling. */
  state?: "open" | "today" | "locked";
}

export interface Entry {
  title: string;
  excerpt: string;
  author: string;
  href: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ActivityLandingContent {
  /** <title> + OG title. */
  pageTitle: string;
  /** <meta description>. */
  pageDescription: string;
  /** <html lang="…"> — defaults to "zh-Hant". */
  lang?: string;

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
  };

  participants: {
    /** Headline above the avatar wall. */
    label: string;
    /** Total participant count, displayed prominently. */
    count: number;
    /** Suffix after the count, e.g. "位作者同行". */
    countSuffix: string;
    /** Avatar list — first 24 are rendered. */
    avatars: Avatar[];
  };

  /** Optional 7-day prompts row. Omit to hide the section. */
  dayPrompts?: {
    eyebrow: string;
    title: string;
    days: DayPrompt[];
  };

  entries: {
    eyebrow: string;
    title: string;
    items: Entry[];
    /** Optional "see more" link below the grid. */
    moreLink?: CTA;
  };

  faq?: {
    eyebrow: string;
    title: string;
    items: FAQ[];
  };

  closing: {
    eyebrow: string;
    title: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
  };

  footer: {
    /** Small print on the left. */
    note: string;
    /** Optional links on the right. */
    links?: CTA[];
  };
}

export const page: ActivityLandingContent = {
  pageTitle: "七日書 2026 春｜matters.town",
  pageDescription:
    "連續七天，每天一個提示。1,284 位作者正在同一個七天裡寫字。Matters 季節性寫作挑戰，2026 春季開放報名中。",
  lang: "zh-Hant",

  hero: {
    eyebrow: "2026 春季 · 進行中第 4 天",
    title: "一千兩百人，正在同一個七天裡寫字",
    subtitle:
      "每天一個提示、七天一本書。在 Matters，你不會一個人寫——加入七日書，留下這個季節的字。",
    primaryCta: { label: "看他人的七日書", href: "https://matters.town/tags/七日書" },
    secondaryCta: { label: "開始寫今天", href: "https://matters.town/write?prompt=spring-day-4" },
  },

  participants: {
    label: "正在書寫",
    count: 1284,
    countSuffix: "位作者同行",
    avatars: [
      { name: "豆泥", handle: "mashbean" },
      { name: "微醺", handle: "wei-xun" },
      { name: "Jenny C.", handle: "jenny-c" },
      { name: "山月", handle: "shanyue" },
      { name: "晚安", handle: "wanan" },
      { name: "余白", handle: "yubai" },
      { name: "甘", handle: "gan" },
      { name: "三月", handle: "march" },
      { name: "晴日", handle: "qingri" },
      { name: "枯山水", handle: "kushan" },
      { name: "Léa", handle: "lea" },
      { name: "陶子", handle: "taozi" },
      { name: "明朗", handle: "minglang" },
      { name: "霜降", handle: "shuangjiang" },
      { name: "夏至", handle: "xiazhi" },
      { name: "菊花茶", handle: "juhuacha" },
    ],
  },

  dayPrompts: {
    eyebrow: "本季七個提示",
    title: "從第一個句子開始",
    days: [
      { day: "D1", prompt: "寫下這個季節的第一個字", state: "open" },
      { day: "D2", prompt: "一個你最近常經過的地方", state: "open" },
      { day: "D3", prompt: "你最近在重讀的一本書", state: "open" },
      { day: "D4", prompt: "今天遇見的人", state: "today" },
      { day: "D5", prompt: "一個放下的決定", state: "locked" },
      { day: "D6", prompt: "想念的味道", state: "locked" },
      { day: "D7", prompt: "寫給下一季的自己", state: "locked" },
    ],
  },

  entries: {
    eyebrow: "今天，他們寫了這些",
    title: "Day 4 · 今天遇見的人",
    items: [
      {
        title: "在巷口豆漿店遇見小學同學",
        excerpt:
          "她抱著還在學步的孩子，跟我說「你怎麼一點都沒變」。我想了一下才意識到——她的意思是頭髮。",
        author: "@mashbean",
        href: "https://matters.town/@mashbean",
      },
      {
        title: "計程車司機說他寫詩",
        excerpt:
          "從機場到家四十分鐘，他唸了三首給我聽。最後一首寫他過世的太太，他唸完之後就一直沒說話。",
        author: "@wei-xun",
        href: "https://matters.town/@wei-xun",
      },
      {
        title: "我媽今天打給我",
        excerpt: "她說最近開始學用 LINE 貼圖，問我能不能教她「為什麼那隻熊會跳舞」。",
        author: "@jenny-c",
        href: "https://matters.town/@jenny-c",
      },
      {
        title: "便利商店店員的名牌",
        excerpt: "上面寫著一個我從來沒看過的字，她說那是她爸爸自己造的。",
        author: "@shanyue",
        href: "https://matters.town/@shanyue",
      },
    ],
    moreLink: {
      label: "看全部選集 →",
      href: "https://matters.town/tags/七日書-2026春",
    },
  },

  faq: {
    eyebrow: "規則 / 常見疑問",
    title: "怎麼參加？",
    items: [
      {
        question: "我需要每天都寫嗎？",
        answer:
          "建議連續七天，但中斷也沒關係——可以補寫、可以跳過。重點是把這個季節的字留下來，不是達成全勤。",
      },
      {
        question: "字數有要求嗎？",
        answer: "沒有硬性下限，建議至少 200 字。寫長寫短都好，重要的是寫了。",
      },
      {
        question: "完成七日書會發生什麼事？",
        answer:
          "完成 7 天的作者會獲得當季「七日書徽章」，作品會收進當季選集，並有機會進入 Matters 首頁推薦。",
      },
      {
        question: "我可以寫付費內容嗎？",
        answer: "可以，但建議至少前 100 字保持公開，這樣其他七日書作者才能看見你的開頭。",
      },
    ],
  },

  closing: {
    eyebrow: "還有 3 天可以加入",
    title: "你的這一季，會留下什麼字？",
    primaryCta: {
      label: "現在開始寫",
      href: "https://matters.town/write?prompt=spring-day-4",
    },
    secondaryCta: {
      label: "先看別人的七日書",
      href: "https://matters.town/tags/七日書",
    },
  },

  footer: {
    note: "© Matters Lab · matters.town · 七日書 2026 春",
    links: [
      { label: "聯絡我們", href: "mailto:hi@matters.news" },
      { label: "Matters 首頁", href: "https://matters.town" },
    ],
  },
};
