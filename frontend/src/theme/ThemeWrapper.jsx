import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import fontStyles from '../utils/fonts';

const theme = createTheme({
  typography: {
    fontFamily: fontStyles.poppins.fontFamily, 
    h1: { fontWeight: fontStyles.poppins.bold.fontWeight },
    h2: { fontWeight: fontStyles.poppins.bold.fontWeight },
    h3: { fontWeight: fontStyles.poppins.bold.fontWeight },
    h4: { fontWeight: fontStyles.poppins.bold.fontWeight },
    h5: { fontWeight: fontStyles.poppins.bold.fontWeight },
    h6: { fontWeight: fontStyles.poppins.bold.fontWeight },
    body1: { fontWeight: fontStyles.poppins.regular.fontWeight },
    body2: { fontWeight: fontStyles.poppins.regular.fontWeight },
    button: { fontWeight: fontStyles.poppins.medium.fontWeight },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: fontStyles.poppins.fontFamily,
      },
    },
    MuiButton: {
      defaultProps: {
        fontFamily: fontStyles.poppins.fontFamily,
      },
    },
  },
});

const ThemeWrapper = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;