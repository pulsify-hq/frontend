import { mockOTP, mockUsers } from "@/shared/utils/mockData";

import { defineStore } from "pinia";

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
			const user = mockUsers.find(
				(u) => u.email === email && u.password === password,
			);

			if (user) {
				this.isLoading = false;
				this.user = email;
				this.token = "mock_token_123"; // In a real app, this would come from the server
				return true;
			} else {
				this.isLoading = false;
				this.error = "Invalid email or password";
				return false;
			}
		},

		async logout() {
			this.user = null;
			this.token = null;
		},

		async signup(email: string, password: string) {
			this.isLoading = true;

			if (mockUsers.find((u) => u.email === email)) {
				this.error = "Email already in use";
				this.isLoading = false;
				return false;
			} else {
				mockUsers.push({ email, password });
				this.user = email;
				this.token = "mock_token_123";
				this.isLoading = false;
				return true;
			}
		},

		async resetPassword(email: string, newPassword: string) {
			const userIndex = mockUsers.findIndex(
				(u) => u.email.toLowerCase() === email.toLowerCase(),
			);

			if (userIndex === -1) return false;

			mockUsers[userIndex]!.password = newPassword;
			return true;
		},

		async deleteUser(email: string) {
			const userIndex = mockUsers.findIndex(
				(u) => u.email.toLowerCase() === email.toLowerCase(),
			);

			if (userIndex === -1) return false;

			mockUsers.splice(userIndex, 1);
			return true;
		},

		async forgotPassword(email: string) {
			this.isLoading = true;

			if (mockUsers.find((u) => u.email === email)) {
				this.isLoading = false;
				return true;
			} else {
				this.error = "No account found with this email";
				this.isLoading = false;
				return false;
			}
		},

		async checkOTP(email: string, OTPCode: string) {
			this.isLoading = true;

			const user = mockOTP.find((u) => u.email === email && u.OTP === OTPCode);

			if (user) {
				this.isLoading = false;
				return true;
			} else {
				this.error = "Invalid OTP";
				this.isLoading = false;
				return false;
			}
		},

		resetError() {
			this.error = null;
		},
	},
});
