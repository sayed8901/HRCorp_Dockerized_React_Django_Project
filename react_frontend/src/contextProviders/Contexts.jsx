import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    userType: localStorage.getItem("user_type"),
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


// for props validation
UserProvider.propTypes = {
  // "PropTypes.node" can represent anything that can be rendered (a number, string, element, or array of these types).
  children: PropTypes.node.isRequired,
};
