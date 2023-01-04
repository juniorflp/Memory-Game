import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F6FCFF",
        color: "#2D3748",
      },
    },
  },
  colors: {
    white: "#FEFEFE",
    primary: "#12141f",
    secondary: "#720a24",
    blue: {
      50: "#F7FAFE",
      100: "#E5F0FD",
      200: "#B6D3FA",
      300: "#6EA8F5",
      400: "#3989F2",
      500: "#09418A",
      600: "#07326C",
      700: "#052856",
      800: "#031E41",
    },
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
    alert: {
      green: "#48BB78",
      red: "#E53E3E",
      orange: "#F6AD55",
    },
  },
  breakpoints: {
    sm: "200px",
  },
});

export default theme;
