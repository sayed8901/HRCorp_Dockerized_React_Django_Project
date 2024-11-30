import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/front_page-icon.jpg";

import { UserContext } from "../../contextProviders/Contexts"; // Importing the user context
import { ThemeContext } from "../../contextProviders/ThemeContextProvider";
import ThemeToggler from "../../contextProviders/ThemeToggler";
import MainMenuItems from "./MainMenuItems";
import AuthMenuItems from "./AuthMenuItems";

const Navbar = () => {
  const { user, updateUser } = useContext(UserContext); // Get user state from context
  const navigate = useNavigate();

  // using 'toggleMode', 'isDarkMode' from 'ThemeContext to handle theme toggle
  const { toggleMode, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Fetch user info from localStorage
    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("user_type");

    if (username && userType) {
      updateUser({ username, userType });
    }
  }, []); // Warning N.B.: No dependencies need to put here, it will run only once

  // Handle logout logic
  const handleLogout = () => {
    localStorage.clear();

    updateUser({
      username: null,
      userType: null,
    });

    // redirecting to homepage
    navigate("/");
  };

  // for hide/ un-hide navbar on sticky-scroll
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsNavbarVisible(
        prevScrollPos > currentScrollPos || currentScrollPos < 10
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    // to clean up the "scroll" event listener while unmounting
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`bg-base-200 h-auto sticky top-0 z-10 rounded transition-opacity duration-300
      ${
        isNavbarVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300}`}
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="lg:hidden dropdown">
            <div
              tabIndex={1}
              role="button"
              className="btn btn-ghost border-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={1}
              className="dropdown-content menu menu-sm lg:hidden bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow"
            >
              {/* conditionally rendering main menu items for mobile */}
              <MainMenuItems user={user}></MainMenuItems>
            </ul>
          </div>

          <Link to={"/"} className="flex items-center gap-2 sm:gap-5 sm:px-5">
            <img src={logo} className="w-10" alt="HRCorp Logo" />
            <h5 className="text-xl sm:text-2xl font-bold">HRCorp</h5>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          {/* conditionally rendering main menu items for desktop */}
          <MainMenuItems user={user}></MainMenuItems>
        </div>

        <div className="navbar-end">
          {/* conditionally rendering additional login & logout menu items */}
          {/* {renderAuthItems()} */}
          <AuthMenuItems
            user={user}
            handleLogout={handleLogout}
          ></AuthMenuItems>

          {/* dark/light toggle btn */}
          <ThemeToggler
            toggleMode={toggleMode}
            isDarkMode={isDarkMode}
          ></ThemeToggler>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
