import { formatNaira } from './currency.js';

/**
 * Turn whatever was typed into the env file into a wa.me-ready number
 * (digits only, with country code). Returns null when it can't be trusted.
 *
 * Accepted:
 *   "2348012345678", "+234 801 234 5678", "0801 234 5678" (Nigerian local), "00234..."
 */
export function normalizeWhatsAppNumber(raw) {
  if (raw === undefined || raw === null) return null;

  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);

  // Nigerian local format: 0 + 10 digits -> 234 + 10 digits.
  // Note: this assumes an 11-digit number starting with 0 is Nigerian.
  if (/^0\d{10}$/.test(digits)) digits = `234${digits.slice(1)}`;

  // E.164 allows at most 15 digits; anything shorter than 8 is not a real number.
  if (digits.length < 8 || digits.length > 15) return null;

  return digits;
}

/** Build a https://wa.me link with an optional pre-filled message. Returns null if the number is invalid. */
export function buildWhatsAppUrl(number, message = '') {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${normalized}${query}`;
}

/** Pre-filled message for a single product enquiry. */
export function productEnquiryMessage(product, brandName) {
  return `Hello ${brandName}, I'd like to enquire about the ${product.name} (${formatNaira(product.price)}). Is it available, and what sizes do you have?`;
}

/** Pre-filled message for a general enquiry. */
export function generalEnquiryMessage(brandName) {
  return `Hello ${brandName}, I found your catalogue online and would like to make an enquiry.`;
}
