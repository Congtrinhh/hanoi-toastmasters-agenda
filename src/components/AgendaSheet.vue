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
		meetingNumber: { value: "182" },
		generalInfo: {
			value: `
				Ngày: Thứ 5, 7/8/2025<br />
				Giờ: 19:00 - 21:30<br />
				Địa chỉ: 22 Thành Công`,
		},
		wordOfTheDay: { value: "" },
	},
	timelineRows: [
		{
			id: Date.now(),
			startTime: "19:00",
			program: { value: "Trò chơi khởi động" },
			duration: { value: 10 },
			assignee: { value: "TM. " },
			isHeading: false,
		},
		{
			id: Date.now() + 1,
			startTime: "",
			program: { value: "Phát biểu mở đầu của chủ tịch CLB" },
			duration: { value: 3 },
			assignee: { value: "TM. Thúy Kimi" },
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
		program: { value: "" },
		duration: { value: 5 },
		assignee: { value: "" },
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
	console.log("Recalculating times...");

	// First, calculate durations for heading rows
	for (let i = 0; i < appState.value.timelineRows.length; i++) {
		const currentRow = appState.value.timelineRows[i];
		if (currentRow.isHeading) {
			let totalDuration = 0;
			// Sum duration of subsequent non-heading rows until the next heading
			for (let j = i + 1; j < appState.value.timelineRows.length; j++) {
				const childRow = appState.value.timelineRows[j];
				if (childRow.isHeading) {
					break; // Stop at the next heading
				}
				totalDuration += childRow.duration.value || 0;
			}
			currentRow.duration.value = totalDuration;
		}
	}

	// Then, calculate start times for all rows
	for (let i = 1; i < appState.value.timelineRows.length; i++) {
		const currentRow = appState.value.timelineRows[i];
		if (currentRow.isHeading) {
			currentRow.startTime = ""; // Clear start time for heading rows
			continue;
		}

		// Find the previous non-heading row
		let prevRow = null;
		for (let j = i - 1; j >= 0; j--) {
			if (!appState.value.timelineRows[j].isHeading) {
				prevRow = appState.value.timelineRows[j];
				break;
			}
		}

		if (prevRow && prevRow.startTime && prevRow.duration.value > 0) {
			currentRow.startTime = addMinutes(prevRow.startTime, prevRow.duration.value);
		} else {
			// If the first row is a heading, the first non-heading row should not have a start time
			if (i === 0 || appState.value.timelineRows.findIndex((r) => !r.isHeading) === i) {
				if (!appState.value.timelineRows[0].isHeading) {
					// only calculate if the very first row is not a heading
				} else {
					currentRow.startTime = "";
				}
			} else {
				currentRow.startTime = "";
			}
		}
	}
}

watch(appState, recalculateTimes, { deep: true });

function toggleHeading(index) {
	const row = appState.value.timelineRows[index];
	if (row) {
		row.isHeading = !row.isHeading;
		if (row.isHeading) {
			row.startTime = ""; // Clear start time when making it a heading
		}
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
