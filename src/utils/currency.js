const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

/** 45000 -> "₦45,000" */
export function formatNaira(amount) {
  return naira.format(amount);
}
