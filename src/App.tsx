import { useEffect, useState } from 'react'
import './App.css'
import PokemonAPI from './service/pokemonApi';
import { PokeStats } from './interface/pokeInterface'
import PokeTable from './pages/PokeTable';
import { pokeColumns} from './data/pokeColumns';

function App() {
  const [pokemon, setPokemon] = useState<PokeStats[]>([]);

  useEffect(() => {
     async function getPokemon() {
        const pokeData = await PokemonAPI.getKantoPokemon();   
        const pokeStats = await PokemonAPI.loadPokemon(pokeData?.results);
        setPokemon(pokeStats);
     }

     getPokemon();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Pokedex</h1>
      <PokeTable initialData={pokemon} initialColumns={pokeColumns} />
    </>
  );

}

export default App
