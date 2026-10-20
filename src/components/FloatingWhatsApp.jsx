import { useEffect, useState } from 'react';
import { site } from '../config/site.js';
import { generalEnquiryMessage } from '../utils/whatsapp.js';
import WhatsAppButton from './WhatsAppButton.jsx';

/**
 * Always-reachable enquiry button, kept out of the way while the Contact section
 * (which already has a large WhatsApp button) is on screen.
 */
export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 shadow-lg shadow-indigo-deep/30">
      {/* Icon only on small screens, icon + label from the sm breakpoint up. */}
      <WhatsAppButton variant="solid" message={generalEnquiryMessage(site.brandName)} className="hidden sm:inline-flex" />
      <WhatsAppButton
        variant="solid"
        iconOnly
        message={generalEnquiryMessage(site.brandName)}
        className="!px-0 w-14 sm:hidden"
      />
    </div>
  );
}
