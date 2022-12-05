import { Table } from '@tanstack/react-table';
import React from 'react'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { PokeStats } from '../interface/pokeInterface';
import Popup from './Popup';
import TableSize from './TableSize';
import useToggle from '../hooks/useToggle';

/** Modifies the current table by display of info and length
 * 
 * Props: 
 *    table: tan-stack
 *    globalFilter: string
 *    handleFilter: fn (filter, search)
 */
function TableAdmin({ table, globalFilter, handleFilter}
    : { 
      table: Table<PokeStats>;
      globalFilter: string; 
      handleFilter: (evt:React.ChangeEvent<HTMLInputElement>) => void }) {

  const [value, toggleValue] = useToggle();

  return (
    <section className="flex mb-10 justify-between">
        <Popup pageSize={table.getState().pagination.pageSize} 
               display={value}
               toggleValue={toggleValue}>
          <TableSize table={table} toggleValue={toggleValue} />
        </Popup>
        <div className="flex relative">
            <AiOutlineSearch className="absolute top-2.5 left-3" />
            <input className="shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Search Pokemon" 
                   value={globalFilter ?? ''}
                   onChange={handleFilter} />
        </div>
    </section>
  )
};

export default TableAdmin;


