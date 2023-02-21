import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Pokemon, FormattedPokemon } from './interface/pokeInterface';
import PokemonAPI from './service/pokemonApi';
import { LOAD_POKEMON } from './graphql/queries';
import { pokeColumns } from './data/pokeColumns';
import ThemeContext from './context/ThemeContext';
import PokeNav from './components/PokeNav';
import PokeRoutes from './routes/PokeRoutes';
import useLocalStorage from './hooks/useLocalStorage';

/** Main Application that renders Pokedex,
 * 
 * Props: none
 * State: 
 *     pokemon: [ {id, name, type, attacks, image, experience}, ...]
 */
function App(): JSX.Element {
  const [dark, setDark] = useLocalStorage('darkTheme', false); 
  const [pokemon, setPokemon] = useState([]);
  const { data } = useQuery(LOAD_POKEMON, {
    onCompleted: (data) => {
      const formattedData = data.pokemon_v2_pokemon.map(
        (p: Pokemon) => PokemonAPI.formatPokemon(p));

      const filterPokeImages = formattedData.filter((p: FormattedPokemon) => p.image);
      setPokemon(filterPokeImages);
    }
  });

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
          <PokeRoutes initialData={pokemon} initialColumns={pokeColumns} />
        </main>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App
