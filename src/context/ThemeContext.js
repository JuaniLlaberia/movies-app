import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');
    return(
        <ThemeContext.Provider value={{
            theme,
            toggleTheme: () => theme === 'dark' ? setTheme('light') : setTheme('dark'),
        }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext);