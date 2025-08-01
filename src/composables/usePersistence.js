import { ref, watch } from "vue";

const STORAGE_KEY = "hanoi-toastmasters-agenda-state";

export function usePersistence(state, getInitialState) {
	const loadState = () => {
		const savedState = localStorage.getItem(STORAGE_KEY);
		if (savedState) {
			try {
				state.value = JSON.parse(savedState);
			} catch (e) {
				console.error("Failed to parse state from localStorage", e);
				state.value = getInitialState();
			}
		} else {
			state.value = getInitialState();
		}
	};

	const saveState = () => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value));
		} catch (e) {
			console.error("Failed to save state to localStorage", e);
		}
	};

	const resetState = () => {
		localStorage.removeItem(STORAGE_KEY);
		state.value = getInitialState();
	};

	watch(state, saveState, { deep: true });

	return {
		loadState,
		resetState,
	};
}
