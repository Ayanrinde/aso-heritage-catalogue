
import { site } from '../config/site.js';

export default function Footer() {
  return (
    <footer className="on-dark border-t border-white/10 bg-indigo-deep pb-24 pt-8 text-mist sm:pb-10">
      <div className="wrap flex flex-col gap-4 text-base sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>
            &copy; {new Date().getFullYear()} {site.brandName}
          </p>
          <p className="mt-1 text-sm text-mist/70">
            Fictional fashion catalogue created for demonstration purposes.
          </p>
        </div>

        <p className="text-sm">
          Website concept by{' '}
          <span className="font-bold text-white">
            Diamond Age Solutions
          </span>
        </p>
      </div>
    </footer>
  );
}