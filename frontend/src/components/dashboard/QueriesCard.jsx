"use client";

import DashboardCard from "./DashboardCard";

export default function QueriesCard({
  myQueries,
  loadingQueries,
  previewQueries,
  setShowQueriesOverlay,
}) {
  return (
    <DashboardCard>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/40">
            Your Queries
          </p>
          <p className="text-sm text-white/52 mt-2">
            {myQueries.length > 2
              ? `Showing latest 2 of ${myQueries.length}`
              : `${myQueries.length} query${
                  myQueries.length === 1 ? "" : "ies"
                } available`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: "#f2f2f2", color: "#111111" }}
          >
            {myQueries.length}
          </div>

          {myQueries.length > 2 && (
            <button
              onClick={() => setShowQueriesOverlay(true)}
              className="px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Expand
            </button>
          )}
        </div>
      </div>

      {loadingQueries ? (
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full border-2 animate-spin shrink-0"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              borderTopColor: "#ffffff",
            }}
          />
          <p className="text-sm text-white/52">Loading queries...</p>
        </div>
      ) : myQueries.length === 0 ? (
        <p className="text-sm text-white/52">No queries yet</p>
      ) : (
        <div className="space-y-3">
          {previewQueries.map((q) => {
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
                className="rounded-3xl p-5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-white leading-7">
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
      )}
    </DashboardCard>
  );
}