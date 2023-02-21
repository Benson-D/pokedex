import axios, { AxiosError } from "axios"; 
import { 
    FormattedPokemon, 
    Pokemon, 
    PokemonSprites 
} from '../interface/pokeInterface';

const MAIN_URL: string = `https://pokeapi.co/api/v2/pokemon?limit=151%27`; 

/**
 * General output from an individual pokemon 
 * @interface
 */
interface GetPokemonOutput {
    name: string;
    url: string;
};

/**  
 * Static class that utilizes methods to get list of Pokemon
*/
class PokemonAPI {

    /**
     * Renders pokemon and their urls
     * @returns {Promise<GetPokemonOutput[]>}
     */
    public static async getPokemon(): Promise<GetPokemonOutput[]> {
        try{
            return (await axios({url: MAIN_URL})).data?.results; 
        } catch(err){
            const error = err as AxiosError;
            console.error("Poke Error",error.message);

            throw error.response;
        }
    }

    /**
     * Renders individual pokemon statistics
     * @param {string} url 
     * @returns {Promise<Array<any>>}
     */
    private static async getPokemonStats(url: string): Promise<Array<any>> {
        try {
            return (await axios({url})).data;
        } catch(err){
            const error = err as AxiosError;
            console.error("Poke Error of Data",error.message);

            throw error.response;
        }
    }

    /**
     * Reformats all pokemon rendering the data only needed 
     * @param data 
     * @returns {Promise<PokeStats[]>} 
     */
    public static async getPokemonStat(data: GetPokemonOutput[]): Promise<FormattedPokemon[]> {
        return await Promise.all(
            data.map( async pokemon => {
                const pokeStats: any = await this.getPokemonStats(pokemon.url);
                const types = pokeStats.types.map((stat: any) => stat.type.name);
            
                return {
                id: String(pokeStats.id),
                name: pokeStats.name,
                image: pokeStats.sprites.front_default,
                experience: String(pokeStats.base_experience),
                attacks: String(pokeStats.moves.length),
                type: types.join(' ')
                }
            })
        );
    }

    /**
     * Grabs the indicated pokemon names and urls, 
     * then return their stats on an individual pokemon
     * @returns 
     */
    public static async loadPokemon() {
        const pokeNames = await this.getPokemon();
        const pokemon =  await this.getPokemonStat(pokeNames);
        return pokemon;
    }

    /**
     * After fetching data from graphql endpoint, 
     * reformats data to be utilized with TanStack tables
     * @param p 
     * @returns 
     */
    public static formatPokemon(p: Pokemon): FormattedPokemon {
        const baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master";
        const sprites = JSON.parse(p.pokemon_v2_pokemonsprites[0].sprites) as PokemonSprites;
        const pokeImage = sprites?.front_default?.replaceAll('/media/', '');
        const pokeURL = pokeImage ? `${baseURL}/${pokeImage}` : '';
        const types = p.pokemon_v2_pokemontypes.map((type) => type.pokemon_v2_type.name);

        return {
          id: String(p.id),
          name: p.name,
          image: pokeURL,
          experience: String(p.base_experience),
          attacks: String(p.pokemon_v2_pokemonmoves_aggregate.aggregate.count),
          type: types.join(' ')
        }
    }
}


export default PokemonAPI; 