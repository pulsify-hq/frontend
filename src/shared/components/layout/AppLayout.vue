<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import BaseButton from "../base/BaseButton.vue";
	import TheFooter from "./TheFooter.vue";
</script>

<template>
	<main
		class="grid grid-cols-[auto_1fr] max-md:grid-cols-1 min-h-screen max-md:pb-16 bg-background text-text-main"
	>
		<section
			class="bg-surface-high/60 border-r border-surface-highest p-4 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:h-fit max-md:z-50 backdrop-blur-md"
		>
			<RouterLink
				to="/"
				class="text-2xl font-bold text-primary hidden md:block mb-6"
			>
				Pulsify
			</RouterLink>

			<BaseButton class="hidden md:flex w-full mb-6">New Monitor</BaseButton>

			<nav aria-label="Main Navigation">
				<ul
					class="flex flex-col max-md:flex-row max-md:justify-around gap-2 max-md:gap-0"
				>
					<li class="max-md:flex-1">
						<a
							href="/dashboard"
							class="flex items-center max-md:flex-col gap-3 max-md:gap-1 p-3 rounded-lg hover:bg-surface-hover group transition-colors"
						>
							<span
								class="w-5 h-5 flex-shrink-0 bg-current/20 rounded"
								aria-hidden="true"
							>
							</span>
							<span class="text-sm font-medium">Dashboard</span>
						</a>
					</li>

					<li class="max-md:flex-1">
						<a
							href="/monitors"
							class="flex items-center max-md:flex-col gap-3 max-md:gap-1 p-3 rounded-lg hover:bg-surface-hover group transition-colors"
						>
							<span
								class="w-5 h-5 flex-shrink-0 bg-current/20 rounded"
								aria-hidden="true"
							></span>
							<span class="text-sm font-medium">Monitors</span>
						</a>
					</li>

					<li class="max-md:flex-1">
						<a
							href="/settings"
							class="flex items-center max-md:flex-col gap-3 max-md:gap-1 p-3 rounded-lg hover:bg-surface-hover group transition-colors"
						>
							<span
								class="w-5 h-5 flex-shrink-0 bg-current/20 rounded"
								aria-hidden="true"
							></span>
							<span class="text-sm font-medium">Settings</span>
						</a>
					</li>
				</ul>
			</nav>
		</section>

		<section class="flex flex-col min-w-0">
			<div class="flex-1 p-8">
				<p class="space-y-4 text-text-secondary leading-relaxed">
					<span class="block"
						>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
						enim autem quod fugit quaerat minima illo voluptatibus veritatis?
						Illum optio unde eum nisi sapiente doloremque minima natus tenetur?
						Dicta, quis?</span
					>
					<span class="block"
						>Nihil dolores dolorem facere, quia provident unde voluptate
						blanditiis ipsa culpa id saepe asperiores nisi commodi cum ratione
						modi aspernatur aliquam voluptatibus, molestias quas dignissimos
						itaque nesciunt, quasi quae. Vel.</span
					>
					<span class="block"
						>Optio nesciunt sed qui mollitia omnis aspernatur harum, minima
						pariatur quam quos dolores odit eaque quidem, laborum, placeat cum
						molestias temporibus vitae hic consequuntur dolore nobis maxime
						possimus porro. Maiores.</span
					>
					<span class="block"
						>Deserunt, rem blanditiis, consequuntur at id laudantium labore
						tenetur debitis culpa corrupti nobis provident sed mollitia
						doloremque tempore dolorem ducimus minima fugit, eius voluptatibus
						ad perferendis. Deserunt nihil perferendis repellendus?</span
					>
				</p>
			</div>

			<TheFooter
				class="mt-auto hidden md:flex p-8 border-t border-surface-highest md:justify-end text-center md:text-right"
			/>
		</section>
	</main>
</template>
