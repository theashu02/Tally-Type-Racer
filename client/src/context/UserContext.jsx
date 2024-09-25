// src/context/UserContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Validate the props for UserProvider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export the UserContext
export { UserContext };
