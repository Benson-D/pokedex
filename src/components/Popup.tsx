import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

/** Popup Component Display
 * 
 * Reusabled component that can used for other popup items
 * 
 * Props: 
 *      pageSize: number
 *      
 */
function Popup({ pageSize, display, toggleValue, children}
    : { pageSize: number; 
        display: boolean;
        toggleValue: () => void;
        children: JSX.Element; }) {

    const handlePopUp = (): void => toggleValue();

    return (
        <section className="relative">
            <div>
                <button onClick={handlePopUp}
                        type="button" 
                        className="flex shadow border rounded pl-4 pr-2 py-2 text-gray-700 font-medium hover:bg-gray-50 active:ring-2 active:ring-red-300" 
                        id="menu-button" 
                        aria-expanded="true" 
                        aria-haspopup="true">
                    Per Page {pageSize}
                    <MdOutlineKeyboardArrowDown className="h-6 ml-2"/>
                </button>
            </div>
            <div className={`absolute left-0 z-10 mt-2 w-56 origin-top-right 
            rounded-md bg-white shadow-lg ${display 
            ? 'transition ease-out duration-200 transform opacity-100 scale-100' 
            : 'transition ease-in duration-75 transform opacity-0 scale-95 -z-10'}
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