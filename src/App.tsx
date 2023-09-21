import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonAPI from "./service/pokemonApi";
import { pokeColumns } from "./data/pokeColumns";
import ThemeContext from "./context/ThemeContext";
import PokeNav from "./components/PokeNav";
import PokeRoutes from "./routes/PokeRoutes";
import useDarkMode from "./hooks/useDarkMode";

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
  const [generation, setGeneration] = useState<string>("");

  const { data: pokemon } = useQuery({
    queryKey: ["pokemon", generation],
    queryFn: async () => await PokemonAPI.loadPokemon(generation),
  });

  /** Takes in a generation type and sets state to new generation */
  const handlePokeGeneration = (generation: string): void => {
    const generationMap = new Map([
      ["generation-i", "0"],
      ["generation-ii", "151"],
      ["generation-iii", "251"],
      ["generation-iv", "387"],
      ["generation-v", "495"],
    ]);

    let newGeneration = "0";

    if (generationMap.has(generation)) {
      newGeneration = generationMap.get(generation) as string;
    }

    setGeneration(newGeneration);
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
