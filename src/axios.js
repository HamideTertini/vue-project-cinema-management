// src/utils/axios.js
import axios from 'axios'

// Krijo një instancë të Axios me një konfigurim bazë
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/', // Vendos URL-në bazë të API-së
  timeout: 10000, // Koha maksimale që do të presësh për një përgjigje
  headers: {
    'Content-Type': 'application/json',
  },
})

// Mund të shtosh edhe interceptors për autentifikim dhe ndihmë për kërkesa
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Merr token nga localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Shto token-in në kërkesë
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Mund të shtosh logjikën për logout nëse përdoruesi nuk është autentifikuar
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
