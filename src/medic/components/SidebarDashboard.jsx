import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { rootPath } from "../../rootPath";
import { AuthContext } from '../../auth/context/AuthContext';
import { jwtDecode } from 'jwt-decode';



function SidebarDashboard({ userData, organizacionData }) {
    const [activeIndex, setActiveIndex] = useState({ section: 0, item: 0 });
    const [username, setUsername] = useState("")
    const { authState} = useContext(AuthContext);

    useEffect(() => {
        if (authState.user.access) {
            try {
                const decodedToken = jwtDecode(authState.user.access);
                setUsername(decodedToken.username || "") // Devuelve los grupos del token
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const navItemsPanel = [
        { title: 'Principal', iconClass: 'icon-screen-desktop', link: rootPath + '/dashboard' },
        //{ title: 'Predicciones anteriores', iconClass: 'icon-bag', link: rootPath + '/comparativas' },
        // { title: 'Entradas', iconClass: 'icon-login', link: '#entradas-chart' },
        // { title: 'Facturas', iconClass: 'icon-chart', link: '#facturas-chart' },
        // { title: 'Conversión', iconClass: 'icon-graph', link: '#conversion-chart' },
        // { title: 'Entradas por horas', iconClass: 'icon-clock', link: '#heatmap-chart' },
        // Añade más elementos según sea necesario
    ];
    // const navItemsComparativas = [
    //     // { title: 'Entradas vs Facturas', iconClass: 'icon-bag', link: '/dashboard' },
    // ];
    const navItemsErp = [
        { title: 'Subir archivo', iconClass: 'icon-cloud-upload', link: rootPath + '/subir_archivo' },
    ];

    const navItemsDss = [
        { title: 'Configuración', iconClass: 'icon-settings', link: rootPath + '/dashboard' },
        { title: 'Usuario', iconClass: 'icon-user', link: rootPath + '/dashboard' },
    ];

    const navItems = [
        {
            title: "Panel",
            items: navItemsPanel
        },
        // {
        //     title: "ERP",
        //     items: navItemsErp
        // },
        // {
        //     title: "Servidor DSS",
        //     items: navItemsDss
        // }

    ]
    const handleClick = (sectionIndex, itemIndex) => {
        setActiveIndex({ section: sectionIndex, item: itemIndex });
    };
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                {/* <li className="nav-item navbar-brand-mini-wrapper">
                            <a className="nav-link navbar-brand brand-logo-mini" href="/"><img src="images/logoRetail.png" alt="logo" /></a>
                        </li> */}
                <li className="nav-item nav-profile">
                    <a href="/" className="nav-link">
                        <div className="profile-image">
                            {/* <FontAwesomeIcon
                                icon={faUser}
                                size="2x"
                                color='white'
                            /> */}
                            <img className="img-xs rounded-circle ms-2" src="images/user.jpg" alt="Profile image" />
                            {/* <img className="img-xs rounded-circle" src="images/faces/face8.jpg" alt="profile image" /> 
                                     <div className="dot-indicator bg-success"></div>  */}

                        </div>
                        <div className="text-wrapper">
                            <p className="profile-name">{username}</p>
                            <p className="designation">{"Rol:"}</p>
                            <p className="designation">{"Especialista"}</p>


                        </div>
                    </a>
                </li>
                {navItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <li className="nav-item nav-category">
                            <span className="nav-link">{section.title}</span>
                        </li>
                        {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className={`nav-item ${activeIndex &&
                                activeIndex.section === sectionIndex &&
                                activeIndex.item === itemIndex
                                ? 'active'
                                : ''
                                }`}
                                onClick={() => handleClick(sectionIndex, itemIndex)} >
                                <NavLink className="nav-link" to={item.link}>
                                    <span className="menu-title">{item.title}</span>
                                    <i className={`${item.iconClass} menu-icon`}></i>
                                </NavLink>
                            </li>))}
                    </div>))
                }
            </ul>
        </nav>
    )
}

export default SidebarDashboard