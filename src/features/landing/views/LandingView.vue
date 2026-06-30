<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import { RouterLink } from "vue-router";
	import { onMounted, onUnmounted, useTemplateRef } from "vue";
	import gsap from "gsap";
	import BaseCard from "@/shared/components/base/BaseCard.vue";
	import TheFooter from "@/shared/components/layout/TheFooter.vue";

	const heading = useTemplateRef("heading");
	const subheading = useTemplateRef("subheading");
	onMounted(() => {
		gsap.fromTo(
			heading.value,
			{ y: 40, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
		);

		gsap.fromTo(
			subheading.value,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.9, delay: 0.3, ease: "power2.out" },
		);
	});

	onUnmounted(() => {
		gsap.killTweensOf(heading.value);
		gsap.killTweensOf(subheading.value);
	});
</script>

<template>
	<header
		aria-label="Site header"
		class="flex items-center justify-between border-b border-border-muted py-2 md:py-6 px-4 md:px-8"
	>
		<RouterLink to="/" class="text-2xl text-primary font-bold"> Pulsify </RouterLink>

		<RouterLink :to="{ name: 'auth' }"
			><BaseButton>Get Started</BaseButton>
		</RouterLink>
	</header>
	<main>
		<section
			aria-label="Hero section"
			class="flex flex-col min-h-125 justify-center items-center py-12 px-4 relative overflow-hidden bg-surface"
		>
			<div
				class="absolute pointer-events-none -z-10 -top-52 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 blur-[100px] bg-[radial-gradient(circle,rgba(0,255,135,0.15)_0%,transparent_70%)] w-75 h-75 md:w-125 md:h-125"
			></div>
			<h1
				class="opacity-0 text-center text-4xl md:text-6xl font-bold mb-2 select-none"
				ref="heading"
			>
				Infrastructure that
				<span
					class="block bg-linear-to-r from-primary to-white bg-clip-text text-transparent"
					>never sleeps</span
				>
			</h1>
			<p
				class="opacity-0 text-xs md:text-base text-center text-text-muted max-w-2xs md:max-w-md mb-8"
				ref="subheading"
			>
				Know the moment your services go down. Pulsify monitors your URLs around
				the clock and alerts you instantly when something breaks.
			</p>
			<RouterLink :to="{name: 'auth'}">
				<BaseButton class="">Start Monitoring Now</BaseButton>
			</RouterLink>
			<div class="absolute bottom-0 left-0 w-full overflow-hidden opacity-30">
				<svg
					viewBox="0 0 1200 100"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
					class="w-full h-24"
				>
					<polyline
						class="ekg-line"
						points="0,50 200,50 260,50 280,20 300,80 320,50 400,50 460,50 480,10 500,90 520,50 600,50 660,50 680,20 700,80 720,50 800,50 860,50 880,10 900,90 920,50 1000,50 1060,50 1080,20 1100,80 1120,50 1200,50"
						fill="none"
						stroke="#00ff87"
						stroke-width="2"
					/>
				</svg>
			</div>
		</section>

		<section aria-label="Features section" class="px-8 py-8">
			<h2 class="mb-4 text-primary text-xl font-bold">Capabilities</h2>
			<div
				class="grid md:grid-cols-3 gap-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2"
			>
				<BaseCard class="md:col-span-2">
					<div
						class="w-12 h-12 rounded-lg bg-primary-dim/10 flex items-center justify-center mb-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							class="w-6 h-6"
						>
							<circle
								cx="12"
								cy="12"
								r="3"
								stroke="#00e478"
								stroke-width="1.5"
							/>
							<circle
								cx="12"
								cy="12"
								r="6"
								stroke="#00e478"
								stroke-width="1.5"
								opacity="0.5"
							/>
							<circle
								cx="12"
								cy="12"
								r="9"
								stroke="#00e478"
								stroke-width="1.5"
								opacity="0.2"
							/>
						</svg>
					</div>
					<h3>Real-time Monitoring</h3>
					<p>
						Know instantly when an endpoint goes down. Pulsify checks your URLs
						at your chosen interval and records every result.
					</p>

					<div class="mt-6 h-24 w-full hidden md:flex items-end gap-1.5 px-1">
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 40%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 65%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 50%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 80%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 45%"
						></div>
						<div
							class="flex-1 bg-primary/60 rounded-t-sm"
							style="height: 90%"
						></div>
						<div
							class="flex-1 bg-error/60 rounded-t-sm"
							style="height: 15%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 70%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 55%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 75%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 60%"
						></div>
						<div
							class="flex-1 bg-primary/20 rounded-t-sm"
							style="height: 85%"
						></div>
					</div>
				</BaseCard>

				<BaseCard>
					<div
						class="w-12 h-12 rounded-lg bg-primary-dim/10 flex items-center justify-center mb-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							class="w-6 h-6"
						>
							<path
								d="M6 10C6 6.686 8.686 4 12 4s6 2.686 6 6v4l2 2H4l2-2v-4z"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M10 20h4"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M12 4V2"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<h3>Instant Alerts</h3>
					<p>
						Get notified the moment something breaks. Email alerts fire
						automatically so you're never the last to know.
					</p>
				</BaseCard>

				<BaseCard>
					<div
						class="w-12 h-12 rounded-lg bg-primary-dim/10 flex items-center justify-center mb-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							class="w-6 h-6"
						>
							<path
								d="M5 12a7 7 0 1 1 14 0"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M12 12l-3-4"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<circle cx="12" cy="12" r="1.5" fill="#00e478" />
							<path
								d="M8 17h8"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
								opacity="0.4"
							/>
						</svg>
					</div>
					<h3>Response Time Tracking</h3>
					<p>
						See how fast your services respond over time. Spot slowdowns before
						they become outages.
					</p>
				</BaseCard>

				<BaseCard>
					<div
						class="w-12 h-12 rounded-lg bg-primary-dim/10 flex items-center justify-center mb-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							class="w-6 h-6"
						>
							<rect
								x="3"
								y="3"
								width="18"
								height="18"
								rx="2"
								stroke="#00e478"
								stroke-width="1.5"
							/>
							<path
								d="M7 8h10M7 12h7"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<circle
								cx="15"
								cy="15"
								r="2"
								stroke="#00e478"
								stroke-width="1.5"
							/>
							<path
								d="M17 17l2 2"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<h3>Detailed Logs</h3>
					<p>
						Every ping is recorded. Search, filter, and review your full
						monitoring history with timestamps and error details.
					</p>
				</BaseCard>

				<BaseCard>
					<div
						class="w-12 h-12 rounded-lg bg-primary-dim/10 flex items-center justify-center mb-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							class="w-6 h-6"
						>
							<rect
								x="3"
								y="4"
								width="18"
								height="17"
								rx="2"
								stroke="#00e478"
								stroke-width="1.5"
							/>
							<path
								d="M3 9h18"
								stroke="#00e478"
								stroke-width="1.5"
								opacity="0.4"
							/>
							<path
								d="M8 4V2M16 4V2"
								stroke="#00e478"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M7 14h2v3H7zM11 12h2v5h-2zM15 13h2v4h-2z"
								fill="#00e478"
								opacity="0.7"
							/>
						</svg>
					</div>
					<h3>Weekly Reports</h3>
					<p>
						Get a weekly summary of uptime percentage, incidents, and downtime
						duration delivered straight to your inbox.
					</p>
				</BaseCard>
			</div>
		</section>
	</main>
	<TheFooter />
</template>

<style scoped>
	.ekg-line {
		stroke-dasharray: 2400;
		stroke-dashoffset: 2400;
		animation: ekg 4s linear infinite;
	}

	@keyframes ekg {
		0% {
			stroke-dashoffset: 2400;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}
</style>
