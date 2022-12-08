
/**
 * An individual set of data used for each pokemon, 
 * modified from poke api for this application
 * @interface
 */
interface PokeStats {
    id: string; 
    name: string;
    image: string;
    experience: string; 
    attacks: string;
    type: string;
};

export type {
    PokeStats
}