import type { Route } from "./+types/home";

// TODO: rename metadata
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Product() {
  return (
    <>
      <p>products</p>
    </>
  );
}
