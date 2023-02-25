import { Routes, Route } from "react-router-dom";
import { ColumnDef } from '@tanstack/react-table';
import { FormattedPokemon } from '../interface/pokeInterface';
import PokeTable from "../pages/PokeTable";
import PokeBattle from "../pages/PokeBattle";

type Generation = "generation-i" | "generation-ii" | "generation-iii" | "generation-iv" | "generation-v";


interface PokeProps {
    initialData : FormattedPokemon[];
    initialColumns: ColumnDef<FormattedPokemon, string>[];
    handlePokeGeneration: (gen: Generation) => void;
}

/** Poke Routes to navigate between pages
 * 
 * Props: 
*      initialData: [{ name, id, experience, image, type}, ...]
 *     initialColumns: {tanstack table}
 * State: none
 */
function PokeRoutes({ initialData, initialColumns, handlePokeGeneration }: PokeProps): JSX.Element {
  return (
    <Routes>
        <Route path="/" element={
          <PokeTable 
            initialData={initialData} 
            initialColumns={initialColumns}
            handlePokeGeneration={handlePokeGeneration} />} />
        <Route path="/battle" element={<PokeBattle pokemon={initialData} />} />
    </Routes>
  );
};

export default PokeRoutes;