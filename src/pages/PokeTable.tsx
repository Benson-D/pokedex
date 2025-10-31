import React, { useState, useMemo, useContext } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { FormattedPokemon } from "../interface/pokeInterface";
import useDebounce from "../hooks/useDebounce";
import ThemeContext from "../context/ThemeContext";
import { RiLoader4Line } from "react-icons/ri";
// Table Components
import TableHeader from "../features/table/TableHeader";
import TableBody from "../features/table/TableBody";
import PaginateButton from "../features/table/PaginateButton";
import ColGroup from "../components/ColGroup";
import TableAdmin from "../features/table/TableAdmin";

interface PokeProps {
  initialData: FormattedPokemon[];
  initialColumns: ColumnDef<FormattedPokemon, string>[];
  handlePokeGeneration: (gen: string) => void;
}

/**
 * Renders a responsive, sortable, and paginated Pokémon data table.
 *
 * Utilizes TanStack Table for data management, supports debounced global search filtering,
 * and provides pagination and dynamic theming through context.
 *
 * @component
 * @param {Object} props
 * @param {FormattedPokemon[]} props.initialData - Array of Pokémon data formatted for display.
 * @param {ColumnDef<FormattedPokemon, string>[]} props.initialColumns - Column definitions for TanStack Table.
 * @param {(gen: string) => void} props.handlePokeGeneration - Callback function triggered when the user selects a Pokémon generation.
 *
 */
function PokeTable({
  initialData,
  initialColumns,
  handlePokeGeneration,
}: PokeProps) {
  // Memoize the data and columns to prevent unnecessary re-renders.
  const data = useMemo<FormattedPokemon[]>(() => initialData, [initialData]);
  const columns = useMemo<ColumnDef<FormattedPokemon, string>[]>(
    () => initialColumns,
    [initialColumns],
  );

  // Manage the table's sorting and filtering state.
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const debouncedFilter = useDebounce(globalFilter);

  // Get the current theme from context.
  const { dark } = useContext(ThemeContext);

  // Create the TanStack Table instance.
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter: debouncedFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Destructure the required functions from the table instance, pagination.
  const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;

  // Handle changes to the global filter input.
  const handleFilter = (evt: React.ChangeEvent<HTMLInputElement>): void =>
    setGlobalFilter(String(evt.target.value));

  // Display a loading spinner if there is no data to display.
  if (!initialData.length) {
    return (
      <RiLoader4Line className="mx-auto my-24 animate-spin w-8 h-8 text-red-400" />
    );
  }

  return (
    <div className="border-solid border border-black/[.18] max-w-screen-xl my-0 mx-auto p-12 pb-6">
      <TableAdmin
        table={table}
        globalFilter={globalFilter}
        handleFilter={handleFilter}
        handlePokeGeneration={handlePokeGeneration}
      />
      <div className="overflow-auto">
        <table
          className={`w-full table-auto cursor-pointer min-w-[800px] ${
            dark ? "bg-slate-700" : "bg-white"
          }`}
        >
          <ColGroup widths={[15, 17, 19, 15, 15, 19]} />
          <TableHeader headerGroups={table.getHeaderGroups} />
          <TableBody rowModels={table.getRowModel} />
        </table>
      </div>
      <section className="flex justify-end mt-10">
        <PaginateButton
          navigate={previousPage}
          canNavigate={getCanPreviousPage}
          label="Previous"
        />
        <PaginateButton
          navigate={nextPage}
          canNavigate={getCanNextPage}
          label="Next"
        />
      </section>
    </div>
  );
}

export default PokeTable;
