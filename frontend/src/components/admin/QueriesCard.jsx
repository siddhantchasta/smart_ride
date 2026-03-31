"use client";

export default function QueriesCard({
  loadingQueries,
  filteredQueries,
  queries,
  queryFilter,
  setQueryFilter,
  handleResolve,
}) {
  const filters = ["ALL", "OPEN", "RESOLVED"];

  const getCount = (filter) => {
    if (filter === "ALL") return queries.length;
    return queries.filter((q) => q.status === filter).length;
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
          User Queries
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2 px-6 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {filters.map((f) => {
          const active = queryFilter === f;

          const activeStyles =
            f === "OPEN"
              ? {
                  backgroundColor: "rgba(255,159,10,0.14)",
                  color: "#ff9f0a",
                  border: "1px solid rgba(255,159,10,0.22)",
                }
              : f === "RESOLVED"
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
              onClick={() => setQueryFilter(f)}
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
        {loadingQueries ? (
          <div className="px-6 py-10 text-center">
            <p className="text-white/32 text-sm">Loading queries...</p>
          </div>
        ) : filteredQueries.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-white/32 text-sm">No queries yet</p>
          </div>
        ) : (
          filteredQueries.map((q, i) => (
            <div
              key={q.id}
              className="px-6 py-5"
              style={{
                borderBottom:
                  i < filteredQueries.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {q.user_email}
                  </p>
                  <p className="text-xs text-white/28 mt-1">
                    {new Date(q.created_at).toLocaleString()}
                  </p>

                  <div
                    className="mt-3 rounded-[1.2rem] px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p className="text-sm text-white/68 leading-6 wrap-break-word">
                      {q.message}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-0.5">
                  <button
                    onClick={() => handleResolve(q.id)}
                    disabled={q.status === "RESOLVED"}
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap"
                    style={{
                      backgroundColor:
                        q.status === "RESOLVED"
                          ? "rgba(52,199,89,0.18)"   // soft green bg
                          : "#f2f2f2",

                      color:
                        q.status === "RESOLVED"
                          ? "#34c759"                // green text
                          : "#111111",

                      border:
                        q.status === "RESOLVED"
                          ? "1px solid rgba(52,199,89,0.35)"
                          : "1px solid transparent",

                      cursor:
                        q.status === "RESOLVED"
                          ? "default"
                          : "pointer",
                    }}
                  >
                    {q.status === "RESOLVED" ? "Resolved" : "Resolve"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
