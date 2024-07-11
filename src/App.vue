<script setup lang="ts">
import pokemonData from './assets/pokemonapi.json';
import DetailModal from './components/DetailModal.vue';

type PokemonDetail = {
  name: string;
  sprites: { [key: string]: string };
  height: number;
  weight: number;
  stats: { base_stat: number, effort: number, stat: { name: string, url: string } }[];
}

import { computed, onMounted, ref } from 'vue';
const pokemonList = ref(pokemonData);
const searchTerm = ref('');
const search = ref<HTMLElement | null>(null);
const selectedPokemon = ref<PokemonDetail | null>(null);

const filteredPokemonList = computed(() => {
  return pokemonList.value.filter(pokemon => pokemon.name.includes(searchTerm.value));
});
const showPokemon = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Error fetching pokemon: ${response.statusText}`)
  }

  selectedPokemon.value = await response.json();
  searchTerm.value = "";
}

const focusInput = () => {
  if (search.value) {
    search.value.focus();
  }
}
onMounted(focusInput)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/pokemon.webp" />
  </header>
  <main>
    <div class="search-container">
      <input class="search-box" type="text" placeholder="Search..." v-model="searchTerm" ref="search">
    </div>
    <ul>
      <li v-for="pokemon in filteredPokemonList" :key="pokemon.url" class="pokemon-item">
        <a href="#" @click="showPokemon(pokemon.url)">{{ pokemon.name }}</a>
      </li>
    </ul>
    <DetailModal v-if="selectedPokemon" :pokemon="selectedPokemon" @closeModal="selectedPokemon = null; focusInput()">
      <template #header>
        <h1 class="pokemon-details-header">{{ selectedPokemon.name }} details</h1>
      </template>
      <div class="pokemon-details" v-if="selectedPokemon">
        <img :src="selectedPokemon.sprites.front_default" alt="selectedPokemon.mame">
        <div class="detail-stats">
          <span>Height:</span><span> {{ selectedPokemon.height }}</span>
        </div>
        <div class="detail-stats">
          <span>Weight: </span><span> {{ selectedPokemon.weight }}</span>
        </div>
        <div class="detail-stats" v-for="(stat, index) in selectedPokemon.stats" :key="index">
          <span>{{ stat.stat.name }}:</span> <span>{{ stat.base_stat }}</span>
        </div>
      </div>
    </DetailModal>
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  margin: 0 2rem 0 0;

}

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

.pokemon-item {
  float: left;
  margin: 10px;
}

.pokemon-item a {
  color: #000;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  text-transform: capitalize;
}

.pokemon-item a:hover {
  color: #3B4CCA;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 5px;
  list-style: none;
}

.pokemon-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #a2c3e3;
  border-radius: 10px;
  color: #000;
  text-transform: capitalize;
}

.pokemon-details-header {
  color: #000;
  display: flex;
  align-items: center;
}

.pokemon-details img {
  width: 150px;
  height: 150px;
}

.detail-stats {
  width: 80%;
  display: flex;
  justify-content: space-between;
}
</style>
