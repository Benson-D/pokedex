import { useContext } from 'react';
import { FormattedPokemon } from '../interface/pokeInterface';
import ThemeContext from '../context/ThemeContext';

/** Displays an individual pokemon card,
 * with specified data
 */
function Player({ pokemon, active, winner }: { 
  pokemon: FormattedPokemon[]; active: number; winner: boolean; 
}) {
  const { dark } = useContext(ThemeContext);

  const shadowDark = dark ? 'shadow-red-600' : 'shadow-blue-800';
  const colorDisplay = active === pokemon.length - 1 && winner
        ? 'shadow-green-400' : shadowDark;

  return (
    <section className={`max-w-sm rounded mx-4 shadow md:mx-10 p-4 md:p-10 
        ${colorDisplay} ${dark ? 'bg-slate-600' : 'bg-white'}`}>
      <h3 className={`font-bold text-xl text-center mb-2
        ${dark ? 'text-white' : 'text-black'}`}>
        {pokemon[active]?.name.toUpperCase()}
      </h3>
      <div>
        <img className="w-40 h-40 md:w-50 md:h-50" src={pokemon[active]?.image} />
      </div>
      <p className={`text-base text-center 
        ${dark ? 'text-white' : 'text-gray-700'}`}>
        HP: {pokemon[active]?.experience}
      </p>
    </section>
  )
};

export default Player; 
