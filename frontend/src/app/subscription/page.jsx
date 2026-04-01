"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPlans, getRoutes, createSubscription } from "@/services/subscription.service";
import toast from "react-hot-toast";

export default function SubscriptionPage() {
  const router = useRouter();

  const [routes, setRoutes] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    if (!token || !id) { router.push("/login"); return; }
    setUserId(id);
  }, []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const routesRes = await getRoutes();
      const plansRes = await getPlans();
      setRoutes(routesRes.data);
      setPlans(plansRes.data);
    } catch (err) {
      console.error("SUBSCRIPTION ERROR:", err.response?.data || err.message);
    }
  };

  const handleSubscribe = async () => {
    const routeId = localStorage.getItem("selectedRoute");
    if (!routeId || !selectedPlan || !startTime || !endTime) {
      toast("Select plan and timings");
      return;
    }
    setLoading(true);
    try {
      const today = new Date();
      const start_date = today.toISOString().split("T")[0];
      const end = new Date();
      const selectedPlanData = plans.find((p) => p.id === selectedPlan);
      const duration = selectedPlanData.duration_days;
      end.setDate(end.getDate() + duration);
      const end_date = end.toISOString().split("T")[0];
      const res = await createSubscription({
        route_id: routeId,
        plan_id: selectedPlan,
        start_date,
        end_date,
        start_time: startTime,
        end_time: endTime,
      });
      const sub = res.data.subscription;

      if (res.data.alreadyExists) {

        if (sub.status === "PENDING") {
          toast("Payment pending!");
          router.push(`/payments?subscription_id=${sub.id}`);
          return;
        }

        if (sub.status === "WAITING") {
          toast("You have already subscribed, driver will be assigned soon.");
          router.push("/dashboard");
          return;
        }

        if (sub.status === "ACTIVE") {
          toast("You already have an active subscription.");
          router.push("/dashboard");
          return;
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const planStyle = (index) => {
    const styles = [
      { accent: "#dbeafe", accentDark: "#3b82f6", label: "Starter" },
      { accent: "#fef3c7", accentDark: "#f59e0b", label: "Most Popular" },
      { accent: "#dcfce7", accentDark: "#22c55e", label: "Best Value" },
    ];
    return styles[index] || styles[0];
  };

  // Shared input style
  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    color: "#1a1a1a",
    backgroundColor: "#f5f5f7",
    border: "1px solid rgba(0,0,0,0.08)",
    outline: "none",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    transition: "border-color 0.15s ease, background-color 0.15s ease",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f5f3ef",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      {/* ── Topnav ── */}
      <nav
        className="flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <p
          className="text-gray-900 text-xl md:text-2xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          Smart Ride
        </p>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-14 pb-36">

        {/* ── Heading ── */}
        <div className="mb-10">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "#a3a3a3" }}
          >
            Subscription
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-gray-900 leading-none"
            style={{ letterSpacing: "-0.04em" }}
          >
            Pick your plan.
          </h1>
          <p className="text-base mt-4" style={{ color: "#737373" }}>
            Fixed route · Same driver · Zero daily hassle.
          </p>
        </div>

        {/* ── Travel Timing ── */}
        <div
          className="rounded-3xl p-6 mb-6"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: "#a3a3a3" }}
          >
            Travel Timing
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            {/* Morning */}
            <div>
              <label
                className="block text-xs font-semibold mb-2"
                style={{ color: "#525252", letterSpacing: "-0.01em" }}
              >
                Morning pickup
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.border = "1px solid rgba(0,0,0,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "#f5f5f7";
                  e.target.style.border = "1px solid rgba(0,0,0,0.08)";
                }}
              />
            </div>

            {/* Evening */}
            <div>
              <label
                className="block text-xs font-semibold mb-2"
                style={{ color: "#525252", letterSpacing: "-0.01em" }}
              >
                Evening pickup
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.border = "1px solid rgba(0,0,0,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "#f5f5f7";
                  e.target.style.border = "1px solid rgba(0,0,0,0.08)";
                }}
              />
            </div>

          </div>
        </div>

        {/* ── Plan cards ── */}
        {plans.length === 0 ? (
          <div className="flex items-center gap-3 py-4">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-800 animate-spin" />
            <p className="text-sm" style={{ color: "#a3a3a3" }}>Loading plans...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.id;
              const ps = planStyle(index);

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className="relative rounded-3xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  style={{
                    backgroundColor: isSelected ? "#1a1a1a" : "#ffffff",
                    border: isSelected ? "2px solid #1a1a1a" : "2px solid transparent",
                    boxShadow: isSelected
                      ? "0 20px 60px rgba(0,0,0,0.15)"
                      : "0 2px 20px rgba(0,0,0,0.06)",
                    minHeight: "280px",
                    transform: isSelected ? "translateY(-4px)" : "none",
                  }}
                >
                  {/* Top row: label pill + check */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: isSelected ? "rgba(255,255,255,0.1)" : ps.accent,
                        color: isSelected ? "rgba(255,255,255,0.7)" : ps.accentDark,
                      }}
                    >
                      {ps.label}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        backgroundColor: isSelected ? "#ffffff" : "transparent",
                        border: isSelected ? "none" : "2px solid #d4d4d4",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Plan name */}
                  <div className="mb-2">
                    <p
                      className="text-lg font-semibold"
                      style={{ color: isSelected ? "#ffffff" : "#1a1a1a", letterSpacing: "-0.02em" }}
                    >
                      {plan.name}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: isSelected ? "rgba(255,255,255,0.4)" : "#a3a3a3" }}
                    >
                      {plan.duration_days} days
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-6" style={{ borderTop: `1px solid ${isSelected ? "rgba(255,255,255,0.1)" : "#f0f0f0"}` }}>
                    <p
                      className="font-semibold leading-none"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        color: isSelected ? "#ffffff" : "#1a1a1a",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      ₹{plan.price?.toLocaleString("en-IN")}
                    </p>
                    {plan.duration_days && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: isSelected ? "rgba(255,255,255,0.4)" : "#a3a3a3" }}
                      >
                        ≈ ₹{Math.round(plan.price / plan.duration_days)} per day
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── What's included ── */}
        <div
          className="mt-6 rounded-3xl p-6"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: "#a3a3a3" }}
          >
            Every plan includes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { text: "Same driver daily" },
              { text: "Fixed pickup & drop" },
              { text: "On-time guarantee" },
              { text: "Secure payment" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                {/* Minimal dot indicator instead of emoji */}
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#1a1a1a" }}
                />
                <p className="text-xs font-medium" style={{ color: "#525252" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Sticky bottom CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 py-4 z-30"
        style={{
          backgroundColor: "rgba(245,243,239,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
          <div className="shrink-0">
            {selectedPlanData ? (
              <>
                <p className="text-xs" style={{ color: "#a3a3a3" }}>You selected</p>
                <p className="text-sm font-semibold text-gray-900" style={{ letterSpacing: "-0.01em" }}>
                  {selectedPlanData.name} — ₹{selectedPlanData.price?.toLocaleString("en-IN")}
                </p>
              </>
            ) : (
              <p className="text-sm font-medium" style={{ color: "#a3a3a3" }}>
                No plan selected yet
              </p>
            )}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading || !selectedPlan}
            className="px-10 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 shrink-0"
            style={{
              backgroundColor: loading || !selectedPlan ? "#e5e5e5" : "#1a1a1a",
              color: loading || !selectedPlan ? "#a3a3a3" : "#ffffff",
              cursor: loading || !selectedPlan ? "not-allowed" : "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            {loading ? "Processing..." : "Continue to Payment →"}
          </button>
        </div>
      </div>

    </div>
  );
}