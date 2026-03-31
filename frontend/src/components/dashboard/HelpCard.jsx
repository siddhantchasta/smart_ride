"use client";

import DashboardCard from "./DashboardCard";

export default function HelpCard({
  query,
  setQuery,
  sending,
  handleSendQuery,
}) {
  return (
    <DashboardCard>
      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40 mb-5">
        Need Help?
      </p>

      <h3
        className="text-2xl font-semibold text-white"
        style={{ letterSpacing: "-0.04em" }}
      >
        Reach support without the hassle
      </h3>

      <p className="text-sm text-white/52 mt-3 leading-6">
        Send your issue, request, or trip-related concern and the team will review it
      </p>

      <textarea
        placeholder="Write your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={5}
        className="w-full mt-5 px-4 py-4 rounded-[1.4rem] text-sm focus:outline-none resize-none placeholder:text-white/28"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#ffffff",
          caretColor: "#ffffff",
        }}
      />

      <button
        onClick={handleSendQuery}
        disabled={sending}
        className="mt-4 w-full py-4 rounded-[1.2rem] text-sm font-semibold transition-all duration-200"
        style={{
          background: sending
            ? "rgba(255,255,255,0.12)"
            : "linear-gradient(135deg, #f2f2f2 0%, #d8d8d8 100%)",
          color: sending ? "rgba(255,255,255,0.4)" : "#101010",
          cursor: sending ? "not-allowed" : "pointer",
          boxShadow: sending ? "none" : "0 20px 35px rgba(0,0,0,0.18)",
        }}
      >
        {sending ? "Sending..." : "Send Query"}
      </button>
    </DashboardCard>
  );
}