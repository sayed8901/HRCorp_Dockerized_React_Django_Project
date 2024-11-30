import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import userIcon from "../../assets/profile_img.png";

const AuthMenuItems = ({ user, handleLogout }) => {
  if (user.username && user.userType) {
    return (
      <div className="flex items-center gap-3 mr-2">
        <div
          className="tooltip tooltip-bottom tooltip-info"
          data-tip="Click to view profile"
        >
          <Link
            to={`/${user.userType}_profile`}
            className="flex gap-2 items-center rounded-md"
          >
            <div
              id="logged_in_user_info"
              className={`hidden sm:block ${user.username ? "" : "hidden"}`}
            >
              <p className="font-bold text-sm text-green-400">
                {user.username}
              </p>
              <p className="text-sm">({user.userType})</p>
            </div>
            <img
              className="h-8 w-7 rounded-full"
              src={userIcon}
              alt="Profile Icon"
              style={{ filter: "invert(50%)" }}
            />
          </Link>
        </div>
        <button
          className="rounded-md p-2 text-sm font-medium btn-ghost border-0 text-center"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-0 sm:gap-3 items-center mr-1 sm:mr-3">
        <NavLink
          to="/login"
          className="rounded-md p-2 text-sm font-medium btn-ghost border-0"
        >
          Login
        </NavLink>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md p-2 text-sm font-medium btn-ghost border-0"
          >
            Register
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-60 p-2 shadow-lg space-y-2"
          >
            <li>
              <NavLink
                to="/power_user_register"
                className="rounded-md p-2 text-sm font-medium hover:bg-gray-700 hover:text-white text-center"
              >
                Power User Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/standard_user_register"
                className="rounded-md p-2 text-sm font-medium hover:bg-gray-700 hover:text-white text-center"
              >
                Standard User Registration
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

AuthMenuItems.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default AuthMenuItems;
