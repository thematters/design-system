/**
 * Edit this file to customise your About page.
 * No JSX / .astro changes required.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Optional avatar URL — falls back to initials. */
  avatar?: string;
}

export interface Partner {
  name: string;
  /** Optional logo URL. Without it we render the name in serif. */
  logo?: string;
  href?: string;
}

export interface AboutContent {
  pageTitle: string;
  pageDescription: string;
  lang?: string;

  brand: {
    label: string;
    href: string;
  };

  nav: NavLink[];

  hero: {
    eyebrow: string;
    /** Big serif mission statement — keep ≤ 60 chars per line. */
    statement: string;
    lead: string;
  };

  pillars: {
    eyebrow: string;
    title: string;
    items: Pillar[];
  };

  timeline: {
    eyebrow: string;
    title: string;
    items: TimelineItem[];
  };

  team: {
    eyebrow: string;
    title: string;
    members: TeamMember[];
  };

  partners?: {
    eyebrow: string;
    title: string;
    items: Partner[];
  };

  footer: {
    copyright: string;
    contactEmail: string;
    socialLinks: NavLink[];
  };
}

export const page: AboutContent = {
  pageTitle: "關於 Matters｜matters.town",
  pageDescription:
    "Matters 是一個以寫作者為中心的繁中創作社群。2018 年起於香港，現以 matters.town 為主域名，把寫作的所有權還給創作者。",
  lang: "zh-Hant",

  brand: {
    label: "matters.town",
    href: "https://matters.town",
  },

  nav: [
    { label: "我們相信", href: "#pillars" },
    { label: "歷程", href: "#timeline" },
    { label: "團隊", href: "#team" },
    { label: "夥伴", href: "#partners" },
  ],

  hero: {
    eyebrow: "About Matters",
    statement: "讓寫作回歸創作者",
    lead: "Matters 是一個以寫作者為中心的繁中創作社群。我們相信文字有重量，也相信寫的人應該擁有自己的字。從 2018 年到現在，我們做的每一個決定，都從這個原點出發。",
  },

  pillars: {
    eyebrow: "我們相信",
    title: "三件不退讓的事",
    items: [
      {
        title: "創作者擁有自己的字",
        body: "Matters 不會把作品鎖在我們自己的圍牆裡——文章可以匯出、可以鏡像、可以離開。長文走 ActivityPub 對外聯邦，與 Fediverse 互通。",
      },
      {
        title: "繁體中文是設計起點",
        body: "從第一版的 PingFang TC 到現在的 Noto Serif TC，我們把繁中當主角設計，而不是英文 UI 的翻譯。標點、行距、引號都重新調過。",
      },
      {
        title: "社群比演算法重要",
        body: "我們不做最大化停留時間的 feed。我們做的是讓有溫度的對話被看見——七日書、Matters 馬拉松、編輯精選，都是這個原則的延伸。",
      },
    ],
  },

  timeline: {
    eyebrow: "Our Journey",
    title: "從香港到 matters.town",
    items: [
      {
        year: "2018",
        title: "在香港啟動",
        body: "Matters.News 誕生於香港，是一個以區塊鏈支付為基礎的中文寫作社群。第一批使用者多為香港、台灣的非虛構寫作者。",
      },
      {
        year: "2020",
        title: "Likecoin 整合 + 創作者經濟",
        body: "與 Likecoin 深度整合，作者可以收到讀者的拍手贊助。同年首次舉辦 Matters 寫作馬拉松。",
      },
      {
        year: "2022",
        title: "團隊重組到 Matters Lab",
        body: "從原組織分拆，由 Matters Lab 接手產品開發。專注於繁中寫作生態。",
      },
      {
        year: "2024",
        title: "啟動 Fediverse 整合",
        body: "Matters 開始實驗 ActivityPub，讓站內長文以 Article 物件對外聯邦，串連 Mastodon、PixelFed 等。",
      },
      {
        year: "2026",
        title: "matters.town 上線",
        body: "搬遷主域名，重整品牌——紫 + 萊姆綠的新識別、編輯器全面更新、與 Fediverse 雙向打通。",
      },
    ],
  },

  team: {
    eyebrow: "Team",
    title: "做這件事的人",
    members: [
      { name: "豆泥", role: "總經理 / Matters × Fediverse" },
      { name: "Sandy", role: "產品設計" },
      { name: "Mark", role: "前端 / 編輯器" },
      { name: "Erin", role: "後端 / Federation" },
      { name: "Léa", role: "社群運營" },
      { name: "Gabriel", role: "編輯 / 內容策劃" },
    ],
  },

  partners: {
    eyebrow: "Partners",
    title: "一起把生態做大的人",
    items: [
      { name: "LikeCoin", href: "https://like.co" },
      { name: "g0v 零時政府", href: "https://g0v.tw" },
      { name: "報導者 The Reporter", href: "https://www.twreporter.org" },
      { name: "端傳媒 Initium Media", href: "https://theinitium.com" },
      { name: "燃燈計畫", href: "https://example.com" },
    ],
  },

  footer: {
    copyright: "© Matters Lab · matters.town",
    contactEmail: "hi@matters.news",
    socialLinks: [
      { label: "Threads", href: "https://www.threads.net/@matterstown" },
      { label: "Mastodon", href: "https://mastodon.social/@matters" },
      { label: "GitHub", href: "https://github.com/thematters" },
    ],
  },
};
