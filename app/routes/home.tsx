import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import type { Route } from "./+types/home";
import { SHOES, getCategories, type Shoe } from "../data/shoes";
import { ShoeCard } from "../components/shoe-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VShoes | Next-Generation Performance & Lifestyle Footwear" },
    {
      name: "description",
      content:
        "Explore the VShoes collection of athletic running shoes, lifestyle sneakers, and outdoor boots. Simple demonstration e-commerce store.",
    },
  ];
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const queryParam = searchParams.get("q") || "";

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);

  // Sync category changes when URL search params change
  useMemo(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const categories = getCategories();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set("q", searchQuery.trim());
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSearchParams({});
  };

  const filteredShoes = useMemo(() => {
    let result = [...SHOES];

    // Filter by Category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (shoe) => shoe.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (shoe) =>
          shoe.name.toLowerCase().includes(q) ||
          shoe.description.toLowerCase().includes(q) ||
          shoe.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-gray-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 justify-between">
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <span>⚡ New Season 2026</span>
              <span>•</span>
              <span>Propulsion Foam Tech</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Engineered For Speed. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-300">
                Designed For Street.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover lightweight carbon-infused race shoes, plush daily trainers, and all-weather trail runners built to amplify every stride.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                Shop The Collection
              </a>
              <Link
                to="/about"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur transition-all"
              >
                About VShoes Store
              </Link>
            </div>
          </div>

          {/* Hero Featured Card */}
          <div className="w-full max-w-sm lg:max-w-md bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl relative group">
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Featured Flagship
            </div>
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-900/60 mb-5 relative flex items-center justify-center">
              <img
                src="/placeholder.png"
                alt="VShoes Velocity Runner Pro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
                  Running Series
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">Velocity Runner Pro</h3>
                <p className="text-sm text-gray-300 mt-1">Dual-density CloudFoam™ + Carbon Plate</p>
              </div>
              <span className="text-2xl font-black text-white">$139.99</span>
            </div>
            <Link
              to="/products/vshoes-velocity-runner"
              className="mt-5 w-full block text-center py-3 bg-white text-gray-950 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              View Specifications
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">Free Global Delivery</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">On all orders over $50</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">30-Day Trail Guarantee</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Hassle-free size swaps</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">Safe Demo Testing</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Zero real payment processors</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">CloudFoam™ Cushioning</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ultra-high energy rebound</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Filter Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        {/* Section Heading & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              All Shoes Collection
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing {filteredShoes.length} of {SHOES.length} available models
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Filter */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-sm">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search shoes by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm rounded-xl pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500"
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
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs sm:text-sm font-semibold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
            >
              Filter
            </button>
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                title="Reset filters"
              >
                Reset
              </button>
            )}
          </form>
        </div>

        {/* Shoes Grid */}
        {filteredShoes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 mx-auto flex items-center justify-center text-2xl font-bold">
              👟
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No matching shoes found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We couldn't find any shoe matching your selected filters. Try searching for "Runner", "Casual", or reset your filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Show All Shoes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredShoes.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider">
              Special Promotion
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Use Code <span className="underline decoration-amber-400">SAVE10</span> for 10% Off
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Experience the lightweight feel of VShoes without the cost. Apply code SAVE10 at our demo checkout.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#catalog"
              className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl shadow-lg transition-all"
            >
              Claim Shoe Deal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
