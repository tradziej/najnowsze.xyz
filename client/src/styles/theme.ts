import { colors } from './variables';

export interface Theme {
  colors: { [key in keyof typeof colors]: string };
}

export interface ThemeProps {
  theme: Theme;
}

export const theme: Theme = {
  colors,
};
