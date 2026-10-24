import { Link } from "react-router";
import { useCart } from "../context/cart-context";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 id="cart-drawer-title" className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="sr-only">Close cart</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">Your bag is empty</p>
                <p className="text-sm text-gray-500 mt-1 max-w-xs">
                  Discover our new shoe collection and find the perfect pair for your daily stride.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h3>
                        <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Size: {item.size} • Color: {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg text-sm font-bold"
                          title="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg text-sm font-bold"
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg p-2.5 text-xs text-amber-800 dark:text-amber-300">
                ⚠️ <strong>Simulated checkout:</strong> No real payment processing is enabled on this store.
              </div>

              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors"
                >
                  Proceed to Checkout
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full block text-center py-2.5 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  View Full Cart Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
