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
			path: "/verify-otp",
			name: "verify-otp",
			component: () => import("@/features/auth/views/OTPView.vue"),
		},
		{
			path: "/reset-password",
			name: "reset-password",
			component: () => import("@/features/auth/views/ResetPasswordView.vue"),
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: () => import("@/features/landing/views/LandingView.vue"),
		},
	],
});

export default router;
