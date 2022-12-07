/** Pagination Button Navigation,
 * handles from previous to next page in table, 
 * if table has reached it's limit will disable
 * 
 * Props: 
 *    navigate: callback
 *    canNavigate: boolean
 *    label: string
 * State: none
 */
function PaginateButton({navigate, canNavigate, label}
    : { navigate: () => void; canNavigate: () => boolean; label: string;}) {
  return (
    <button onClick={() => navigate()} 
            disabled={!canNavigate()} 
            className="ml-3 py-2 px-4 rounded hover:bg-sky-200 disabled:opacity-50 disabled:hover:bg-transparent">
        {label}
    </button>
  );
};

export default PaginateButton;
