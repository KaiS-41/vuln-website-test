import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useCart } from "../context/cart-context";

export function Navbar() {
  const { totalCount, setIsCartDrawerOpen } = useCart();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}#catalog`);
      scrollToCatalog();
    } else {
      navigate("/");
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip to Catalog Link for Accessibility */}
      <a
        href="#catalog"
        onClick={scrollToCatalog}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-xl focus:outline-none"
      >
        Skip to shoe catalog
      </a>

      {/* Top Banner Notice */}
      <aside aria-label="Demo notice" className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs sm:text-sm font-medium py-1.5 px-4 text-center">
        <span>
          🛡️ <strong>VShoes Demo Store:</strong> Emulated site configuration • No payment processing connected.
        </span>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <img src="/shoe.png" alt="VShoes Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                    VShoes<span className="text-blue-600">.</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-400 -mt-1">
                    Footwear Lab
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-700 dark:text-gray-200">
              <Link
                to="/#catalog"
                onClick={scrollToCatalog}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                All Shoes
              </Link>
              <Link
                to="/?category=Running#catalog"
                onClick={scrollToCatalog}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Running
              </Link>
              <Link
                to="/?category=Casual#catalog"
                onClick={scrollToCatalog}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Casual
              </Link>
              <Link
                to="/?category=Outdoor#catalog"
                onClick={scrollToCatalog}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Outdoor
              </Link>
              <Link
                to="/?category=Training#catalog"
                onClick={scrollToCatalog}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Training
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-xs relative">
              <input
                type="text"
                placeholder="Search shoes, styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm rounded-full pl-9 pr-4 py-2 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none transition-all"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {/* Actions: Cart & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-all cursor-pointer"
                aria-label="View Cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalCount}
                  </span>
                )}
              </button>

              <Link
                to="/cart"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
              >
                Cart ({totalCount})
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search & Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm rounded-lg pl-9 pr-4 py-2 border border-transparent focus:border-blue-500 focus:outline-none"
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
              <div className="grid grid-cols-2 gap-2 text-sm font-semibold pt-2">
                <Link
                  to="/#catalog"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToCatalog();
                  }}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  All Shoes
                </Link>
                <Link
                  to="/?category=Running#catalog"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToCatalog();
                  }}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Running
                </Link>
                <Link
                  to="/?category=Casual#catalog"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToCatalog();
                  }}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Casual
                </Link>
                <Link
                  to="/?category=Outdoor#catalog"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToCatalog();
                  }}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Outdoor
                </Link>
                <Link
                  to="/?category=Training#catalog"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToCatalog();
                  }}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Training
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  About VShoes
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
