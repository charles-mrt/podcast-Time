import { createContext } from 'react';

type ThemeColor = {   
   colorTheme: string;
   changeThemeColor: (theme: string) => void;   
}

export const ThemeColorContext = createContext({} as ThemeColor);