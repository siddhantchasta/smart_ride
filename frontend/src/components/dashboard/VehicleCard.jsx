"use client";

import DashboardCard from "./DashboardCard";

export default function VehicleCard({
  subscription,
}) {
  return (
    <DashboardCard>
      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40 mb-6">
        Vehicle
      </p>

      {subscription.vehicle_type ? (
        <div className="space-y-4">
          {[
            { label: "Type", value: subscription.vehicle_type },
            { label: "Number", value: subscription.vehicle_number || "—" },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-[1.3rem] px-4 py-4 flex items-center justify-between"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-[11px] tracking-[0.18em] uppercase text-white/40">
                {row.label}
              </span>
              <span className="text-sm font-semibold text-white">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/52">Not yet assigned</p>
      )}
    </DashboardCard>
  );
}