import apiClient from "@/services/services.js";

export default {
//   getAllForUser(userId) {
//     return apiClient.get("/courses/userTut/" + userId);
//   },
  get(id) {
    return apiClient.get(`/courses/${id}`);
  },
  getAll() {
    return apiClient.get(`/courses/`);
  },
  create(data) {
    return apiClient.post("/courses", data);
  },
  update(id, data) {
    return apiClient.put(`/courses/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/courses/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/courses`);
  },
  findByCourseId(courseId) {
    return apiClient.get(`/courses?CourseId=${courseId}`);
  }
}
