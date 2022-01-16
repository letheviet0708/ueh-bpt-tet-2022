import http from "../http-common";

class ActivityDataService {
  getAll(page, size, clan) {
    return http.get(`/activity?page=${page}&size=${size}&clan=${clan}`);
  }

  findAll() {
    return http.get('/activity/all')
  }

  get(id) {
    return http.get(`/activity/${id}`);
  }

  create(data) {
    return http.post("/activity", data);
  }

  addActivity(id, data) {
    return http.post(`activity/${id}/person`, data)
  }

  update(id, data) {
    return http.put(`/activity/${id}`, data);
  }

  delete(id) {
    return http.delete(`/activity/${id}`);
  }

  deleteAll() {
    return http.delete(`/activity`);
  }
}

export default new ActivityDataService();