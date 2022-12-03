import { AiOutlineSearch } from 'react-icons/ai';
import { Table } from '@tanstack/react-table';

import { PokeStats } from '../interface/pokeInterface';

function TableAdmin({ table, globalFilter, handleFilter}
    : { 
      table: Table<PokeStats>;
      globalFilter: string; 
      handleFilter: (evt:React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <section className="flex mb-10 justify-between">
        <div>
          <select className="shadow appearance-none w-full border rounded text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none  focus:border-gray-300"
                  value={table.getState().pagination.pageSize}
                  onChange={((evt: React.ChangeEvent<HTMLSelectElement>) => table.setPageSize(Number(evt.target.value)))}>
                    {[15, 25, 50, 75, 100].map( pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
          </select>
        </div>
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
