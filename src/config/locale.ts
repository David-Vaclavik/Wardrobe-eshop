const LOCALE = import.meta.env.VITE_LOCALE ?? "en-US";
const CURRENCY = import.meta.env.VITE_CURRENCY ?? "USD";

export const priceFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
});
