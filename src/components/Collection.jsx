import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { site } from '../config/site.js';
import { generalEnquiryMessage } from '../utils/whatsapp.js';
import ProductCard from './ProductCard.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

const filters = [{ id: 'all', name: 'All pieces' }, ...categories];

export default function Collection({ activeCategory, onChange }) {
  const visible =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="collection" aria-labelledby="collection-heading" className="bg-white py-20 sm:py-28">
      <div className="wrap">
        <h2 id="collection-heading" className="text-3xl font-extrabold leading-tight tracking-tight text-indigo sm:text-5xl">
          The collection
        </h2>
        <p className="mt-4 max-w-xl text-lg">
          Sample pieces and prices are shown below. Tap Enquire on WhatsApp on any piece to ask about sizes and availability.
        </p>

        <div role="group" aria-label="Filter by category" className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(filter.id)}
                className={`min-h-[44px] rounded-sm border-2 border-indigo px-4 py-2 font-display text-[0.95rem] font-bold transition-colors ${
                  selected ? 'bg-indigo text-chalk' : 'bg-transparent text-indigo hover:bg-mist'
                }`}
              >
                {filter.name}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-6 font-display text-base font-bold text-indigo-deep/80">
          Showing {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
        </p>

        {visible.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 max-w-md">
            <p className="text-lg">
              Nothing in this category yet. Message us to ask what is coming next.
            </p>
            <WhatsAppButton variant="solid" message={generalEnquiryMessage(site.brandName)} className="mt-4" />
          </div>
        )}
      </div>
    </section>
  );
}
