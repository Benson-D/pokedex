import { useContext } from 'react';
import { Table } from '@tanstack/react-table';
import { FormattedPokemon } from '../interface/pokeInterface';
import ThemeContext from '../context/ThemeContext';

interface TableSizeProps {
  table: Table<FormattedPokemon>;
  toggleValue: (value?: boolean) => void; 
}

/** 
 * Displays the Table Size,
 * When a list item is clicked will change the display of the table
 * 
 * Props: 
 *      table: tan-stack
 *      toggleValue: function
 */
function TableSize({ table, toggleValue }: TableSizeProps) {
  const { dark } = useContext(ThemeContext);
  const handleTableSize = (pageSize: number): void => {
    table.setPageSize(Number(pageSize))
    toggleValue();
  };

  return (
    <ul className={`py-1 ${dark ? 'bg-slate-600' : 'bg-white'}`} role="none">
        {[15, 25, 50, 75, 100].map(pageSize => (
            <li key={pageSize} 
                className={`block px-4 py-2 text-sm cursor-pointer
                ${dark 
                  ? 'text-white hover:bg-slate-500' 
                  : 'text-gray-700 hover:bg-gray-100'}`} 
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
