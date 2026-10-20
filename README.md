# Diamond Age Solutions: fashion catalogue

A mobile-first catalogue site built with React 18, Vite 5 and Tailwind CSS 3.4.
Visitors browse pieces and prices, then enquire through WhatsApp with a pre-filled message.

**There is no cart, checkout or payment integration, and the site does not claim one.**

## Run it

Requires Node 18+ (built and tested on Node 22).

```bash
npm install
cp .env.example .env     # then edit the values (see below)
npm run dev              # http://localhost:5173
```

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                    |
| `npm run build`   | Production build into `dist/`                 |
| `npm run preview` | Serve the production build locally            |
| `npm test`        | Run the unit and render tests (Vitest)        |

## Configure the business details (`.env`)

```
VITE_WHATSAPP_NUMBER=2348012345678
VITE_CONTACT_EMAIL=hello@example.com
VITE_CONTACT_PHONE=+234 800 000 0000
VITE_CONTACT_LOCATION=Nigeria
VITE_INSTAGRAM_HANDLE=diamondagesolutions
```

- `VITE_WHATSAPP_NUMBER` accepts `2348012345678`, `+234 801 234 5678` or the local `0801 234 5678`.
  An 11-digit number starting with `0` is treated as Nigerian and converted to `234…`.
  Numbers from other countries must be entered with their country code.
- If the number is missing or invalid, every WhatsApp button renders **disabled** (and the dev console warns) rather than linking to a wrong chat.
- Empty contact values are hidden from the Contact section.
- Vite reads `.env` at build time. After changing it, restart `npm run dev` or rebuild.

## Edit the content

| To change…                  | Edit                         |
| --------------------------- | ---------------------------- |
| Products, prices, photos    | `src/data/products.js`       |
| Categories                  | `src/data/categories.js`     |
| Hero and brand story copy   | `src/config/site.js`         |
| Colours and fonts           | `tailwind.config.js`, `index.html` (Google Fonts link) |

**Adding real product photos:** put images in `public/products/` and add `image: '/products/agbada.jpg'` to the product.
Products without `image` show a generated Adire-style placeholder (a "Placeholder image" badge appears in dev only).
Use a 4:5 portrait crop, ideally under 200 KB each.

## Files created

```
index.html
package.json
vite.config.js            Vite + Vitest config
tailwind.config.js        Brand colours, fonts, animations
postcss.config.js
.env.example              Template for business settings
.env                      Local values (git-ignored)
.gitignore
README.md
public/
  favicon.svg
src/
  main.jsx                Entry point
  App.jsx                 Page composition and shared category state
  index.css               Tailwind layers, buttons, focus and reduced-motion rules
  App.test.jsx            Render smoke tests (6)
  config/
    site.js               Brand name, contact details, hero and story copy
  data/
    products.js           Sample catalogue (8 products)
    categories.js         4 categories
  utils/
    whatsapp.js           Number cleaning, wa.me link and message builders
    whatsapp.test.js      Unit tests (13)
    currency.js           Naira formatting
  components/
    Navbar.jsx            Sticky nav, accessible mobile menu
    Hero.jsx              Headline and drifting Adire pattern
    Categories.jsx        Category list that filters the collection
    Collection.jsx        Filter buttons and product grid
    ProductCard.jsx       Image, name, price, enquiry button
    ProductImage.jsx      Real photo or generated placeholder
    AdirePattern.jsx      SVG pattern generator (circles, stripes, diamonds)
    BrandStory.jsx        Story and values
    Contact.jsx           WhatsApp call to action and contact details
    Footer.jsx
    WhatsAppButton.jsx    The one component that builds WhatsApp links
    FloatingWhatsApp.jsx  Persistent button, hidden while Contact is in view
```

## How it was tested

- `npm test`: 19 tests. They cover number normalisation (local, `+234`, `00` prefix, invalid), URL building and encoding, message content, naira formatting, all sections and products rendering, WhatsApp links using the configured number, the disabled fallback for an invalid number, and the absence of any checkout or payment wording.
- `npm run build`: passes with no warnings.
- Checked in a headless Chromium at 390px and 1366px: no horizontal overflow, the mobile menu opens and closes (Escape returns focus to the toggle), category and filter buttons update the grid, and product buttons open `wa.me` links in a new tab with `rel="noopener noreferrer"`.

**Test it yourself:** set your own number in `.env`, run `npm run dev`, tap "Enquire on WhatsApp" on a product, and confirm WhatsApp opens a chat with the right number and the product name already typed in. Then blank out the number and confirm the buttons become disabled.

## Before launch checklist

1. Replace the sample products, prices and descriptions. They are placeholders.
2. Replace the hero and story copy in `src/config/site.js` with the client's own wording.
3. Add real product photos.
4. Set the real WhatsApp number and contact details. `hello@example.com` and `+234 800 000 0000` are placeholders.
5. Update the page title and description in `index.html` if the client wants different wording.
6. Test a WhatsApp enquiry on a real phone.

## Deploying (for example on Vercel)

Vite bakes `VITE_*` variables in at build time, so add them in the host's **Environment Variables** settings (not just your local `.env`) and redeploy after any change. Build command `npm run build`, output directory `dist`.

## Known limitations

- **Fonts load from Google Fonts.** Without a connection the site falls back to Georgia and system sans-serif. For full privacy or offline use, self-host the fonts.
- **No analytics, no SEO per product, no cart.** It is a single-page catalogue by design.
- **Dev-tooling advisories.** `npm audit` reports issues in dev dependencies (the Vite 5 dev server's esbuild, and Vitest). `npm audit --omit=dev` reports **0** vulnerabilities, because production output contains only React and your code. Only run `npm run dev` on a trusted network. Upgrading Vite and Vitest to the latest majors clears these but may need config changes.
