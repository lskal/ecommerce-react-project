import ProductListing from "../components/product-listing/product-listing";
import type { Route } from "./+types/home";

// TODO: fix better metadata
export function meta({}: Route.MetaArgs) {
  return [{ name: "category page", content: "this is the category page " }];
}

export default function Cart() {
  return (
    <>
      <ProductListing category="smartphones" />
    </>
  );
}
