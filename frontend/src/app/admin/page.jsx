"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";

export default function AdminPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("ALL");

  const [driversMap, setDriversMap] = useState({});
  const [selectedDriver, setSelectedDriver] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSubscriptions();
    fetchStats();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/admin/subscriptions");
      setSubscriptions(res.data);
    } catch (err) {
      setError("Failed to load subscriptions");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      setError("Failed to load stats");
    }
  };

  // FETCH DRIVERS BY ROUTE
  const fetchDriversByRoute = async (routeId, subId) => {
    try {
      const res = await API.get(
        `/admin/drivers-by-route?route_id=${routeId}`
      );

      setDriversMap((prev) => ({
        ...prev,
        [subId]: res.data,
      }));

    } catch (err) {
      setError("Failed to load drivers");
    }
  };

  const assignDriver = async (subscriptionId) => {
    const driverId = selectedDriver[subscriptionId];

    if (!driverId) {
      setError("Please select a driver");
      return;
    }

    try {
      setError("");
      setSuccess("");

      await API.post("/admin/assign-driver", {
        subscription_id: subscriptionId,
        driver_id: driverId,
      });

      setSuccess("Driver assigned successfully");
      fetchSubscriptions();

    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to assign driver"
      );
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    filter === "ALL" ? true : sub.status === filter
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div style={statsBox}>
        <p>Active: {stats.active || 0}</p>
        <p>Waiting: {stats.waiting || 0}</p>
        <p>Failed: {stats.failed || 0}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="WAITING">Waiting</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {filteredSubscriptions.map((sub) => (
        <div key={sub.id} style={card}>
          <p><b>User:</b> {sub.user_name}</p>
          <p><b>Route:</b> {sub.route_name}</p>
          <p><b>Status:</b> {sub.status}</p>
          <p><b>Driver:</b> {sub.driver_name || "Not assigned"}</p>

          {sub.status === "WAITING" && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() =>
                  fetchDriversByRoute(sub.route_id, sub.id)
                }
              >
                Load Drivers
              </button>

              <br /><br />

              <select
                onChange={(e) =>
                  setSelectedDriver((prev) => ({
                    ...prev,
                    [sub.id]: e.target.value,
                  }))
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Select Driver
                </option>

                {(driversMap[sub.id] || []).length === 0 ? (
                  <option disabled>No drivers available</option>
                ) : (
                  driversMap[sub.id].map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} ({driver.phone})
                    </option>
                  ))
                )}
              </select>

              <button
                onClick={() => assignDriver(sub.id)}
                style={{ marginLeft: "10px" }}
              >
                Assign
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "15px",
};

const statsBox = {
  border: "1px solid #aaa",
  padding: "10px",
  marginBottom: "20px",
  display: "flex",
  gap: "20px",
};