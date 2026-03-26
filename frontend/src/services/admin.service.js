import API from "./api";

export const sendQuery = (data) => API.post("/admin/query", data);
export const getMyQueries = () => API.get("/admin/my-queries");