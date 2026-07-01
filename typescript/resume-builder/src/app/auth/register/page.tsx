"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { registerUser } from "@/apis/authApi";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      router.push("/resume");
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-slate-950/0" />
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-75 blur-lg transition duration-1000" />
        
        {/* Main card */}
        <div className="relative rounded-2xl border border-slate-800/50 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50">
              <User className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-3xl font-bold text-transparent">
              Create Account
            </h1>
            
            <p className="mt-2 text-sm text-slate-400">
              Build your AI-powered resume in minutes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="group">
              <label className="mb-2 block text-sm font-medium text-slate-300 transition-colors group-focus-within:text-blue-400">
                Full Name
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User
                    size={18}
                    className="text-slate-500 transition-colors group-focus-within:text-blue-400"
                  />
                </div>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-slate-800 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="mb-2 block text-sm font-medium text-slate-300 transition-colors group-focus-within:text-blue-400">
                Email
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail
                    size={18}
                    className="text-slate-500 transition-colors group-focus-within:text-blue-400"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-slate-800 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="mb-2 block text-sm font-medium text-slate-300 transition-colors group-focus-within:text-blue-400">
                Password
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock
                    size={18}
                    className="text-slate-500 transition-colors group-focus-within:text-blue-400"
                  />
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-slate-800 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {loading ? (
                <>
                  <Loader2 className="relative h-5 w-5 animate-spin" />
                  <span className="relative">Creating Account...</span>
                </>
              ) : (
                <>
                  <span className="relative">Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}