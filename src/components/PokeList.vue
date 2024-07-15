<script setup lang="ts">
import PokeItem from './PokeItem.vue';
defineProps<{
	filteredPokemonList: { name: string, url: string }[],
}>();

const emit = defineEmits<{
	(e: 'getDetails', value: string): void
}>();

</script>

<template>
	<ul>
		<poke-item v-for="pokemon in filteredPokemonList" :key="pokemon.url" :pokemon="pokemon"
			@click="emit('getDetails', pokemon.url)" />
	</ul>
</template>