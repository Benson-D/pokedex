import { useContext } from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { BiSortUp, BiSortDown } from "react-icons/bi";
import { FormattedPokemon } from "../../interface/pokeInterface";
import ThemeContext from "../../context/ThemeContext";

/** Table Header for Poke Table,
 * displays column categories,
 * if table can be sorted will display icon direction of sort
 *
 * Props:
 *    headerGroups: {tanstack table}
 * State: none
 */
function TableHeader({
  headerGroups,
}: {
  headerGroups: () => HeaderGroup<FormattedPokemon>[];
}) {
  const { dark } = useContext(ThemeContext);
  return (
    <thead className="poke-table-header">
      {headerGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="p-2">
              {header.isPlaceholder ? null : (
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  className={`flex justify-between text-xs 
                                   ${dark ? "text-white" : "text-black"}`}
                >
                  {
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    ) as React.ReactNode
                  }
                  {{
                    asc: <BiSortUp />,
                    desc: <BiSortDown />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default TableHeader;
