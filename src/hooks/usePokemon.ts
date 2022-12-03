import { useState } from 'react';
import { PokeStats } from '../interface/pokeInterface';

/**
 * Custom Hook that returns an individual pokemon to battle
 */
function usePokemon(_pokemon: PokeStats[]) {
    const [active, setActive] = useState(0);

    const selectPokemon = (pokemon: PokeStats[]) => {
        setActive(Math.floor(Math.random() * pokemon.length));

        return pokemon[active as number];
    }

    return [selectPokemon];
};

export default usePokemon