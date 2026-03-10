import type { Route } from "./+types/home";

import HomeMainComponet from "../components/home-main-componet/home-main-componet";

// TODO: fix better metadata
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "HOMEPAGE", content: "this is the home page" },
  ];
}

export default function Home() {
  return (
    <>
      <HomeMainComponet />
    </>
  );
}
