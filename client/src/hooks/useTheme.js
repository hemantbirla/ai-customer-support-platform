import { useContext } from "react";
import ThemeProvider from "../contexts/ThemeContext";

const useTheme = () => {
  return useContext(ThemeProvider);
};

export default useTheme;
