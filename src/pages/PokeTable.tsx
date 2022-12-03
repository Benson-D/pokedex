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


/** Main Pokemon Table that renders information provided by pokemon api,
 * Utilizes tanstack table 
 * 
 * Props: 
 *      initialData -> [{ name, id, image, type}, ...]
 * @returns 
 */
function PokeTable({ initialData, initialColumns }: PokeProps) {
    const data = useMemo<PokeStats[]>(() => initialData, [initialData]);
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
        <div className="border-solid border border-black/[.18] max-w-screen-xl my-0 mx-auto p-2.5">
            <table className="w-full table-auto cursor-pointer">
                <TableHeader headerGroups={table.getHeaderGroups}/>
                <TableBody rowModels={table.getRowModel}/>
            </table>
            <section className="flex justify-end my-2.5">
                <PaginateButton navigate={previousPage}
                                canNavigate={getCanPreviousPage}
                                label='Previous'/>
                <PaginateButton navigate={nextPage}
                                canNavigate={getCanNextPage}
                                label='Next'/>
            </section>
        </div>
    );
}

export default PokeTable;