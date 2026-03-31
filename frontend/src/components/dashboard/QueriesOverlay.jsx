"use client";

export default function QueriesOverlay({
  myQueries,
  setShowQueriesOverlay,
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(8,8,8,0.7)",
          backdropFilter: "blur(10px)",
        }}
        onClick={() => setShowQueriesOverlay(false)}
      />

      <div
        className="relative w-full max-w-4xl max-h-[85vh] rounded-4xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,12,12,0.98) 0%, rgba(22,22,22,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 sm:px-8 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="text-[11px] tracking-[0.24em] uppercase text-white/38">
              Your Queries
            </p>
            <h3
              className="text-2xl font-semibold text-white mt-2"
              style={{ letterSpacing: "-0.04em" }}
            >
              All support requests in one focused view
            </h3>
          </div>

          <button
            onClick={() => setShowQueriesOverlay(false)}
            className="w-11 h-11 rounded-full text-lg font-medium"
            style={{
              background: "#f2f2f2",
              color: "#111111",
            }}
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7 space-y-4 max-h-[calc(85vh-92px)]">
          {myQueries.map((q) => {
            const status = q.status?.toUpperCase();

            const statusStyle =
              status === "RESOLVED"
                ? {
                    bg: "rgba(0,255,150,0.12)",
                    color: "#00ffa0",
                    border: "1px solid rgba(0,255,150,0.3)",
                  }
                : {
                    bg: "rgba(255,200,0,0.12)",
                    color: "#ffd84d",
                    border: "1px solid rgba(255,200,0,0.3)",
                  };

            return (
              <div
                key={q.id}
                className="rounded-[1.6rem] p-5 sm:p-6"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm sm:text-[15px] text-white leading-7">
                    {q.message}
                  </p>

                  <span
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-md shrink-0"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      border: statusStyle.border,
                    }}
                  >
                    {q.status}
                  </span>
                </div>

                <p className="text-xs mt-3 text-white/42">
                  {new Date(q.created_at).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}