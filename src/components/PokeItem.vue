<script setup lang="ts">
import type { Pokemon } from '@/lib/types';

const { pokemon } = defineProps<Pokemon>();
</script>

<template>
	<div class="pokeListItem">
		<span class="pokeListItem_name">{{ pokemon.name }}</span>
	</div>
</template>

<style scoped>
.pokeListItem {
	display: flex;
	padding: 16px 20px;
	border: 1px solid #ccc;
	border-radius: 20px;
	cursor: pointer;
	max-height: 6em;
	text-overflow: ellipsis;
	align-items: center;
	justify-content: center;
}

.pokeListItem:hover {
	background-color: rgba(0, 0, 0, 0.15);
	box-shadow: 2px 4px 4px 0 #717174, 2px 6px 6px 0 #878585;
}

.pokeListItem_name {
	color: black;
	font-size: medium;
	font-weight: 500;
}
</style>