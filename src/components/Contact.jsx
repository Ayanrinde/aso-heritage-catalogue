
import { site } from '../config/site.js';
import { generalEnquiryMessage } from '../utils/whatsapp.js';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="on-dark bg-indigo-deep py-20 text-chalk sm:py-28"
    >
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="contact-heading"
            className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            Found something you like? Start a chat.
          </h2>

          <p className="mt-6 max-w-md text-lg text-mist">
            This is a fictional fashion catalogue created to demonstrate
            how a clothing brand can showcase its products online.
            Product enquiries use the demo WhatsApp contact.
          </p>

          <WhatsAppButton
            variant="saffron"
            message={generalEnquiryMessage(site.brandName)}
            className="mt-8 w-full sm:w-auto"
          />
        </div>

        <div className="self-center rounded-lg border border-white/20 p-6">
          <h3 className="font-display text-xl font-bold text-saffron">
            A concept by Diamond Age Solutions
          </h3>

          <p className="mt-3 text-base text-mist">
            We create modern, responsive websites that help businesses
            showcase their products and connect with customers.
          </p>
        </div>
      </div>
    </section>
  );
}