import { ref } from "vue";

const isModalOpen = ref(false);
const editingId = ref<string | null>(null);

export function useMonitorModal() {
	function openCreate() {
		editingId.value = null;
		isModalOpen.value = true;
	}

	function openEdit(id: string) {
		editingId.value = id;
		isModalOpen.value = true;
	}

	function close() {
		isModalOpen.value = false;
	}

	return {
		isModalOpen,
		editingId,
		openCreate,
		openEdit,
		close,
	};
}
