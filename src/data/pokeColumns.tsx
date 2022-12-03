import { createColumnHelper } from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';

const columnHelper = createColumnHelper<PokeStats>();

export const pokeColumns = [
    columnHelper.accessor('id', {
        header: 'ORDER NO.',
        cell: ({ getValue }) => <span className="ml-3">{getValue()}</span>
    }),
    columnHelper.accessor('name', {
        header: 'NAME',
        cell: ({ getValue }) => {
            return (
                <div className="text-left">
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
    columnHelper.accessor('experience', {
        header: 'POWER LEVEL'
    }),
    columnHelper.accessor('attacks', {
        header: 'TOTAL MOVES'
    }),
    columnHelper.accessor('image', {
        header: 'APPEARANCE',
        cell: ({ getValue }) => {
            return (
                <div>
                    <img src={getValue()} 
                         alt="pokemon-image" 
                         className="my-0 w-12 h-12" />
                </div>
            )
        }
    })
];

