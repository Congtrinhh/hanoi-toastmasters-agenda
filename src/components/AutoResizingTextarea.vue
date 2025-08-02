<template>
	<div
		ref="editableDiv"
		contenteditable="true"
		class="form-control editable-div"
		@input="onInput"
		@blur="onInput"
	></div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
	modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const editableDiv = ref(null);

onMounted(() => {
	if (editableDiv.value) {
		editableDiv.value.innerHTML = props.modelValue;
	}
});

const onInput = (event) => {
	emit("update:modelValue", event.target.innerHTML);
};

// Watch for external changes to modelValue and update the div's content
// This is necessary if the value is changed programmatically from the parent
watch(
	() => props.modelValue,
	(newValue) => {
		if (editableDiv.value && editableDiv.value.innerHTML !== newValue) {
			editableDiv.value.innerHTML = newValue;
		}
	}
);
</script>

<style scoped>
.editable-div {
	width: 100%;
	resize: none;
	overflow: hidden; /* Keeps it clean */
	padding: 0;
	border: none;
	background-color: transparent;
	min-height: 1.5rem; /* Ensure it has some height even when empty */
}
.editable-div:focus {
	outline: none;
	box-shadow: none;
	background-color: #f0f0f0;
}
</style>
