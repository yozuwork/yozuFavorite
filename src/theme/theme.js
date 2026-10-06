import { createTheme } from "@mui/material/styles";

export const colors = {
  cream: "#FAF3E4",
  paper: "#FFFDF6",
  ink: "#1A1A1A",
  sidebar: "#1C1B19",
  sidebarHover: "#2A2825",
  yellow: "#FFC93C",
  yellowDark: "#F0AF00",
  border: "#1A1A1A",
  muted: "#78726A",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.yellow,
      dark: colors.yellowDark,
      contrastText: colors.ink,
    },
    secondary: {
      main: colors.ink,
      contrastText: colors.yellow,
    },
    background: {
      default: colors.cream,
      paper: colors.paper,
    },
    text: {
      primary: colors.ink,
      secondary: colors.muted,
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily:
      '"Zen Maru Gothic", "PingFang TC", "Microsoft JhengHei", "Segoe UI", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.cream,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
          paddingLeft: 18,
          paddingRight: 18,
        },
        contained: {
          border: `2px solid ${colors.ink}`,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          border: `2px solid ${colors.ink}`,
          "&:hover": {
            border: `2px solid ${colors.ink}`,
            backgroundColor: "rgba(26,26,26,0.05)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `2px solid ${colors.ink}`,
          borderRadius: 18,
          boxShadow: "none",
          backgroundColor: colors.paper,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: `1.5px solid ${colors.ink}`,
          borderRadius: 999,
          fontWeight: 600,
          backgroundColor: colors.paper,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: colors.paper,
          "& fieldset": {
            borderColor: colors.ink,
            borderWidth: 2,
          },
          "&:hover fieldset": {
            borderColor: colors.ink,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.yellowDark,
            borderWidth: 2,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `2px solid ${colors.ink}`,
          borderRadius: 20,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: "none",
        },
      },
    },
  },
});

export default theme;
