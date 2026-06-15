<script setup lang="ts">
	import { ref, computed, watch } from "vue";
	import { useAuthStore } from "../stores/authStore";
	import { useRouter } from "vue-router";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue";

	const store = useAuthStore();
	const router = useRouter();

	const email = ref<string>("");
	const OTPCode = ref<string>("");
	const step = ref<number>(1);

	const emailError = ref<null | string>("");
	const OTPError = ref<null | string>("");

	const newPassword = ref("");
	const confirmedPassword = ref("");

	const newPasswordError = ref<null | string>("");
	const confirmedPasswordError = ref("");

	const showReset = ref<boolean>(false);
	const showDelete = ref<boolean>(false);

	const disableSubmit = computed(() => {
		// Reset password
		if (showReset.value) {
			return (
				!newPassword.value ||
				newPassword.value.length < 8 ||
				newPassword.value !== confirmedPassword.value
			);
		}

		// handle email
		if (step.value === 1) return !email.value;

		// handle otp
		return !OTPCode.value;
	});

	interface Props {
		mode?: "default" | "reset" | "delete";
	}

	const props = withDefaults(defineProps<Props>(), {
		mode: "default",
	});

	async function handleSubmit() {
		store.error = null;

		// STEP 1: Handle email submission
		if (step.value === 1) {
			// Navigating to step 2: Input OTP
			const success = await store.forgotPassword(email.value);

			if (success) {
				step.value++;
			} else {
				emailError.value = store.error;
			}

			return;
		}

		// Handle reset password
		if (showReset.value) {
			const success = await store.resetPassword(email.value, newPassword.value);

			if (success) {
				router.push({ name: "home" });
			} else {
				console.error("We ran into an unexpected error");
			}
			return;
		}

		// Handle deleter user
		if (showDelete.value) {
			const success = await store.deleteUser(email.value);

			if (success) {
				router.push({ name: "home" });
			} else {
				console.error("We ran into an unexpected error");
			}
		}

		// Step 2: Handle OTP submission

		const OTPSuccess = await store.checkOTP(email.value, OTPCode.value);

		if (OTPSuccess) {
			// Step 2. Depending on the mode, we either authenticate or we continue to another form; either reset password or delete
			switch (props.mode) {
				case "reset":
					showReset.value = true;
					break;
				case "delete":
					showDelete.value = true;
					break;
				case "default":
					router.push({ name: "home" });
					break;
			}
		} else {
			OTPError.value = store.error;
		}
	}

	watch(newPassword, (newVal) => {
		if (newVal.length === 0) {
			newPasswordError.value = "";
		} else if (newVal.length < 8) {
			newPasswordError.value = "Password must be at least 8 characters";
		} else {
			newPasswordError.value = "";
		}

		if (newVal === confirmedPassword.value) {
			confirmedPasswordError.value = "";
		}
	});

	watch(confirmedPassword, (newVal) => {
		if (newVal !== newPassword.value) {
			confirmedPasswordError.value = "Passwords must match";
		} else {
			confirmedPasswordError.value = "";
		}
	});
</script>

<template>
	<h2 class="text-primary text-xl mb-4">
		{{
			mode === "default"
				? "Forgot Password"
				: mode === "reset"
					? "Reset Password"
					: "Delete Account"
		}}
	</h2>

	<!-- Initial form to send OTP -->

	<form
		action=""
		class="flex flex-col gap-8"
		@submit.prevent="handleSubmit"
		v-if="!showReset && !showDelete"
	>
		<div class="flex flex-col gap-6" v-if="step === 1">
			<BaseInput
				v-model="email"
				label="Email Address"
				type="email"
				placeholder="you@example.com"
				hint="We'll never share your email"
				:error="emailError"
				required
				autocomplete="email"
			/>
		</div>

		<div class="flex flex-col gap-6" v-else>
			<BaseInput
				v-model="OTPCode"
				label="Enter OTP"
				type="text"
				placeholder="123456"
				hint="We sent an OTP to your email address"
				:error="OTPError"
				required
				autocomplete="one-time-code"
			/>
		</div>

		<BaseButton type="submit" :disabled="disableSubmit">{{
			step === 1 ? "Next" : "Submit"
		}}</BaseButton>
	</form>

	<!-- Form for password reset flow -->

	<form
		action=""
		class="flex flex-col gap-8"
		@submit.prevent="handleSubmit"
		v-if="showReset"
	>
		<BaseInput
			v-model="newPassword"
			label="Password"
			type="password"
			hint="Password must be 8+ characters"
			:error="newPasswordError"
			required
			:autocomplete="'new-password'"
		/>

		<BaseInput
			v-model="confirmedPassword"
			label="Confirm Password"
			type="password"
			hint="Passwords must match"
			:error="confirmedPasswordError"
			required
			autocomplete="new-password"
		/>

		<BaseButton type="submit" :disabled="disableSubmit"
			>Reset Password</BaseButton
		>
	</form>

	<!-- Form to delete account -->

	<form
		action=""
		class="flex flex-col gap-8"
		@submit.prevent="handleSubmit"
		v-if="showDelete"
	>
		<p class="-mt-4 text-text-muted text-xs">
			Deleting an account is irreversible and you will not be able to retrieve
			your account once deleted
		</p>
		<BaseButton variant="destructive">Delete account</BaseButton>
	</form>
</template>
