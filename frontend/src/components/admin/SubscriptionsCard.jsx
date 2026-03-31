"use client";

export default function SubscriptionsCard({
  FILTERS,
  filter,
  setFilter,
  subscriptions,
  filteredSubscriptions,
  driversMap,
  setSelectedDriver,
  setSelectedRouteForDriver,
  setShowDriverModal,
  assignDriver,
  formatTime,
  statusColor,
}) {
  return (
    <div
      className="rounded-4xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* HEADER */}
      <div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-6 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40">
          Subscriptions
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const active = filter === f;

            const activeStyles =
              f === "ACTIVE"
                ? {
                    backgroundColor: "rgba(52,199,89,0.14)",
                    color: "#34c759",
                    border: "1px solid rgba(52,199,89,0.22)",
                  }
                : f === "WAITING"
                ? {
                    backgroundColor: "rgba(255,159,10,0.14)",
                    color: "#ff9f0a",
                    border: "1px solid rgba(255,159,10,0.22)",
                  }
                : f === "FAILED"
                ? {
                    backgroundColor: "rgba(255,69,58,0.14)",
                    color: "#ff453a",
                    border: "1px solid rgba(255,69,58,0.22)",
                  }
                : {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.12)",
                  };

            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-150"
                style={
                  active
                    ? activeStyles
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(255,255,255,0.45)",
                        border: "1px solid transparent",
                      }
                }
              >
                {f}
                <span className="ml-2 text-xs opacity-70">
                  {f === "ALL"
                    ? subscriptions.length
                    : subscriptions.filter((s) => s.status === f).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLE HEADER */}
      <div
        className="hidden lg:grid gap-6 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white/25 items-center text-center"
        style={{
          gridTemplateColumns: "1.2fr 2fr 1fr 1fr 1fr 1.2fr",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span>User</span>
        <span>Route</span>
        <span>Plan</span>
        <span>Time</span>
        <span>Status</span>
        <span>Driver</span>
      </div>

      {/* BODY */}
      <div style={{ maxHeight: "520px", overflowY: "auto" }}>
        {filteredSubscriptions.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-white/32">No subscriptions found</p>
          </div>
        ) : (
          filteredSubscriptions.map((sub, i) => {
            const sc = statusColor(sub.status);

            return (
              <div
                key={sub.id}
                className="px-6 py-5"
                style={{
                  borderBottom:
                    i < filteredSubscriptions.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                {/* ROW */}
                <div
                  className="hidden lg:grid gap-6 items-center text-center"
                  style={{
                    gridTemplateColumns: "1.2fr 2fr 1fr 1fr 1fr 1.2fr",
                  }}
                >
                  {/* USER */}
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                      }}
                    >
                      {sub.user_name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <p className="text-sm font-medium text-white">
                      {sub.user_name}
                    </p>
                  </div>

                  {/* ROUTE */}
                  <div className="flex justify-center">
                    <div
                      className="rounded-[1.1rem] px-4 py-3"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-sm text-white/72">
                        {sub.route_name || "—"}
                      </p>
                    </div>
                  </div>

                  {/* PLAN */}
                  <div className="text-sm text-white/62">
                    {sub.plan_name || "-"}
                  </div>

                  {/* TIME */}
                  <div className="text-sm text-white/62">
                    <div>{formatTime(sub.start_time) || "--"}</div>
                    <div>{formatTime(sub.end_time) || "--"}</div>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: sc.bg,
                        color: sc.color,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      {sub.status}
                    </span>
                  </div>

                  {/* DRIVER */}
                  <div className="text-sm">
                    {sub.driver_name || "—"}
                  </div>
                </div>

                {/* WAITING ACTIONS */}
                {sub.status === "WAITING" && (
                  <div className="mt-4 pt-4 flex items-center justify-center gap-4 flex-wrap">
                    <button
                      onClick={() => {
                        setSelectedRouteForDriver(sub.route_id);
                        setShowDriverModal(true);
                      }}
                      className="px-5 py-2.5 rounded-full text-sm font-medium"
                      style={{
                        background: "#f2f2f2",
                        color: "#111111",
                      }}
                    >
                      + Add Driver
                    </button>

                    <select
                      onChange={(e) =>
                        setSelectedDriver((prev) => ({
                          ...prev,
                          [sub.id]: e.target.value,
                        }))
                      }
                      className="text-sm px-4 py-2.5 rounded-full min-w-55"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <option value="" style={{ color: "#111111" }}>
                        {(driversMap[sub.id] || []).length === 0
                          ? "No drivers available"
                          : "Select driver"}
                      </option>

                      {(driversMap[sub.id] || []).map((d) => (
                        <option key={d.id} value={d.id} style={{ color: "#111111" }}>
                          {d.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => assignDriver(sub.id)}
                      className="px-5 py-2.5 rounded-full text-sm font-medium"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      Assign
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}