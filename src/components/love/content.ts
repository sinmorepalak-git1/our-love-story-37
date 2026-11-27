/** All romantic copy lives here — easy to edit. */

export const loadingStatuses = [
  "Searching for someone special...",
  "Scanning memories...",
  "Checking compatibility...",
  "Almost there...",
  "Found 1 Result ❤️",
];

export function getLetters(gender: "boy" | "girl" | "neutral" = "neutral", name?: string) {
  const greeting = name && name.trim() ? name.trim() : "Jaan";

  if (gender === "boy") {
    return [
      {
        body: `Hey ${greeting}... Pata hai...\n\nMain ye sab normally bol nahi pati...\n\nbut there are some things I really want you to know. ❤️`,
        cta: "Next 💗",
      },
      {
        body: "Jab bhi tum online aate ho...\n\nmera mood automatically better ho jata hai.\n\nIt's actually crazy how one boy can make my whole world so special. 🥺❤️",
        cta: "Continue 💕",
      },
      {
        body: "Honestly...\n\nTum meri life ke sabse pyare coincidence ho.\n\nAur shayad mere favorite person too. ❤️",
        cta: "There's something I want to ask you...",
      },
    ];
  }

  if (gender === "girl") {
    return [
      {
        body: `Hey ${greeting}... Pata hai...\n\nMain ye sab normally bol nahi pata...\n\nbut there are some things I really want you to know. ❤️`,
        cta: "Next 💗",
      },
      {
        body: "Jab bhi tum online aati ho...\n\nmera mood automatically better ho jata hai.\n\nIt's actually crazy how one girl can make my whole world so beautiful. 🥺❤️",
        cta: "Continue 💕",
      },
      {
        body: "Honestly...\n\nTum meri life ki sabse pyari coincidence ho.\n\nAur shayad meri favorite person too. ❤️",
        cta: "There's something I want to ask you...",
      },
    ];
  }

  // Neutral (fallback if gender is missing or not specified)
  return [
    {
      body: `Hey ${greeting}... Pata hai...\n\nMain ye sab normally bol nahi pata...\n\nbut there are some things I really want you to know. ❤️`,
      cta: "Next 💗",
    },
    {
      body: "Jab bhi tum online aate ho...\n\nmera mood automatically better ho jata hai.\n\nIt's actually crazy how one person can make such a difference. 🥺❤️",
      cta: "Continue 💕",
    },
    {
      body: "Honestly...\n\nTum meri life ki sabse pyari coincidence ho.\n\nAur shayad meri favorite coincidence too. ❤️",
      cta: "There's something I want to ask you...",
    },
  ];
}

export const letters = getLetters("neutral");

export const rememberWhen = [
  "Remember when we first started talking?",
  "We would stay up late,\ncompletely losing track of time.",
  "Every notification from you\nmade my heart skip a beat.",
];

export const questions = [
  {
    title: "Coffee Date? ☕",
    options: ["YES ❤️", "OF COURSE 💕"],
    reply: "I knew it. Coffee tastes better with you. ☕❤️",
  },
  {
    title: "Long Walk? 🌙",
    options: ["YES ❤️", "ALWAYS ♾️"],
    reply: "Then let's get lost in conversations. 🌙❤️",
  },
  {
    title: "Late Night Talks? 🌙✨",
    options: ["100% ❤️", "FOREVER ♾️"],
    reply: "Those are my favorite kind of nights. 🥺",
  },
];

export const noButtonTexts = [
  "Are you sure? 🥺",
  "Really? 🥹",
  "Think again... 💗",
  "One more chance? 🥺💕",
  "Okay YES ❤️",
];