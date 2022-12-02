import { useState, useMemo } from 'react'
import { 
    useReactTable, 
    ColumnDef, 
    getCoreRowModel,
    SortingState,
    getPaginationRowModel,
    getSortedRowModel
} from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import PaginateButton from '../components/PaginateButton';

interface PokeProps {
    initialData : PokeStats[];
    initialColumns: ColumnDef<PokeStats, any>[];
}

function PokeTable({ initialData, initialColumns }: PokeProps) {
    const data = useMemo(() => initialData, [initialData]);

    console.log(data, 'testing');
    const columns = useMemo<ColumnDef<PokeStats, any>[]>(() => initialColumns, []);

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 25
            }
        },
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;

  return (
    <div>
        <table>
            <TableHeader headerGroups={table.getHeaderGroups}/>
            <TableBody rowModels={table.getRowModel}/>
        </table>
            <section>
                <PaginateButton navigate={previousPage}
                                canNavigate={getCanPreviousPage}
                                label='Previous'/>
                <PaginateButton navigate={nextPage}
                                canNavigate={getCanNextPage}
                                label='Next'/>
            </section>
    </div>
  )
}

export default PokeTable;