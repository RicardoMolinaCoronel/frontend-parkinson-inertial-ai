import React from "react";
import { useContext} from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { AuthContext } from "../auth/context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MedicRoutes } from "../medic/routes/MedicRoutes";
import { rootPath } from "../rootPath";
export const AppRouter = () => {

  const {authState} = useContext(AuthContext);
  return (
    <>
      <Routes>
      <Route path={rootPath} element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }/>
        <Route path= {rootPath + "/login"} element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }/>
        <Route path={rootPath + "/*"} element={
          <PrivateRoute>
            <MedicRoutes/>
          </PrivateRoute>
        }/>
      </Routes>
    </>
  )
}
