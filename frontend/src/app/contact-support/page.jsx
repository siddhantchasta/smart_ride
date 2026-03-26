"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

export default function ContactSupport() {
  const router = useRouter();

  const [form, setForm] = useState({
    pickup: "",
    drop: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.pickup || !form.drop) {
      return setError("Please enter both locations");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/admin/route-request", {
        pickup: form.pickup,
        drop: form.drop,
      });

      setSuccess("Request submitted successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Request a New Route</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="pickup"
          placeholder="Enter pickup location"
          value={form.pickup}
          onChange={handleChange}
          required
        />

        <input
          name="drop"
          placeholder="Enter drop location"
          value={form.drop}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Submitting..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
};