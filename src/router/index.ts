import { useAuthStore } from "@/features/auth/stores/authStore";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("@/features/landing/views/LandingView.vue"),
		},
		{
			path: "/auth",
			name: "auth",
			component: () => import("@/features/auth/views/AuthView.vue"),
		},
		{
			path: "/forgot-password",
			name: "forgot-password",
			component: () => import("@/features/auth/views/ForgotPasswordView.vue"),
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: () => import("@/features/dashboard/components/Dashboard.vue"),
			meta: { requiresAuth: true },
		},

		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: () => import("@/features/landing/views/LandingView.vue"),
		},
	],
});

router.beforeEach((to) => {
	const authStore = useAuthStore();

	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		return { name: "auth" };
	}
});
export default router;
