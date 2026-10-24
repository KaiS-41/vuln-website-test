import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/cart";
import { useCart } from "../context/cart-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shopping Cart | VShoes" },
    { name: "description", content: "Review your selected shoes and proceed to demo checkout." },
  ];
}

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setDiscountPercent(10);
      setPromoMessage({ text: "Success! 10% discount applied to your order." });
    } else if (promoCode.trim().toUpperCase() === "DEMO20") {
      setDiscountPercent(20);
      setPromoMessage({ text: "Success! 20% demonstration discount applied." });
    } else {
      setPromoMessage({ text: "Invalid promo code. Try SAVE10 or DEMO20.", error: true });
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const estimatedTax = taxableAmount * 0.08;
  const finalTotal = taxableAmount + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Your Shopping Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm sm:text-base">
          Looks like you haven't added any shoes to your bag yet. Explore our running, trail, and casual styles to find your next pair.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors"
          >
            Explore Shoe Catalog
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Shopping Cart</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {items.reduce((acc, i) => acc + i.quantity, 0)} items in your cart
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-red-500 hover:text-red-700 self-start sm:self-auto cursor-pointer"
        >
          Clear All Items
        </button>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-center gap-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm">
        <span className="text-xl">⚠️</span>
        <div>
          <strong>Demo Site Configuration:</strong> Payment processing is intentionally not connected. This checkout flow is purely simulated and does not charge any money.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-100 dark:bg-gray-700 shrink-0"
                />
                <div>
                  <Link
                    to={`/products/${item.shoeId}`}
                    className="font-bold text-base text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Size: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.size}</span> • Color: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.color}</span>
                  </p>
                  <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-1">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-700">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-l-xl text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-r-xl text-sm"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-black text-base text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Demo Checkout */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-gray-900 dark:text-white pb-3 border-b border-gray-200 dark:border-gray-700">
            Order Summary
          </h2>

          {/* Promo code form */}
          <form onSubmit={applyPromoCode} className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400">
              Promo or Voucher Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Try SAVE10"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white uppercase focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-xs ${promoMessage.error ? "text-red-500" : "text-emerald-500"} font-medium`}>
                {promoMessage.text}
              </p>
            )}
          </form>

          {/* Calculations */}
          <div className="space-y-3 text-sm border-t border-gray-100 dark:border-gray-700/60 pt-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Standard Shipping</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Estimated Tax (8%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3">
              <span>Estimated Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="space-y-3 pt-2">
            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
            >
              Proceed to Demo Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <p className="text-[11px] text-center text-gray-400">
              🔒 No credit cards required • Simulation only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
