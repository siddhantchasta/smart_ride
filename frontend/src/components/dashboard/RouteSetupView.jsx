"use client";

export default function RouteSetupView({
  BG_IMAGE,
  form,
  setForm,
  routeAvailable,
  routeSearch,
  setRouteSearch,
  dropdownOpen,
  setDropdownOpen,
  filteredRoutes,
  selectedRoute,
  selectedRouteObj,
  setSelectedRoute,
  setSelectedRouteObj,
  handleSaveLocation,
  handleContinueWithRoute,
  router,
}) {
  return (
    <div
      className="min-h-screen flex"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.52)" }}
        />

        <div className="relative z-10">
          <p
            className="text-white text-xl md:text-2xl font-semibold tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            Smart Ride
          </p>
        </div>

        <div className="relative z-10">
          <p
            className="text-2xl font-semibold text-white leading-snug max-w-xs"
            style={{ letterSpacing: "-0.025em" }}
          >
            One last step
            <br />
            before you ride.
          </p>
          <p
            className="text-sm mt-3"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            We&apos;ll assign your driver based on this route.
          </p>
        </div>
      </div>

      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-16"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="w-full max-w-sm">
          <p
            className="text-gray-900 text-xl font-semibold tracking-tight mb-8 lg:hidden"
            style={{ letterSpacing: "-0.01em" }}
          >
            Smart Ride
          </p>

          <div className="mb-8">
            <h1
              className="text-3xl font-semibold text-gray-900"
              style={{ letterSpacing: "-0.025em" }}
            >
              Set your route
            </h1>
            <p className="text-sm mt-2" style={{ color: "#86868b" }}>
              {routeAvailable
                ? "We'll assign a driver based on your locations"
                : "Your exact route isn't available — pick the closest one below"}
            </p>
          </div>

          <div
            className="bg-white rounded-2xl px-7 py-7"
            style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
          >
            <div className="space-y-4">
              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "#86868b" }}
                >
                  Pickup Address
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold"
                    style={{ color: "#adadad" }}
                  >
                    A
                  </span>
                  <input
                    placeholder="Enter pickup location"
                    value={form.pickup_address}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        pickup_address: e.target.value,
                      }));
                      if (selectedRouteObj) {
                        setSelectedRouteObj(null);
                        setSelectedRoute("");
                      }
                    }}
                    className="w-full pl-8 pr-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#f5f5f7",
                      border: "1px solid #e5e5e5",
                      caretColor: "#1d1d1f",
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.border = "1px solid #adadad";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = "#f5f5f7";
                      e.target.style.border = "1px solid #e5e5e5";
                    }}
                  />
                </div>
              </div>

              <div className="px-1 flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-px h-3"
                    style={{ backgroundColor: "#e5e5e5" }}
                  />
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#adadad" }}
                  />
                  <div
                    className="w-px h-3"
                    style={{ backgroundColor: "#e5e5e5" }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "#86868b" }}
                >
                  Drop Address
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold"
                    style={{ color: "#adadad" }}
                  >
                    B
                  </span>
                  <input
                    placeholder="Enter drop location"
                    value={form.drop_address}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        drop_address: e.target.value,
                      }));
                      if (selectedRouteObj) {
                        setSelectedRouteObj(null);
                        setSelectedRoute("");
                      }
                    }}
                    className="w-full pl-8 pr-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#f5f5f7",
                      border: "1px solid #e5e5e5",
                      caretColor: "#1d1d1f",
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.border = "1px solid #adadad";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = "#f5f5f7";
                      e.target.style.border = "1px solid #e5e5e5";
                    }}
                  />
                </div>
              </div>

              {!routeAvailable && (
                <div
                  className="rounded-xl p-4 space-y-3"
                  style={{
                    backgroundColor: "#fef9f0",
                    border: "1px solid #ffe0a0",
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: "#b45309" }}>
                    Route not found. Select from available routes in Bangalore and Hyderabad:
                  </p>

                  <div className="relative">
                    <div className="relative">
                      <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
                        style={{ color: "#adadad" }}
                      >
                        ⌕
                      </span>
                      <input
                        placeholder="Search routes..."
                        value={routeSearch}
                        onChange={(e) => {
                          setRouteSearch(e.target.value);
                          setDropdownOpen(true);
                        }}
                        onFocus={(e) => {
                          setDropdownOpen(true);
                          e.target.style.border = "1px solid #adadad";
                        }}
                        onBlur={(e) => {
                          setTimeout(() => setDropdownOpen(false), 150);
                          e.target.style.border = "1px solid #e5e5e5";
                        }}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl text-sm text-gray-900 focus:outline-none transition-all duration-200"
                        style={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e5e5",
                          caretColor: "#1d1d1f",
                        }}
                      />
                    </div>

                    {dropdownOpen && filteredRoutes.length > 0 && (
                      <div
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-50"
                        style={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e5e5",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {filteredRoutes.map((r, i) => (
                          <div
                            key={r.id}
                            className="px-4 py-3 cursor-pointer transition-colors duration-100"
                            style={{
                              borderBottom:
                                i < filteredRoutes.length - 1 ? "1px solid #f5f5f7" : "none",
                              backgroundColor:
                                selectedRoute === String(r.id) ? "#f5f5f7" : "#ffffff",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#f5f5f7")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                selectedRoute === String(r.id) ? "#f5f5f7" : "#ffffff")
                            }
                            onMouseDown={() => {
                              setForm({
                                pickup_address: r.start_location,
                                drop_address: r.end_location,
                              });
                              setSelectedRoute(String(r.id));
                              setSelectedRouteObj(r);
                              setRouteSearch(r.name || `${r.start_location} → ${r.end_location}`);
                              setDropdownOpen(false);
                            }}
                          >
                            <p
                              className="text-sm font-medium text-gray-900"
                              style={{ letterSpacing: "-0.01em" }}
                            >
                              {r.name || `${r.start_location} → ${r.end_location}`}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#86868b" }}>
                              {r.start_location} → {r.end_location}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {dropdownOpen && filteredRoutes.length === 0 && (
                      <div
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl px-4 py-3 z-50"
                        style={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e5e5",
                        }}
                      >
                        <p className="text-sm" style={{ color: "#adadad" }}>
                          No routes found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={
                  routeAvailable
                    ? handleSaveLocation
                    : handleContinueWithRoute
                }
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 mt-1"
                style={{
                  backgroundColor:
                    !routeAvailable && !selectedRoute
                      ? "rgba(0,0,0,0.15)"
                      : "#1d1d1f",
                  color:
                    !routeAvailable && !selectedRoute
                      ? "#adadad"
                      : "#ffffff",
                  cursor:
                    !routeAvailable && !selectedRoute
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {routeAvailable
                  ? "Save & Continue"
                  : selectedRouteObj
                  ? `Continue with ${
                      selectedRouteObj.name || "selected route"
                    }`
                  : "Select a route to continue"}
              </button>

              <button
                onClick={() => router.push("/contact-support")}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "#1d1d1f",
                  border: "1px solid #e5e5e5",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border = "1px solid #adadad")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border = "1px solid #e5e5e5")
                }
              >
                Request a Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}