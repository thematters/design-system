export interface CTA {
  label: string;
  href: string;
}

export interface Metric {
  label: string;
  value: string;
  note: string;
}

export interface WatchCase {
  id: string;
  sourceType: "動態留言" | "文章留言";
  sourceTitle: string;
  reason: "色情廣告" | "濫發廣告";
  publicNotice: string;
  commentPreview: string;
  watcher: string;
  handledAt: string;
  appealStatus: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface CommunityWatchContent {
  pageTitle: string;
  pageDescription: string;
  lang?: string;
  domain: string;
  statusLabel: string;
  hero: {
    title: string;
    slogan: string;
    subtitle: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
    note: string;
    imageAlt: string;
  };
  metrics: Metric[];
  log: {
    eyebrow: string;
    title: string;
    description: string;
    cases: WatchCase[];
  };
  appeal: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    steps: Step[];
  };
  training: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Step[];
  };
  footer: {
    note: string;
    links?: CTA[];
  };
}

export const page: CommunityWatchContent = {
  pageTitle: "馬特市守望相助隊｜matters.town",
  pageDescription:
    "馬特市守望相助隊公開透明紀錄頁。加入守望相助隊，一起杜絕垃圾廣告入侵馬特市小鎮，所有檢舉都會公開紀錄，可供申訴與覆核。",
  lang: "zh-Hant",
  domain: "community-watch.matters.town",
  statusLabel: "公開紀錄",
  hero: {
    title: "馬特市守望相助隊",
    slogan: "馬特市向垃圾廣告宣戰",
    subtitle:
      "加入守望相助隊，一起杜絕垃圾廣告入侵馬特市小鎮。\n在這裡，守望相助隊的所有檢舉，都會公開紀錄，\n讓申訴、覆核與社群自治都有地方可查。",
    primaryCta: { label: "查看處理紀錄", href: "#watch-log" },
    secondaryCta: { label: "我要申訴", href: "#appeal" },
    note: "下廣告可以，但請去 Billboard 支持馬特市站方，\n站方很需要收入，請正規廣告主一起支持。",
    imageAlt: "榕樹下的叔叔阿姨喝茶討論公告紀錄，象徵馬特市守望相助隊公開處理垃圾留言。",
  },
  metrics: [
    { label: "色情廣告", value: "18", note: "本月已移除" },
    { label: "濫發廣告", value: "42", note: "本月已移除" },
    { label: "申訴受理", value: "5", note: "站方評估中" },
  ],
  log: {
    eyebrow: "巡守紀錄",
    title: "最近被移除的留言",
    description:
      "原留言預設以毛玻璃遮蔽，避免垃圾內容被二次散播；需要仲裁時，任何人仍可點開全文比對。",
    cases: [
      {
        id: "cmt-8f2a71",
        sourceType: "動態留言",
        sourceTitle: "關於今天站內活動的討論",
        reason: "濫發廣告",
        publicNotice: "本則貼文已由守望相助隊檢舉",
        commentPreview: "限時優惠，點擊連結領取投資教學名額，加客服可立即開通會員方案。",
        watcher: "巷口阿伯",
        handledAt: "2026-05-09",
        appealStatus: "未申訴",
      },
      {
        id: "cmt-3b91cd",
        sourceType: "文章留言",
        sourceTitle: "一篇長文底下的回覆串",
        reason: "色情廣告",
        publicNotice: "本則貼文已由守望相助隊檢舉",
        commentPreview: "成人交友廣告，附外站聯絡方式與多組重複關鍵字，和原文討論無關。",
        watcher: "公園大嬸",
        handledAt: "2026-05-09",
        appealStatus: "站方覆核中",
      },
      {
        id: "cmt-1d77e4",
        sourceType: "文章留言",
        sourceTitle: "新作者的第一篇文章",
        reason: "濫發廣告",
        publicNotice: "本則貼文已由守望相助隊檢舉",
        commentPreview: "多篇文章重複張貼相同購物折扣碼與外部短網址，未回應文章內容。",
        watcher: "樓下鄰長",
        handledAt: "2026-05-08",
        appealStatus: "未申訴",
      },
    ],
  },
  appeal: {
    eyebrow: "救濟機制",
    title: "被刪留言可以申訴",
    body: "如果你認為留言被誤判，請寄信到 hi@matters.town。站方會依留言 ID 查核原文、處理理由與守望相助隊操作紀錄。",
    email: "hi@matters.town",
    steps: [
      { title: "附上留言 ID", body: "例如 cmt-8f2a71，公開紀錄中都會顯示。" },
      { title: "說明你的帳號與理由", body: "請留下 Matters 帳號，以及為什麼認為這不是垃圾留言。" },
      { title: "由站方覆核", body: "最終決策權仍在站方；必要時會恢復留言或調整守望相助隊權限。" },
    ],
  },
  training: {
    eyebrow: "下一步",
    title: "馬特市守望相助 AI 訓練中",
    body: "這批資料先以人工標註保存，之後可作為自動檢測 bot 的訓練與評測基礎；自動工具上線前，仍應保留人工覆核與申訴通道。",
    steps: [
      {
        title: "先收乾淨資料",
        body: "只收兩類明確樣本：色情廣告、濫發廣告，降低模型一開始誤判正常討論的風險。",
      },
      {
        title: "再做海巡檢舉機器人",
        body: "bot 先做候選提示與批次整理，不直接刪留言；正式刪除仍由人或站方確認。",
      },
      {
        title: "每次自動化都留痕",
        body: "未來若導入模型，也要記錄模型版本、分數、人工覆核結果，方便退場與修正。",
      },
    ],
  },
  footer: {
    note: "© Matters Lab · community-watch.matters.town",
    links: [
      { label: "申訴信箱", href: "mailto:hi@matters.town" },
      { label: "Matters 首頁", href: "https://matters.town" },
      { label: "Billboard", href: "https://matters.town/billboard" },
    ],
  },
};
