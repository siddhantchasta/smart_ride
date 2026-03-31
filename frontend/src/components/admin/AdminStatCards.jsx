"use client";

export default function AdminStatCards({ statCards }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((s) => (
        <div
          key={s.label}
          className="rounded-[1.6rem] p-6"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/38">
            {s.label}
          </p>
          <p
            className="text-4xl font-semibold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}