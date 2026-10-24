import { Link } from "react-router";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About VShoes | Next-Gen Footwear & Demonstration Platform" },
    { name: "description", content: "Learn more about the VShoes footwear brand and our demonstration platform." },
  ];
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
          About VShoes
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Next-Generation Footwear. Built for Performance.
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          VShoes merges high-cadence athletic biomechanics with contemporary street aesthetics.
        </p>
      </div>

      {/* Hero Image / Brand Spotlight */}
      <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-video flex items-center justify-center p-8 relative">
        <img
          src="/placeholder.png"
          alt="VShoes lab workshop"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-8">
          <p className="text-white text-lg font-bold">
            VShoes Innovation Lab • Prototyping Tomorrow's Stride
          </p>
        </div>
      </div>

      {/* Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg font-bold">
            👟
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">CloudFoam™ Midsole</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Nitrogen-infused cellular foam delivering up to 88% kinetic energy rebound with minimal weight penalty.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
            🌿
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">Eco-Conscious Materials</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Every upper utilizes recycled ocean-bound ocean yarn and biodegradable polymer lace aglets.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg font-bold">
            ⚡
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">Rigid Carbon Propulsion</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            S-curved aerospace-grade composite plate stabilizes pronation and launches you into forward propulsion.
          </p>
        </div>
      </div>

      {/* Special Security Architecture Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-3xl p-8 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200">
            Platform Configuration & Payment Policy
          </h2>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          This site is intentionally crafted as an e-commerce emulation demo. In accordance with safety policies and system specifications:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-200 list-disc list-inside">
          <li><strong>No Payment Gateway:</strong> No third-party payment processing services (e.g. Stripe, PayPal, Square, Authorize.Net, Braintree, Adyen, Apple Pay, Google Pay) are connected.</li>
          <li><strong>No Real Transactions:</strong> The checkout process operates entirely via local emulation without charging credit cards or financial institutions.</li>
          <li><strong>No Financial Data Collection:</strong> Users are never prompted for CVVs, credit card account numbers, or banking credentials.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Can I purchase actual physical shoes through this site?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
              No. VShoes is an emulated store configuration. All products, reviews, and checkouts are simulations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Where are the product images from?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
              All shoe models display the local placeholder asset configured directly in the workspace repository.
            </p>
          </div>
        </div>
      </div>

      {/* Back to store CTA */}
      <div className="pt-6 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-colors"
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
