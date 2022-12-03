import { useEffect, useState } from 'react'
import PokemonAPI from './service/pokemonApi';
import { PokeStats } from './interface/pokeInterface'
import PokeTable from './pages/PokeTable';
import { pokeColumns} from './data/pokeColumns';

function App() {
  const [pokemon, setPokemon] = useState<PokeStats[]>([]);

  useEffect(() => {
     async function renderPokemon() {
        const pokeData = await PokemonAPI.getPokemon();   
        const pokeStats = await PokemonAPI.loadPokemon(pokeData);
        setPokemon(pokeStats);
     }

     renderPokemon();
  }, []);

  return (
    <main className="p-12">
      <h1 className="text-3xl font-bold underline">Pokedex</h1>
      <PokeTable initialData={pokemon} initialColumns={pokeColumns} />
    </main>
  );

}

export default App
