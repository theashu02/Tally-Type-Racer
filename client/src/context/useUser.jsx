import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Adjust the path accordingly

export const useUser = () => {
  return useContext(UserContext);
};
