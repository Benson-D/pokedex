import { createContext } from "react"

const ThemeContext = createContext<{dark: boolean}>({ dark: false});

export default ThemeContext;
