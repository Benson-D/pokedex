import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import { Pokemon, FormattedPokemon } from './interface/pokeInterface';
import PokemonAPI from './service/pokemonApi';
import { LOAD_POKEMON } from './graphql/queries';
import { pokeColumns } from './data/pokeColumns';
import ThemeContext from './context/ThemeContext';
import PokeNav from './components/PokeNav';
import PokeRoutes from './routes/PokeRoutes';
import useLocalStorage from './hooks/useLocalStorage';

type Generation = "generation-i" | "generation-ii" | "generation-iii" | "generation-iv" | "generation-v";

/** Main Application that renders Pokedex,
 * 
 * Props: none
 * State: 
 *  - pokemon: an array of formatted Pokemon data, each containing the following fields:
 *    * id: a unique identifier for the Pokemon.
 *    * name: the name of the Pokemon.
 *    * type: the type of the Pokemon.
 *    * attacks: an array of the Pokemon's attacks.
 *    * image: the URL of the Pokemon's image.
 *    * experience: the amount of experience points the Pokemon has.
 */
function App(): JSX.Element {
  const [dark, setDark] = useLocalStorage('darkTheme', false); 
  const [pokemon, setPokemon] = useState<FormattedPokemon[]>([]);
  const [generation, setGeneration] = useState<Generation>("generation-i");

  const { data } = useQuery(LOAD_POKEMON, {
    variables: { generation: generation },
    onCompleted: (data) => {
      const formattedData = data.pokemon_v2_pokemon.map((p: Pokemon) => PokemonAPI.formatPokemon(p));

      const filterPokeImages = formattedData.filter((p: FormattedPokemon) => p.image);
      setPokemon(filterPokeImages);
    }
  });

  useEffect(() => {
    document.body.className = dark
          ? 'poke-dark bg-slate-800' 
          : 'poke-light bg-white';
  }, [dark]);

   /** Toggles the application's theme between light and dark. */
  const handleDarkTheme = (): void => {
    setDark((prev: boolean) => !prev)
  };

  /** Takes in a generation type and sets state to new generation */
  const handlePokeGeneration = (generation: Generation): void => {
    setGeneration(generation);
  };

  return (
    <ThemeContext.Provider value={{ dark }}>
      <BrowserRouter>
        <main>
          <PokeNav setMode={handleDarkTheme} />
          <PokeRoutes 
            initialData={pokemon} 
            initialColumns={pokeColumns}
            handlePokeGeneration={handlePokeGeneration} />
        </main>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App
