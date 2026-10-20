import { useEffect, useRef, useState } from 'react';
import { site } from '../config/site.js';
import { generalEnquiryMessage } from '../utils/whatsapp.js';
import WhatsAppButton from './WhatsAppButton.jsx';

const links = [
  { href: '#collection', label: 'Collection' },
  { href: '#categories', label: 'Categories' },
  { href: '#story', label: 'Our story' },
  { href: '#contact', label: 'Contact' },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-indigo">
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="12" fill="#1A2467" />
        <path d="M32 10 L54 32 L32 54 L10 32 Z" fill="none" stroke="#E0A526" strokeWidth="5" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="5" fill="#F2F4F8" />
      </svg>
      {site.brandName}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  // Escape closes the mobile menu and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-mist bg-chalk/95 backdrop-blur">
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />

        <ul className="hidden items-center gap-8 font-display text-[0.95rem] font-bold md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="py-2 text-indigo-deep hover:text-saffron-dark hover:underline hover:decoration-2 hover:underline-offset-8">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <WhatsAppButton variant="solid" message={generalEnquiryMessage(site.brandName)} className="!min-h-[44px] !py-2" />
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-sm text-indigo md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-mist bg-chalk md:hidden">
          <ul className="wrap flex flex-col py-2 font-display text-xl font-bold">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-mist py-4 text-indigo-deep"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="wrap pb-5 pt-4">
            <WhatsAppButton variant="solid" message={generalEnquiryMessage(site.brandName)} className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
