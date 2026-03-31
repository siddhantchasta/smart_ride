"use client";

export default function DriverModal({
  showDriverModal,
  setShowDriverModal,
  newDriver,
  setNewDriver,
  handleCreateDriver,
}) {
  if (!showDriverModal) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-md rounded-4xl p-6"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #181818 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white text-lg font-semibold">Add Driver</h3>
          <button
            onClick={() => setShowDriverModal(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {[
            ["Name", "name"],
            ["Phone", "phone"],
            ["License Number", "license_number"],
            ["Vehicle Number", "vehicle_number"],
            ["Vehicle Type (eg. Swift Dzire)", "vehicle_type"],
            ["Capacity", "capacity"],
          ].map(([placeholder, key]) => (
            <input
              key={key}
              placeholder={placeholder}
              value={newDriver[key]}
              onChange={(e) =>
                setNewDriver({ ...newDriver, [key]: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
              }}
            />
          ))}
        </div>

        <div className="flex justify-between gap-3 mt-5">
          <button
            onClick={() => setShowDriverModal(false)}
            className="flex-1 py-3 rounded-2xl text-sm font-medium"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateDriver}
            className="flex-1 py-3 rounded-2xl text-sm font-medium"
            style={{ background: "#f2f2f2", color: "#111111" }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}