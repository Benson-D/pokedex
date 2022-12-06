import { flexRender, RowModel } from "@tanstack/react-table"
import { PokeStats } from '../interface/pokeInterface';

/** Main Table Body for Poke Table
 * 
 * Props: 
 *      rowModels: {tanstack table}
 * State: none
 */
function TableBody({ rowModels }
    : { rowModels: () => RowModel<PokeStats>}) {

  return (
    <tbody>
        {rowModels().rows.map(row => (
            <tr key={row.id} className="odd:bg-sky-100">
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="text-xs">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
  )
};

export default TableBody;
