"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

const BG_IMAGE = "/images/bg.png";

export default function ContactSupport() {
  const router = useRouter();

  const [form, setForm] = useState({ pickup: "", drop: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pickup || !form.drop) return setError("Please enter both locations");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/admin/route-request", {
        pickup: form.pickup,
        drop: form.drop,
      });
      setSuccess("Request submitted successfully!");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit request");
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
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.52)" }} />

        {/* Brand */}
        <div className="relative z-10">
          <p className="text-white text-xl md:text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.01em" }}>
            Smart Ride
          </p>
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <p className="text-2xl font-semibold text-white leading-snug max-w-xs" style={{ letterSpacing: "-0.025em" }}>
            Don't see your route?<br />We'll add it.
          </p>
          <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            Route requests are reviewed within 48 hours
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-16"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="w-full max-w-sm">

          {/* Mobile-only brand */}
          <p className="text-gray-900 text-xl font-semibold tracking-tight mb-8 lg:hidden" style={{ letterSpacing: "-0.01em" }}>
            Smart Ride
          </p>

          {/* Back link */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs mb-8 transition-opacity hover:opacity-60"
            style={{ color: "#86868b" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900" style={{ letterSpacing: "-0.025em" }}>
              Request a route
            </h1>
            <p className="text-sm mt-2" style={{ color: "#86868b" }}>
              Tell us where you want to travel
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl px-7 py-7" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Pickup */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "#86868b" }}>
                  Pickup location
                </label>
                <input
                  name="pickup"
                  placeholder="e.g. Sector 5, Salt Lake"
                  value={form.pickup}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                  style={{ backgroundColor: "#f5f5f7", border: "1px solid #e5e5e5", caretColor: "#1d1d1f" }}
                  onFocus={(e) => { e.target.style.backgroundColor = "#ffffff"; e.target.style.border = "1px solid #adadad"; }}
                  onBlur={(e) => { e.target.style.backgroundColor = "#f5f5f7"; e.target.style.border = "1px solid #e5e5e5"; }}
                />
              </div>

              {/* Drop */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "#86868b" }}>
                  Drop location
                </label>
                <input
                  name="drop"
                  placeholder="e.g. Park Street, Kolkata"
                  value={form.drop}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                  style={{ backgroundColor: "#f5f5f7", border: "1px solid #e5e5e5", caretColor: "#1d1d1f" }}
                  onFocus={(e) => { e.target.style.backgroundColor = "#ffffff"; e.target.style.border = "1px solid #adadad"; }}
                  onBlur={(e) => { e.target.style.backgroundColor = "#f5f5f7"; e.target.style.border = "1px solid #e5e5e5"; }}
                />
              </div>

              {/* Error / Success */}
              {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
              {success && <p className="text-xs pt-1" style={{ color: "#34c759" }}>{success}</p>}

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
                {loading ? "Submitting..." : "Send Request →"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}