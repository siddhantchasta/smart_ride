"use client";

export default function DashboardLoading({
  redirecting = false,
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 24%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05), transparent 24%), linear-gradient(135deg, #050505 0%, #101010 45%, #181818 100%)",
        fontFamily: "'Sora', 'SF Pro Display', sans-serif",
      }}
    >
      <div
        className="rounded-4xl px-10 py-9 flex flex-col items-center gap-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          backdropFilter: "blur(18px)",
        }}
      >
        {!redirecting && (
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              borderTopColor: "#ffffff",
            }}
          />
        )}
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/55">
          {redirecting ? "Redirecting..." : "Preparing your dashboard"}
        </p>
      </div>
    </div>
  );
}