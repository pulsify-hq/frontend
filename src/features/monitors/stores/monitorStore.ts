import { defineStore } from "pinia";
import api from "@/shared/utils/api";
import axios from "axios";

interface Monitor {
	id: string;
	name: string;
	url: string;
	createdAt: string;
	lastPingCheck: string;
	status: "UP" | "DOWN";
}

interface MonitorState {
	monitors: Monitor[];
	isLoading: boolean;
	error: string | null;
}

export const useMonitorStore = defineStore("monitor", {
	state: (): MonitorState => ({
		monitors: [],
		isLoading: false,
		error: null,
	}),

	getters: {
		hasMonitors: (state) => state.monitors.length > 0,
	},

	actions: {
		async fetchMonitors() {
			this.isLoading = true;
			this.error = null;

			try {
				const response = await api.get("/monitors");
				this.monitors = response.data.monitors;
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ??
						"An error occured while fetching your monitors";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		async createMonitor(name: string, url: string) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.post("/monitors", { name, url });
				await this.fetchMonitors();
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ??
						"An error occured while creating your monitor";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},
		async updateMonitor(id: string, fields: { name?: string; url?: string }) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.put(`/monitors/${id}`, fields);
				await this.fetchMonitors();
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ??
						"An error occured while updating your monitor";
				} else {
					this.error = "Something went wrong";
				}
				return false;
			} finally {
				this.isLoading = false;
			}
		},
		async deleteMonitor(id: string) {
			this.isLoading = true;
			this.error = null;

			try {
				await api.delete(`/monitors/${id}`);
				const index = this.monitors.findIndex((m) => m.id === id);
				if (index !== -1) {
					this.monitors.splice(index, 1);
				}
				return true;
			} catch (err) {
				if (axios.isAxiosError(err)) {
					this.error =
						err.response?.data?.message ??
						"An error occured while deleting your monitor";
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
