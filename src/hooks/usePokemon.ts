import { useState } from 'react';
import { PokeStats } from '../interface/pokeInterface';

/**
 * Custom Hook that returns an individual pokemon to battle'
 *
 */
function usePokemon() {
    const [active, setActive] = useState<number>();

    const selectPokemon = (pokemon: PokeStats[]) => {
        if (!pokemon.length) return;

        setActive(Math.floor(Math.random() * pokemon?.length));
    }

    return [active, selectPokemon];
};

export default usePokemon