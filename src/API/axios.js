import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/e-project-555fd/us-central1/api",
  baseURL: "https://amazon-api-deploy-qtr4.onrender.com/"
});
export { axiosInstance };
