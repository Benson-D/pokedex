import { Table } from '@tanstack/react-table';
import React, { useContext } from 'react'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { FormattedPokemon } from '../interface/pokeInterface';
import Popup from './Popup';
import TableSize from './TableSize';
import useToggle from '../hooks/useToggle';
import ThemeContext from '../context/ThemeContext';

/** Modifies the current table by display of info and length
 * 
 * Props: 
 *    table: tan-stack
 *    globalFilter: string
 *    handleFilter: fn (filter, search)
 */
function TableAdmin({ table, globalFilter, handleFilter}
    : { 
      table: Table<FormattedPokemon>;
      globalFilter: string; 
      handleFilter: (evt:React.ChangeEvent<HTMLInputElement>) => void }) {

  const [value, toggleValue] = useToggle();
  const { dark } = useContext(ThemeContext);

  return (
    <section className="sm:flex mb-10 justify-between">
        <Popup pageSize={table.getState().pagination.pageSize} 
               display={value}
               toggleValue={toggleValue}>
          <TableSize table={table} toggleValue={toggleValue} />
        </Popup>
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


