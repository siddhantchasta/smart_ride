"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";

const BG_IMAGE = "/images/bg.png";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);

      // save token + userId + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("role", res.data.user.role);
      // role-based redirect
      if (res.data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >

      {/* ── LEFT PANEL — bg image ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10">

        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.52)" }}
        />

        {/* Brand — top left */}
        <div className="relative z-10">
          <p
            className="text-white text-xl md:text-2xl font-semibold tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            Smart Ride
          </p>
        </div>

        {/* Tagline — bottom left */}
        <div className="relative z-10">
          <p
            className="text-2xl font-semibold text-white leading-snug max-w-xs"
            style={{ letterSpacing: "-0.025em" }}
          >
            Your commute,<br />on autopilot.
          </p>
          <p
            className="text-sm mt-3"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Monthly · Quarterly · Yearly
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — clean form ── */}
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-16"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="w-full max-w-sm">

          {/* Mobile-only brand */}
          <p
            className="text-gray-900 text-xl font-semibold tracking-tight mb-8 lg:hidden"
            style={{ letterSpacing: "-0.01em" }}
          >
            Smart Ride
          </p>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-semibold text-gray-900"
              style={{ letterSpacing: "-0.025em" }}
            >
              Welcome back
            </h1>
            <p className="text-sm mt-2" style={{ color: "#86868b" }}>
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <div
            className="bg-white rounded-2xl px-7 py-7"
            style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "#86868b" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#f5f5f7",
                    border: "1px solid #e5e5e5",
                    caretColor: "#1d1d1f",
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.border = "1px solid #adadad";
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "#f5f5f7";
                    e.target.style.border = "1px solid #e5e5e5";
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "#86868b" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#f5f5f7",
                    border: "1px solid #e5e5e5",
                    caretColor: "#1d1d1f",
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.border = "1px solid #adadad";
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "#f5f5f7";
                    e.target.style.border = "1px solid #e5e5e5";
                  }}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-red-500 pt-1">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 mt-1"
                style={{
                  backgroundColor: loading ? "#3d3d3f" : "#1d1d1f",
                  color: "#ffffff",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-sm mt-6 text-center" style={{ color: "#86868b" }}>
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="font-medium cursor-pointer hover:underline underline-offset-2"
              style={{ color: "#1d1d1f" }}
            >
              Create one
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}