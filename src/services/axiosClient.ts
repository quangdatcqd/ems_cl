import axios from 'axios';
import { paths } from '../paths';
// Tạo một instance của Axios
const axiosClient = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL, withCredentials: true });

// Thiết lập interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý các phản hồi thành công
    return response;
  },
  async (error) => {
    // Xử lý các lỗi

    if (error.response.status === 401) {
      if (error.request.responseURL.includes('logout')) {
        localStorage.removeItem("auth")
        if (window.location.pathname.includes('admin')) 
          return window.location.href = paths.admin.auth.signIn
        return window.location.href = paths.client.auth.signIn
      }

      axios.post(import.meta.env.VITE_SERVER_URL + "/admin/auth/refresh", {}, {
        withCredentials: true
      }).then((res: any) => {
        localStorage.setItem("auth", JSON.stringify(res?.data?.data));
        window.location.reload() 
      }).catch(() => {
        localStorage.removeItem("auth")
        if (window.location.pathname.includes('admin')) return window.location.href = paths.admin.auth.signIn
        return window.location.href = paths.client.auth.signIn

      }); 
    }
    return Promise.reject(error);
  }
);

export default axiosClient;