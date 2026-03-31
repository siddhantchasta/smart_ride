"use client";

export default function AdminHero() {
  return (
    <div
      className="rounded-4xl p-6 sm:p-8 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #050505 0%, #101010 48%, #1a1a1a 100%)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.28)",
      }}
    >
      <div
        className="absolute -right-16 -top-12 w-56 h-56 rounded-full"
        style={{ background: "rgba(255,255,255,0.08)", filter: "blur(24px)" }}
      />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-white/40 mb-3">
            Overview
          </p>
          <h2
            className="text-3xl sm:text-5xl font-semibold text-white leading-[1.02]"
            style={{ letterSpacing: "-0.05em" }}
          >
            Admin Dashboard
          </h2>
          <p className="text-white/56 text-sm mt-4 max-w-2xl leading-6">
            Manage subscriptions, route requests, drivers, and support queries from a single control surface
          </p>
        </div>

        <div
          className="inline-flex items-center self-start text-xs font-semibold px-4 py-2 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Control Panel
        </div>
      </div>
    </div>
  );
}
