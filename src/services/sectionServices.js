import apiClient from "@/services/services.js";

export default {
  getAllSections(courseId) {
    return apiClient.get(`/courses/${courseId}/sections`);
  },
  getSection(courseId,id) {
    return apiClient.get(`/courses/${courseId}/sections/${id}`);
  },
  createSection(courseId,data) {
    return apiClient.post(`/courses/${courseId}/sections`, data);
  },
  updateSection(courseId,id, data) {
    return apiClient.put(`/courses/${courseId}/sections/${id}`, data);
  },
  deleteSection(courseId,id) {
    return apiClient.delete(`/courses/${courseId}/sections/${id}`);
  }
}