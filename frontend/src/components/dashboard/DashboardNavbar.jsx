"use client";

export default function DashboardNavbar({
  user,
  notifications,
  showNotif,
  setShowNotif,
  router,
}) {
  return (
    <nav className="relative px-5 py-5 sm:px-7 lg:px-8 lg:py-6">
      <div
        className="absolute inset-x-0 top-0 h-full"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, rgba(255,255,255,0.08), transparent 22%)",
        }}
      />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-white text-xl font-semibold">Smart Ride</h1>
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-white/35">
            Dashboard
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {user && (
            <div className="flex items-center gap-2 text-white text-sm">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-semibold">
                {user?.name?.[0] || "U"}
              </div>
              <span className="hidden sm:block font-medium">{user.name}</span>
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              aria-label={`Notifications${
                notifications?.length > 0
                  ? `, ${notifications.length} unread`
                  : ""
              }`}
              className="w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10 transition"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.16)",
                color: "#ffffff",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            {showNotif && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.24)",
                    backdropFilter: "blur(2px)",
                  }}
                  onClick={() => setShowNotif(false)}
                />

                <div
                  className="fixed top-0 right-0 h-full z-50 flex flex-col"
                  style={{
                    width: "360px",
                    maxWidth: "100vw",
                    backgroundColor: "#0f0f0f",
                    boxShadow:
                      "-4px 0 32px rgba(0,0,0,0.3), -1px 0 0 rgba(255,255,255,0.06)",
                    animation:
                      "notifSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-6 py-5 shrink-0"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                      Notifications
                    </p>

                    <button
                      onClick={() => setShowNotif(false)}
                      aria-label="Close notifications"
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#ffffff",
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-white">
                          No notifications
                        </p>
                        <p className="text-xs mt-1.5 text-white/42">
                          Ride and account updates appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className="rounded-2xl p-4"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                style={{ backgroundColor: "#f2f2f2" }}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#111111"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-white leading-relaxed">
                                  {n.message}
                                </p>
                                <p className="text-xs mt-1.5 text-white/42">
                                  {new Date(n.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <style>{`
                  @keyframes notifSlideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                  }
                `}</style>
              </>
            )}
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
            className="px-5 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}