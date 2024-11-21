export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  skeleton: '#A1A1A1',
  red500: '#C13333',
  gray800: '#303030',
  gray400: '#4D4D4D',
  gray200: '#A1A1A1',
  gray100: '#DFDFDF',
  gray50: '#EFEFEF',
  white: '#FFFFFF',
  fixedWhite: '#FFFFFF',
  black: '#000000',
  fixedBlack: '#000000',
  blue700: '#034ef2',
  fixedblue700: '#034ef2',
  blue600: '#0a65ff',
  blue500: '#2187ff',
  blue400: '#529fff',
  blue300: '#80d4ff',
  blue200: '#b1dfff',
  blue100: '#d4eeff',
  orange: '#f04006',
  transparent: 'rgba(0, 0, 0, 0.5)',
} as const;

const colorsDark = {
  skeleton: '#303030',
  red500: '#C13333',
  gray800: '#E0E0E0',
  gray400: '#E0E0E0',
  gray200: '#BABABA',
  gray100: '#000000',
  gray50: '#000000',
  white: '#303030',
  fixedWhite: '#FFFFFF',
  black: '#FFFFFF',
  fixedBlack: '#000000',
  blue700: '#000000',
  fixedblue700: '#2187ff',
  blue600: '#0a65ff',
  blue500: '#357ABD',
  blue400: '#4F9FDF',
  blue300: '#80d4ff',
  blue200: '#75B3FF',
  blue100: '#A2C8FF',
  orange: '#f04006',
  transparent: 'rgba(0, 0, 0, 0.5)',
} as const;

const sizes = [1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 60, 80] as const;

export const config = {
  colors: colorsLight,
  fonts: {
    sizes,
    colors: colorsLight,
  },
  gutters: sizes,
  backgrounds: colorsLight,
  borders: {
    widths: [1, 2, 4, 8, 10, 12],
    radius: [4, 8, 16, 32, 40, 60, 70, 80],
    colors: colorsLight,
  },
  variants: {
    dark: {
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
    },
  },
} as const;
