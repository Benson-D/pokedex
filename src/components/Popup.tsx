import {
  useRef,
  useCallback,
  useContext,
  cloneElement,
  ReactNode,
} from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ThemeContext from "../context/ThemeContext";
import useClickOutside from "../hooks/useClickOutside";
import useToggle from "../hooks/useToggle";

interface PopupProps {
  label: string;
  classStyle?: string;
  children: ReactNode;
}

/**
 * A reusable component that displays a popup menu when clicked.
 *
 * Props:
 *      label: string - The label to display on the button
 *      children: ReactNode - The content to display in the popup menu
 */
function Popup({ label, classStyle = "", children }: PopupProps) {
  const { dark } = useContext(ThemeContext);

  //Handles toggle value logic if clicked on
  const [value, toggleValue] = useToggle();
  const handlePopUp = (): void => toggleValue();

  //Handle Outside Click Events
  const outsideEvent = useRef<HTMLElement>(null);
  const handleOutside = useCallback(() => toggleValue(false), []);

  useClickOutside(outsideEvent, handleOutside);

  return (
    <section
      className={`relative ${dark ? "bg-slate-600" : "bg-white"} ${classStyle}`}
      data-cy-popup="poke-popup"
      ref={outsideEvent}
    >
      <div>
        <button
          onClick={handlePopUp}
          type="button"
          className={`flex shadow rounded pl-4 pr-2 py-2 
                        font-medium  active:ring-2 
                        active:ring-red-300 w-full
                        ${
                          dark
                            ? "text-white hover:bg-slate-500 border-gray-800 active:ring-gray-300"
                            : "text-gray-700 hover:bg-gray-50 border active:ring-red-300"
                        }`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {label}
          <MdOutlineKeyboardArrowDown className="h-6 ml-2" />
        </button>
      </div>
      <div
        className={`absolute left-0 z-10 mt-2 w-56 origin-top-right 
            rounded-md bg-white shadow-lg 
            ${
              value
                ? "visible transition ease-out duration-200 transform opacity-100 scale-100"
                : "invisible transition ease-in duration-75 transform opacity-0 scale-95 -z-20"
            }
            ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        {children &&
          cloneElement(children as React.ReactElement, { toggleValue })}
      </div>
    </section>
  );
}

export default Popup;
