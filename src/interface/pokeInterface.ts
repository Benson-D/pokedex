/**
 * Interface representing the image files needed to display a pokemon's sprites.
 * This data needs to be parsed before it can be utilized
 * @interface
 */
interface PokemonSprites {
  /** URL for the pokemon's default front sprite, if available */
  front_default: string | null;
  /** URL for the pokemon's shiny front sprite, if available */
  front_shiny: string | null;
  /** URL for the pokemon's default female front sprite, if available */
  front_female: string | null;
  /** URL for the pokemon's shiny female front sprite, if available */
  front_shiny_female: string | null;
}

/**
 * Interface representing individual pokemon data fetched from a GraphQL request.
 * @interface
 */
interface Pokemon {
  /** The id of the pokemon */
  id: string;
  /** The name of the pokemon */
  name: string;
  /** The base experience of the pokemon */
  base_experience: string;
  /** An object containing an aggregate count of the pokemon's moves */
  pokemon_v2_pokemonmoves_aggregate: {
    aggregate: {
      count: number;
    };
  };
  /** An array of sprites for the pokemon */
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
  /** An array of objects containing the pokemon's types */
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      /** The name of the pokemon's type */
      name: string;
    };
  }[];
}

/**
 * Interface representing pokemon data formatted to be utilized with TanStack Tables.
 * This data is modified from the PokeAPI or a GraphQL request for this application
 * @interface
 */
interface FormattedPokemon {
  /** The id of the pokemon */
  id: string;
  /** The name of the pokemon */
  name: string;
  /** The URL for the pokemon's default front sprite */
  image: string;
  /** The base experience of the pokemon */
  experience: string;
  /** The count of the pokemon's moves */
  attacks: string;
  /** The name of the pokemon's type */
  type: string;
}

export type { FormattedPokemon, Pokemon, PokemonSprites };
