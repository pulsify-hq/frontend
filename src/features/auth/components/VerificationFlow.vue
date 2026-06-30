<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import EmailRequestForm from "./EmailRequestForm.vue";
	import OTPVerifyForm from "./OTPVerifyForm.vue";
	import ResetPasswordForm from "./ResetPasswordForm.vue";

	interface Props {
		mode?: "default" | "reset";
	}

	const props = withDefaults(defineProps<Props>(), {
		mode: "default",
	});

	const router = useRouter();

	const step = ref<1 | 2 | 3>(1);
	const verifiedEmail = ref("");

	function handleEmailVerified(email: string) {
		verifiedEmail.value = email;
		step.value = 2;
	}

	function handleOTPVerified() {
		if (props.mode === "default") {
			router.push({ name: "dashboard" });
			return;
		}
		step.value = 3;
	}

	function handleDone() {
		router.push({ name: "dashboard" });
	}
</script>

<template>
	<h2 class="text-primary text-xl mb-4">
		{{ step < 3 ? "Forgot Password" : "Reset Password" }}
	</h2>

	<Transition name="fade" mode="out-in">
		<EmailRequestForm v-if="step === 1" @verified="handleEmailVerified" />

		<OTPVerifyForm
			v-else-if="step === 2"
			:email="verifiedEmail"
			@verified="handleOTPVerified"
		/>

		<ResetPasswordForm
			v-else-if="step === 3 && mode === 'reset'"
			:email="verifiedEmail"
			@done="handleDone"
		/>
	</Transition>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.25s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
