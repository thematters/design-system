/**
 * Edit this file to customise your coming-soon / waitlist page.
 * No JSX / .astro changes required.
 */

export interface ComingSoonContent {
  pageTitle: string;
  pageDescription: string;
  lang?: string;

  /** Top-of-page brand copy. */
  brand: {
    /** Linked label, e.g. "matters.town". */
    label: string;
    /** Where the brand link goes. */
    href: string;
  };

  eyebrow: string;
  headline: string;
  lead: string;

  /** Set to a future ISO 8601 timestamp to enable the countdown.
   *  Set to `null` (or just delete the key) to hide the countdown. */
  launchAt: string | null;

  /** Email waitlist form. Set `endpoint` to `null` to hide the form. */
  waitlist: {
    enabled: boolean;
    /** POST endpoint. We send `application/x-www-form-urlencoded`. */
    endpoint: string | null;
    /** Method override; default POST. */
    method?: "POST" | "GET";
    placeholder: string;
    submitLabel: string;
    /** Shown after a successful submit. */
    successMessage: string;
    /** Shown if the request fails. */
    errorMessage: string;
    /** Privacy / disclaimer copy under the form. */
    note?: string;
  };

  footer: {
    copyright: string;
    links?: Array<{ label: string; href: string }>;
  };
}

export const page: ComingSoonContent = {
  pageTitle: "matters.town 進階版｜2026 Q3 上線",
  pageDescription:
    "Matters 進階版正在打造中——更深的編輯器、更乾淨的訂閱、與 Fediverse 互通的長文。預計 2026 Q3 上線，先留 email 拿首發邀請。",
  lang: "zh-Hant",

  brand: {
    label: "matters.town",
    href: "https://matters.town",
  },

  eyebrow: "Coming · 2026 Q3",
  headline: "Matters 進階版，正在打造",
  lead: "更深的編輯器、更乾淨的訂閱、與 Fediverse 互通的長文。先留下 email，上線當天我們寄首發邀請給你。",

  launchAt: "2026-09-01T00:00:00+08:00",

  waitlist: {
    enabled: true,
    // Drop in your real endpoint. Examples:
    //   - Buttondown:  https://buttondown.email/api/emails/embed-subscribe/<user>
    //   - Mailchimp:   https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>
    //   - Netlify:     /  (with `data-netlify="true"` — see form note)
    endpoint: "https://example.com/api/waitlist",
    method: "POST",
    placeholder: "your@email.com",
    submitLabel: "加入候補名單",
    successMessage: "收到了——上線當天會寄信給你。",
    errorMessage: "送出時出了點問題，請稍後再試或寄信給我們。",
    note: "我們不會把 email 給第三方。可隨時退訂。",
  },

  footer: {
    copyright: "© Matters Lab · matters.town",
    links: [
      { label: "Matters 首頁", href: "https://matters.town" },
      { label: "聯絡我們", href: "mailto:hi@matters.news" },
      { label: "Threads", href: "https://www.threads.net/@matterstown" },
    ],
  },
};
