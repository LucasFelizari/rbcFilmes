import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from '@chakra-ui/react';

const colors = {
  primary: {
    30: '#EFF8FB',
    50: '#E7EFFE',
    80: '#D6E4FA',
    100: '#BBD3FC',
    200: '#8FB7FA',
    300: '#639BF8',
    400: '#3764FF',
    500: '#0C3BDD',
    600: '#001CAF',
    700: '#073C92',
    800: '#042862',
    900: '#021431',
  },
  bgDisabled: '#dbdbdb',
  bg: '#00172E',
  bgLight: '#41576C',
  text: '#434343',
  subtitle: '#B9B9B9',
};

const theme: ThemeConfig = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors,
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
);

export { colors };

export default theme;
