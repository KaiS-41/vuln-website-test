import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products/:id", "routes/product.tsx"),
  route("cart", "routes/cart.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("order-success", "routes/order-success.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
