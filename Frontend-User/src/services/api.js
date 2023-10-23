import axios from "axios";

const BASE_URL = "https://localhost:7207/api/";
const api = axios.create({
    baseURL:BASE_URL
});

export default api;