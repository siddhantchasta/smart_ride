"use client";

export default function DashboardCard({
  children,
  dark = false,
  className = "",
  style,
}) {
  return (
    <div
      className={`rounded-4xl p-6 sm:p-7 ${className}`}
      style={{
        ...(dark
          ? {
              background: "#050505",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.3)",
            }
          : {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}