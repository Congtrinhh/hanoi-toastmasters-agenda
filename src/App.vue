<template>
	<ActionToolbar :activeField="activeField" @toggle-bold="toggleBold" @print="handlePrint" @reset="handleReset" />
	<main>
		<AgendaSheet ref="agendaSheet" @active-field-change="updateActiveField" />
	</main>
</template>

<script setup>
import { ref } from "vue";
import ActionToolbar from "./components/ActionToolbar.vue";
import AgendaSheet from "./components/AgendaSheet.vue";

const agendaSheet = ref(null);
const activeField = ref(null);

function updateActiveField(field) {
	activeField.value = field;
}

function toggleBold() {
	if (activeField.value) {
		activeField.value.isBold = !activeField.value.isBold;
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
</script>

<style>
/* Global styles are now in main.css */
</style>
