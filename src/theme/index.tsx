import { DefaultTheme } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7000FE',
    accent: '#00D8FE',
  },
};

export default theme;
