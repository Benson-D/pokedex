import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { BiSortUp, BiSortDown } from 'react-icons/bi';
import { PokeStats } from '../interface/pokeInterface';

function TableHeader({ headerGroups }
  : { headerGroups: () => HeaderGroup<PokeStats>[]}) {
  return (
    <thead>
        {headerGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : ( <div onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: <BiSortUp />,
                                    desc: <BiSortDown />
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
                            )
                        }
                    </th>
                ))}
            </tr>
        ))}
    </thead>
  )
}

export default TableHeader;