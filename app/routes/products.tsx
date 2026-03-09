import type { Route } from "./+types/home";

// TODO: fix metadata
export function meta({}: Route.MetaArgs) {
  return [{ name: "products listing", content: "this is the products page" }];
}

export default function Product() {
  return (
    <>
      <p>products</p>
    </>
  );
}
