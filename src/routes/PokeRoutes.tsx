import { Routes, Route } from "react-router-dom";
import { ColumnDef } from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';
import PokeTable from "../pages/PokeTable";
import PokeBattle from "../pages/PokeBattle";

interface PokeProps {
    initialData : PokeStats[];
    initialColumns: ColumnDef<PokeStats, any>[];
}

function PokeRoutes({ initialData, initialColumns}: PokeProps) {
  return (
    <Routes>
        <Route path="/" element={<PokeTable initialData={initialData} initialColumns={initialColumns} />} />
        <Route path="/battle" element={<PokeBattle pokemon={initialData} />} />
    </Routes>
  );
};

export default PokeRoutes;