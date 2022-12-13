import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import PokemonAPI from './service/pokemonApi';
import { PokeStats } from './interface/pokeInterface'
import { pokeColumns} from './data/pokeColumns';
import PokeNav from './components/PokeNav';
import PokeRoutes from './routes/PokeRoutes';
import useToggle from './hooks/useToggle';
import ThemeContext from './context/ThemeContext';
import useLocalStorage from './hooks/useLocalStorage';

/** Main Application that renders Pokedex,
 * 
 * Props: none
 * State: 
 *     pokemon: [ {id, name, type, attacks, image, experience}, ...]
 */
function App(): JSX.Element {
  const [pokemon, setPokemon] = useState<PokeStats[]>([]);
  const [dark, setDarkTheme] = useLocalStorage('darkTheme', false);

  useEffect(() => {
     async function renderPokemon() {
        const pokeData = await PokemonAPI.getPokemon();   
        const pokeStats = await PokemonAPI.loadPokemon(pokeData);
        setPokemon(pokeStats);
     }

     renderPokemon();
  }, []);

  useEffect(() => {
    document.body.className = dark
          ? 'poke-dark bg-slate-800' 
          : 'poke-light bg-white';
  }, [dark]);

  const handleDarkTheme = () => {
    setDarkTheme((prev: boolean) => !prev)
  }

  return (
    <ThemeContext.Provider value={{dark}}>
      <BrowserRouter>
        <main>
          <PokeNav setMode={handleDarkTheme} />
          <PokeRoutes initialData={pokemon} initialColumns={pokeColumns} />
        </main>
      </BrowserRouter>
    </ThemeContext.Provider>

  );

}

export default App
