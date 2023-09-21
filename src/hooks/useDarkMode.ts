import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useDarkMode(defaultValue: boolean = true): {
  isDarkMode: boolean;
  handleDarkTheme: () => void;
} {
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "darkTheme",
    defaultValue,
  );

  useEffect(() => {
    document.body.className = isDarkMode
      ? "poke-dark bg-slate-800"
      : "poke-light bg-white";
  }, [isDarkMode]);

  /** Toggles the application's theme between light and dark. */
  const handleDarkTheme = (): void => {
    setDarkMode((prev: boolean) => !prev);
  };

  return {
    isDarkMode,
    handleDarkTheme,
  };
}

export default useDarkMode;
