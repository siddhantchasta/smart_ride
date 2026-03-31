"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocation, saveLocation, getMe } from "@/services/user.service";
import { getSubscriptionDetails, getRoutes } from "@/services/subscription.service";
import { sendQuery, getMyQueries } from "@/services/admin.service";
import { getNotifications } from "@/services/notification.service";

import DashboardLoading from "@/components/dashboard/DashboardLoading";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import QueriesOverlay from "@/components/dashboard/QueriesOverlay";
import DriverCard from "@/components/dashboard/DriverCard";
import VehicleCard from "@/components/dashboard/VehicleCard";
import RouteDetailsCard from "@/components/dashboard/RouteDetailsCard";
import HelpCard from "@/components/dashboard/HelpCard";
import QueriesCard from "@/components/dashboard/QueriesCard";
import DashboardHero from "@/components/dashboard/DashboardHero";
import RouteSetupView from "@/components/dashboard/RouteSetupView";

import toast from "react-hot-toast";

const BG_IMAGE = "/images/bg.png";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [form, setForm] = useState({ pickup_address: "", drop_address: "" });
  const [userId, setUserId] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routeAvailable, setRouteAvailable] = useState(true);

  const [routeSearch, setRouteSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRouteObj, setSelectedRouteObj] = useState(null);
  const [query, setQuery] = useState("");
  const [sending, setSending] = useState(false);
  const [myQueries, setMyQueries] = useState([]);
  const [loadingQueries, setLoadingQueries] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showQueriesOverlay, setShowQueriesOverlay] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    if (!token || !id) {
      router.push("/login");
      return;
    }

    setUserId(id);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchData();
    fetchMyQueries();
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (err) {
      console.log("USER FETCH ERROR:", err);
    }
  };

  const fetchData = async () => {
    try {
      const locRes = await getLocation();

      if (locRes.data && (locRes.data.pickup_address || locRes.data.route_id)) {
        setLocation(locRes.data);

        const subRes = await getSubscriptionDetails(userId);

        if (subRes.data && subRes.data.subscription_id) {
          setSubscription(subRes.data);
        } else {
          if (locRes.data.route_id) {
            localStorage.setItem("selectedRoute", locRes.data.route_id);
          }
          router.push("/subscription");
        }
      } else {
        setLocation(null);
      }
    } catch (err) {
      console.log("DASHBOARD ERROR:", err?.response?.data || err.message);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLocation = async () => {
    if (!form.pickup_address || !form.drop_address) {
      toast.error("Enter both pickup and drop");
      return;
    }

    try {
      const routesRes = await getRoutes();
      const availableRoutes = routesRes.data;

      setRoutes(availableRoutes);

      const match = availableRoutes.find(
        (r) =>
          form.pickup_address.toLowerCase().includes(r.start_location.toLowerCase()) &&
          form.drop_address.toLowerCase().includes(r.end_location.toLowerCase())
      );

      if (match) {
        await saveLocation({ route_id: match.id });
        localStorage.setItem("selectedRoute", match.id);
        window.location.reload();
      } else {
        setRouteAvailable(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to save location");
    }
  };

  const handleContinueWithRoute = async () => {
    if (!selectedRoute) return toast.error("Select a route");

    try {
      await saveLocation({ route_id: selectedRoute });
      localStorage.setItem("selectedRoute", selectedRoute);
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to save location");
    }
  };

  const handleSendQuery = async () => {
    if (!query) return toast.error("Enter your query");

    setSending(true);
    try {
      await sendQuery({ message: query });
      await fetchMyQueries();
      toast("Query sent successfully!");
      setQuery("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send query");
    } finally {
      setSending(false);
    }
  };

  const fetchMyQueries = async () => {
    try {
      setLoadingQueries(true);
      const res = await getMyQueries();
      setMyQueries(res.data);
    } catch (err) {
      console.log("QUERY FETCH ERROR:", err);
    } finally {
      setLoadingQueries(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const res = await getNotifications(currentUserId);
      setNotifications(res.data);
    } catch (err) {
      console.log("NOTIF ERROR:", err);
    }
  };

  const filteredRoutes = routes.filter(
    (r) =>
      r.name?.toLowerCase().includes(routeSearch.toLowerCase()) ||
      r.start_location?.toLowerCase().includes(routeSearch.toLowerCase()) ||
      r.end_location?.toLowerCase().includes(routeSearch.toLowerCase())
  );

  const previewQueries = myQueries.slice(0, 2);

  if (loading) return <DashboardLoading />;

  if (!location) {
    return (
      <RouteSetupView
        BG_IMAGE={BG_IMAGE}
        form={form}
        setForm={setForm}
        routeAvailable={routeAvailable}
        routeSearch={routeSearch}
        setRouteSearch={setRouteSearch}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        filteredRoutes={filteredRoutes}
        selectedRoute={selectedRoute}
        selectedRouteObj={selectedRouteObj}
        setSelectedRoute={setSelectedRoute}
        setSelectedRouteObj={setSelectedRouteObj}
        handleSaveLocation={handleSaveLocation}
        handleContinueWithRoute={handleContinueWithRoute}
        router={router}
      />
    );
  }

  if (!subscription) return <DashboardLoading redirecting />;

  const isActive = subscription.status?.toLowerCase() === "active";

  const initials = subscription.driver_name
    ? subscription.driver_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "—";

  return (
    <div className="min-h-screen bg-black text-white">
      {showQueriesOverlay && (
        <QueriesOverlay
          myQueries={myQueries}
          setShowQueriesOverlay={setShowQueriesOverlay}
        />
      )}

      <DashboardNavbar
        user={user}
        notifications={notifications}
        showNotif={showNotif}
        setShowNotif={setShowNotif}
        router={router}
      />

      <div className="p-5">
  <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-5">

    {/* LEFT SIDE */}
    <div className="space-y-5">

      {/* HERO */}
      <DashboardHero
        subscription={subscription}
        location={location}
        isActive={isActive}
      />

      {/* DRIVER + VEHICLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DriverCard subscription={subscription} initials={initials} />
        <VehicleCard subscription={subscription} />
      </div>

      {/* QUERIES */}
      <QueriesCard
        myQueries={myQueries}
        loadingQueries={loadingQueries}
        previewQueries={previewQueries}
        setShowQueriesOverlay={setShowQueriesOverlay}
      />
    </div>

    {/* RIGHT SIDE */}
    <div className="space-y-5">

      {/* ROUTE DETAILS */}
      <RouteDetailsCard
        location={location}
        subscription={subscription}
      />

      {/* HELP */}
      <HelpCard
        query={query}
        setQuery={setQuery}
        sending={sending}
        handleSendQuery={handleSendQuery}
      />
    </div>

  </div>
</div>
    </div>
  );
}
