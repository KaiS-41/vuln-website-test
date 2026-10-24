import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { CartProvider } from "./context/cart-context";
import { Navbar } from "./components/navbar";
import { CartDrawer } from "./components/cart-drawer";
import { Footer } from "./components/footer";

export const links: Route.LinksFunction = () => [
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The shoe or page you are looking for does not exist in our catalog."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center mb-4 text-2xl font-black">
          !
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{message}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{details}</p>
        <a
          href="/"
          className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Return to VShoes Store
        </a>
        {stack && (
          <pre className="mt-6 text-left p-3 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-red-700 dark:text-red-300">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
