import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    bg: "#e8e8e8",
    midbg: "#b0aeae",
    darkbg: "#161616",
  },
  fonts: {
    body: "Azeret Mono",
  },
  textStyles: {
    t1: {
      fontSize: "27.5px",
      fontWeight: "bold",
    },
    t2: {
      fontSize: "25px",
      fontWeight: "bold",
    },
    b1: {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  breakpoints: {
    mobile: "650",
  },
});

export default theme;
