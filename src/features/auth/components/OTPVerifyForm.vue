<!-- OTPVerifyForm.vue -->
<script setup lang="ts">
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import { OTPOnlySchema } from "../composables/schemas";
	import { useAuthStore } from "../stores/authStore";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner.vue';

	const props = defineProps<{ email: string }>();
	const emit = defineEmits<{ verified: [] }>();

	const store = useAuthStore();

	const { handleSubmit, errors, defineField, meta } = useForm({
		validationSchema: toTypedSchema(OTPOnlySchema),
	});

	const [OTP] = defineField("OTP");

	const onSubmit = handleSubmit(async () => {
		store.error = null;
		const success = await store.checkOTP(props.email, OTP.value ?? "");

		if (success) {
			emit("verified");
		}
	});
</script>

<template>
	<form class="flex flex-col gap-8" @submit.prevent="onSubmit">
		<BaseCard variant="danger" v-if="store.error">{{ store.error }}</BaseCard>

		<BaseInput
			v-model="OTP"
			label="Enter OTP"
			type="text"
			placeholder="123456"
			:hint="`Enter the code sent to ${email}`"
			:error="errors.OTP"
			required
			autocomplete="one-time-code"
		/>

		<BaseButton type="submit" :disabled="!meta.valid || store.isLoading">
			<LoadingSpinner v-if="store.isLoading" />
			<span v-else>Verify</span>
		</BaseButton>
	</form>
</template>
