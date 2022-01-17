import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9000/api/"//"https://lightup.vercel.app/api/",//"http://localhost:3000/api/"//
});