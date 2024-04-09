import { createContext } from "react";

export enum Themes {
    DARK = 'dark_theme',
    LIGHT = 'light_theme',
}

interface ThemeContextProps {
    theme?: Themes;
    setTheme?: (theme: Themes) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KANBAN = 'theme';
