// Single source of truth for all restaurant info (editable later via admin).
export const SITE = {
  name: "Balti Village",
  orderUrl: "https://www.balti-village.co.uk/menu",
  phone: "01582 467658",
  phoneHref: "tel:01582467658",
  address: "93 Lower Luton Road, Harpenden",
  mapQuery: "93 Lower Luton Road, Harpenden",
  hours: { open: "17:00", close: "22:30" },
  offer: {
    title: "Collection orders get 10% off",
    badge: "Collection orders — 10% off",
    details: ["Collection only", "Orders over £10.00 excluding delivery"],
  },
  hygiene: "5 — Very Good",
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const DELIVERY = [
  { code: "AL3", min: 20, fee: 0 },
  { code: "AL4", min: 15, fee: 0 },
  { code: "AL5", min: 15, fee: 0 },
  { code: "SG4", min: 20, fee: 0 },
];

export const CATEGORIES = [
  "Starters", "Tandoori Dishes", "Chef's Special", "Biryani Dishes", "Sundries",
  "Vegetable Dishes", "Balti Dishes", "Pasanda Dishes", "Dansak Dishes", "Pathia Dishes",
  "Rogan Josh Dishes", "Curry Dishes", "Madras Dishes", "Vindaloo Dishes", "Bhuna Dishes",
  "Korma Dishes", "English Dishes", "Condiments", "Sweets", "Chutney & Pickles", "Drinks",
];

export const REVIEWS = [
  { text: "Excellent service. Fast delivery friendly delivery driver and very tasty food.", name: "Liza CampbellMaughan" },
  { text: "Great food! A little hot but managed to get through it!", name: "Tony Swiss McFarland" },
  { text: "What else is there to say? Never had a bad curry from here. Service always quick. Great bunch of people. Good value. Many thanks.", name: "Richard Brown" },
  { text: "Thank you very much for a lovely meal", name: "Theresa Cotton" },
  { text: "Delicious and very speedy delivery", name: "Toby Sayle" },
];

export function isOpenNow(d = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: false });
  const now = fmt.format(d);
  return now >= SITE.hours.open && now < SITE.hours.close;
}

export function lookupPostcode(input: string) {
  const m = input.trim().toUpperCase().match(/^([A-Z]{1,2}\d{1,2})/);
  if (!m) return null;
  return DELIVERY.find((a) => a.code === m[1]) ?? false;
}
