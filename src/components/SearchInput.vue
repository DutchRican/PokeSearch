<script setup lang="ts">
import { ref } from 'vue';
const { searchTerm } = defineProps<{ searchTerm: string }>();
const emit = defineEmits<{
	(e: 'updateSearch', value: string): void
}>();

const timeout = ref<number | null>(null);
const debounceInput = (val: string) => {
	if (timeout.value) {
		clearTimeout(timeout.value);
	}
	timeout.value = setTimeout(() => {
		emit('updateSearch', val.trim())
	}, 300);
}
</script>

<template>
	<div class="search-container">
		<input class="search-box" type="text" placeholder="Search..." :value="searchTerm" ref="search"
			v-on:input="debounceInput(($event.target as HTMLInputElement).value)"
			@keydown.escape="emit('updateSearch', '')" />
	</div>
</template>

<style>
.search-container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
}

.search-box {
	width: 30%;
	height: 50px;
	font-size: 1.5em;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 40px 0;
	text-align: center;
}
</style>