import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src="/shoe.png" alt="VShoes Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-black tracking-tight text-white">
                VShoes<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Crafting premium footwear for urban explorers, marathon runners, and outdoor trail blazers.
            </p>
            <div className="inline-block px-3 py-1 bg-amber-950/60 border border-amber-800 text-amber-300 rounded-md text-xs font-medium">
              Demo Mode • No Payment Gateways
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Collections
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/?category=Running#catalog" className="hover:text-blue-400 transition-colors">
                  Running & Marathons
                </Link>
              </li>
              <li>
                <Link to="/?category=Casual#catalog" className="hover:text-blue-400 transition-colors">
                  Casual & Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/?category=Outdoor#catalog" className="hover:text-blue-400 transition-colors">
                  Outdoor & Trail
                </Link>
              </li>
              <li>
                <Link to="/?category=Training#catalog" className="hover:text-blue-400 transition-colors">
                  Gym & Cross-Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-blue-400 transition-colors">
                  Demo Checkout
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About VShoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer / Security Notice */}
          <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700/50">
            <h3 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>⚠️</span> Demonstration Only
            </h3>
            <p className="text-xs text-gray-300 leading-normal">
              This site is designed to emulate an e-commerce platform. No payment gateway or payment processing service is connected. All orders and checkouts are simulated.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} VShoes Inc. Demo shoe store environment.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-gray-400">Security & Scope</Link>
            <Link to="/about" className="hover:text-gray-400">Terms of Simulation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
