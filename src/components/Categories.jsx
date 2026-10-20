import { categories } from '../data/categories.js';
import { products } from '../data/products.js';

export default function Categories({ activeCategory, onChoose }) {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="py-20 sm:py-28">
      <div className="wrap">
        <h2 id="categories-heading" className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-indigo sm:text-5xl">
          Browse by category
        </h2>

        <ul className="mt-10 border-t border-mist">
          {categories.map((category) => {
            const count = products.filter((product) => product.category === category.id).length;
            const isActive = activeCategory === category.id;

            return (
              <li key={category.id} className="border-b border-mist">
                <button
                  type="button"
                  onClick={() => onChoose(category.id)}
                  aria-controls="collection"
                  className="group flex w-full items-baseline justify-between gap-6 py-6 text-left transition-colors hover:bg-indigo hover:text-chalk sm:px-4"
                >
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
                    <span className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                      {category.name}
                      {isActive && <span className="sr-only"> (currently shown)</span>}
                    </span>
                    <span className="max-w-sm text-base text-indigo-deep/80 group-hover:text-mist">
                      {category.description}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 font-display text-base font-bold">
                    {isActive && (
                      <span aria-hidden="true" className="h-3 w-3 rotate-45 bg-saffron" />
                    )}
                    {count} {count === 1 ? 'piece' : 'pieces'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
