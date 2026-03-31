"use client";

export default function RouteRequestsCard({
  loadingRequests,
  filteredRequests,
  routeRequests,
  requestFilter,
  setRequestFilter,
  handleApprove,
}) {
  const filters = ["ALL", "PENDING", "APPROVED"];

  const getCount = (filter) => {
    if (filter === "ALL") return routeRequests.length;
    return routeRequests.filter((r) => r.status === filter).length;
  };

  return (
    <div
      className="rounded-4xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40">
          Route Requests
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2 px-6 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {filters.map((f) => {
          const active = requestFilter === f;

          const activeStyles =
            f === "PENDING"
              ? {
                  backgroundColor: "rgba(255,159,10,0.14)",
                  color: "#ff9f0a",
                  border: "1px solid rgba(255,159,10,0.22)",
                }
              : f === "APPROVED"
                ? {
                    backgroundColor: "rgba(52,199,89,0.14)",
                    color: "#34c759",
                    border: "1px solid rgba(52,199,89,0.22)",
                  }
                : {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.12)",
                  };

          return (
            <button
              key={f}
              onClick={() => setRequestFilter(f)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all"
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
              {f} ({getCount(f)})
            </button>
          );
        })}
      </div>

      <div style={{ maxHeight: "340px", overflowY: "auto" }}>
        {loadingRequests ? (
          <div className="px-6 py-10 text-center">
            <p className="text-white/32 text-sm">Loading requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-white/32 text-sm">No requests yet</p>
          </div>
        ) : (
          filteredRequests.map((r, i) => (
            <div
              key={r.id}
              className="px-6 py-5"
              style={{
                borderBottom:
                  i < filteredRequests.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {r.email}
                  </p>

                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-white/68">
                      <span className="text-white font-medium">Pickup:</span> {r.pickup}
                    </p>
                    <p className="text-sm text-white/68">
                      <span className="text-white font-medium">Drop:</span> {r.drop}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-3 text-right">
                  <span className="text-xs text-white/28 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString()}
                  </span>

                  {r.status === "PENDING" ? (
                    <button
                      onClick={() => handleApprove(r.id)}
                      className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                      style={{
                        backgroundColor: "#f2f2f2",
                        color: "#111111",
                      }}
                    >
                      Approve
                    </button>
                  ) : (
                    <span
                      className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{
                        backgroundColor: "rgba(52,199,89,0.18)",   
                        color: "#34c759",                         
                        border: "1px solid rgba(52,199,89,0.35)",
                      }}
                    >
                      ✓ Approved
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
