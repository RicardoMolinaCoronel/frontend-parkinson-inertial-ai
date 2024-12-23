import React, { useState } from 'react';
import { parse, format } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import Papa from 'papaparse'
import useAxios from '../../services/hooks/useAxios';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale, // Escala para el eje X
    LinearScale, // Escala para el eje Y
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import zoomPlugin from "chartjs-plugin-zoom";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin // Registrar el complemento
  );
  // Configuración del gráfico con zoom
const getChartOptions = () => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true, // Permitir desplazamiento
          mode: "x", // Modo de desplazamiento horizontal
        },
        zoom: {
          wheel: {
            enabled: true, // Permitir zoom con la rueda del mouse
          },
          pinch: {
            enabled: true, // Permitir zoom por gesto (en pantallas táctiles)
          },
          mode: "x", // Hacer zoom solo en el eje X
        },
      },
    },
  });
//import FacturasService from '../../services/FacturasService';
import '../../assets/css/LoadingSpinner.css'
function MainPage({ userData }) {
    const [jsonData, setJsonData] = useState(null); // Datos cargados del JSON
    const [selectedSensor, setSelectedSensor] = useState("derecha"); // Sensor seleccionado
    const [selectedAxes, setSelectedAxes] = useState(["x", "y"]); // Ejes seleccionados
    const [responseData, setResponseData] = useState(null); // Respuesta del servidor
    const [error, setError] = useState(null); // Error en la petición
  // Manejar la petición al servidor
  const handlePredictionRequest = async () => {
    if (!jsonData) {
      alert("Por favor, sube un archivo antes de enviar la petición.");
      return; 
    }
    try {
      const resp = await PredictionService.prediction({ file: jsonData});
      setResponseData(resp); // Guardar la respuesta del servidor
      setError(null); // Limpiar errores
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar la petición.");
    }
  };
    // Manejar la carga del archivo
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        setJsonData(data); // Guardar datos cargados
      };
  
      reader.readAsText(file);
    };
  
    // Preparar datos para el gráfico
    const getChartData = () => {
      if (!jsonData || !jsonData[selectedSensor]) return null;
  
      const sensorData = jsonData[selectedSensor];
      const labels = sensorData.map((entry) => entry.t); // Tiempo como etiquetas
  
      const datasets = selectedAxes.map((axis) => ({
        label: `${selectedSensor} - ${axis}`,
        data: sensorData.map((entry) => entry[axis]),
        borderColor: getRandomColor(),
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // Ocultar los puntos
        pointHoverRadius: 0, // Ocultar los puntos al pasar el mouse
      }));
  
      return { labels, datasets };
    };
  
    // Generar un color aleatorio para las líneas
    const getRandomColor = () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.8)`;
  

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                    <h1 className="text-center">Visualización de Sensores IMU</h1>
                    <h5 className="text-center">Sube tu archivo de señales inerciales para comenzar, estas señales deben contener
                    3 sensores: ("derecha", "izquierda", "espina_base") en 6 ejes ("a", "b", "g", "x", "y", "z")</h5>

{/* Carga del archivo */}


<div className="mb-3">
  <label htmlFor="fileInput" className="form-label">
    Subir archivo de señales inerciales
  </label>
  <input
    type="file"
    className="form-control"
    id="fileInput"
    accept=".json"
    onChange={handleFileUpload}
  />
</div>

{/* Selección de sensor */}
{jsonData && (
  <div className="mb-3">
    <label htmlFor="sensorSelect" className="form-label">
      Seleccionar sensor
    </label>
    <select
      id="sensorSelect"
      className="form-select"
      value={selectedSensor}
      onChange={(e) => setSelectedSensor(e.target.value)}
    >
      {Object.keys(jsonData).map((sensor) => (
        <option key={sensor} value={sensor}>
          {sensor}
        </option>
      ))}
    </select>
  </div>
)}

{/* Selección de ejes */}
{jsonData && (
  <div className="mb-3">
    <label className="form-label">Seleccionar ejes</label>
    {["x", "y", "z", "a", "b", "g"].map((axis) => (
      <div className="form-check" key={axis}>
        <input
          type="checkbox"
          className="form-check-input"
          id={`axis-${axis}`}
          checked={selectedAxes.includes(axis)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedAxes([...selectedAxes, axis]);
            } else {
              setSelectedAxes(selectedAxes.filter((a) => a !== axis));
            }
          }}
        />
        <label htmlFor={`axis-${axis}`} className="form-check-label">
          {axis}
        </label>
      </div>
    ))}
  </div>
)}

{/* Gráfico */}
{jsonData && getChartData() && (
  <div>
    <h3 className="text-center">Previsualización de los datos</h3>
    <Line data={getChartData()} options={getChartOptions()} />

  </div>
)}

      {/* Botón para hacer la petición */}
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={handlePredictionRequest}
          disabled={!jsonData}
        >
          Realizar predicción
        </button>
      </div>

      {/* Mostrar respuesta del servidor */}
      {responseData && (
        <div className="alert alert-success mt-3">
          <h5>Respuesta del servidor:</h5>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
        
      )}

      {/* Mostrar errores */}
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error:</strong> {error}
        </div>
      )}
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2024 ESPOL. Todos los derechos reservados. </span>
                    {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="icon-heart text-danger"></i></span> */}
                </div>
            </footer>
        </div>


    )
}

export default MainPage