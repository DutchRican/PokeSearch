<script setup lang="ts">

defineProps<{
	filteredPokemonList: { name: string, url: string }[],
}>();

const emit = defineEmits<{
	(e: 'selectedPokemon', value: string): void
}>();

</script>

<template>
	<ul v-if="filteredPokemonList && filteredPokemonList.length">
		<poke-item v-for="pokemon in filteredPokemonList" :key="pokemon.url" :pokemon="pokemon"
			@click="emit('selectedPokemon', pokemon.url)" />
	</ul>
</template>