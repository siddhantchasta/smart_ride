"use client";

import DashboardCard from "./DashboardCard";

export default function RouteDetailsCard({
  location,
  subscription,
}) {
  return (
    <DashboardCard dark>
      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40 mb-6">
        Route Details
      </p>

      <div className="space-y-4">
        {[
          { label: "Pickup", value: location.pickup_address, dot: "#ffffff" },
          {
            label: "Drop",
            value: location.drop_address,
            dot: "rgba(255,255,255,0.72)",
          },
        ].map((item, index) => (
          <div key={item.label} className="flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: item.dot }}
              />
              {index === 0 && (
                <div className="w-px h-12 bg-white/15 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-5">
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
                {item.label}
              </p>
              <p className="text-sm text-white mt-2 leading-6">
                {item.value || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          { label: "Morning Pickup", value: subscription.start_time || "—" },
          { label: "Evening Return", value: subscription.end_time || "—" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[1.2rem] p-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
              {item.label}
            </p>
            <p className="text-sm text-white mt-3">
              {item.value !== "—" ? item.value.slice(0, 5) : "—"}
            </p>
          </div>
        ))}
      </div>

      <div
        className="rounded-3xl p-4 mt-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.18em] uppercase text-white/40">
            Distance
          </span>
          <span className="text-sm text-white">
            {location.distance_km
              ? `${location.distance_km.toFixed(1)} km`
              : "—"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs tracking-[0.18em] uppercase text-white/40">
            ETA
          </span>
          <span className="text-sm text-white">
            {location.duration_text || "—"}
          </span>
        </div>
      </div>
    </DashboardCard>
  );
}