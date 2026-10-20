import { categories } from '../data/categories.js';
import { site } from '../config/site.js';
import { formatNaira } from '../utils/currency.js';
import { productEnquiryMessage } from '../utils/whatsapp.js';
import ProductImage from './ProductImage.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function ProductCard({ product }) {
  const categoryName = categories.find((category) => category.id === product.category)?.name;

  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <ProductImage product={product} />
        {product.tag && (
          <span className="absolute left-0 top-4 bg-saffron px-3 py-1 font-display text-sm font-bold text-indigo-deep">
            {product.tag}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="font-display text-sm font-bold text-saffron-dark">{categoryName}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug text-indigo-deep">{product.name}</h3>
        <p className="mt-2 text-base text-indigo-deep/80">{product.description}</p>
        <p className="mt-auto pt-4 font-display text-2xl font-extrabold text-indigo">
          {formatNaira(product.price)}
        </p>
      </div>

      <WhatsAppButton
        variant="line"
        message={productEnquiryMessage(product, site.brandName)}
        className="mt-4 w-full"
      />
    </article>
  );
}