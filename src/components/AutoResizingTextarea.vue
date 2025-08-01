<template>
	<textarea ref="textarea" :value="modelValue" @input="onInput" class="form-control auto-resize-textarea"></textarea>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
	modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const textarea = ref(null);

const resizeTextarea = () => {
	if (textarea.value) {
		textarea.value.style.height = "auto";
		textarea.value.style.height = `${textarea.value.scrollHeight}px`;
	}
};

const onInput = (event) => {
	emit("update:modelValue", event.target.value);
};

onMounted(() => {
	resizeTextarea();
});

watch(
	() => props.modelValue,
	() => {
		// Use nextTick to ensure the DOM has updated before resizing
		import("vue").then(({ nextTick }) => {
			nextTick(resizeTextarea);
		});
	}
);
</script>

<style scoped>
.auto-resize-textarea {
	width: 100%;
	resize: none;
	overflow: hidden;
	padding: 0;
	border: none;
	background-color: transparent;
}
.auto-resize-textarea:focus {
	box-shadow: none;
	background-color: #f0f0f0;
}
</style>
