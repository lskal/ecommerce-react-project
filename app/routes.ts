import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/home.tsx"),
  route("/products", "./routes/products.tsx"),
  route("/products/:id", "./routes/product-detail.tsx"),
  route("/cart", "./routes/cart.tsx"),
] satisfies RouteConfig;
