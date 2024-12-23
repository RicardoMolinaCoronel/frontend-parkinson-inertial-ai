import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons'; // Importa los iconos necesarios

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
    >
        {children}
    </div>
));

const DropdownButtonUser = ({ userData, onLogout }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                <div className="d-flex align-items-center">
                    {/* <FontAwesomeIcon
                        icon={faUser}
                        size="2x"
                    /> */}
                    <img className="img-xs rounded-circle ms-2" src="images/user.jpg" alt="Profile image" />
                    <span className="ml-2 font-weight-normal"> {"Ricardo Molina"} </span>
                    <FontAwesomeIcon
                        className="ml-2"
                        icon={faChevronDown}
                    />
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} /> Cerrar Sesión
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownButtonUser;