<template>
	<!-- Dòng nội dung -->
	<tr>
		<td class="drag-handle no-print">⠿</td>
		<td>
			<input
				type="text"
				class="form-control"
				:value="rowData.startTime"
				:disabled="!isFirst"
				@input="$emit('update:startTime', $event.target.value)"
			/>
		</td>
		<td>
			<input
				type="text"
				class="form-control"
				v-model="rowData.program.value"
				:class="{ 'fw-bold': rowData.program.isBold }"
				@focus="$emit('fieldFocus', rowData.program)"
			/>
		</td>
		<td>
			<div class="input-group">
				<input
					type="number"
					class="form-control"
					v-model.number="rowData.duration.value"
					:class="{ 'fw-bold': rowData.duration.isBold }"
					@focus="$emit('fieldFocus', rowData.duration)"
				/>
				<span class="input-group-text">phút</span>
			</div>
		</td>
		<td>
			<input
				type="text"
				class="form-control"
				v-model="rowData.assignee.value"
				:class="{ 'fw-bold': rowData.assignee.isBold }"
				@focus="$emit('fieldFocus', rowData.assignee)"
			/>
		</td>
	</tr>
	<!-- Dòng hành động -->
	<tr v-if="isHovered" class="action-row no-print">
		<td colspan="5" class="text-center">
			<button class="btn btn-sm btn-light" @click="$emit('add')">+</button>
			<button class="btn btn-sm btn-light mx-2" @click="$emit('copy')">❐</button>
			<button class="btn btn-sm btn-light" @click="$emit('delete')">x</button>
		</td>
	</tr>
</template>

<script setup>
defineProps({
	rowData: Object,
	isFirst: Boolean,
	isHovered: Boolean,
});

defineEmits(["add", "copy", "delete", "fieldFocus", "update:startTime"]);
</script>

<style scoped>
.action-row td {
	padding: 0.25rem;
	border: none;
	background-color: #f8f9fa;
}
.btn-light {
	border: 1px solid #ddd;
}
.fw-bold {
	font-weight: bold;
}
.drag-handle {
	cursor: grab;
	text-align: center;
	vertical-align: middle;
	width: 30px;
	background-color: #f8f9fa;
}
</style>
