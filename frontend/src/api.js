import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const saved = sessionStorage.getItem("adminCredentials");
  if (saved) {
    const credentials = JSON.parse(saved);
    config.headers.Authorization = `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`;
  }
  return config;
});

export function saveCredentials(username, password) {
  sessionStorage.setItem(
    "adminCredentials",
    JSON.stringify({ username, password }),
  );
}

export function clearCredentials() {
  sessionStorage.removeItem("adminCredentials");
}

export default api;
