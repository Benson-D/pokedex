import axios, { AxiosError } from "axios";
import {
  FormattedPokemon,
  Pokemon,
  PokemonSprites,
} from "../interface/pokeInterface";

const MAIN_URL: string = `https://pokeapi.co/api/v2/pokemon?limit=151`;

/**
 * Represents the output of a single Pokémon in a list.
 * @interface PokemonListOutput
 * @property {string} name - The name of the Pokémon.
 * @property {string} url - The URL for fetching detailed data of the Pokémon.
 */
interface PokemonListOutput {
  name: string;
  url: string;
}

/**
 * Static class that utilizes methods to fetch and format Pokemon data
 * @class
 */
class PokemonAPI {
  /**
   * Fetches a list of pokemon names and URLs from the PokeAPI
   *
   * @returns {Promise<PokemonListOutput[]>} A Promise that resolves with an
   * array of PokemonListOutput objects. Each object contains a Pokemon's name
   * and URL for retrieving its stats.
   * @throws An error if the API request fails.
   */
  public static async getPokemonList(
    offset = "",
  ): Promise<PokemonListOutput[]> {
    try {
      const generationURL = offset ? `${MAIN_URL}&offset=${offset}` : MAIN_URL;

      const pokemonList = await axios({ url: generationURL });
      return pokemonList.data?.results;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Poke Error", error.message);
      throw error.response;
    }
  }

  /**
   * Fetches detailed data for a single pokemon from the PokeAPI
   *
   * @param {string} url - The URL for the Pokemon to fetch.
   * @returns {Promise<any>} A Promise that resolves with the data for the Pokemon.
   * @throws An error if the API request fails.
   */
  private static async getPokemonStats(url: string): Promise<any> {
    try {
      return (await axios({ url })).data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Poke Error", error.message);
      throw error.response;
    }
  }

  /**
   * Fetches and formats pokemon data for a list of pokemon
   *
   * @param {PokemonListOutput[]} pokemonList - the list of pokemon to fetch and format
   * @returns {Promise<FormattedPokemon[]>} - the formatted pokemon data
   */
  public static async getPokemonStat(
    pokemonList: PokemonListOutput[],
  ): Promise<FormattedPokemon[]> {
    return await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokeStats: any = await this.getPokemonStats(pokemon.url);
        const types: string[] = pokeStats.types.map(
          (stat: any) => stat.type.name,
        );

        return {
          id: String(pokeStats.id),
          name: pokeStats.name,
          image: pokeStats.sprites.front_default,
          experience: String(pokeStats.base_experience),
          attacks: String(pokeStats.moves.length),
          type: types.join(" "),
        };
      }),
    );
  }

  /**
   * Loads information on individual Pokémon by grabbing their names and URLs from a pre-existing list.
   *
   * @returns {Promise<FormattedPokemon[]>} An array of objects,
   * each containing stats on an individual Pokémon,
   * such as its base experience, height, and weight.
   */
  public static async loadPokemon(
    generation: string,
  ): Promise<FormattedPokemon[]> {
    const pokeNames = await this.getPokemonList(generation);
    const pokemon = await this.getPokemonStat(pokeNames);
    return pokemon;
  }

  /**
   * Formats the given Pokemon data to be used with TanStack tables.
   *
   * @param {Pokemon} pokemonData - The Pokemon data to be formatted.
   * @returns {FormattedPokemon} - The formatted Pokemon data.
   */
  public static formatPokemon(pokemonData: Pokemon): FormattedPokemon {
    // The base URL for Pokemon images.
    const baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master";

    // Extract the Pokemon sprites and image URL.
    const sprites = JSON.parse(
      pokemonData.pokemon_v2_pokemonsprites[0].sprites,
    ) as PokemonSprites;
    const pokeImage = sprites?.front_default?.replace(/\/media\//g, "");
    const pokeURL = pokeImage ? `${baseURL}/${pokeImage}` : "";

    // Extract the Pokemon types and count the number of attacks.
    const types = pokemonData.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.name,
    );
    const attacks =
      pokemonData.pokemon_v2_pokemonmoves_aggregate.aggregate.count ?? 0;

    // Return the formatted Pokemon data.
    return {
      id: String(pokemonData.id),
      name: pokemonData.name,
      image: pokeURL,
      experience: String(pokemonData.base_experience ?? 0),
      attacks: String(attacks),
      type: types.join(" "),
    };
  }
}

export default PokemonAPI;
