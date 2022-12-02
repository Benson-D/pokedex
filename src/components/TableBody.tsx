import { flexRender, RowModel } from "@tanstack/react-table"
import { PokeStats } from '../interface/pokeInterface';

function TableBody({ rowModels }
    : { rowModels: () => RowModel<PokeStats>}) {

  return (
    <tbody>
        {rowModels().rows.map(row => (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
  )
};

export default TableBody;
