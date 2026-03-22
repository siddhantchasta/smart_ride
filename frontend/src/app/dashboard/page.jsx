"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocation, saveLocation } from "@/services/user.service";
import { getSubscriptionDetails } from "@/services/subscription.service";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const [form, setForm] = useState({
    pickup_address: "",
    drop_address: "",
  });

  const [userId, setUserId] = useState(null);

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    if (!token || !id) {
      router.push("/login");
      return;
    }

    setUserId(id);
  }, []);

  // MAIN FLOW
  useEffect(() => {
    if (!userId) return;

    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      // Check location
      const locRes = await getLocation();

      if (locRes.data && locRes.data.pickup_address) {
        setLocation(locRes.data);

        // Check subscription
        const subRes = await getSubscriptionDetails(userId);

        if (subRes.data && subRes.data.subscription_id) {
          setSubscription(subRes.data);
        } else {
          router.push("/subscription");
        }
      } else {
        setLocation(null);
      }
    } catch (err) {
      console.log(
        "DASHBOARD ERROR:",
        err.response?.data || err.message
      );
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  // SAVE LOCATION
  const handleSaveLocation = async () => {
    if (!form.pickup_address || !form.drop_address) {
      alert("Enter both pickup and drop");
      return;
    }

    try {
      await saveLocation(form);
      alert("Location saved!");

      // reload flow
      window.location.reload();
    } catch (err) {
      alert(
        err.response?.data?.error || "Failed to save location"
      );
    }
  };

  // LOADING
  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  // LOCATION FORM
  if (!location) {
    return (
      <div style={styles.container}>
        <h2>Enter Pickup & Drop</h2>

        <input
          placeholder="Pickup location"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              pickup_address: e.target.value,
            }))
          }
        />

        <input
          placeholder="Drop location"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              drop_address: e.target.value,
            }))
          }
        />

        <button onClick={handleSaveLocation}>
          Save Location
        </button>
      </div>
    );
  }

  // REDIRECTING
  if (!subscription) {
    return <p style={{ padding: "20px" }}>Redirecting...</p>;
  }

  // FINAL DASHBOARD VIEW
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={card}>
        <h2>Subscription</h2>
        <p>
          <b>Route:</b> {subscription.route_name}
        </p>
        <p>
          <b>Status:</b> {subscription.status}
        </p>
        <p>
          <b>Driver:</b>{" "}
          {subscription.driver_name || "Not assigned"}
        </p>
        <p>
          <b>Phone:</b> {subscription.driver_phone || "-"}
        </p>
        <p>
          <b>Vehicle:</b> {subscription.vehicle_type || "-"} ({subscription.vehicle_number || "-"})
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    margin: "100px auto",
  },
};

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "20px",
};