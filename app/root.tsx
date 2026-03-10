import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import type { Route } from "./+types/root";

import NotFound from "./components/not-found/not-found";
import Header from "./components/hearer/header";

import "./app.css";
import "./styles/button.scss";
import styles from "./root.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export const links: Route.LinksFunction = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return [
    { rel: "icon", href: `${baseUrl}favicon/favicon.ico`, sizes: "any" },
    { rel: "icon", href: `${baseUrl}favicon/favicon.svg`, type: "image/svg+xml" },
    {
      rel: "icon",
      href: `${baseUrl}favicon/favicon-96x96.png`,
      sizes: "96x96",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      href: `${baseUrl}favicon/apple-touch-icon.png`,
      sizes: "180x180",
    },
    { rel: "manifest", href: `${baseUrl}favicon/site.webmanifest` },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  const isErrorPage = error instanceof Error || isRouteErrorResponse(error);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {!isErrorPage && <Header />}

        <main className={`${styles.main} ${isErrorPage ? styles.mainError : ""}`}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound message="This route doesn't exist in our store." />;
    }

    return (
      <main>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </main>
    );
  }

  if (error instanceof Error) {
    return (
      <main>
        <h1>Unexpected error</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return <NotFound />;
}
