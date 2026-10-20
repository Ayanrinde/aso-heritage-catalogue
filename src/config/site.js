
/**
 * Aṣọ Heritage — Fashion Catalogue Demo
 * Replace sample copy and contact details with a real client's
 * information before launching a production website.
 */
const env = import.meta.env;

export const site = {
  brandName: 'Aṣọ Heritage',

  // Read from .env. Supports Nigerian WhatsApp number formats.
  whatsappNumber: env.VITE_WHATSAPP_NUMBER,

  contact: {
    email: env.VITE_CONTACT_EMAIL || '',
    phone: env.VITE_CONTACT_PHONE || '',
    location: env.VITE_CONTACT_LOCATION || '',
    instagram: (env.VITE_INSTAGRAM_HANDLE || '').replace(/^@/, ''),
  },

  hero: {
    // Demo copy
    headline: 'African Roots. Modern Style. Made for Every Day.',
    intro:
      'Discover thoughtfully styled pieces inspired by African fabrics and contemporary fashion. Explore our collection, choose your favourites, and enquire directly on WhatsApp for sizes, availability and delivery details.',
  },

  story: {
    heading: 'Tradition in Every Thread. Style in Every Detail.',
    paragraphs: [
      'Aṣọ Heritage is a fictional fashion brand created to demonstrate a modern online catalogue for a Nigerian clothing business. Our concept brings African-inspired patterns together with contemporary styles for both men and women.',
      'Explore the collection and view sample prices before sending an enquiry on WhatsApp. There is no online checkout in this demo. Availability, sizing, payment and delivery details would be confirmed directly with the store.',
    ],
    values: [
      {
        title: 'Style for Everyone',
        text:
          'Explore a sample collection designed to represent different styles for men and women.',
      },
      {
        title: 'Clear Sample Pricing',
        text:
          'Each demo product displays a sample price to help visitors understand the catalogue experience.',
      },
      {
        title: 'African-Inspired Design',
        text:
          'Discover a visual direction inspired by adire, Ankara, aso-oke and contemporary African fashion.',
      },
    ],
  },
};