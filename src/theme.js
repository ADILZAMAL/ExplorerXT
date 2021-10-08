import { createTheme } from "@material-ui/core/styles";

const defaultTheme = createTheme({
  typography: {
    h6: {
      fontWeight: "bold",
    },
  },
  palette: {
    background: {
      default: "rgba(36,38,39,255)",
      darkLight: "#2c2d31",
    },
  },
});

export default defaultTheme;
