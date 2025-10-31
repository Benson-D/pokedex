import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

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
export default function PaginateButton({
  navigate,
  canNavigate,
  label,
}: {
  navigate: () => void;
  canNavigate: () => boolean;
  label: string;
}) {
  const { dark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => navigate()}
      disabled={!canNavigate()}
      className={`ml-3 py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-transparent
            ${
              dark
                ? "text-white hover:bg-slate-500"
                : "text-black hover:bg-sky-200"
            }`}
    >
      {label}
    </button>
  );
}
