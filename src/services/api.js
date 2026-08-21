import axios from "axios";

const API = axios.create({
  baseURL: "https://jobhints-api.onrender.com/api",
});

export default API;