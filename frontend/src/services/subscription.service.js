import API from "./api";

export const getRoutes = () => API.get("/routes");
export const getPlans = () => API.get("/plans");

export const createSubscription = (data) =>
  API.post("/subscriptions", data);

export const getSubscriptionDetails = (userId) =>
  API.get(`/subscriptions/details/${userId}`);