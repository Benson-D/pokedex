import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import PokemonAPI from './service/pokemonApi';
import { PokeStats } from './interface/pokeInterface'
import { pokeColumns} from './data/pokeColumns';
import PokeNav from './components/PokeNav';
import PokeRoutes from './routes/PokeRoutes';

/** Main Application that renders Pokedex,
 * 
 * Props: none
 * State: 
 *     pokemon: [ {id, name, type, attacks, image, experience}, ...]
 */
function App(): JSX.Element {
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
    <BrowserRouter>
      <main>
        <PokeNav />
        <PokeRoutes initialData={pokemon} initialColumns={pokeColumns} />
      </main>
    </BrowserRouter>

  );

}

export default App
