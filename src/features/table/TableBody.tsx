import { useContext } from "react";
import { flexRender, RowModel } from "@tanstack/react-table";
import { FormattedPokemon } from "../../interface/pokeInterface";
import ThemeContext from "../../context/ThemeContext";

/** Main Table Body for Poke Table
 *
 * Props:
 *      rowModels: {tanstack table}
 * State: none
 */
function TableBody({
  rowModels,
}: {
  rowModels: () => RowModel<FormattedPokemon>;
}) {
  const { dark } = useContext(ThemeContext);

  return (
    <tbody className="poke-table-body">
      {rowModels().rows.map((row) => (
        <tr
          key={row.id}
          className={
            dark
              ? "odd:bg-slate-600 hover:bg-slate-500"
              : "odd:bg-sky-100 hover:bg-sky-200"
          }
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={`text-xs 
                        ${dark ? "text-white" : "text-black"}`}
            >
              {
                flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext(),
                ) as React.ReactNode
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
