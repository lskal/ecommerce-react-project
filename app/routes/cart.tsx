import type { Route } from "./+types/home";

// TODO: rename metadata
export function meta({}: Route.MetaArgs) {
  return [{ name: "cart", content: "this is the cart page" }];
}

export default function Cart() {
  return (
    <>
      <p>cart </p>
    </>
  );
}
