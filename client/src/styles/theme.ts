import { Colors, lightColors, darkColors } from './variables';

export interface Theme {
  colors: Colors;
}

export interface ThemeProps {
  theme: Theme;
}

export const lightTheme: Theme = {
  colors: lightColors,
};

export const darkTheme: Theme = {
  colors: darkColors,
};
