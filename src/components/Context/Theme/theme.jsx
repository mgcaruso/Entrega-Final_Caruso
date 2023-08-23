
import { createContext, useState } from "react";

//1.Creamos el contexto
export const ThemeContext = createContext();

//2.Proveemos el contexto
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{
            theme, setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;