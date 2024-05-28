import axios from 'axios'; 
import { paths } from '../paths';

// Tạo một instance của Axios
const axiosClient = axios.create({ baseURL: "http://localhost:3000/" ,withCredentials :true});

// Thiết lập interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý các phản hồi thành công
    return response;
  },
  (error) => {
    // Xử lý các lỗi
    if (error.response.status === 401) { 
      // Chuyển hướng đến trang đăng nhập
      alert("Unauthorized login please!")
      localStorage.removeItem("auth")
      window.location.href= paths.admin.auth.signIn 
    } 
    return Promise.reject(error);
  }
);

export default axiosClient;