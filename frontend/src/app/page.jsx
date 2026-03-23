import Link from "next/link";

const BG_IMAGE ="/images/bg.png";

const features = [
  {
    icon: "✓",
    title: "Reliable Service",
    desc: "Fixed pickup & drop locations with consistent timing every day.",
  },
  {
    icon: "⟳",
    title: "Same Driver",
    desc: "Get to know your driver and experience consistent, safe commutes.",
  },
  {
    icon: "₹",
    title: "Flexible Plans",
    desc: "Choose what works for you - monthly, quarterly, or yearly subscriptions.",
  },
  {
    icon: "⏱",
    title: "Time Saving",
    desc: "No daily booking hassle. Service starts automatically every morning.",
  },
  {
    icon: "⚿",
    title: "Safe & Secure",
    desc: "Verified drivers and a secure payment system for your peace of mind.",
  },
  {
    icon: "⊙",
    title: "Community",
    desc: "Join thousands of daily commuters who rely on Smart Ride.",
  },
];

const steps = [
  { n: "01", title: "Sign Up", desc: "Create your account and provide pickup & drop locations." },
  { n: "02", title: "Choose Your Plan", desc: "Select from monthly, quarterly, or yearly subscription options." },
  { n: "03", title: "Make Payment", desc: "Complete secure payment through our platform." },
  { n: "04", title: "Get Assigned", desc: "System assigns your dedicated driver and vehicle." },
  { n: "05", title: "Start Riding", desc: "Daily service begins with your assigned driver." },
];

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >

      {/* ════════════════════════════ HERO ════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <p
            className="text-white text-xl md:text-2xl font-semibold tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            Smart Ride
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium px-5 py-2 rounded-xl transition-all duration-150"
              style={{
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium px-5 py-2 rounded-xl transition-all duration-150"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#0a0a0a",
              }}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-24">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Pickup & Drop Subscription
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white max-w-3xl leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Your commute,<br />on autopilot.
          </h1>
          <p
            className="mt-6 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Fixed schedules, same driver, predictable pricing -
            the commuting solution you've been waiting for.
          </p>
          <div className="flex items-center gap-4 mt-10">
            <Link
              href="/register"
              className="text-sm font-medium px-7 py-3 rounded-xl transition-all duration-150"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#0a0a0a",
              }}
            >
              Start Your Subscription
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium px-7 py-3 rounded-xl transition-all duration-150"
              style={{
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #1d1d1f)",
          }}
        />
      </section>

      {/* ════════════════════════════ MARQUEE STRIP ════════════════════════════ */}
        <section
          style={{
            backgroundColor: "#1d1d1f",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
            padding: "18px 0",
          }}
        >
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee 28s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                {[
                  "Fixed schedules, zero hassle",
                  "Same driver, every single day",
                  "Monthly · Quarterly · Yearly plans",
                  "Verified drivers only",
                  "Secure payments",
                  "Pickup & drop at your door",
                ].map((text) => (
                  <span
                    key={text}
                    className="flex items-center gap-6 px-8 text-xs font-medium whitespace-nowrap"
                    style={{ color: "#6e6e73", letterSpacing: "0.04em" }}
                  >
                    {text}
                    <span style={{ color: "#3d3d3f", fontSize: "6px" }}>●</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

      {/* ════════════════════════════ WHY SMART RIDE ════════════════════════════ */}
      <section className="px-6 py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "#86868b" }}
            >
              Benefits
            </p>
            <h2
              className="text-4xl md:text-5xl font-semibold text-gray-900"
              style={{ letterSpacing: "-0.03em" }}
            >
              Why Smart Ride
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "#e5e5e5" }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 transition-all duration-200"
                style={{ backgroundColor: "#ffffff" }}
              >
                <span
                  className="text-2xl mb-6 block"
                  style={{ color: "#1d1d1f" }}
                >
                  {f.icon}
                </span>
                <h3
                  className="text-base font-semibold text-gray-900 mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6e6e73" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ HOW IT WORKS - structured rows ════════════════════════════ */}
      <section
        id="how-it-works"
        className="px-6 py-24"
        style={{ backgroundColor: "#141414" }}
      >
        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <div className="mb-16">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "#6e6e73" }}
            >
              Process
            </p>
            <h2
              className="text-4xl md:text-5xl font-semibold text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              How It Works
            </h2>
          </div>

          {/* Steps : 3 column grid rows */}
          <div>
            {/* Column headers */}
            <div
              className="grid grid-cols-[40px_1fr_2fr] gap-8 pb-4 mb-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3d3d3f" }}>#</span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3d3d3f" }}>Step</span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3d3d3f" }}>What Happens</span>
            </div>

            {/* Rows */}
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="grid grid-cols-[40px_1fr_2fr] gap-8 py-6 transition-all duration-150"
                style={{
                  borderBottom: i < steps.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                }}
              >
                {/* Step number */}
                <span
                  className="text-xs font-semibold tabular-nums self-start pt-0.5"
                  style={{ color: "#3d3d3f", fontVariantNumeric: "tabular-nums" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <span
                  className="text-sm font-semibold text-white self-start"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </span>

                {/* Description */}
                <span
                  className="text-sm leading-relaxed self-start"
                  style={{ color: "#6e6e73" }}
                >
                  {s.desc}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════ FOOTER CTA ════════════════════════════ */}
      <section
        className="px-6 py-28 text-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: "#86868b" }}
        >
          Get Started
        </p>
        <h2
          className="text-4xl md:text-5xl font-semibold text-gray-900 mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Ready to ride smarter?
        </h2>
        <p
          className="text-base mb-10 max-w-md mx-auto leading-relaxed"
          style={{ color: "#86868b" }}
        >
          Choose your plan. Same driver, every day <br /> No bookings, no hassle.
        </p>
        <Link
          href="/register"
          className="inline-block text-sm font-medium px-10 py-4 rounded-xl text-white transition-all duration-150"
          style={{ backgroundColor: "#1d1d1f" }}
        >
          Get Started
        </Link>
      </section>

      {/* ── Footer bar ── */}
      <footer
        className="px-8 py-6 flex items-center justify-between text-xs"
        style={{ backgroundColor: "#f5f5f7", color: "#86868b" }}
      >
        <span className="font-medium" style={{ color: "#1d1d1f" }}>Smart Ride</span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>

    </div>
  );
}