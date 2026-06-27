import { type Ref, ref, computed } from "vue";

export function useSearch<T>(
	items: Ref<T[]>,
	getSearchableText: (item: T) => string,
) {
	const searchQuery = ref("");

	const results = computed(() => {
		const sourceArray = items.value;

		const query = searchQuery.value.trim().toLowerCase();

		if (!query) {
			return sourceArray;
		}

        return sourceArray.filter((item) => {
            const itemText = getSearchableText(item).toLowerCase()

            return itemText.includes(query)
        })
	});

	return {
		searchQuery,
		results,
	};
}
