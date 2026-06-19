<!-- EmailRequestForm.vue -->
<script setup lang="ts">
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import { z } from "zod";
	import { useAuthStore } from "../stores/authStore";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";

	const store = useAuthStore();

	const emailSchema = z.object({
		email: z.string().email("Invalid email address"),
	});

	const { handleSubmit, errors, defineField, meta } = useForm({
		validationSchema: toTypedSchema(emailSchema),
	});

	const [email] = defineField("email");

	const emit = defineEmits<{
		verified: [email: string];
	}>();

	const onSubmit = handleSubmit(async (values) => {
		store.error = null;
		const success = await store.forgotPassword(values.email);

		if (success) {
			emit("verified", values.email);
		}
	});
</script>

<template>
	<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
		<BaseCard variant="danger" v-if="store.error">{{ store.error }}</BaseCard>

		<BaseInput
			v-model="email"
			label="Email Address"
			type="email"
			placeholder="you@example.com"
			hint="We'll check if this email has an account"
			:error="errors.email"
			required
			autocomplete="email"
		/>

		<BaseButton type="submit" :disabled="!meta.valid">Next</BaseButton>
	</form>
</template>
