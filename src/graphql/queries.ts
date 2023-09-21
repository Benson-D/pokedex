import { gql } from "@apollo/client";

export const LOAD_POKEMON = gql`
  query pokeAPIquery($generation: String!) {
    pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemonspecy: {
          pokemon_v2_generation: { name: { _eq: $generation } }
        }
      }
      order_by: { id: asc }
    ) {
      base_experience
      name
      id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonmoves_aggregate {
        aggregate {
          count(columns: move_id, distinct: true)
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;
