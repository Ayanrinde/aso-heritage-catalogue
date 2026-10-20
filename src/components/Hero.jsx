import { site } from '../config/site.js';
import { generalEnquiryMessage } from '../utils/whatsapp.js';
import AdirePattern from './AdirePattern.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="on-dark relative isolate overflow-hidden bg-indigo text-chalk"
    >
      {/* The hero's one big gesture: a slowly drifting field of stitched circles, faded out behind the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_0%,transparent_80%)] md:[mask-image:linear-gradient(to_right,transparent_5%,black_70%)]"
      >
        <div className="absolute -inset-32 animate-drift">
          <AdirePattern pattern="oniko" fg="#D7DCEB" opacity={0.3} scale={2} className="h-full w-full" />
        </div>
      </div>

      <div className="wrap py-20 sm:py-28 lg:py-40">
        <h1
          id="hero-heading"
          className="max-w-3xl animate-rise text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {site.hero.headline}
        </h1>

        <p
          className="mt-6 max-w-xl animate-rise text-lg text-mist sm:text-xl"
          style={{ animationDelay: '120ms' }}
        >
          {site.hero.intro}
        </p>

        <div
          className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <a href="#collection" className="btn btn-saffron">
            Browse the collection
          </a>
          <WhatsAppButton variant="line-light" message={generalEnquiryMessage(site.brandName)} />
        </div>

        <p className="mt-6 max-w-md animate-rise text-base text-mist" style={{ animationDelay: '360ms' }}>
          This is a catalogue, not a shop. There is no online checkout. We confirm every order with you on WhatsApp.
        </p>
      </div>
    </section>
  );
}
