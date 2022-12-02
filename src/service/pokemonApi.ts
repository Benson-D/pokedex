import axios, { AxiosError } from "axios"; 
import { PokeStats } from '../interface/pokeInterface';

const POKEMON_URL: string = `https://pokeapi.co/api/v2/pokemon?limit=151%27`; 

interface LoadPokemon {
    name: string;
    url: string;
};

/**  API Class 
 * 
 * Static class that utilizes methods to get list of Pokemon
 * 
*/
class PokemonAPI {

    /**
     * Render All pokemon and their urls
     * @returns 
     */
    static async getKantoPokemon(){
        try{
            return (await axios({url: POKEMON_URL})).data; 
        } catch(err){
            const error = err as AxiosError;
            console.error("Poke Error",error.message);

            throw error.response;
        }
    }

    /**
     * Renders individual pokemon statistics
     * @param url 
     * @returns 
     */
    static async getPokemonData(url: string) {
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
     * @returns 
     */
    static async loadPokemon(data: LoadPokemon[]): Promise<PokeStats[]> {
        return await Promise.all(
            data.map( async pokemon => {
                const pokeStats: any = await this.getPokemonData(pokemon.url);
                const types = pokeStats.types.map((stat: any) => stat.type.name);
        
                return {
                id: pokeStats.id,
                name: pokeStats.name,
                image: pokeStats.sprites.front_default,
                type: types
                }
            })
        );
    }
}


export default PokemonAPI; 