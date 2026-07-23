export function money(n, lang = 'ar') {
  const amount = Number(n) || 0;
  if (lang === 'en') {
    return amount.toLocaleString('en-US') + ' EGP';
  }
  return amount.toLocaleString('ar-EG') + ' ج.م';
}
