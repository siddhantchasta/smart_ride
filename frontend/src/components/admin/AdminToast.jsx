"use client";

export default function AdminToast({
  type,
  message,
  onClose,
}) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 rounded-[1.4rem] text-sm"
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#ffffff",
      }}
    >
      <span className="text-white/70">{type === "error" ? "⚠" : "✓"}</span>
      {message}
      <button
        onClick={onClose}
        className="ml-auto text-xs opacity-60 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}