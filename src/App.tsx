import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PokemonAPI from './service/pokemonApi';
import { PokeStats } from './interface/pokeInterface'
import { pokeColumns} from './data/pokeColumns';
import PokeNav from './components/PokeNav';
import PokeRoutes from './routes/PokeRoutes';
import ThemeContext from './context/ThemeContext';
import useLocalStorage from './hooks/useLocalStorage';

/** Main Application that renders Pokedex,
 * 
 * Props: none
 * State: 
 *     pokemon: [ {id, name, type, attacks, image, experience}, ...]
 */
function App(): JSX.Element {
  const [dark, setDark] = useLocalStorage('darkTheme', false); 
  const { data: pokeNames } = useQuery({ 
    queryKey: ['pokeName'], 
    queryFn: PokemonAPI.getPokemon
  });

  const { data: pokeStats } = useQuery({
    queryKey: ['pokeStats', pokeNames],
    queryFn: async () =>  await PokemonAPI.loadPokemon(pokeNames || []),
    enabled: pokeNames !== undefined
  });

  const initialPokemon: PokeStats[] = pokeStats || [];

  useEffect(() => {
    document.body.className = dark
          ? 'poke-dark bg-slate-800' 
          : 'poke-light bg-white';
  }, [dark]);

  const handleDarkTheme = () => {
    setDark((prev: boolean) => !prev)
  };

  return (
    <ThemeContext.Provider value={{dark}}>
      <BrowserRouter>
        <main>
          <PokeNav setMode={handleDarkTheme} />
          <PokeRoutes initialData={initialPokemon} initialColumns={pokeColumns} />
        </main>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App
