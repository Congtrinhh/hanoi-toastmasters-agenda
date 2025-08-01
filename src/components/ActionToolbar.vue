<template>
	<div class="toolbar-container d-flex justify-content-end align-items-center p-2 bg-light border-bottom">
		<button class="btn btn-light me-2">
			<strong>B</strong>
		</button>
		<button class="btn btn-primary me-2">In</button>
		<button class="btn btn-secondary">Làm mới nội dung</button>
	</div>
</template>

<script setup></script>

<style scoped>
.toolbar-container {
	position: sticky;
	top: 0;
	z-index: 1000;
	background-color: #f8f9fa;
}
</style>
