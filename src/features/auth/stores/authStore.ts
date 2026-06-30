import { defineStore } from "pinia";
import api from "@/shared/utils/api";
import axios from "axios";

interface AuthState {
	user: null | string;
	token: null | string;
	isLoading: boolean;
	error: null | string;
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		user: null,
		token: null,
		isLoading: false,
		error: null,
	}),

	getters: {
		isAuthenticated: (state) => !!state.user,
	},

	actions: {
		async login(email: string, password: string) {
			this.isLoading = true;
			this.error = null;

			try {
				const response = await api.post("/auth/login", { email, password });
				this.token = response.data.token;
				this.user = email;
				localStorage.setItem("token", this.token as string);
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error = err.response?.data?.message ?? "Something went wrong";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		async logout() {
			try {
				await api.post("/auth/logout");
			} catch {
				// ignore errors, we're logging out regardless
			} finally {
				this.user = null;
				this.token = null;
				localStorage.removeItem("token");
			}
		},

		async signup(email: string, password: string, userName: string) {
			this.isLoading = true;
			this.error = null;

			try {
				const response = await api.post("/auth/signup", {
					email,
					password,
					userName,
				});
				this.token = response.data.token;
				this.user = email;
				localStorage.setItem("token", this.token as string);
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error = err.response?.data?.message ?? "Something went wrong";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		async resetPassword(email: string, newPassword: string) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.post("/auth/reset", { email, password: newPassword });
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ?? "An unexpected error occured";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		async deleteUser() {
			this.isLoading = true;
			this.error = null;
			try {
				await api.delete("/account");
				this.user = null;
				this.token = null;
				localStorage.removeItem("token");
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error = err.response?.data?.message ?? "Something went wrong";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		async forgotPassword(email: string) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.post("/auth/otp/request", { email });
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ?? "An unexpected error occured";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		async checkOTP(email: string, OTPCode: string) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.post("/auth/otp/verify", { email, otp: OTPCode });
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error = err.response?.data?.message ?? "Invalid credentials";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		resetError() {
			this.error = null;
		},
	},
});
