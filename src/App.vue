<script setup lang="ts">
import DetailModal from '@/components/DetailModal.vue';
import PokeItem from '@/components/PokeItem.vue';
import { useQuery, useQueryProvider } from 'vue-query';

useQueryProvider();

import { computed, onMounted, ref } from 'vue';
import { fetchPokemonDetails, fetchPokemons, type PokemonDetail } from './lib/api';
const searchTerm = ref('');
const search = ref<HTMLElement | null>(null);
const selectedPokemon = ref<PokemonDetail | null>(null);
const timeout = ref<number | null>(null);

const filteredPokemonList = computed(() => {
  return data.value?.filter((pokemon: { name: string, url: string }) => pokemon.name.includes(searchTerm.value));
});

const focusInput = () => {
  if (search.value) {
    search.value.focus();
  }
}

const getDetails = async (url: string) => {
  selectedPokemon.value = await fetchPokemonDetails(url)
}

const { data } = useQuery("pokemon", fetchPokemons);

const debounceInput = (val: string) => {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(() => {
    searchTerm.value = val?.trim();
  }, 300);
}

onMounted(focusInput)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/pokemon.webp" />
  </header>
  <main>
    <div class="search-container">
      <input class="search-box" type="text" placeholder="Search..." v-bind:value="searchTerm" ref="search"
        v-on:input="debounceInput(($event.target as HTMLInputElement).value)" @keydown.escape="searchTerm = ''" />
    </div>
    <div class="results-body">
      <ul v-if="filteredPokemonList && filteredPokemonList.length">
        <poke-item v-for="pokemon in filteredPokemonList" :key="pokemon.url" :pokemon="pokemon"
          @click="getDetails(pokemon.url)" />

      </ul>
      <span v-else class=" empty-search">No pokemon found</span>
    </div>
    <Transition>
      <detail-modal v-if="selectedPokemon" :name="selectedPokemon.name"
        @closeModal="selectedPokemon = null; focusInput()">
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
      </detail-modal>
    </Transition>
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

ul {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
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
  background: linear-gradient(to right, #FDDF3C, #3B4CCA);
  background-clip: text;
  color: transparent;
}

.pokemon-details img {
  width: 150px;
  height: 150px;
}

.detail-stats {
  width: 80%;
  display: flex;
  justify-content: space-between;
  font-size: larger;
  color: #dec435;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.results-body {
  height: fit-content;
  max-height: 60vh;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
}

.results-body::-webkit-scrollbar {
  display: none;
}

.empty-search {
  color: var(--vt-c-text-light-1);
  padding-top: 1em;
  font-weight: 500;
  font-size: large;
}
</style>
