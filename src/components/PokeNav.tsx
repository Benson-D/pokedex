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
        <div className="flex ml-10 flex-grow py-1 px-4">
            <h1 className="font-semibold text-xl tracking-tight">Pokemon</h1>
            <CgPokemon className="w-6 h-6 text-red-400 bg-red-200 rounded-full ml-1" />
        </div>
        <ul className="w-full block flex lg:items-center w-auto mr-10">
              <li className="flex-1 mr-2 text-sm">
                <Link to="/" className="lg:mt-0 py-2 px-4 hover:text-red-700 hover:bg-red-300">
                  Pokedex
                </Link>
              </li>
              <li className="flex-1 mr-2 text-sm">
                <Link to="/battle" className="lg:mt-0 py-2 px-4 hover:text-red-700 hover:bg-red-300">
                  Battle
                </Link>
              </li>
        </ul>
    </nav>
  )
}

//238 87 87
export default PokeNav