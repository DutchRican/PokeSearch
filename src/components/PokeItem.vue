<script setup lang="ts">
interface Pokemon {
	pokemon: {
		name: string,
		url: string
	}
}
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
	/* text-align: center; */
	align-items: center;
	justify-content: center;
}

.pokeListItem:hover {
	background-color: rgba(0, 0, 0, 0.15);
	box-shadow: 2px 6px 6px 0 #717174, 2px 8px 10px 0 #878585;
}

.pokeListItem_name {
	color: black;
	font-size: medium;
	font-weight: 500;
}
</style>