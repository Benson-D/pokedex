import { Link } from 'react-router-dom';
import { CgPokemon } from 'react-icons/cg';

/** Nav Bar, navigates between pages
 * 
 * Props: none
 * State: none
 */
function PokeNav() {
  return (
    <nav className="mb-8 flex py-3.5 px-0 bg-red-400">
        <div className="flex ml-10 flex-grow">
            <h1 className="font-semibold text-xl tracking-tight">Pokemon</h1>
            <CgPokemon className="w-6 h-6 text-red-400 bg-red-200 rounded-full ml-1" />
        </div>
        <div className="w-full block flex lg:items-center w-auto mr-10">
              <div className="text-sm lg:flex-grow">
                <Link to="/" className="inline-block lg:mt-0 hover:text-sky-700 mr-4">
                  Pokedex
                </Link>
                <Link to="/battle" className="inline-block lg:mt-0 hover:text-sky-700 mr-4">
                  Battle
                </Link>
              </div>
        </div>
    </nav>
  )
}

//238 87 87
export default PokeNav