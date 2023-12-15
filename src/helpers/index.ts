export interface PokemonData {
  name: string;
  id: string;
  isFavorite: boolean;
}
export async function get_pokemon_names(limit: number): Promise<PokemonData[]> {
  // TODO
  // tip: try using query params on the /pokemon endpoint
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data.results.map(
    (pokemon: { name: string; url: string }, index: number) => {
      return {
        name: pokemon.name,
        id: index + pokemon.name,
        isFavorite: false,
      };
    }
  );
}

export async function get_pokemon_image_url(
  pokemon_name: string
): Promise<string> {
  // TODO
  // tip: use the /pokemon/{name} endpoint
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`
  );
  const data = await response.json();
  return data && data.sprites && data.sprites.front_default;
}
