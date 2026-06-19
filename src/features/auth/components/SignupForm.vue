<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import { onUnmounted } from "vue";
	import { useAuthStore } from "../stores/authStore";
	import { useRouter } from "vue-router";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import { signupSchema } from "../composables/schemas";

	const store = useAuthStore();
	const router = useRouter();

	const { handleSubmit, errors, defineField, meta } = useForm({
		validationSchema: toTypedSchema(signupSchema),
	});

	const [email] = defineField("email");
	const [password] = defineField("password");
	const [confirmPassword] = defineField("confirmPassword");

	const onSubmit = handleSubmit(async (values) => {
		store.error = null;
		const success = await store.signup(values.email, values.password);

		if (success) {
			router.push({ name: "home" });
		}
	});

	onUnmounted(() => {
		store.resetError();
	});
</script>

<template>
	<div>
		<h2 class="text-primary text-xl mb-4">Sign up for Pulsify</h2>

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
					autocomplete="new-password"
				/>

				<BaseInput
					v-model="confirmPassword"
					label="Confirm Password"
					type="password"
					hint="Passwords must match"
					:error="errors.confirmPassword"
					required
					autocomplete="new-password"
				/>
			</div>

			<BaseButton type="submit" :disabled="!meta.valid">Submit</BaseButton>
		</form>
	</div>
</template>
