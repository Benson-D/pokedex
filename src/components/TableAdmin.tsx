import { Table } from '@tanstack/react-table';
import React from 'react'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { PokeStats } from '../interface/pokeInterface';
import Popup from './Popup';
import useToggle from '../hooks/useToggle';

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
          <ul className="py-1" role="none">
                {[15, 25, 50, 75, 100].map(pageSize => (
                  <li key={pageSize} 
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" 
                      role="menuitem" 
                      tabIndex={-1}
                      onClick={(): void => {
                        table.setPageSize(Number(pageSize))
                        toggleValue();
                      }}>
                        Show {pageSize}
                  </li>
                ))}
          </ul>
        </Popup>
        <div className="flex relative">
            <AiOutlineSearch className="absolute top-2.5 left-3"/>
            <input className="shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Search Pokemon" 
                   value={globalFilter ?? ''}
                   onChange={handleFilter} />
        </div>
    </section>
  )
};

export default TableAdmin;


