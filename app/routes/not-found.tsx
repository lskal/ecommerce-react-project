import NotFound from "../components/not-found/not-found";
import type { Route } from "./+types/not-found";

// TODO: fix metadata
export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 page New React Router App" },
    { name: "404 page", content: "this is the 404 page" },
  ];
}

export default function notfound() {
  return <NotFound />;
}
