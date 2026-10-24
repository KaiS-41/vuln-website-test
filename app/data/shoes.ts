export interface Shoe {
  id: string;
  name: string;
  category: "Running" | "Casual" | "Outdoor" | "Training";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  sizes: number[];
  colors: string[];
  inStock: boolean;
  image: string;
  featured?: boolean;
  badge?: string;
}

export const SHOES: Shoe[] = [
  {
    id: "vshoes-velocity-runner",
    name: "VShoes Velocity Runner Pro",
    category: "Running",
    price: 139.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviewsCount: 142,
    description:
      "Engineered for high-cadence marathons and daily tempo runs. Features our ultra-responsive CloudFoam™ midsole and breathable aerodynamic mesh upper.",
    details: [
      "Lightweight responsive foam cushioning",
      "Breathable engineered jacquard mesh",
      "High-abrasion rubber outsole with multi-surface traction",
      "Reflective heel counter for low-light visibility",
      "Offset: 8mm | Weight: 8.4 oz"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Obsidian / Volt", "Triple White", "Laser Blue"],
    inStock: true,
    image: "/placeholder.png",
    featured: true,
    badge: "Best Seller"
  },
  {
    id: "vshoes-cloudstrider-neo",
    name: "VShoes CloudStrider Neo",
    category: "Casual",
    price: 119.99,
    rating: 4.6,
    reviewsCount: 98,
    description:
      "All-day urban comfort meets minimalist Scandinavian street aesthetics. Cushioned cupsole structure keeps your feet energized through city streets.",
    details: [
      "Premium micro-grain synthetic leather",
      "Memory foam contoured arch support",
      "Reinforced toe cap with perforated ventilation",
      "Non-marking rubber tread",
      "Padded collar and tongue for snug fit"
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ["Classic White / Gum", "Stone Grey", "Midnight Black"],
    inStock: true,
    image: "/placeholder.png",
    featured: true,
    badge: "New"
  },
  {
    id: "vshoes-trailblazer-x",
    name: "VShoes TrailBlazer X Summit",
    category: "Outdoor",
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewsCount: 215,
    description:
      "Tackle steep inclines and rugged backcountry terrain with confidence. Reinforced toe bumpers and waterproof membrane shield feet from adverse conditions.",
    details: [
      "Weather-resistant water-shield membrane",
      "Deep 5mm multi-directional aggressive lugs",
      "Rock protection plate embedded in the midsole",
      "Gusseted tongue to keep trail debris out",
      "Ripstop nylon upper with TPU overlays"
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colors: ["Forest Green / Earth", "Stealth Charcoal", "Alpine Ochre"],
    inStock: true,
    image: "/placeholder.png",
    featured: true,
    badge: "Staff Pick"
  },
  {
    id: "vshoes-apex-court-retro",
    name: "VShoes Apex Court Retro",
    category: "Casual",
    price: 89.99,
    rating: 4.5,
    reviewsCount: 76,
    description:
      "A tribute to 80s court champions. Clean silhouette with vintage color accents and vulcanized rubber sole for timeless everyday wear.",
    details: [
      "Soft action leather with suede heel panel",
      "Vintage cream-tinted rubber foxing",
      "OrthoLite® eco comfort footbed",
      "Low-profile silhouette for flexible ankle mobility"
    ],
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Off-White / Forest Green", "Chalk / Burgundy", "Monochrome Black"],
    inStock: true,
    image: "/placeholder.png"
  },
  {
    id: "vshoes-pulse-nitro-trainer",
    name: "VShoes Pulse Nitro Cross-Trainer",
    category: "Training",
    price: 129.99,
    rating: 4.7,
    reviewsCount: 164,
    description:
      "Engineered for intense HIIT workouts, heavy lifting, and agility training. Flat wide base provides grounded stability during compound lifts.",
    details: [
      "Dual-density firm heel for lifting stability",
      "Forefoot flex grooves for natural burpees and sprints",
      "Side-wall rubber wrap for rope climb protection",
      "Breathable engineered mesh with abrasion shield"
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ["Hyper Crimson / Black", "Titanium Grey", "Electric Blue"],
    inStock: true,
    image: "/placeholder.png",
    badge: "Top Rated"
  },
  {
    id: "vshoes-aero-carbon-fly",
    name: "VShoes Aero Carbon Elite",
    category: "Running",
    price: 219.99,
    rating: 4.9,
    reviewsCount: 88,
    description:
      "Our premier competition racing shoe. A full-length curved carbon fiber propulsion plate sandwiched between ultra-lightweight PEBA superfoam.",
    details: [
      "Curved rigid carbon fiber plate for maximum energy return",
      "Super-critical nitrogen-infused PEBA foam midsole",
      "Translucent featherlight mono-mesh upper",
      "Race-tuned feather rubber outsole"
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
    colors: ["Solar Neon", "Pure White / Cyan", "Phantom Black"],
    inStock: true,
    image: "/placeholder.png",
    featured: true,
    badge: "Elite"
  },
  {
    id: "vshoes-fleet-slipon",
    name: "VShoes Fleet Glide Slip-On",
    category: "Casual",
    price: 74.99,
    originalPrice: 89.99,
    rating: 4.4,
    reviewsCount: 63,
    description:
      "Hands-free slip-on convenience with adaptive stretch-knit fabric that molds comfortably to your foot contours.",
    details: [
      "Adaptive 4-way stretch knit upper",
      "Easy-entry heel collar design",
      "Ultra-cushioned EVA walking sole",
      "Removable washable insole"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Heather Grey", "Navy Blue", "Onyx Black"],
    inStock: true,
    image: "/placeholder.png"
  },
  {
    id: "vshoes-storm-hiker-mid",
    name: "VShoes Storm Hiker Mid WP",
    category: "Outdoor",
    price: 189.99,
    rating: 4.7,
    reviewsCount: 112,
    description:
      "Mid-cut ankle support built for wet-weather scrambles and alpine hikes. Waterproof inner bootie seals moisture completely.",
    details: [
      "HydroGuard™ seam-sealed waterproof bootie",
      "Molded ankle collar with padded Achilles notch",
      "Dual-compound all-terrain VibraGrip sole",
      "Durable rust-proof speed lacing hardware"
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    colors: ["Desert Tan / Rust", "Dark Slate", "Olive Green"],
    inStock: true,
    image: "/placeholder.png"
  }
];

export function getShoeById(id: string): Shoe | undefined {
  return SHOES.find((shoe) => shoe.id === id);
}

export function getCategories(): string[] {
  return ["All", "Running", "Casual", "Outdoor", "Training"];
}
