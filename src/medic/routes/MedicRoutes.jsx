import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
//import UploadFilePage from "../pages/UploadFilePage";
import useAxios from "../../services/hooks/useAxios";
import NavbarUpDashboard from "../components/NavbarUpDashboard";
import SidebarDashboard from "../components/SidebarDashboard";
//import OrganizacionService from "../../services/OrganizacionService";
//import UserService from "../../services/UserService";
import MainPage from "../pages/MainPage";
//import ComparativasPage from "../pages/ComparativasPage";
export const MedicRoutes = () => {
    const [organizacionData, setOrganizacionData] = useState(null);
    const axiosInstance = useAxios();
    const { authState, logout } = useContext(AuthContext);
    const handleLogout = () => {
        console.log('Cerrando sesión...');
        logout()
    };
    const userData = { "id":5,"user":"sistemas","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsInVzZXIiOiJzaXN0ZW1hcyIsInJvbCI6MTAwLCJleHAiOjE3MzQ3MTM5MDAsImlhdCI6MTczNDM2ODMwMH0.BYwQNepCCYSqzszbE-oWCPm0HA1nbf-MTv6IsVhg5nc"}


    return (
        <div className="container-scroller">
           <NavbarUpDashboard userData={userData} handleLogout={handleLogout} /> 
            <div className="container-fluid page-body-wrapper">
               <SidebarDashboard userData={userData} organizacionData={userData} /> 
                <Routes>
                    <Route path="dashboard" element={<MainPage userData={userData} />} />
                </Routes>
                <Routes>
                    <Route path="comparativas" element={<MainPage userData={userData} />} />
                </Routes>
                <Routes>
                    <Route path="subir_archivo" element={<MainPage userData={userData} />} />
                </Routes>
                {/* <Routes>
                    <Route path="*" element={<Navigate to="/subir_archivo" />} />
                </Routes> */}
            </div>
        </div>
    );
}