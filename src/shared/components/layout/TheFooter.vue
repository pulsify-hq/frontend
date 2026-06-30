<script setup lang="ts">
	import { RouterLink } from "vue-router";

	const date = new Date().getFullYear();
</script>

<template>
	<footer class="bg-surface border-t border-border-muted py-6 px-4 md:px-8">
		<div
			class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full"
		>
			<RouterLink to="/" class="text-2xl text-primary text-center md:text-left font-bold"
				>Pulsify</RouterLink
			>
			<nav aria-label="Footer navigation">
				<ul class="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center">
					<li>
						<a
							href="https://github.com/pulsify-hq"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Pulsify on GitHub, opens in a new tab"
							class="text-text-muted hover:text-text transition-colors duration-200"
							>GitHub</a
						>
					</li>
					<li>
						<a
							href="#"
							aria-label="Privacy Policy"
							class="text-text-muted hover:text-text transition-colors duration-200"
							>Privacy Policy</a
						>
					</li>
					<li>
						<a
							href="#"
							aria-label="Terms of Service"
							class="text-text-muted hover:text-text transition-colors duration-200"
							>Terms of Service</a
						>
					</li>
				</ul>
			</nav>
			<p class="text-text-muted/50 text-xs text-center md:text-right">
				&copy; {{ date }} Pulsify. All rights reserved.
			</p>
		</div>
	</footer>
</template>
