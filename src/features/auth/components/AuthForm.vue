<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import { ref, watch, computed, onUnmounted } from "vue";
	import { useAuthStore } from "../stores/authStore";
	import { useRouter } from "vue-router";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import { loginSchema, signupSchema } from "../composables/schemas";
import BaseCard from "@/shared/components/base/BaseCard.vue";

	const store = useAuthStore();
	const router = useRouter();

	const failCount = ref<number>(0);

	interface Props {
		mode?: "login" | "signup";
	}

	const props = withDefaults(defineProps<Props>(), {
		mode: "signup",
	});

	const currentSchema = computed(() =>
		toTypedSchema(props.mode === "login" ? loginSchema : signupSchema),
	);

	interface AuthFormValues {
		email?: string;
		password?: string;
		confirmPassword?: string;
	}

	const { handleSubmit, errors, resetForm, defineField, meta } =
		useForm<AuthFormValues>({
			validationSchema: currentSchema,
		});

	const [email] = defineField("email");
	const [password] = defineField("password");
	const [confirmPassword] = defineField("confirmPassword");

	const onSubmit = handleSubmit(async (values) => {
		if (!values.email || !values.password) return;
		store.error = null;

		if (props.mode === "login") {
			const success = await store.login(values.email, values.password);
			if (success) {
				router.push({ name: "home" });
			} else {
				failCount.value++;
			}
		}

		if (props.mode === "signup") {
			const success = await store.signup(values.email, values.password);
			if (success) {
				router.push({ name: "home" });
			}
		}
	});

	watch(
		() => props.mode,
		() => {
			resetForm();
			store.resetError();
		},
	);

	onUnmounted(() => {
		store.resetError();
	});
</script>

<template>
	<h2 class="text-primary text-xl mb-4">
		{{ mode === "login" ? "Sign in to" : "Sign up for" }} Pulsify
	</h2>

	<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
		<BaseCard variant="danger" v-if="store.error">{{ store.error }}</BaseCard>
		<div class="flex flex-col gap-6">
			<BaseInput
				v-model="email"
				label="Email Address"
				type="email"
				placeholder="you@example.com"
				hint="We'll never share your email"
				:error="errors.email"
				required
				autocomplete="email"
			/>

			<BaseInput
				v-model="password"
				label="Password"
				type="password"
				hint="Password must be 8+ characters"
				:error="errors.password"
				required
				:autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
			/>

			<BaseInput
				v-if="mode === 'signup'"
				v-model="confirmPassword"
				label="Confirm Password"
				type="password"
				hint="Passwords must match"
				:error="errors.confirmPassword"
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
		<BaseButton type="submit">Submit</BaseButton>
	</form>
</template>
