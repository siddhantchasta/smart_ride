"use client";

import DashboardCard from "./DashboardCard";

export default function DriverCard({
  subscription,
  initials,
}) {
  return (
    <DashboardCard>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40">
          Your Driver
        </p>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{ background: "#f2f2f2", color: "#111111" }}
        >
          {initials}
        </div>
      </div>

      {subscription.driver_name ? (
        <div className="space-y-3">
          <p
            className="text-2xl font-semibold text-white"
            style={{ letterSpacing: "-0.04em" }}
          >
            {subscription.driver_name}
          </p>
          <p className="text-sm text-white/52">
            {subscription.driver_phone || "—"}
          </p>
        </div>
      ) : (
        <p className="text-sm text-white/52">Not yet assigned</p>
      )}
    </DashboardCard>
  );
}