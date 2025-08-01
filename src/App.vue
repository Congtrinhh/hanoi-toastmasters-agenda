<template>
	<ActionToolbar
		:activeField="activeField"
		:isSelectionBold="isSelectionBold"
		:is-in-heading="isActiveFieldInHeading"
		@toggle-bold="toggleBold"
		@print="handlePrint"
		@reset="handleReset"
	/>
	<main>
		<AgendaSheet ref="agendaSheet" @active-field-change="updateActiveField" />
	</main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ActionToolbar from "./components/ActionToolbar.vue";
import AgendaSheet from "./components/AgendaSheet.vue";

const agendaSheet = ref(null);
const activeField = ref(null);
const isSelectionBold = ref(false);
const isActiveFieldInHeading = ref(false);

function updateActiveField(data) {
	if (data) {
		activeField.value = data.field;
		isActiveFieldInHeading.value = data.isHeading;
	} else {
		activeField.value = null;
		isActiveFieldInHeading.value = false;
	}
	// When focus changes, update the bold status
	updateBoldState();
}

function toggleBold() {
	if (activeField.value) {
		document.execCommand("bold", false, null);
		// We need to manually trigger an input event on the active element
		// so that the v-model in the contenteditable component updates.
		if (document.activeElement) {
			document.activeElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
		}
	}
}

function handlePrint() {
	window.print();
}

function handleReset() {
	if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ nội dung?")) {
		agendaSheet.value?.handleReset();
	}
}

function updateBoldState() {
	if (activeField.value) {
		isSelectionBold.value = document.queryCommandState("bold");
	} else {
		isSelectionBold.value = false;
	}
}

onMounted(() => {
	document.addEventListener("selectionchange", updateBoldState);
});

onUnmounted(() => {
	document.removeEventListener("selectionchange", updateBoldState);
});
</script>

<style>
/* Global styles are now in main.css */
</style>
