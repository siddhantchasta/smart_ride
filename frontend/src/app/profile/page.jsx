"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveLocation } from "@/services/user.service";
import API from "@/services/api";

export default function ProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    pickup_address: "",
    drop_address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveLocation(form);
      router.push("/subscription");
    } catch {
      alert("Failed to save location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Set Your Route</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="pickup_address" placeholder="Pickup" onChange={handleChange} required />
        <input name="drop_address" placeholder="Drop" onChange={handleChange} required />

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Location"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", width: "300px" },
};