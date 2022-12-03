import { CgPokemon } from 'react-icons/cg';

/** Nav Bar, navigates between pages
 * 
 * Props: none
 * State: none
 */
function PokeNav() {
  return (
    <nav className="mb-8">
        <div className="flex mt-4 font-medium ml-10">
            <h1 className="text-3xl font-bold underline">Pokemon</h1>
            <CgPokemon className="w-8 h-8 text-red-400 bg-red-200 rounded-full ml-1" />
        </div>
    </nav>
  )
}


export default PokeNav