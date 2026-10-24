import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/admin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Portal | VShoes" },
    { name: "description", content: "VShoes administration portal login." },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("admin_authenticated") === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore session storage errors
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Admin123" && password === "Admin123") {
      setIsAuthenticated(true);
      setError("");
      try {
        sessionStorage.setItem("admin_authenticated", "true");
      } catch {
        // Ignore session storage errors
      }
    } else {
      setError("Invalid credentials. Please verify your username and password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setError("");
    try {
      sessionStorage.removeItem("admin_authenticated");
    } catch {
      // Ignore session storage errors
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg w-full bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center text-3xl shadow-inner">
            ⚠️
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Hello, You shouldn't be here!
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
              Congrats! you got into the admin page! <br/> <b>Normal users shouldn't be here</b>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all text-center"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 mx-auto shadow-sm">
            <img src="/shoe.png" alt="VShoes Logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sign in with your administrator credentials
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}


        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer"
            >
              Sign In to Admin
            </button>
          </div>
        </form>

        {/* Footer link */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to VShoes Store
          </Link>
        </div>
      </div>
    </div>
  );
}
