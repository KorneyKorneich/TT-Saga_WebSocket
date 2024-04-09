import { LOCAL_STORAGE_THEME_KANBAN, ThemeContext, Themes } from "src/App/providers/ThemeProvider/lib/ThemeContext.tsx";
import { useContext } from "react";


export interface useThemeResult {
    theme: Themes,
    handleTheme: () => void
}

export const useTheme = (): useThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext)

    const handleTheme = () => {
        theme === Themes.LIGHT ? setTheme?.(Themes.DARK) : setTheme?.(Themes.LIGHT)
        if (!theme) {
            localStorage.setItem(LOCAL_STORAGE_THEME_KANBAN, Themes.DARK);
        } else {
            localStorage.setItem(LOCAL_STORAGE_THEME_KANBAN, theme);
        }
    }
    return {
        theme: theme || Themes.DARK,
        handleTheme
    }
}
