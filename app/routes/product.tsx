import { useState } from "react";
import { Link, useParams } from "react-router";
import type { Route } from "./+types/product";
import { getShoeById, SHOES, type Shoe } from "../data/shoes";
import { useCart } from "../context/cart-context";
import { ShoeCard } from "../components/shoe-card";

export function loader({ params }: Route.LoaderArgs) {
  const shoe = getShoeById(params.id || "");
  if (!shoe) {
    throw new Response("Shoe not found", { status: 404 });
  }
  return { shoe };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.shoe) return [{ title: "Shoe Not Found | VShoes" }];
  return [
    { title: `${loaderData.shoe.name} | VShoes` },
    { name: "description", content: loaderData.shoe.description },
  ];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const shoe = loaderData.shoe;
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0] || 9);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colors[0] || "Standard");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  // Reviews state with some realistic initial reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev-1",
      author: "Alex Morgan",
      rating: 5,
      date: "2 days ago",
      comment: "Incredible bounce and arch support! Ran a 10k right out of the box with zero blisters.",
    },
    {
      id: "rev-2",
      author: "Marcus Chen",
      rating: 5,
      date: "1 week ago",
      comment: "Super lightweight and breathable. The fit is true to size. High quality build.",
    },
    {
      id: "rev-3",
      author: "Sarah Jenkins",
      rating: 4,
      date: "2 weeks ago",
      comment: "Very stylish and comfortable for walking all day. Wish it came in more vibrant colors though!",
    },
  ]);

  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState("");

  const handleAddToCart = () => {
    addItem({
      shoeId: shoe.id,
      name: shoe.name,
      price: shoe.price,
      size: selectedSize,
      color: selectedColor,
      image: shoe.image,
      quantity,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      rating: Number(reviewerRating),
      date: "Just now",
      comment: reviewerComment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setReviewerName("");
    setReviewerComment("");
  };

  const relatedShoes = SHOES.filter(
    (s) => s.id !== shoe.id && (s.category === shoe.category || s.featured)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span>/</span>
        <Link
          to={`/?category=${shoe.category}`}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          {shoe.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs sm:max-w-md">
          {shoe.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm flex items-center justify-center group">
            {shoe.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase rounded-full shadow-md">
                {shoe.badge}
              </span>
            )}
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Thumbnail preview strip */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-blue-500 overflow-hidden"
              >
                <img
                  src={shoe.image}
                  alt={`View angle ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
                {shoe.category}
              </span>
              <div className="flex items-center text-amber-500 text-sm font-semibold gap-1">
                <span>★ {shoe.rating.toFixed(1)}</span>
                <span className="text-gray-400 text-xs">
                  ({reviews.length + shoe.reviewsCount} reviews)
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {shoe.name}
            </h1>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                ${shoe.price.toFixed(2)}
              </span>
              {shoe.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${shoe.originalPrice.toFixed(2)}
                </span>
              )}
              {shoe.originalPrice && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  Save ${(shoe.originalPrice - shoe.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {shoe.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Color: <span className="font-semibold text-blue-600">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {shoe.colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 shadow-xs"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                US Men's Size: <span className="font-semibold text-blue-600">{selectedSize}</span>
              </label>
              <span className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
                True to size fit
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {shoe.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add To Shopping Bag
              </button>
            </div>

            {addedToast && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span>✓</span>
                <span>Added {quantity} pair(s) of {shoe.name} (Size {selectedSize}) to your bag!</span>
              </div>
            )}
          </div>

          {/* Key Features Bullet List */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Technical Specifications & Features
            </h3>
            <ul className="space-y-2">
              {shoe.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews & Community Feedback */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Customer Feedback & Reviews</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hear directly from runners and athletes testing {shoe.name}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Write a review form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Share Your Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Jordan Smith"
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Rating
                </label>
                <select
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(Number(e.target.value))}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value={5}>★★★★★ (5 - Excellent)</option>
                  <option value={4}>★★★★☆ (4 - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 - Average)</option>
                  <option value={2}>★★☆☆☆ (2 - Below Expectations)</option>
                  <option value={1}>★☆☆☆☆ (1 - Poor)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Comments & Fit Experience
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  placeholder="How did the shoe feel on your run or workout?"
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Post Review
              </button>
            </form>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{rev.author}</span>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
                <div className="text-amber-500 text-xs">
                  {"★".repeat(rev.rating)}
                  {"☆".repeat(5 - rev.rating)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedShoes.length > 0 && (
        <section className="border-t border-gray-200 dark:border-gray-800 pt-12 space-y-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedShoes.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
