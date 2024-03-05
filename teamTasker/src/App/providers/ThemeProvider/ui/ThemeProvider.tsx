import { LOCAL_STORAGE_THEME_KANBAN, ThemeContext, Themes } from "src/App/providers/ThemeProvider/lib/ThemeContext.tsx";
import { ReactNode, useMemo, useState } from "react";

interface ThemeProviderProps {
    children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KANBAN) as Themes || Themes.DARK
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] =
        useState<Themes>(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>

    )
}

export default ThemeProvider;
