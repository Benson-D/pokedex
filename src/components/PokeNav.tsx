import { Link } from 'react-router-dom';
import { CgPokemon } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import useToggle from '../hooks/useToggle';

/** Nav Bar, navigates between pages
 * 
 * Props: none
 * State: none
 */
function PokeNav() {
  const [value, toggleValue] = useToggle();

  return (
    <nav className="bg-red-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            <div className="flex flex-shrink-0 items-center">
                <div className="block lg:hidden flex  ml-5">
                  <h1 className="font-semibold text-xl tracking-tight">Pokemon</h1>
                  <CgPokemon className="w-6 h-6 text-red-400 bg-red-200 rounded-full ml-1" />
                </div>
                <div className="hidden lg:block lg:flex">
                  <h1 className="font-semibold text-xl tracking-tight">Pokemon</h1>
                  <CgPokemon className="w-6 h-6 text-red-400 bg-red-200 rounded-full ml-1" />
                </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className="text-white hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium">Pokedex</Link>

                <Link to="/battle" className="text-white hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium">Battle</Link>
              </div>
           </div>
           <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button type="button" 
                    className="inline-flex items-center justify-center rounded-md p-2 text-white-400 hover:bg-red-500 hover:text-white focus:outline-none active:ring-2 active:ring-inset active:ring-white" aria-controls="mobile-menu" 
                    aria-expanded="false"
                    onClick={():void => toggleValue()}>
              <span className="sr-only">Open main menu</span>
              <FiMenu className="text-white h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>
      <div className={`${value
            ? 'transition ease-out duration-200 transform opacity-100 scale-100 sm:hidden ' 
            : 'transition ease-in duration-75 transform opacity-0 scale-95 hidden  -z-10'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link to="/" 
                className="text-white hover:bg-red-500 block px-3 py-2 rounded-md text-base font-medium" 
                onClick={():void => toggleValue(false)}>
                  Pokedex
          </Link>
          <Link to="/battle" 
                className="text-white hover:bg-red-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={():void => toggleValue(false)}>
                  Battle
          </Link>
        </div>
      </div>
    </nav>
  )
}

//238 87 87
export default PokeNav;