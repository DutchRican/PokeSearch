export type PokemonDetail = {
	name: string;
	sprites: { [key: string]: string };
	height: number;
	weight: number;
	stats: { base_stat: number, effort: number, stat: { name: string, url: string } }[];
}
export const fetchPokemonDetails = async (url: string): Promise<PokemonDetail> => {
	const response = await fetch(url);
	return response.json();
}

export const fetchPokemons = async (): Promise<{ name: string, url: string }[]> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
	const { results } = await response.json();
	return results;
}
