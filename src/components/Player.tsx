import { useContext } from 'react';
import { PokeStats } from '../interface/pokeInterface';
import ThemeContext from '../context/ThemeContext';

/** Displays an individual pokemon card,
 * with specified data
 */
function Player({ pokemon }: { pokemon: PokeStats; }) {
  const { dark } = useContext(ThemeContext);

  return (
    <section className={`max-w-sm rounded mx-4 shadow md:mx-10 p-4 md:p-10 
        ${dark ? 'bg-slate-600 shadow-red-600' : 'bg-white shadow-blue-800'}`}>
      <h3 className={`font-bold text-xl text-center mb-2
        ${dark ? 'text-white' : 'text-black'}`}>
        {pokemon?.name.toUpperCase()}
      </h3>
      <div>
        <img className="w-40 h-40 md:w-50 md:h-50" src={pokemon?.image} />
      </div>
      <p className={`text-base text-center 
        ${dark ? 'text-white' : 'text-gray-700'}`}>
        HP: {pokemon?.experience}
      </p>
    </section>
  )
};

export default Player; 
