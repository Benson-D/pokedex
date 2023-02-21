/**
 * Specific data needed to handle the image files to display,
 * This data will need to be parsed before utilizing these properties
 * @interface
 */
interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
}
  
/**
 * Initial individial pokemon data when fetched from graphql request
 * @interface
 */
interface Pokemon {
  id: string;
  name: string;
  base_experience: string;
  pokemon_v2_pokemonmoves_aggregate: {
    aggregate: {
      count: number;
    }
  };
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    }
  }[];
}

/**
 * Initial data formatted to be utilized with TanStack Tables
 * modified from poke api for this application or graphql request
 * @interface
 */
interface FormattedPokemon {
  id: string;
  name: string;
  image: string;
  experience: string;
  attacks: string;
  type: string;
}


export type {
    FormattedPokemon,
    Pokemon,
    PokemonSprites
}