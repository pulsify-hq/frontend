import axios from "axios";
import { useAuthStore } from "@/features/auth/stores/authStore";
import router from "@/router";

const api = axios.create({
	baseURL: "",
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			const store = useAuthStore();
			store.logout();
			router.push({ name: "auth" });
		}
		return Promise.reject(error);
	},
);

export default api;
