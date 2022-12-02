import { createColumnHelper } from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';

const columnHelper = createColumnHelper<PokeStats>();

export const pokeColumns = [
    columnHelper.accessor('id', {
        header: 'ORDER NO.'
    }),
    columnHelper.accessor('name', {
        header: 'NAME',
        cell: ({ getValue }) => {
            return (
                <div>
                    <a href={`https://pokemon.fandom.com/wiki/${getValue()}`} 
                       target="_blank"
                       rel="noopener noreferrer">
                        {getValue()}
                    </a>
                </div>
            )
        }
    }),
    columnHelper.accessor('type', {
        header: 'TYPE'
    }),
    columnHelper.accessor('image', {
        header: 'APPEARANCE'
    })
];

