import { createColumnHelper } from "@tanstack/react-table";
import { FormattedPokemon } from "../interface/pokeInterface";

const columnHelper = createColumnHelper<FormattedPokemon>();

//Main Columns and row details for Poke Tables
export const pokeColumns = [
  columnHelper.accessor("id", {
    header: "ORDER NO.",
    cell: ({ getValue }) => <span className="ml-3">{getValue()}</span>,
  }),
  columnHelper.accessor("name", {
    header: "NAME",
    cell: ({ getValue }) => {
      return (
        <div className="poke-link text-left ml-2">
          <a
            className="text-sky-700 hover:text-sky-500 capitalize"
            href={`https://pokemon.fandom.com/wiki/${getValue()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getValue()}
          </a>
        </div>
      );
    },
  }),
  columnHelper.accessor("type", {
    header: "TYPE",
    cell: ({ getValue }) => {
      const badgeType: string[] = getValue().split(" ");

      return (
        <div className="poke-badge">
          {badgeType.map((type, idx: number) => (
            <span
              key={idx}
              className={`poke-${type} 
                              py-1.5 px-4 mr-2 rounded text-black`}
            >
              {type}
            </span>
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor("experience", {
    header: "POWER LEVEL",
    cell: ({ getValue }) => <span className="ml-2">{getValue()}</span>,
  }),
  columnHelper.accessor("attacks", {
    header: "TOTAL MOVES",
    cell: ({ getValue }) => <span className="ml-2">{getValue()}</span>,
  }),
  columnHelper.accessor("image", {
    header: "APPEARANCE",
    cell: ({ getValue }) => {
      return (
        <div>
          <img
            src={getValue()}
            alt="pokemon-image"
            className="my-0 w-12 h-12"
          />
        </div>
      );
    },
  }),
];
