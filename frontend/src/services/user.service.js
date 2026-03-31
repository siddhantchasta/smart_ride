import API from "./api";

export const saveLocation = (data) =>
  API.post("/user/location", data);

export const getLocation = () =>
  API.get("/user/location");

export const getMe = () => API.get("/user/me");