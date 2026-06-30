<script setup lang="ts">
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import BaseInput from "@/shared/components/base/BaseInput.vue";
	import BaseToggle from "@/shared/components/base/BaseToggle.vue";

	import { useAuthStore } from "@/features/auth/stores/authStore";
	import { useSettingsStore } from "../store/settingsStore";
	import { useRouter } from "vue-router";
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import DeleteAccountForm from "@/features/auth/components/DeleteAccountForm.vue";
	import { onMounted } from "vue";

	const authStore = useAuthStore();
	const settingsStore = useSettingsStore();
	const router = useRouter();

	const handleToggle = async (value: boolean) => {
		await settingsStore.updateSettings(value);
	};

	const handleAccountDeleted = () => {
		router.push({ name: "home" });
	};

	onMounted(() => {
		settingsStore.fetchSettings();
	});
</script>

<template>
	<section class="flex flex-col w-full gap-4 min-h-full">
		<h1 class="text-xl font-semibold text-primary">Settings</h1>
		<section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			<BaseCard variant="outlined" class="h-full">
				<h2 class="text-primary text-xl">Profile</h2>
				<p class="text-text-muted text-xs">Update your personal information</p>

				<hr class="text-border my-4 -mx-6" />

				<form class="flex flex-col">
					<BaseInput
						:model-value="authStore.user ?? ''"
						:type="'email'"
						:label="'Email Address'"
						:disabled="true"
						class="cursor-not-allowed mb-4"
					></BaseInput>
					<BaseButton
						@click="
							router.push({ name: 'forgot-password', query: { mode: 'reset' } })
						"
						>Reset Password</BaseButton
					>
				</form>
			</BaseCard>

			<BaseCard variant="outlined" class="h-full">
				<h2 class="text-primary text-xl">Notifications</h2>
				<p class="text-text-muted text-xs">
					Configure how you receive system alerts.
				</p>

				<hr class="text-border my-4 -mx-6" />
				<div class="flex items-center justify-between gap-4">
					<div>
						<h3 class="text-text text-base">Email Alerts</h3>
						<p class="text-text-muted text-xs">
							Receive notifications when a monitor goes down
						</p>
					</div>
					<div>
						<BaseToggle
							:model-value="settingsStore.emailAlerts"
							@update:model-value="handleToggle"
						/>
					</div>
				</div>
			</BaseCard>

			<BaseCard variant="danger" class="h-full">
				<h2 class="text-error text-xl">Danger Zone</h2>
				<p class="text-error/40 text-xs">
					Irreversible actions related to your account.
				</p>
				<hr class="text-error/20 my-4 -mx-6" />
				<DeleteAccountForm
					@done="handleAccountDeleted"
					:email="`${authStore.user as string}`"
				></DeleteAccountForm>
			</BaseCard>
		</section>
	</section>
</template>
