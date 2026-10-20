import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { products } from './data/products.js';
import { categories } from './data/categories.js';

// site.js reads import.meta.env when first imported, so each test loads App fresh.
async function renderApp() {
  vi.resetModules();
  const { default: App } = await import('./App.jsx');
  return renderToStaticMarkup(<App />);
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('App render', () => {
  it('renders every section landmark', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '2348012345678');
    const html = await renderApp();
    for (const id of ['collection', 'categories', 'story', 'contact', 'main']) {
      expect(html).toContain(`id="${id}"`);
    }
    expect(html).toContain('<h1');
  });

  it('renders every product with its name and naira price', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '2348012345678');
    const html = await renderApp();
    for (const product of products) {
      expect(html).toContain(product.name);
    }
    expect(html).toContain('₦145,000');
  });

  it('lists every category', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '2348012345678');
    const html = await renderApp();
    for (const category of categories) {
      expect(html).toContain(category.name);
    }
  });

  it('points WhatsApp buttons at the configured number with a pre-filled product message', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '08012345678');
    const html = await renderApp();
    expect(html).toContain('https://wa.me/2348012345678?text=');
    expect(html).toContain(encodeURIComponent('Indigo Adire Agbada Set'));
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('disables WhatsApp buttons instead of linking to a bad URL when the number is invalid', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', 'oops');
    const html = await renderApp();
    expect(html).not.toContain('wa.me/');
    expect(html).toContain('aria-disabled="true"');
  });

  it('does not claim a working checkout or payment', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '2348012345678');
    const html = await renderApp();
    expect(html).not.toMatch(/add to cart|pay now|secure checkout|buy now/i);
    expect(html).toContain('no online checkout');
  });
});
