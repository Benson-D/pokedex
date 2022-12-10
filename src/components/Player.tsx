import { PokeStats } from '../interface/pokeInterface';

/** Displays an individual pokemon card,
 * with specified data
 * 
 */
function Player({ pokemon }: { pokemon: PokeStats; }) {

  return (
    <section className="max-w-sm rounded shadow shadow-blue-800 mx-4 md:mx-10 p-4 md:p-10">
      <h3 className="font-bold text-xl text-center mb-2">
        {pokemon?.name.toUpperCase()}
      </h3>
      <div>
        <img className="w-40 h-40 md:w-50 md:h-50" src={pokemon?.image} />
      </div>
      <p className="text-gray-700 text-base text-center">
        HP: {pokemon?.experience}
      </p>
    </section>
  )
};

export default Player; 
