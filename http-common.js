import axios from "axios";

export default axios.create({
  baseURL: "/api"//"https://lightup.vercel.app/api/",//"http://localhost:3000/api/"//
});