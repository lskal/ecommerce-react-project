import type { Route } from "./+types/home";

// TODO: rename metadata
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
