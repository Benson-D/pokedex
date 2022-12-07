import { createColumnHelper } from '@tanstack/react-table';
import { PokeStats } from '../interface/pokeInterface';

const columnHelper = createColumnHelper<PokeStats>();

//Main Columns and row details for Poke Tables
export const pokeColumns = [
    columnHelper.accessor('id', {
        header: 'ORDER NO.',
        cell: ({ getValue }) => <span className="ml-3">{getValue()}</span>
    }),
    columnHelper.accessor('name', {
        header: 'NAME',
        cell: ({ getValue }) => {
            return (
                <div className="text-left ml-2">
                    <a className="text-sky-700 hover:text-sky-500 capitalize"
                       href={`https://pokemon.fandom.com/wiki/${getValue()}`} 
                       target="_blank"
                       rel="noopener noreferrer">
                        {getValue()}
                    </a>
                </div>
            )
        }
    }),
    columnHelper.accessor('type', {
        header: 'TYPE',
        cell: ({ getValue }) => <span className="ml-1">{getValue()}</span>
    }),
    columnHelper.accessor('experience', {
        header: 'POWER LEVEL',
        cell: ({ getValue }) => <span className="ml-2">{getValue()}</span>
    }),
    columnHelper.accessor('attacks', {
        header: 'TOTAL MOVES',
        cell: ({ getValue }) => <span className="ml-2">{getValue()}</span>
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

