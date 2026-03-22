"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  createOrder,
  verifyPayment,
} from "@/services/payment.service";
import Script from "next/script";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subscription_id = searchParams.get("subscription_id");

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create order
      const orderRes = await createOrder({
        subscription_id,
      });
      const order = orderRes.data;

      // Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Smart Ride",
        description: "Subscription Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // Verify payment
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              subscription_id,
              amount: order.amount / 100,
            });

            alert("Payment successful!");

            // redirect
            router.push("/dashboard");

          } catch (err) {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: "User",
          email: "test@gmail.com",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("Payment failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        {/* Razorpay Script */}
        <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        />

        <div style={styles.container}>
        <h2>Complete Payment</h2>

        <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
        </button>
        </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
};