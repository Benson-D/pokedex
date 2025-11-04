import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonAPI from "./service/pokemonApi";
import { pokeColumns } from "./data/pokeColumns";
import ThemeContext from "./context/ThemeContext";
import PokeNav from "./components/PokeNav";
import PokeRoutes from "./routes/PokeRoutes";
import useDarkMode from "./hooks/useDarkMode";
import { GenerationKey } from "./types/pokeTypes";

const generationMap: Record<GenerationKey, { limit: number; offset: number }> =
  {
    kanto: { limit: 151, offset: 0 },
    johto: { limit: 100, offset: 151 },
    hoenn: { limit: 135, offset: 251 },
    sinnoh: { limit: 107, offset: 386 },
    unova: { limit: 156, offset: 493 },
    kalos: { limit: 72, offset: 649 },
    alola: { limit: 86, offset: 723 },
    galar: { limit: 89, offset: 809 },
  };

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
  const { isDarkMode, handleDarkTheme } = useDarkMode();
  const [generation, setGeneration] = useState<{
    limit: number;
    offset: number;
  }>({ limit: 151, offset: 0 });

  const { data: pokemon } = useQuery({
    queryKey: ["pokemon", generation],
    queryFn: async () =>
      await PokemonAPI.loadPokemon(generation.limit, generation.offset),
  });

  /** Takes in a generation type and sets state to new generation */
  const handlePokeGeneration = (generation: GenerationKey): void => {
    if (generationMap[generation]) {
      setGeneration(generationMap[generation]);
    }
  };

  return (
    <ThemeContext.Provider value={{ dark: isDarkMode }}>
      <BrowserRouter>
        <main>
          <PokeNav setMode={handleDarkTheme} />
          <PokeRoutes
            initialData={pokemon ?? []}
            initialColumns={pokeColumns}
            handlePokeGeneration={handlePokeGeneration}
          />
        </main>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
