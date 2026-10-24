import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/order-success";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order Confirmed | VShoes" },
    { name: "description", content: "Your simulated order has been placed successfully." },
  ];
}

interface StoredOrder {
  orderId: string;
  date: string;
  customer: string;
  email: string;
  address: string;
  items: Array<{
    name: string;
    size: number;
    color: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
}

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get("orderId") || "VSHOE-DEMO";
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("vshoes_last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Could not read order from session", err);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      {/* Top Banner & Checkmark */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 rounded-full mx-auto flex items-center justify-center text-3xl font-black shadow-lg shadow-emerald-500/20">
          ✓
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Simulated Order Confirmed!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Thank you for exploring <span className="font-bold text-gray-900 dark:text-white">VShoes</span>. Your test order has been registered in the emulation environment.
        </p>
        <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-mono font-bold text-gray-800 dark:text-gray-200">
          Order Reference: {order?.orderId || orderIdParam}
        </div>
      </div>

      {/* Security notice */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-2xl p-4 text-xs text-blue-900 dark:text-blue-200 space-y-1">
        <p className="font-bold flex items-center gap-1.5">
          <span>ℹ️</span> Simulation Scope Reminder
        </p>
        <p>
          No payment transaction was executed. No card credentials were exchanged. This site does not connect to any live or sandbox payment gateways.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-black text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-700">
          Order Summary & Delivery Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[11px]">
              Customer
            </span>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {order ? order.customer : "Demo User"}
            </p>
            <p className="text-gray-500">{order ? order.email : "user@example.com"}</p>
          </div>

          <div>
            <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[11px]">
              Shipping Address
            </span>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {order ? order.address : "742 Evergreen Terrace, Springfield, OR 97477"}
            </p>
          </div>

          <div>
            <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[11px]">
              Payment Method
            </span>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {order ? order.paymentMethod : "Simulated Order (Zero Payment Processor)"}
            </p>
          </div>

          <div>
            <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[11px]">
              Order Date
            </span>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {order ? order.date : new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Items List */}
        {order && order.items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-3">
            <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[11px]">
              Items Ordered
            </span>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-750 text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                    <span className="text-gray-400 text-xs block">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-right">
              <p className="text-gray-500">Subtotal: ${order.subtotal.toFixed(2)}</p>
              <p className="text-gray-500">Shipping: {order.shippingCost === 0 ? "FREE" : `$${order.shippingCost.toFixed(2)}`}</p>
              <p className="text-gray-500">Tax: ${order.tax.toFixed(2)}</p>
              <p className="text-base font-black text-blue-600 dark:text-blue-400 pt-1">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 text-center transition-colors"
        >
          Return to VShoes Store
        </Link>
        <Link
          to="/about"
          className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl text-center transition-colors"
        >
          Read About Store Architecture
        </Link>
      </div>
    </div>
  );
}
