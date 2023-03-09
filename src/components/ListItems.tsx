import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

interface ListItemsProps {
    mapData: string[];
    handleList: (data: string) => void;
    toggleValue?: (value?: boolean) => void; 
}

/**
 * A React component that displays a list of items and allows the user to select an item from the list.
 * The list items can be filtered by generation and styled according to the current theme (light/dark).
*/
function ListItems({ mapData, handleList, toggleValue }: ListItemsProps) {
    const { dark } = useContext(ThemeContext); 

    const handleItemClick = (data: string) => {
        if (toggleValue) toggleValue();
        handleList(data);
    }

    return (
        <ul className={`py-1 ${dark ? 'bg-slate-600' : 'bg-white'}`} role="none"
            data-cy-list="poke-popup-list">
            {mapData.map(data => (
                <li key={data} 
                    className={`block px-4 py-2 text-sm cursor-pointer
                    ${dark 
                      ? 'text-white hover:bg-slate-500' 
                      : 'text-gray-700 hover:bg-gray-100'}`} 
                    role="menuitem" 
                    tabIndex={-1}
                    onClick={() => handleItemClick(data)}>
                  {data}
                </li>
            ))}
        </ul>
      )

}

export default ListItems;