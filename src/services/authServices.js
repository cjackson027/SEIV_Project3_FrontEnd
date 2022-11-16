import apiClient from "@/services/services.js";

export default {
  loginUser(user) {
    return apiClient.post("catalogs/login", user);
  },
  authorizeUser(code) {
    return apiClient.post("catalogs/authorize", code);
  },
  logoutUser(token) {
    return apiClient.post("catalogs/logout", token);
  }
};