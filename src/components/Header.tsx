import { useContext } from "react";
import { CgPokemon } from "react-icons/cg";
import ThemeContext from "../context/ThemeContext";

/** Opening header for nav bar page */
function Header() {
  const { dark } = useContext(ThemeContext);

  return (
    <>
      <h1
        className={`font-semibold text-xl tracking-tight 
            ${dark ? "text-white" : "text-black"}`}
      >
        Pokemon
      </h1>
      <CgPokemon className="w-6 h-6 text-red-400 bg-red-200 rounded-full ml-1" />
    </>
  );
}

export default Header;
