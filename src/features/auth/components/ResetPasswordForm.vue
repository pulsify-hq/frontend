<script setup lang="ts">
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import { resetPasswordSchema } from "../composables/schemas";
	import { useAuthStore } from "../stores/authStore";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner.vue';

	const props = defineProps<{ email: string }>();
	const emit = defineEmits<{ done: [] }>();

	const store = useAuthStore();

	const { handleSubmit, errors, defineField, meta } = useForm({
		validationSchema: toTypedSchema(resetPasswordSchema),
	});

	const [password] = defineField("password");
	const [confirmPassword] = defineField("confirmPassword");

	const onSubmit = handleSubmit(async (values) => {
		store.error = null;
		const success = await store.resetPassword(props.email, values.password);

		if (success) {
			emit("done");
		}
	});
</script>

<template>
	<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
		<BaseCard class="py-2!" variant="danger" v-if="store.error">{{ store.error }}</BaseCard>

		<BaseInput
			v-model="password"
			label="New Password"
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

		<BaseButton type="submit" :disabled="!meta.valid || store.isLoading">
			<LoadingSpinner v-if="store.isLoading" />
			<span v-else>Reset Password</span>
		</BaseButton>
	</form>
</template>
