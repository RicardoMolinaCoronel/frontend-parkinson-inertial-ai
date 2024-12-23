import React, { useState } from 'react';
import { parse, format } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import Papa from 'papaparse'
import useAxios from '../../services/hooks/useAxios';
//import FacturasService from '../../services/FacturasService';
import '../../assets/css/LoadingSpinner.css'
function MainPage({ userData }) {

    return (
        <div className="main-panel">

           
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2024 RetailPoint del Ecuador. Todos los derechos reservados. </span>
                    {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="icon-heart text-danger"></i></span> */}
                </div>
            </footer>
        </div>


    )
}

export default MainPage