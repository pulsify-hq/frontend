import { defineStore } from "pinia";
import api from "@/shared/utils/api";
import axios from "axios";

export interface SettingsState {
	emailAlerts: boolean;
	isLoading: boolean;
	error: string | null;
}

export const useSettingsStore = defineStore("settings", {
	state: (): SettingsState => ({
		emailAlerts: true,
		isLoading: false,
		error: null,
	}),

	actions: {
		async fetchSettings() {
			this.isLoading = true;
			this.error = null;

			try {
				const response = await api.get("/settings");
				this.emailAlerts = response.data.settings.emailAlerts ?? true;
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ??
						"An error occured while loading your settings";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

        async updateSettings(emailAlerts: boolean) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.put(`/settings`, {emailAlerts});
				await this.fetchSettings();
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ??
						"An error occured while updating your settings";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},
	},
});
