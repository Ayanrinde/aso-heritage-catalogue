import { site } from '../config/site.js';
import { buildWhatsAppUrl } from '../utils/whatsapp.js';

const variants = {
  solid: 'btn-wa',
  line: 'btn-line',
  'line-light': 'btn-line-light',
  saffron: 'btn-saffron',
};

// Make a misconfigured number obvious while developing.
if (import.meta.env.DEV && !buildWhatsAppUrl(site.whatsappNumber)) {
  console.warn(
    '[Diamond Age] VITE_WHATSAPP_NUMBER is missing or invalid. WhatsApp buttons are disabled. See .env.example.',
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

/**
 * Opens a WhatsApp chat with the business number from .env, optionally pre-filled with `message`.
 * If the number is invalid the button renders disabled instead of linking somewhere wrong.
 */
export default function WhatsAppButton({
  message = '',
  variant = 'solid',
  iconOnly = false,
  className = '',
  children = 'Enquire on WhatsApp',
}) {
  const href = buildWhatsAppUrl(site.whatsappNumber, message);
  const classes = `btn ${variants[variant] ?? variants.solid} ${className}`;

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="WhatsApp number is not configured yet"
        className={`${classes} cursor-not-allowed opacity-60`}
      >
        <ChatIcon />
        {!iconOnly && children}
        {iconOnly && <span className="sr-only">{children}</span>}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      <ChatIcon />
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
