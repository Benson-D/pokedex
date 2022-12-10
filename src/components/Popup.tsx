import { useRef, useCallback, useContext } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useClickOutside from '../hooks/useClickOutside';
import ThemeContext from '../context/ThemeContext';

/** Popup Component Display
 * 
 * Reusabled component that can used for other popup items
 * 
 * Props: 
 *      pageSize: number
 *      display: boolean
 *      toggleValue: callback
 *      children: JSX.Element
 * State: none     
 */
function Popup({ pageSize, display, toggleValue, children }
    : { pageSize: number; 
        display: boolean;
        toggleValue: (value?: boolean) => void;
        children: JSX.Element; }) {

    const handlePopUp = (): void => toggleValue(); 
    const { dark } = useContext(ThemeContext);

    //Handle Outside Click Events
    const outsideEvent = useRef<HTMLElement>(null);
    const handleOutside = useCallback(() => { toggleValue(false) }, []);

    useClickOutside(outsideEvent, handleOutside);

    return (
        <section className={`relative ${dark ? 'bg-slate-600': 'bg-white'}`} 
                 ref={outsideEvent}>
            <div>
                <button onClick={handlePopUp}
                        type="button" 
                        className={`flex shadow rounded pl-4 pr-2 py-2 
                        font-medium  active:ring-2 
                        active:ring-red-300 w-full
                        ${dark 
                            ? 'text-white hover:bg-slate-500 border-gray-800 active:ring-gray-300' 
                            : 'text-gray-700 hover:bg-gray-50 border active:ring-red-300'}`} 
                        id="menu-button" 
                        aria-expanded="true" 
                        aria-haspopup="true">
                    Per Page {pageSize}
                    <MdOutlineKeyboardArrowDown className="h-6 ml-2"/>
                </button>
            </div>
            <div className={`absolute left-0 z-10 mt-2 w-56 origin-top-right 
            rounded-md bg-white shadow-lg 
            ${display 
            ? 'transition ease-out duration-200 transform opacity-100 scale-100' 
            : 'transition ease-in duration-75 transform opacity-0 scale-95 -z-20'}
            ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="menu-button">
                    {children}
            </div>
        </section>
    )
}

export default  Popup;
