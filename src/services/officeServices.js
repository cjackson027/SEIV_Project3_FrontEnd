import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/office");
  },
  getAllForUser(userId) {
    return apiClient.get("/office/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/office/${id}`);
  },
  create(data) {
    return apiClient.post("/office", data);
  },
  update(id, data) {
    return apiClient.put(`/office/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/office/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/office`);
  },
//   findByCourseId(courseId) {
//     return apiClient.get(`/office?CourseId=${courseId}`);
//   }
}