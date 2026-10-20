import AdirePattern from './AdirePattern.jsx';

/**
 * Shows the product photo when `product.image` is set,
 * otherwise a generated Adire-style placeholder so the layout is never empty.
 */
export default function ProductImage({ product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }

  const [bg, fg] = product.palette;

  return (
    <div role="img" aria-label={product.name} className="relative h-full w-full">
      <AdirePattern
        pattern={product.pattern}
        bg={bg}
        fg={fg}
        opacity={0.9}
        scale={0.9}
        className="h-full w-full"
      />
      {/* Developer reminder only. Never shown in the production build. */}
      {import.meta.env.DEV && (
        <span className="absolute bottom-2 right-2 rounded-sm bg-black/70 px-2 py-1 font-display text-xs font-bold text-white">
          Placeholder image
        </span>
      )}
    </div>
  );
}
