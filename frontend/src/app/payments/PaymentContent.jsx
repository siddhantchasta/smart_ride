"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { createOrder, verifyPayment } from "@/services/payment.service";
import Script from "next/script";
import toast from "react-hot-toast";

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subscription_id = searchParams.get("subscription_id");
  const [paymentStep, setPaymentStep] = useState("idle");

  const isProcessing =
    paymentStep === "creating_order" ||
    paymentStep === "payment_opened" ||
    paymentStep === "verifying";

  const handlePayment = async () => {
    if (isProcessing) return;

    setPaymentStep("creating_order");

    try {
      const orderRes = await createOrder({ subscription_id });
      const order = orderRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Smart Ride",
        description: "Subscription Payment",
        order_id: order.id,

        handler: async function (response) {
          setPaymentStep("verifying");

          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              subscription_id,
              amount: order.amount / 100,
            });

            toast.success("Payment successful!");
            router.push("/dashboard");
          } catch (err) {
            setPaymentStep("idle");
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            setPaymentStep((currentStep) =>
              currentStep === "verifying" ? currentStep : "idle"
            );
          },
        },

        prefill: { name: "User", email: "test@gmail.com" },
        theme: { color: "#1a1a2e" },
      };

      const rzp = new window.Razorpay(options);
      setPaymentStep("payment_opened");
      rzp.open();
    } catch (err) {
      setPaymentStep("idle");
      toast.error("Payment failed to initialize");
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#f5f4ef" }}
      >
        <div className="flex items-center px-6 py-4">
          <span
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "#1a1a2e" }}
          >
            Smart Ride
          </span>
        </div>

        <div className="flex-1 px-6 pt-8 pb-16 max-w-lg mx-auto w-full">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#9ca3af" }}
          >
            Payment
          </p>

          <h1
            className="text-4xl font-semibold leading-none mb-2 tracking-tight"
            style={{ color: "#1a1a2e" }}
          >
            Complete your
            <br />
            order.
          </h1>

          <p className="text-sm mb-10" style={{ color: "#9ca3af" }}>
            Secured by Razorpay · 256-bit SSL
          </p>

          <div
            className="rounded-2xl p-5 mb-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <p
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "#9ca3af" }}
            >
              Order Summary
            </p>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: "#6b7280" }}>
                Subscription
              </span>
              <span
                className="text-sm font-medium font-mono"
                style={{ color: "#1a1a2e" }}
              >
                #{subscription_id ? subscription_id.slice(-8).toUpperCase() : "—"}
              </span>
            </div>

            <div
              className="h-px my-4"
              style={{ backgroundColor: "#f3f4f6" }}
            />

            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs" style={{ color: "#9ca3af" }}>
                Payment secured &amp; encrypted
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-semibold transition-opacity mb-4"
            style={{
              backgroundColor: isProcessing ? "#c8c7c2" : "#1a1a2e",
              color: isProcessing ? "#9ca3af" : "#ffffff",
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            <div>
              <p
                className="text-xs mb-0.5"
                style={{
                  color: isProcessing
                    ? "#9ca3af"
                    : "rgba(255,255,255,0.45)",
                }}
              >
                {paymentStep === "verifying"
                  ? "Verifying payment"
                  : paymentStep === "payment_opened"
                  ? "Waiting for payment confirmation"
                  : paymentStep === "creating_order"
                  ? "Preparing payment"
                  : "Ready to pay"}
              </p>

              <p className="text-sm font-semibold">
                Subscription #{subscription_id?.slice(-6).toUpperCase() ?? "—"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  {paymentStep === "verifying"
                    ? "Verifying..."
                    : paymentStep === "payment_opened"
                    ? "Please wait..."
                    : "Processing..."}
                </>
              ) : (
                <>Pay Now →</>
              )}
            </div>
          </button>

          <div className="flex items-center gap-2 px-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              style={{ color: "#9ca3af" }}
            >
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span className="text-xs" style={{ color: "#b0b3b8" }}>
              Powered by Razorpay
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
