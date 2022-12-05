import { Table } from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';

/** Displays the Table Size,
 * When a list item is clicked will change the display of the table
 * 
 * Props: 
 *      table: tan-stack
 *      toggleValue: function
 * State: none
 */
function TableSize({ table, toggleValue }
    : { table: Table<PokeStats>; 
        toggleValue: () => void }) {

  const handleTableSize = (pageSize: number): void => {
    table.setPageSize(Number(pageSize))
    toggleValue();
  };

  return (
    <ul className="py-1" role="none">
        {[15, 25, 50, 75, 100].map(pageSize => (
            <li key={pageSize} 
                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" 
                role="menuitem" 
                tabIndex={-1}
                onClick={() => handleTableSize(pageSize)}>
                Show {pageSize}
            </li>
        ))}
    </ul>
  )
};

export default TableSize;
