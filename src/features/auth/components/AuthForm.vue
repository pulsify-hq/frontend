<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import { ref, watch, computed } from "vue";
	import { useAuthStore } from "../stores/authStore";
	import { useRouter } from "vue-router";

	const store = useAuthStore();
	const router = useRouter();

	const email = ref("");
	const password = ref("");
	const confirmedPassword = ref("");

	const failCount = ref<number>(0);

	interface Props {
		mode?: "login" | "signup";
	}

	const props = withDefaults(defineProps<Props>(), {
		mode: "signup",
	});

	const passwordError = ref<null | string>("");
	const confirmedPasswordError = ref("");

	const disableSubmit = computed(() => {
		if (props.mode === "login") return !email.value || !password.value;
		return (
			!email.value ||
			password.value.length < 8 ||
			password.value !== confirmedPassword.value
		);
	});

	async function handleSubmit() {
		store.error = null;

		if (props.mode === "login") {
			const success = await store.login(email.value, password.value);

			if (success) {
				router.push({ name: "home" });
			} else {
				failCount.value++;
				passwordError.value = store.error;
			}
		}

		if (props.mode === "signup") {
			const success = await store.signup(email.value, password.value);

			if (success) {
				router.push({ name: "home" });
			} else {
				passwordError.value = store.error;
			}
		}
	}

	watch(password, (newVal) => {
		if (newVal.length === 0) {
			passwordError.value = "";
		} else if (newVal.length < 8) {
			passwordError.value = "Password must be at least 8 characters";
		} else {
			passwordError.value = "";
		}

		if (newVal === confirmedPassword.value) {
			confirmedPasswordError.value = "";
		}
	});

	watch(confirmedPassword, (newVal) => {
		if (newVal !== password.value) {
			confirmedPasswordError.value = "Passwords must match";
		} else {
			confirmedPasswordError.value = "";
		}
	});

	watch(
		() => props.mode,
		() => {
			email.value = "";
			password.value = "";
			confirmedPassword.value = "";
		},
	);
</script>

<template>
	<h2 class="text-primary text-xl mb-4">
		{{ mode === "login" ? "Sign in to" : "Sign up for" }} Pulsify
	</h2>

	<form action="" class="flex flex-col gap-8" @submit.prevent="handleSubmit">
		<div class="flex flex-col gap-6">
			<BaseInput
				v-model="email"
				label="Email Address"
				type="email"
				placeholder="you@example.com"
				hint="We'll never share your email"
				required
				autocomplete="email"
			/>

			<BaseInput
				v-model="password"
				label="Password"
				type="password"
				hint="Password must be 8+ characters"
				:error="passwordError"
				required
				:autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
			/>

			<BaseInput
				v-if="mode === 'signup'"
				v-model="confirmedPassword"
				label="Confirm Password"
				type="password"
				hint="Passwords must match"
				:error="confirmedPasswordError"
				required
				autocomplete="new-password"
			/>
		</div>
		<RouterLink
			v-show="mode === 'login' && failCount > 1"
			:to="{ name: 'forgot-password' }"
			class="text-primary underline text-xs -mt-4"
		>
			Forgot Password?
		</RouterLink>
		<BaseButton type="submit" :disabled="disableSubmit">Submit</BaseButton>
	</form>
</template>
