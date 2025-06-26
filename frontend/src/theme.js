// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00b4b6", // Teal 
    },
    secondary: {
      main: "#66fcf1", // Light sea-blue
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
  typography: {
    fontFamily: "Segoe UI, sans-serif",
  },
});

export default theme;
