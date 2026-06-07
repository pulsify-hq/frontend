<script setup lang="ts">
	import BaseButton from "@/shared/components/base/BaseButton.vue";
	import { RouterLink } from "vue-router";
	import { onMounted, onUnmounted, useTemplateRef } from "vue";
	import gsap from "gsap";

	const heading = useTemplateRef("heading");
	const subheading = useTemplateRef("subheading");
	onMounted(() => {
		gsap.from(heading.value, {
			y: 40,
			opacity: 0,
			duration: 0.7,
			ease: "power3.out",
		});

		gsap.from(subheading.value, {
			opacity: 0,
			duration: 0.9,
			delay: 0.5,
			ease: "power2.out",
		});
	});

	onUnmounted(() => {
		gsap.killTweensOf(heading.value);
		gsap.killTweensOf(subheading.value);
	});
</script>

<template>
	<header
		aria-label="Site header"
		class="flex items-center justify-between border-b border-border-muted py-6 px-4 md:px-8"
	>
		<RouterLink to="/" class="text-2xl text-primary">Pulsify</RouterLink>
		<BaseButton>Get Started</BaseButton>
	</header>
	<main>
		<section
			aria-label="Hero section"
			class="flex flex-col items-center py-8 px-4 relative overflow-hidden"
		>
			<div
				class="absolute pointer-events-none -z-10 -top-52 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 blur-[100px] bg-[radial-gradient(circle,rgba(0,255,135,0.1)_0%,transparent_70%)] w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
			></div>
			<h1 class="text-center text-3xl md:text-6xl font-bold mb-2" ref="heading">
				Infrastructure that
				<span
					class="block bg-gradient-to-r from-primary to-white bg-clip-text text-transparent"
					>never sleeps</span
				>
			</h1>
			<p
				class="text-xs text-center text-text-muted max-w-2xs mb-8"
				ref="subheading"
			>
				Know the moment your services go down. Pulsify monitors your URLs around
				the clock and alerts you instantly when something breaks.
			</p>
			<BaseButton class="mb-20">Start Monitoring Now</BaseButton>
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
	</main>
</template>

<style scoped>
	.ekg-line {
		stroke-dasharray: 2400;
		stroke-dashoffset: 2400;
		animation: ekg 3s linear infinite;
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
