import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const themeClassName = isDarkMode ? "dark" : "light";

    const toggleMode = () => {
      setIsDarkMode(!isDarkMode);
    };

  return (
    <ThemeContext.Provider
      value={{ themeClassName, toggleMode, isDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// propTypes validation
ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;
