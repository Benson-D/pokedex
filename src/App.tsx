import { useEffect, useState } from 'react'
import PokemonAPI from './service/pokemonApi';
import { PokeStats } from './interface/pokeInterface'
import PokeTable from './pages/PokeTable';
import { pokeColumns} from './data/pokeColumns';
import PokeNav from './components/PokeNav';

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
    <main>
      <PokeNav />
      <PokeTable initialData={pokemon} initialColumns={pokeColumns} />
    </main>
  );

}

export default App
