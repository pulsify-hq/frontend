<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import BaseButton from "../base/BaseButton.vue";
	import TheFooter from "./TheFooter.vue";

	import { useMonitorModal } from "@/features/monitors/composables/useMonitorModal.ts";
	import { useRouter, useRoute } from "vue-router";
	import MonitorForm from "@/features/monitors/components/MonitorForm.vue";
	import { ref } from "vue";

	const router = useRouter();
	const route = useRoute();
	const { isModalOpen, openCreate } = useMonitorModal();

	function handleNewMonitorClick() {
		if (route.name === "dashboard") {
			openCreate();
		} else {
			router.push({ name: "dashboard" });
			openCreate();
		}
	}
</script>

<template>
	<main
		class="grid grid-cols-[auto_1fr] max-md:grid-cols-1 min-h-screen max-md:pb-16 bg-background text-text-main"
	>
		<section
			class="bg-surface-high/60 border-r border-surface-highest p-1.5 md:p-4 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:h-fit max-md:z-50 backdrop-blur-md"
		>
			<RouterLink
				to="/"
				class="text-2xl font-bold text-primary hidden md:block mb-6"
			>
				Pulsify
			</RouterLink>

			<BaseButton
				class="hidden md:flex w-full mb-6 min-w-52 justify-center"
				@click="handleNewMonitorClick"
				>New Monitor</BaseButton
			>
			<MonitorForm v-model="isModalOpen" />

			<nav aria-label="Main Navigation">
				<ul
					class="flex flex-col max-md:flex-row max-md:justify-between gap-2 max-md:gap-0"
				>
					<li
						class="max-md:flex max-md:flex-1 max-md:items-center max-md:justify-center"
					>
						<RouterLink
							:to="{ name: 'dashboard' }"
							class="flex items-center max-md:justify-center max-md:flex-col gap-3 max-md:gap-1 p-3 rounded-lg group transition-colors [&:not(.active-tab)]:hover:text-text-muted"
							active-class="md:bg-surface-highest text-primary-dim/70 active-tab"
						>
							<span class="w-5 h-5 shrink-0 rounded" aria-hidden="true">
								<img src="/icon-dashboard.svg" alt="" />
							</span>
							<span class="text-xs md:text-sm">Dashboard</span>
						</RouterLink>
					</li>

					<li
						class="max-md:flex max-md:flex-1 max-md:items-center max-md:justify-center"
					>
						<RouterLink
							:to="{ name: 'settings' }"
							class="flex items-center max-md:justify-center max-md:flex-col gap-3 max-md:gap-1 p-3 rounded-lg group transition-colors [&:not(.active-tab)]:hover:text-text-muted"
							active-class="md:bg-surface-highest text-primary-dim/70 active-tab"
						>
							<span class="w-5 h-5 shrink-0 rounded" aria-hidden="true">
								<img src="/icon-settings.svg" alt="" />
							</span>
							<span class="text-xs md:text-sm">Settings</span>
						</RouterLink>
					</li>
				</ul>
			</nav>
		</section>

		<section class="flex flex-col min-w-0">
			<div class="flex-1 p-8">
				<RouterView v-slot="{ Component }">
					<Transition name="fade" mode="out-in">
						<component :is="Component" />
					</Transition>
				</RouterView>
			</div>

			<TheFooter
				class="mt-auto hidden md:flex p-8 border-t border-surface-highest md:justify-end text-center md:text-right"
			/>
		</section>
	</main>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.1s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
