import React, { useState, useMemo } from 'react'
import { 
    useReactTable, 
    ColumnDef, 
    getCoreRowModel,
    SortingState,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import PaginateButton from '../components/PaginateButton';
import ColGroup from '../components/ColGroup';
import TableAdmin from '../components/TableAdmin';
import useDebounce from '../hooks/useDebounce';

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
    const [globalFilter, setGlobalFilter] = useState('');
    const searchValue = useDebounce(globalFilter);

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 15
            }
        },
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
            globalFilter: searchValue
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;
    

    const handleFilter = ((evt: React.ChangeEvent<HTMLInputElement>)
    : void => setGlobalFilter(String(evt.target.value)));
    
    return (
        <div className="border-solid border border-black/[.18] max-w-screen-xl my-0 mx-auto p-12 pb-6">
            <TableAdmin table={table} globalFilter={globalFilter} handleFilter={handleFilter}/>
            <div className="overflow-auto">
                <table className="w-full table-auto cursor-pointer min-w-[800px]">
                    <ColGroup widths={[15, 17, 19, 15, 15, 19]} />
                    <TableHeader headerGroups={table.getHeaderGroups} />
                    <TableBody rowModels={table.getRowModel} />
                </table>
            </div>
            <section className="flex justify-end mt-10">
                <PaginateButton navigate={previousPage}
                                canNavigate={getCanPreviousPage}
                                label='Previous' />
                <PaginateButton navigate={nextPage}
                                canNavigate={getCanNextPage}
                                label='Next' />
            </section>
        </div>
    );
}

export default PokeTable;