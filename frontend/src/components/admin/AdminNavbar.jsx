"use client";

export default function AdminNavbar({ currentDate }) {
  return (
    <nav className="relative px-5 py-5 sm:px-7 lg:px-8 lg:py-6">
      <div
        className="absolute inset-x-0 top-0 h-full"
      />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-white text-xl font-semibold">Smart Ride</h1>
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-white/35">
            Admin Dashboard
          </div>
        </div>

        <div className="text-xs text-white/38">{currentDate}</div>
      </div>
    </nav>
  );
}