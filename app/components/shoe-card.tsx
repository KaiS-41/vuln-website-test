import { Link } from "react-router";
import type { Shoe } from "../data/shoes";
import { useCart } from "../context/cart-context";

interface ShoeCardProps {
  shoe: Shoe;
}

export function ShoeCard({ shoe }: ShoeCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      shoeId: shoe.id,
      name: shoe.name,
      price: shoe.price,
      size: shoe.sizes[0] || 9,
      color: shoe.colors[0] || "Standard",
      image: shoe.image,
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-750 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Badge */}
      {shoe.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full bg-blue-600 text-white shadow-sm">
            {shoe.badge}
          </span>
        </div>
      )}

      {/* Product Image Link */}
      <Link
        to={`/products/${shoe.id}`}
        className="relative block w-full aspect-square bg-gray-100 dark:bg-gray-700/50 overflow-hidden"
      >
        <img
          src={shoe.image}
          alt={shoe.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Product Info */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {shoe.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <span>★</span>
              <span>{shoe.rating.toFixed(1)}</span>
              <span className="text-gray-400">({shoe.reviewsCount})</span>
            </div>
          </div>

          <Link
            to={`/products/${shoe.id}`}
            className="block text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1"
          >
            {shoe.name}
          </Link>

          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {shoe.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-gray-900 dark:text-white">
              ${shoe.price.toFixed(2)}
            </span>
            {shoe.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${shoe.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              type="button"
              className="p-2 rounded-xl bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all cursor-pointer"
              title="Quick Add (Standard Size)"
              aria-label={`Quick add ${shoe.name}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <Link
              to={`/products/${shoe.id}`}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
