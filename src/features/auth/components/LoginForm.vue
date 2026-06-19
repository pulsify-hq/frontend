<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import { ref, onUnmounted } from "vue";
	import { useAuthStore } from "../stores/authStore";
	import { useRouter } from "vue-router";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import { loginSchema } from "../composables/schemas";

	const store = useAuthStore();
	const router = useRouter();
	const failCount = ref(0);

	const { handleSubmit, errors, defineField, meta } = useForm({
		validationSchema: toTypedSchema(loginSchema),
	});

	const [email] = defineField("email");
	const [password] = defineField("password");

	const onSubmit = handleSubmit(async (values) => {
		store.error = null;
		const success = await store.login(values.email, values.password);

		if (success) {
			router.push({ name: "home" });
		} else {
			failCount.value++;
		}
	});

	onUnmounted(() => {
		store.resetError();
	});
</script>

<template>
	<div>
		<h2 class="text-primary text-xl mb-4">Sign in to Pulsify</h2>

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
					autocomplete="current-password"
				/>
			</div>

			<RouterLink
				v-show="failCount > 1"
				:to="{ name: 'forgot-password' }"
				class="text-primary underline text-xs -mt-4"
			>
				Forgot Password?
			</RouterLink>

			<BaseButton type="submit" :disabled="!meta.valid">Submit</BaseButton>
		</form>
	</div>
</template>
