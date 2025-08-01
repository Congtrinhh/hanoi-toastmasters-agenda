<template>
	<div class="a4-sheet">
		<AgendaHeader :headerData="appState.headerData" @field-focus="setActiveField" />
		<AgendaTimeline
			:rows="appState.timelineRows"
			@update:rows="appState.timelineRows = $event"
			@add-row="addRow"
			@delete-row="deleteRow"
			@copy-row="copyRow"
			@update-start-time="updateStartTime"
			@field-focus="setActiveField"
			@toggle-heading="toggleHeading"
		/>
		<AgendaFooter />
		<div class="page-break no-print"></div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import AgendaHeader from "./AgendaHeader.vue";
import AgendaTimeline from "./AgendaTimeline.vue";
import AgendaFooter from "./AgendaFooter.vue";
import { usePersistence } from "../composables/usePersistence.js";

const getInitialState = () => ({
	headerData: {
		meetingNumber: { value: "182", isBold: false },
		generalInfo: {
			value: `Ngày: Thứ 5, 7/8/2025			 Giờ: 19:00 - 21:30
Địa chỉ: 22 Thành Công`,
			isBold: false,
		},
		wordOfTheDay: { value: "", isBold: false },
	},
	timelineRows: [
		{
			id: Date.now(),
			startTime: "19:00",
			program: { value: "Trò chơi khởi động", isBold: false },
			duration: { value: 10, isBold: false },
			assignee: { value: "TM. ", isBold: false },
			isHeading: false,
		},
		{
			id: Date.now() + 1,
			startTime: "",
			program: { value: "Phát biểu mở đầu của chủ tịch CLB", isBold: false },
			duration: { value: 3, isBold: false },
			assignee: { value: "TM. Thúy Kimi", isBold: false },
			isHeading: false,
		},
	],
});

const appState = ref(getInitialState());
const emit = defineEmits(["active-field-change"]);

const { loadState, resetState } = usePersistence(appState, getInitialState);

onMounted(() => {
	loadState();
	recalculateTimes();
});

function setActiveField(field) {
	emit("active-field-change", field);
}

function addRow(index) {
	const newRow = {
		id: Date.now(),
		startTime: "",
		program: { value: "", isBold: false },
		duration: { value: 5, isBold: false },
		assignee: { value: "", isBold: false },
		isHeading: false,
	};
	appState.value.timelineRows.splice(index + 1, 0, newRow);
}

function deleteRow(index) {
	if (appState.value.timelineRows.length > 1) {
		appState.value.timelineRows.splice(index, 1);
	}
}

function copyRow(index) {
	const originalRow = appState.value.timelineRows[index];
	const newRow = JSON.parse(JSON.stringify(originalRow));
	newRow.id = Date.now();
	newRow.startTime = "";
	appState.value.timelineRows.splice(index + 1, 0, newRow);
}

function updateStartTime({ index, value }) {
	if (index === 0) {
		appState.value.timelineRows[0].startTime = value;
	}
}

function addMinutes(time, mins) {
	const [hours, minutes] = time.split(":").map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	date.setMinutes(date.getMinutes() + mins);
	const newHours = String(date.getHours()).padStart(2, "0");
	const newMinutes = String(date.getMinutes()).padStart(2, "0");
	return `${newHours}:${newMinutes}`;
}

function recalculateTimes() {
	for (let i = 1; i < appState.value.timelineRows.length; i++) {
		const prevRow = appState.value.timelineRows[i - 1];
		if (prevRow.startTime && prevRow.duration.value > 0) {
			appState.value.timelineRows[i].startTime = addMinutes(prevRow.startTime, prevRow.duration.value);
		} else {
			appState.value.timelineRows[i].startTime = "";
		}
	}
}

watch(appState, recalculateTimes, { deep: true });

function toggleHeading(index) {
	const row = appState.value.timelineRows[index];
	if (row) {
		row.isHeading = !row.isHeading;
	}
}

function handleReset() {
	resetState();
}

defineExpose({
	handleReset,
});
</script>

<style scoped>
/* Styles remain the same */
</style>
