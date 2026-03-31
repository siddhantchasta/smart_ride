"use client";

export default function DashboardHero({
  subscription,
  location,
  isActive,
}) {
  const status = subscription?.status?.toLowerCase();

  const statusStyles = {
    active: {
      bg: "rgba(0,255,150,0.12)",
      color: "#00ffa0",
      border: "1px solid rgba(0,255,150,0.3)",
    },
    expired: {
      bg: "rgba(255,60,60,0.12)",
      color: "#ff4d4d",
      border: "1px solid rgba(255,60,60,0.3)",
    },
    default: {
      bg: "rgba(255,200,0,0.12)",
      color: "#ffd84d",
      border: "1px solid rgba(255,200,0,0.3)",
    },
  };

  const currentStyle =
    status === "active"
      ? statusStyles.active
      : status === "failed" || status === "expired"
      ? statusStyles.expired
      : statusStyles.default;

  return (
    <div
      className="rounded-4xl p-6 sm:p-8 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #050505 0%, #101010 48%, #1a1a1a 100%)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.28)",
      }}
    >
      <div
        className="absolute -right-16 -top-12 w-56 h-56 rounded-full"
        style={{
          background: "rgba(255,255,255,0.08)",
          filter: "blur(24px)",
        }}
      />

      <div className="relative">
        <p className="text-[11px] tracking-[0.28em] uppercase text-white/40 mb-3">
          Subscription Status
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h1
              className="text-3xl sm:text-5xl font-semibold text-white leading-[1.02]"
              style={{ letterSpacing: "-0.05em" }}
            >
              {subscription.route_name ||
                `${location.pickup_address} → ${location.drop_address}`}
            </h1>

            <p className="text-white/56 text-sm mt-4 max-w-md leading-6">
              A cleaner ride overview with your active plan, commute timing,
              support access, and service status in one place
            </p>
          </div>

          <span
            className="inline-flex items-center self-start text-xs font-semibold px-4 py-2 rounded-full capitalize"
            style={{
              backgroundColor: currentStyle.bg,
              color: currentStyle.color,
              border: currentStyle.border,
            }}
          >
            ● {subscription.status}
          </span>
        </div>
      </div>
    </div>
  );
}