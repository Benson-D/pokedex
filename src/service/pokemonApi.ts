import axios, { AxiosError } from "axios"; 
import { PokeStats } from '../interface/pokeInterface';

const MAIN_URL: string = `https://pokeapi.co/api/v2/pokemon?limit=151%27`; 

interface LoadPokemon {
    name: string;
    url: string;
};

/**  
 * Static class that utilizes methods to get list of Pokemon
*/
class PokemonAPI {

    /**
     * Renders pokemon and their urls
     * @returns {Promise<LoadPokemon[]>}
     */
    public static async getPokemon(): Promise<LoadPokemon[]> {
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
     * @param url 
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
    public static async loadPokemon(data: LoadPokemon[]): Promise<PokeStats[]> {
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
                type: types.join(', ')
                }
            })
        );
    }
}


export default PokemonAPI; 