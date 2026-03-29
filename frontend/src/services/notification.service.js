import API from "./api";

export const getNotifications = (userId) =>
  API.get(`/notifications/${userId}`);