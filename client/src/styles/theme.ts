import { colors } from './variables';

export interface ThemeInterface {
  colors: { [key in keyof typeof colors]: string };
}

export const theme: ThemeInterface = {
  colors,
};
