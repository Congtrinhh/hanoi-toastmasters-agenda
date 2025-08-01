<template>
	<div class="toolbar-container d-flex justify-content-end align-items-center p-2 bg-light border-bottom no-print">
		<button
			class="btn btn-light me-2"
			@click="$emit('toggleBold')"
			:class="{ active: isSelectionBold }"
			:disabled="isInHeading"
			title="Bold"
		>
			<strong>B</strong>
		</button>
		<button class="btn btn-primary me-2" @click="$emit('print')">In</button>
		<button class="btn btn-secondary" @click="$emit('reset')">Làm mới nội dung</button>
	</div>
</template>

<script setup>
defineProps({
	activeField: Object,
	isSelectionBold: Boolean,
	isInHeading: Boolean,
});
defineEmits(["toggleBold", "print", "reset"]);
</script>

<style scoped>
.toolbar-container {
	position: sticky;
	top: 0;
	z-index: 1000;
	background-color: #f8f9fa;
}
</style>
