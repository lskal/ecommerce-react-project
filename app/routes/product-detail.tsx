import type { Route } from "./+types/home";

// TODO: rename metadata
export function meta({}: Route.MetaArgs) {
  return [{ name: "product page", content: "this is the product page" }];
}

export default function ProductDetails() {
  return (
    <>
      <p>product-details</p>
      <p>id product</p>
    </>
  );
}
