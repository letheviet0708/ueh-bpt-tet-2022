import http from "../http-common";

class PersonDataService {
  getAll(page, size, clan,sort) {
    //console.log(`/person?page=${page}&size=${size}&clan=${clan}&sort=${sort}`)
    return http.get(`/person?page=${page}&size=${size}&clan=${clan}&sort=${sort}`);
  }

  getVoteData(){
    return http.get("/vote")
  }

  vote(data){
    return http.post("/vote", data)
  }

  findAll() {
    return http.get("/person")
  }

  findOne(uid) {
    console.log(`/person/${uid}`)
    return http.get(`/person/${uid}`)
  }

  saveProfiles(uid, data){
    return http.post(`/person/${uid}`, data);
  }

  saveResult(uid, data){
    return http.post(`/person/${uid}/result`, data);
  }

  retrieveResult(data){
    return http.post("/result", data)
  }

  updateResult(uid, data){
    return http.put(`/person/${uid}/result`, data)
  }
  
  getActivity(id) {
    return http.get(`/person/${id}/activity`)
  }

  get(id) {
    return http.get(`/person/${id}`);
  }

  getMSSV(mssv) {
    return http.get(`mssv/${mssv}`)
  }

  create(data) {
    return http.post("/person", data);
  }

  addActivity(mssv, data) {
    return http.post(`/mssv/${mssv}/activity`, data)
  }

  update(id, data) {
    return http.post(`/person/${id}/update`, data);
  }

  delete(id) {
    return http.delete(`/person/${id}`);
  }

  deleteAll() {
    return http.delete(`/person`);
  }

  findByTitle(title) {
    return http.get(`/person?title=${title}`);
  }

  pinList(page, size, clan,sort,data) {
    //console.log(`/person?page=${page}&size=${size}&clan=${clan}&sort=${sort}`)
    console.log(data)
    return http.post(`/person/list?page=${page}&size=${size}&clan=${clan}&sort=${sort}`, data);
  }
}

export default new PersonDataService();