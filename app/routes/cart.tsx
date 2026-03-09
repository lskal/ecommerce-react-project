import type { Route } from "./+types/home";

// TODO: rename metadata
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Cart() {
  return (
    <>
      <p>cart </p>
    </>
  );
}
