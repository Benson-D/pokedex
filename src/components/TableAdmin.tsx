import { Table } from '@tanstack/react-table';
import React, { useContext } from 'react'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { FormattedPokemon } from '../interface/pokeInterface';
import Popup from './Popup';
import ListItems from './ListItems';
import ThemeContext from '../context/ThemeContext';

interface TableAdminProps {
  table: Table<FormattedPokemon>;
  globalFilter: string; 
  handleFilter: (evt:React.ChangeEvent<HTMLInputElement>) => void;
  handlePokeGeneration: (gen: string) => void; 
}

/** 
 * The `TableAdmin` component displays table administration components, such as
 * table size popup and search input. It takes in a `table` object, a `globalFilter` string,
 * and two callback functions, `handleFilter` and `handlePokeGeneration`.
 * 
 * Props: 
 *    table: tan-stack
 *    globalFilter: string
 *    handleFilter: fn (filter, search)
 *    handleGeneration: fn (generation)
 */
function TableAdmin({ table, globalFilter, handleFilter, handlePokeGeneration }: TableAdminProps) {
  const { dark } = useContext(ThemeContext);

   // Get the current page size from the table state
  const pageSize = table.getState().pagination.pageSize

  // Generate an array of page size options with "Show" label
  const pageSizeOptions = [15, 25, 50, 75, 100, 125].map((value) => `Show ${value}`);

  // Generate an array of generation options with "generation-" label
  const generationOptions = ['i', 'ii', 'iii', 'iv', 'v'].map((value) => `generation-${value}`);
  
  // Callback function for handling changes to the page size dropdown
  const setTablePageSize = (selectedOption: string = ''): void => {
    const pageSize = selectedOption?.split(' ')[1];
    if (pageSize) {
      table.setPageSize(Number(pageSize));
    }
  };

  return (
    <section className="sm:flex mb-10 justify-between">
        <div className="sm:flex sm:space-x-4">
          {/* Popup component for selecting page size */}
          <Popup label={`Per Page ${pageSize}`}>
            <ListItems mapData={pageSizeOptions} handleList={setTablePageSize} />
          </Popup>

          {/* Popup component for selecting pokemon generation */}
          <Popup label={`Filter`} classStyle={'mt-5 sm:mt-0'}>
            <ListItems mapData={generationOptions} handleList={handlePokeGeneration} />
          </Popup>
        </div>
    
        {/* Search input for filtering pokemon */}
        <div className="mt-5 sm:mt-0 sm:flex relative">
            <AiOutlineSearch className={`absolute top-2.5 left-3 
            ${dark ? 'text-white' : 'text-gray-400'}`} />
            <input className={`shadow appearance-none border rounded w-full py-2 pl-10 leading-tight focus:outline-none focus:shadow-outline
            ${dark 
              ? 'bg-slate-600 placeholder-white hover:bg-slate-500 border-gray-800 active:ring-gray-300 text-white' 
              : 'text-gray-700'}`}
                   placeholder="Search Pokemon" 
                   value={globalFilter ?? ''}
                   onChange={handleFilter} />
        </div>
    </section>
  )
};

export default TableAdmin;


