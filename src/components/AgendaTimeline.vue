<template>
	<div class="timeline-grid-container">
		<!-- Header -->
		<div class="timeline-header">
			<div class="header-cell">Thời gian</div>
			<div class="header-cell">Chương trình</div>
			<div class="header-cell">Thời gian</div>
			<div class="header-cell">Người đảm nhận</div>
		</div>

		<!-- Draggable Rows -->
		<draggable
			:list="draggableRows"
			class="timeline-body"
			handle=".drag-handle"
			item-key="id"
			ghost-class="ghost"
			@update:list="emit('update:rows', $event)"
		>
			<template #item="{ element: row, index }">
				<div class="row-container" @mouseover="hoveredRow = row.id" @mouseleave="hoveredRow = null">
					<!-- Drag Handle -->
					<div class="drag-handle no-print">⠿</div>

					<!-- Row Content -->
					<div class="timeline-cells">
						<div class="cell">
							<AutoResizingTextarea
								:modelValue="row.startTime"
								@update:modelValue="emit('updateStartTime', { index, value: $event })"
								:disabled="index !== 0"
							/>
						</div>
						<div class="cell">
							<AutoResizingTextarea
								v-model="row.program.value"
								:class="{ 'fw-bold': row.program.isBold }"
								@focus="emit('fieldFocus', row.program)"
							/>
						</div>
						<div class="cell">
							<div class="d-flex align-items-center">
								<input
									type="number"
									class="form-control"
									style="width: 40px; flex-grow: 0"
									v-model.number="row.duration.value"
									:class="{ 'fw-bold': row.duration.isBold }"
									@focus="emit('fieldFocus', row.duration)"
								/>
								<span class="">phút</span>
							</div>
						</div>
						<div class="cell">
							<AutoResizingTextarea
								v-model="row.assignee.value"
								:class="{ 'fw-bold': row.assignee.isBold }"
								@focus="emit('fieldFocus', row.assignee)"
							/>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="action-buttons no-print" v-if="hoveredRow === row.id">
						<button class="btn btn-sm btn-light" @click="emit('addRow', index)">+</button>
						<button class="btn btn-sm btn-light mx-1" @click="emit('copyRow', index)">❐</button>
						<button class="btn btn-sm btn-light" v-if="rows.length > 1" @click="emit('deleteRow', index)">
							xóa
						</button>
					</div>
				</div>
			</template>
		</draggable>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import AutoResizingTextarea from "./AutoResizingTextarea.vue";

const props = defineProps({
	rows: Array,
});

const emit = defineEmits(["update:rows", "addRow", "copyRow", "deleteRow", "updateStartTime", "fieldFocus"]);

const hoveredRow = ref(null);

const draggableRows = computed({
	get() {
		return props.rows;
	},
	set(value) {
		emit("update:rows", value);
	},
});
</script>

<style scoped>
.timeline-grid-container {
	position: relative;
	border: 1px solid #dee2e6;
	font-size: 0.9rem;
}

.timeline-header,
.timeline-cells {
	display: grid;
	grid-template-columns: 11% 49% 15% 25%;
	font-weight: bold;
}

.timeline-header {
	background-color: #f8f9fa;
	border-bottom: 2px solid #dee2e6;
}

.header-cell,
.cell {
	padding: 0.5rem;
	border-right: 1px solid #dee2e6;
	display: flex;
	align-items: start; /* Align items to the top */
}
.header-cell:last-child,
.cell:last-child {
	border-right: none;
}

.row-container {
	position: relative;
	border-top: 1px solid #dee2e6;
}
.timeline-body > .row-container:first-child {
	border-top: none;
}

.timeline-cells {
	flex-grow: 1;
	font-weight: normal;
}

.drag-handle {
	position: absolute;
	left: -30px;
	top: 50%;
	transform: translateY(-50%);
	cursor: grab;
	padding: 5px;
	font-size: 1.2rem;
	color: #6c757d;
}

.action-buttons {
	position: absolute;
	left: calc(100% - 4px);
	top: 50%;
	transform: translateY(-50%);
	display: flex;
}
.action-buttons .btn {
	border: 1px solid #ddd;
}

.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}
.fw-bold {
	font-weight: bold;
}
</style>
