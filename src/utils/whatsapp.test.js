import { describe, expect, it } from 'vitest';
import {
  buildWhatsAppUrl,
  generalEnquiryMessage,
  normalizeWhatsAppNumber,
  productEnquiryMessage,
} from './whatsapp.js';
import { formatNaira } from './currency.js';

describe('normalizeWhatsAppNumber', () => {
  it('keeps a clean international number', () => {
    expect(normalizeWhatsAppNumber('2348012345678')).toBe('2348012345678');
  });

  it('strips +, spaces and dashes', () => {
    expect(normalizeWhatsAppNumber('+234 801-234 5678')).toBe('2348012345678');
  });

  it('converts Nigerian local format (0801...) to 234...', () => {
    expect(normalizeWhatsAppNumber('08012345678')).toBe('2348012345678');
  });

  it('handles a 00 international prefix', () => {
    expect(normalizeWhatsAppNumber('002348012345678')).toBe('2348012345678');
  });

  it('rejects empty, missing and too-short values', () => {
    expect(normalizeWhatsAppNumber('')).toBeNull();
    expect(normalizeWhatsAppNumber(undefined)).toBeNull();
    expect(normalizeWhatsAppNumber(null)).toBeNull();
    expect(normalizeWhatsAppNumber('12345')).toBeNull();
    expect(normalizeWhatsAppNumber('not a number')).toBeNull();
  });

  it('rejects numbers longer than 15 digits', () => {
    expect(normalizeWhatsAppNumber('1234567890123456')).toBeNull();
  });
});

describe('buildWhatsAppUrl', () => {
  it('builds a plain wa.me link without a message', () => {
    expect(buildWhatsAppUrl('2348012345678')).toBe('https://wa.me/2348012345678');
  });

  it('URL-encodes the pre-filled message', () => {
    const url = buildWhatsAppUrl('2348012345678', 'Hi & hello? 100%');
    expect(url).toBe('https://wa.me/2348012345678?text=Hi%20%26%20hello%3F%20100%25');
  });

  it('round-trips the message through the text parameter', () => {
    const message = "Hello Diamond Age, I'd like the Agbada (₦85,000).";
    const url = new URL(buildWhatsAppUrl('08012345678', message));
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/2348012345678');
    expect(url.searchParams.get('text')).toBe(message);
  });

  it('returns null for an invalid number so the UI can disable the button', () => {
    expect(buildWhatsAppUrl('abc', 'hi')).toBeNull();
    expect(buildWhatsAppUrl(undefined)).toBeNull();
  });
});

describe('messages', () => {
  it('product enquiry mentions the product name and naira price', () => {
    const msg = productEnquiryMessage({ name: 'Test Piece', price: 45000 }, 'Diamond Age Solutions');
    expect(msg).toContain('Diamond Age Solutions');
    expect(msg).toContain('Test Piece');
    expect(msg).toContain('45,000');
    expect(msg).toContain('₦');
  });

  it('general enquiry mentions the brand', () => {
    expect(generalEnquiryMessage('Diamond Age Solutions')).toContain('Diamond Age Solutions');
  });
});

describe('formatNaira', () => {
  it('formats with the naira sign, thousands separators and no decimals', () => {
    expect(formatNaira(1250000)).toBe('₦1,250,000');
  });
});
