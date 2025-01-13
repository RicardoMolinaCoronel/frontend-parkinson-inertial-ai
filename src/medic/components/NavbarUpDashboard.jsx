import DropdownButtonUser from "./DropDownUser"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../auth/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function NavbarUpDashboard({ userData, handleLogout }) {
    const [firstName, setFirstName] = useState("")
    const { authState} = useContext(AuthContext);

    useEffect(() => {
        const body = document.body;

        const handleMinimize = () => {
            if (body.classList.contains('sidebar-toggle-display') || body.classList.contains('sidebar-absolute')) {
                body.classList.toggle('sidebar-hidden');
            } else {
                body.classList.toggle('sidebar-icon-only');
            }
        };

        const minimizeButton = document.querySelector('[data-toggle="minimize"]');
        minimizeButton.addEventListener("click", handleMinimize);

        // Initialize PerfectScrollbar where necessary
        /*  if (!body.classList.contains("rtl")) {
            if (document.querySelector('.settings-panel .tab-content .tab-pane.scroll-wrapper')) {
              new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
            }
            if (document.querySelector('.chats')) {
              new PerfectScrollbar('.chats');
            }
            if (body.classList.contains("sidebar-fixed")) {
              new PerfectScrollbar('#sidebar .nav');
            }
          }*/

        // Cleanup function to remove event listener on unmount
        return () => {
            minimizeButton.removeEventListener("click", handleMinimize);
        };
    }, []);



    useEffect(() => {
        const handleOffcanvasToggle = () => {
            const sidebarOffcanvas = document.querySelector('.sidebar-offcanvas');
            if (sidebarOffcanvas) {
                sidebarOffcanvas.classList.toggle('active');
            }
        };

        const offcanvasButton = document.querySelector('[data-toggle="offcanvas"]');
        if (offcanvasButton) {
            offcanvasButton.addEventListener("click", handleOffcanvasToggle);
        }

        // Cleanup function to remove event listener on unmount
        return () => {
            if (offcanvasButton) {
                offcanvasButton.removeEventListener("click", handleOffcanvasToggle);
            }
        };
    }, []);

    useEffect(() => {
        if (authState.user.access) {
            try {
                const decodedToken = jwtDecode(authState.user.access);
                setFirstName(decodedToken.first_name || "") // Devuelve los grupos del token
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    return (
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo" href="/">
                    {/* <img src="images/logoRetail.png" alt="logo" className="img-fluid" style={{ maxWidth: '5rem', height: 'auto' }} /> */}
                    {/* <img src="images/logoRetail.png" alt="logo-light" className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} /> */}
                </a>
                {/* {isOpen && <a className="navbar-brand brand-logo-mini" href="/"><img src="images/logoRetail.png" alt="logo" /></a>} */}
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" >
                    <span className="icon-menu"></span>
                </button>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center">
                <h5 className="mb-0 font-weight-medium d-none d-lg-flex">Bienvenido a tu panel!</h5>
                <ul className="navbar-nav navbar-nav-right">
                    <DropdownButtonUser firstName={firstName} onLogout={handleLogout} />
                    {/* <a><img className="img-xs rounded-circle ms-2" src="images/user.jpg" alt="Profile image" /> <span className="font-weight-normal"> {userData ? userData.user.nombre : ''} </span></a> */}
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="icon-menu"></span>
                </button>
            </div>
        </nav>
    )

}

export default NavbarUpDashboard