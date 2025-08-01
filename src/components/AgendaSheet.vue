<template>
	<div class="a4-sheet">
		<AgendaHeader />
		<AgendaTimeline />
		<AgendaFooter />
		<div class="page-break"></div>
	</div>
</template>

<script setup>
import AgendaHeader from "./AgendaHeader.vue";
import AgendaTimeline from "./AgendaTimeline.vue";
import AgendaFooter from "./AgendaFooter.vue";
</script>

<style scoped>
/* Các style dành riêng cho component này có thể được thêm vào đây */
</style>
