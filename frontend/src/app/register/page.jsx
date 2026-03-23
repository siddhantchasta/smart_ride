"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";

const BG_IMAGE = "/images/bg.png";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(form);

      // alert("Registration successful!");
      console.log("Registration Successful");

      // go to login
      router.push("/login");
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BG_IMAGE}')` }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.52)" }}
      />

      {/* Top-left brand */}
      <div className="absolute top-6 left-8 z-10">
        <p
          className="text-white text-xl md:text-2xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          Smart Ride
        </p>
      </div>

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-semibold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            Create account
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Start your subscription today
          </p>
        </div>

        {/* Card */}
        <div
          className="w-full rounded-2xl px-7 py-7"
          style={{
            backgroundColor: "rgba(15,15,15,0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label
                className="block text-xs font-medium mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  caretColor: "#ffffff",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.11)";
                  e.target.style.border = "1px solid rgba(255,255,255,0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.07)";
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-xs font-medium mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
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
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  caretColor: "#ffffff",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.11)";
                  e.target.style.border = "1px solid rgba(255,255,255,0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.07)";
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-medium mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
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
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  caretColor: "#ffffff",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.11)";
                  e.target.style.border = "1px solid rgba(255,255,255,0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.07)";
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 pt-1">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 mt-1"
              style={{
                backgroundColor: loading
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.95)",
                color: loading ? "rgba(255,255,255,0.4)" : "#0a0a0a",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p
          className="text-sm mt-6"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer hover:underline underline-offset-2 transition duration-150"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}