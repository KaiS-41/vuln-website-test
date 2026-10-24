import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/checkout";
import { useCart } from "../context/cart-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Demo Checkout | VShoes" },
    { name: "description", content: "Complete your simulated shoe order with no payment processors connected." },
  ];
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Taylor",
    email: "alex.taylor@example.com",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "OR",
    zip: "97477",
    shippingMethod: "standard",
    paymentMethod: "simulated_test",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const shippingCost = formData.shippingMethod === "express" ? 15.0 : 0.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderId = `VSHOE-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderRecord = {
      orderId,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      customer: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`,
      items: items.map((i) => ({
        name: i.name,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal,
      shippingCost,
      tax,
      total,
      paymentMethod:
        formData.paymentMethod === "simulated_test"
          ? "Simulated Test Order (No Gateway)"
          : "Mock Cash on Delivery",
    };

    try {
      sessionStorage.setItem("vshoes_last_order", JSON.stringify(orderRecord));
    } catch (err) {
      console.error("Failed to save order to session", err);
    }

    setTimeout(() => {
      clearCart();
      navigate(`/order-success?orderId=${orderId}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your bag is empty</h2>
        <p className="text-sm text-gray-500">Add items to your shopping bag before checking out.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Demo Checkout</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review your shipping destination and place a simulated test order.
        </p>
      </div>

      {/* Security notice regarding NO payment processors */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-amber-900 dark:text-amber-200">
        <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center shrink-0 text-lg font-bold">
          🛡️
        </div>
        <div className="space-y-0.5 text-xs sm:text-sm">
          <p className="font-bold">No Payment Processors Connected</p>
          <p className="text-amber-800 dark:text-amber-300">
            As configured for this testing environment, VShoes is entirely disconnected from payment gateways (e.g. Stripe, PayPal, credit card merchants). Submitting this order is 100% free and simulated.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer & Shipping Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Customer Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address for Confirmation
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Shipping Destination
            </h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  State / Region
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Delivery Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  formData.shippingMethod === "standard"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === "standard"}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">Standard Delivery</p>
                    <p className="text-[11px] text-gray-500">3-5 business days</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">FREE</span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  formData.shippingMethod === "express"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === "express"}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">Express Air Cargo</p>
                    <p className="text-[11px] text-gray-500">1-2 business days</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">$15.00</span>
              </label>
            </div>
          </div>

          {/* Simulated Payment Selection */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              Payment Method (Emulated / No Real Processor)
            </h2>
            <div className="space-y-3">
              <label
                className={`p-4 rounded-xl border cursor-pointer block transition-all ${
                  formData.paymentMethod === "simulated_test"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="simulated_test"
                    checked={formData.paymentMethod === "simulated_test"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-blue-600 mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      Instant Simulated Order (Recommended)
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Instantly completes order confirmation without requiring card numbers, bank accounts, or tokens.
                    </p>
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer block transition-all ${
                  formData.paymentMethod === "cod_mock"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod_mock"
                    checked={formData.paymentMethod === "cod_mock"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-blue-600 mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      Mock Cash on Delivery (COD)
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Emulated offline payment option upon fictional package delivery.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-700">
              Review Bag ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </h2>

            {/* Compact Items list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity} • Size: {item.size}</p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Processing Simulated Order...
                </>
              ) : (
                <>
                  Place Simulated Order
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-gray-400 space-y-1">
              <p>🔒 Testing Environment Only</p>
              <p>No credit card or payment provider is involved.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
