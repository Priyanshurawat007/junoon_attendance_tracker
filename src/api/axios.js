import axios from "axios";

const instance = axios.create({
  // baseURL: "https://attendance-tracker-b7jp.onrender.com/api"
  baseURL:"http://localhost:5000/api"
});

export default instance;