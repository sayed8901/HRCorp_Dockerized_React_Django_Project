import PropTypes from "prop-types";

const SampleKeyboardLayout = ({ onKeyPress }) => {
  return (
    <div>
      {/* numpad */}
      <div className="my-1 flex w-full justify-center gap-0 sm:gap-1 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <kbd
            key={num}
            className="kbd hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-150"
            onClick={() => onKeyPress(num)}
          >
            {num}
          </kbd>
        ))}
      </div>

      {/* sample alphabet pad - part 1 */}
      <div className="my-1 flex w-full justify-center gap-0 sm:gap-2">
        {"qwertyuiop".split("").map((char) => (
          <kbd key={char} className="kbd">
            {char}
          </kbd>
        ))}
      </div>

      {/* sample alphabet pad - part 2 */}
      <div className="my-1 flex w-full justify-center gap-0 sm:gap-1">
        {"asdfghjkl".split("").map((char) => (
          <kbd key={char} className="kbd">
            {char}
          </kbd>
        ))}
      </div>

      {/* sample alphabet pad - part 3 */}
      <div className="my-1 flex w-full justify-center gap-0 sm:gap-1">
        {"zxcvbnm/".split("").map((char) => (
          <kbd key={char} className="kbd">
            {char}
          </kbd>
        ))}
      </div>
    </div>
  );
};

// propTypes validation
SampleKeyboardLayout.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
};


export default SampleKeyboardLayout;
