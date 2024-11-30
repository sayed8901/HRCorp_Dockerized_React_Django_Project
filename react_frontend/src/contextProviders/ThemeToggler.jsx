import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import PropTypes from "prop-types";

const ThemeToggler = ({ toggleMode, isDarkMode }) => {
  return (
    <div className="hover:cursor-pointer" onClick={toggleMode}>
      {isDarkMode ? (
        <MdDarkMode
          className="text-blue-500 animate-rotateOnce"
          size={40}
          title="Click to turn on light mode"
        />
      ) : (
        <MdOutlineDarkMode
          className="text-red-500 animate-rotateOnce"
          size={40}
          title="Click to turn on dark mode"
        />
      )}
    </div>
  );
};

// propTypes validation
ThemeToggler.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default ThemeToggler;