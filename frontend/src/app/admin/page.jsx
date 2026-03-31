"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminHero from "@/components/admin/AdminHero";
import AdminToast from "@/components/admin/AdminToast";
import AdminStatCards from "@/components/admin/AdminStatCards";
import SubscriptionsCard from "@/components/admin/SubscriptionsCard";
import QueriesCard from "@/components/admin/QueriesCard";
import RouteRequestsCard from "@/components/admin/RouteRequestsCard";
import DriverModal from "@/components/admin/DriverModal";

export default function AdminPage() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("ALL");
  const [driversMap, setDriversMap] = useState({});
  const [selectedDriver, setSelectedDriver] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [queries, setQueries] = useState([]);
  const [loadingQueries, setLoadingQueries] = useState(false);
  const [queryFilter, setQueryFilter] = useState("ALL");
  const [routeRequests, setRouteRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestFilter, setRequestFilter] = useState("ALL");

  const [showDriverModal, setShowDriverModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    license_number: "",
    vehicle_number: "",
    vehicle_type: "",
    capacity: "",
  });
  const [selectedRouteForDriver, setSelectedRouteForDriver] = useState(null);

  const formatTime = (t) => (t ? t.slice(0, 5) : "--");

  useEffect(() => {
    fetchSubscriptions();
    fetchStats();
    fetchQueries();
    fetchRouteRequests();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "ADMIN") router.push("/login");
  }, [router]);

  useEffect(() => {
    subscriptions.forEach((sub) => {
      if (sub.status === "WAITING" && sub.route_id) {
        fetchDriversByRoute(sub.route_id, sub.id);
      }
    });
  }, [subscriptions]);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/admin/subscriptions");
      setSubscriptions(res.data);
    } catch {
      setError("Failed to load subscriptions");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch {
      setError("Failed to load stats");
    }
  };

  const fetchDriversByRoute = async (routeId, subId) => {
    try {
      const res = await API.get(`/admin/drivers-by-route?route_id=${routeId}`);
      setDriversMap((prev) => ({ ...prev, [subId]: res.data }));
    } catch {
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
      setError(err.response?.data?.error || "Failed to assign driver");
    }
  };

  const handleCreateDriver = async () => {
    try {
      setError("");
      setSuccess("");

      const res = await API.post("/admin/create-driver", newDriver);
      const driverId = res.data.id;

      await API.post("/admin/assign-driver-route", {
        driver_id: driverId,
        route_id: selectedRouteForDriver,
      });

      await API.post("/admin/create-vehicle", {
        driver_id: driverId,
        vehicle_number: newDriver.vehicle_number,
        vehicle_type: newDriver.vehicle_type,
        capacity: newDriver.capacity,
      });

      setSuccess("Driver & Vehicle created");
      setShowDriverModal(false);
      setNewDriver({
        name: "",
        phone: "",
        license_number: "",
        vehicle_number: "",
        vehicle_type: "",
        capacity: "",
      });
      fetchSubscriptions();
    } catch (err) {
      setError(err.response?.data?.error || "Failed");
    }
  };

  const fetchQueries = async () => {
    try {
      setLoadingQueries(true);
      const res = await API.get("/admin/queries");
      setQueries(res.data);
    } catch {
      setError("Failed to load queries");
    } finally {
      setLoadingQueries(false);
    }
  };

  const handleResolve = async (queryId) => {
    try {
      await API.post("/admin/resolve-query", { query_id: queryId });
      fetchQueries();
    } catch {
      setError("Failed to resolve query");
    }
  };

  const fetchRouteRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await API.get("/admin/route-requests");
      setRouteRequests(res.data);
    } catch {
      setError("Failed to load route requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.post("/admin/approve-route", { request_id: id });
      setSuccess("Route approved successfully");
      fetchRouteRequests();
    } catch {
      setError("Failed to approve route");
    }
  };

  const filteredQueries = queries.filter((q) =>
    queryFilter === "ALL" ? true : q.status === queryFilter
  );

  const filteredRequests = routeRequests.filter((r) =>
    requestFilter === "ALL" ? true : r.status === requestFilter
  );

  const filteredSubscriptions = subscriptions.filter((sub) =>
    filter === "ALL" ? true : sub.status === filter
  );

  const statusColor = (status) => {
    if (status === "ACTIVE") {
      return {
        color: "#34c759", 
        bg: "rgba(52,199,89,0.15)",
        border: "rgba(52,199,89,0.35)",
      };
    }

    if (status === "WAITING") {
      return {
        color: "#ff9f0a",
        bg: "rgba(255,159,10,0.15)",
        border: "rgba(255,159,10,0.35)",
      };
    }

    return {
      color: "#ff453a", 
      bg: "rgba(255,69,58,0.15)",
      border: "rgba(255,69,58,0.35)",
    };
  };

  const FILTERS = ["ALL", "ACTIVE", "WAITING", "FAILED"];

  const statCards = [
    { label: "Active", value: stats.active || 0 },
    { label: "Waiting", value: stats.waiting || 0 },
    { label: "Failed", value: stats.failed || 0 },
    {
      label: "Total",
      value:
        Number(stats.active || 0) +
        Number(stats.waiting || 0) +
        Number(stats.failed || 0),
    },
  ];

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #060606 0%, #101010 45%, #1a1a1a 100%)",
        fontFamily: "'Sora', 'SF Pro Display', sans-serif",
      }}
    >
      <div className="lg:p-5">
        <div
          className="min-h-screen lg:min-h-[calc(100vh-2.5rem)] rounded-none lg:rounded-[2.5rem] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0e0e0e 0%, #171717 52%, #202020 100%)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.34)",
          }}
        >
          <AdminNavbar currentDate={currentDate} />

          <div className="max-w-7xl mx-auto px-5 pb-5 sm:px-7 lg:px-8 lg:pb-8 space-y-6">
            <AdminHero />

            {error && (
              <AdminToast
                type="error"
                message={error}
                onClose={() => setError("")}
              />
            )}

            {success && (
              <AdminToast
                type="success"
                message={success}
                onClose={() => setSuccess("")}
              />
            )}

            <AdminStatCards statCards={statCards} />

            <SubscriptionsCard
              FILTERS={FILTERS}
              filter={filter}
              setFilter={setFilter}
              subscriptions={subscriptions}
              filteredSubscriptions={filteredSubscriptions}
              driversMap={driversMap}
              selectedDriver={selectedDriver}
              setSelectedDriver={setSelectedDriver}
              setSelectedRouteForDriver={setSelectedRouteForDriver}
              setShowDriverModal={setShowDriverModal}
              assignDriver={assignDriver}
              formatTime={formatTime}
              statusColor={statusColor}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <QueriesCard
                loadingQueries={loadingQueries}
                filteredQueries={filteredQueries}
                queries={queries}
                queryFilter={queryFilter}
                setQueryFilter={setQueryFilter}
                handleResolve={handleResolve}
              />


              <RouteRequestsCard
                loadingRequests={loadingRequests}
                filteredRequests={filteredRequests}
                routeRequests={routeRequests}
                requestFilter={requestFilter}
                setRequestFilter={setRequestFilter}
                handleApprove={handleApprove}
              />
            </div>
          </div>
        </div>
      </div>

      <DriverModal
        showDriverModal={showDriverModal}
        setShowDriverModal={setShowDriverModal}
        newDriver={newDriver}
        setNewDriver={setNewDriver}
        handleCreateDriver={handleCreateDriver}
      />
    </div>
  );
}