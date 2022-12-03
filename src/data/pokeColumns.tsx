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
    columnHelper.accessor('image', {
        header: 'APPEARANCE',
        cell: ({ getValue }) => {
            return (
                <div>
                    <img src={getValue()} 
                         alt="pokemon-image" 
                         className="my-0 mx-auto w-20 h-20" />
                </div>
            )
        }
    })
];

