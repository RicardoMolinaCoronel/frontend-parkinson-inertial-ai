import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import { rootPath } from "../rootPath";
export const PrivateRoute = ({children}) => {

  const {authState} = useContext(AuthContext);

  return (
    authState.logged
    ? children
    : <Navigate to= {rootPath + "/login"}/>
  )
}
