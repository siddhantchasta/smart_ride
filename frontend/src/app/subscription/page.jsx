"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getRoutes,
  getPlans,
  createSubscription,
} from "@/services/subscription.service";

export default function SubscriptionPage() {
  const router = useRouter();

  const [routes, setRoutes] = useState([]);
  const [plans, setPlans] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    if (!token || !id) {
      router.push("/login");
      return;
    }

    setUserId(id);
  }, []);

  // Fetch routes + plans
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const routesRes = await getRoutes();
      const plansRes = await getPlans();

      setRoutes(routesRes.data);
      setPlans(plansRes.data);
    } catch (err) {
      console.error(
        "SUBSCRIPTION ERROR:",
        err.response?.data || err.message
      );
    }
  };

  // Create subscription
  const handleSubscribe = async () => {
    if (!selectedRoute || !selectedPlan) {
      alert("Select route and plan");
      return;
    }

    setLoading(true);

    try {
      const today = new Date();
      const start_date = today.toISOString().split("T")[0];

      const end = new Date();
      const selectedPlanData = plans.find(
          (p) => p.id === selectedPlan
      );
      console.log("SELECTED PLAN:", selectedPlan);
      console.log("PLANS:", plans);
      const duration = selectedPlanData.duration_days;

      end.setDate(end.getDate() + duration);

      const end_date = end.toISOString().split("T")[0];

      const res = await createSubscription({
        route_id: selectedRoute,
        plan_id: selectedPlan,
        start_date,
        end_date,
      });

      // redirect to payment
      router.push(
        `/payments?subscription_id=${res.data.id}`
      );
    } catch (err) {
      console.log("SUBSCRIBE ERROR FULL:", err);
      console.log("SUBSCRIBE ERROR DATA:", err.response?.data);
      alert(
        err.response?.data?.error || "Failed to subscribe"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Select Subscription</h2>

      {/* ROUTES */}
      <h3>Available Routes</h3>
      {routes.length === 0 && <p>No routes available</p>}

      {routes.map((route) => (
        <div key={route.id}>
          <input
            type="radio"
            name="route"
            value={route.id}
            onChange={() => setSelectedRoute(route.id)}
          />
          {route.name}
        </div>
      ))}

      {/* PLANS */}
      <h3>Plans</h3>
      {plans.length === 0 && <p>No plans available</p>}

      {plans.map((plan) => (
        <div key={plan.id}>
          <input
            type="radio"
            name="plan"
            value={plan.id}
            onChange={() => setSelectedPlan(plan.id)}
          />
          {plan.name} - ₹{plan.price}
        </div>
      ))}

      <button onClick={handleSubscribe} disabled={loading}>
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
};