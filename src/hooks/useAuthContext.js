import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//Hook qui retourne un contexte créé dans le AuthProvider
const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
