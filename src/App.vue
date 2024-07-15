<script setup lang="ts">
import DetailModal from '@/components/DetailModal.vue';
import { useQuery, useQueryProvider } from 'vue-query';

useQueryProvider();

import HeaderMain from '@/components/HeaderMain.vue';
import PokeList from '@/components/PokeList.vue';
import SearchInput from '@/components/SearchInput.vue';

import { computed, onMounted, ref } from 'vue';
import { fetchPokemonDetails, fetchPokemons, type PokemonDetail } from './lib/api';

const searchTerm = ref('');
const search = ref<HTMLElement | null>(null);
const selectedPokemon = ref<PokemonDetail | null>(null);

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

onMounted(focusInput)
</script>

<template>
  <header-main />
  <main>
    <search-input :searchTerm @updateSearch="(val: string) => searchTerm = val" />
    <div class="results-body">
      <poke-list v-if="filteredPokemonList && filteredPokemonList.length" :filteredPokemonList="filteredPokemonList"
        @getDetails="getDetails" />
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
  min-width: 390px;
  max-width: 40%;
  height: auto;
  object-fit: cover;
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
  padding-bottom: 1em;
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
