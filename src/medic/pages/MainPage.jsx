import React, { useState } from 'react';
import { parse, format } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import Papa from 'papaparse'
import { jsPDF } from "jspdf";
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

import PredictionService from '../../services/PredictionService';
import '../../assets/css/LoadingSpinner.css'
function MainPage({ userData }) {
    const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado
    const [jsonData, setJsonData] = useState(null); // Datos cargados del JSON
    const [selectedSensor, setSelectedSensor] = useState("derecha"); // Sensor seleccionado
    const [selectedAxes, setSelectedAxes] = useState(["x", "y"]); // Ejes seleccionados
    const [responseData, setResponseData] = useState(null); // Respuesta del servidor
    const [error, setError] = useState(null); // Error en la petición
    const [cargandoLogin, setCargandoLogin] = useState(false)
    const axiosInstance = useAxios({headers: {"Content-Type": "multipart/form-data"}});
    const axiosInstanceJson = useAxios({headers: {"Content-Type": "application/json"}});
    const [inputObservaciones, setInputObservaciones] = useState('');
    const [observacionesLoading, setObservacionesLoading] = useState(false);
    const [idPrediccion, setIdPrediccion] = useState(null);
    const [respObs, setRespObs] = useState("")
    const handleInputObservacionesChange = (event) => {
      setInputObservaciones(event.target.value);
    };
    const handleSubmitObservaciones = async () => {
      setObservacionesLoading(true)
      const resp = await PredictionService.update_prediction(axiosInstanceJson, idPrediccion, {
        "observations": inputObservaciones
    });
    setObservacionesLoading(false)

    setRespObs(resp)


    }
    
  // Manejar la petición al servidor
  const handlePredictionRequest = async () => {
    if (!selectedFile) {
      alert("Por favor, sube un archivo antes de enviar la petición.");
      return;
    }
    try {
      setCargandoLogin(true)
      const resp = await PredictionService.prediction(axiosInstance, selectedFile);
      setResponseData(resp); // Guardar la respuesta del servidor
      setIdPrediccion(resp.id)
      setError(null); // Limpiar errores
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar la petición.");
    } finally{
      setCargandoLogin(false)
    }
  };
    // Manejar la carga del archivo
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file)
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
  
     // Generar y descargar el PDF
    const handleDownloadPDF = () => {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("SISTEMA DE DETECCIÓN DE LA ENFERMEDAD DE PARKINSON", 10, 20);

      doc.setFontSize(14);
      doc.text("RESULTADOS", 10, 30);

      doc.setFontSize(12);
      doc.text(`Diagnóstico de Enfermedad de Parkinson:`, 10, 50);
      doc.setFontSize(16);
      //doc.setTextColor(responseData.prediction_class === 1 ? "255, 0, 0" : "0, 128, 0");
            // Cambiar color de texto según el resultado
      if (responseData.prediction_class === 1) {
        doc.setTextColor(255, 0, 0); // Rojo para positivo
      } else {
        doc.setTextColor(0, 128, 0); // Verde para negativo
      }
      doc.text(responseData.prediction_class === 1 ? "POSITIVO" : "NEGATIVO", 10, 60);
      doc.setTextColor(0, 0, 0);

      doc.setFontSize(12);
      doc.text(`Porcentaje de probabilidad de predicción correcta: ${responseData.prediction_percentage}%`, 10, 80);
      doc.text(responseData.message, 10, 110, { maxWidth: 190 });

      doc.setFontSize(14);
      doc.text("Observaciones del especialista encargado:", 10, 100);

      doc.setFontSize(12);
      doc.text(inputObservaciones, 10, 110, { maxWidth: 190 });

      doc.save("resultado_parkinson.pdf");
    };
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                    <div className="card">
                            <div className="card-body">
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



                          {/* Mostrar respuesta del servidor */}
                          {/* {responseData && (
                            <div className="alert alert-success mt-3">
                              <h5>Respuesta del servidor:</h5>
                              <pre>{JSON.stringify(responseData, null, 2)}</pre>
                            </div>
                            
                          )} */}


                          {/* Mostrar errores */}
                          {error && (
                            <div className="alert alert-danger mt-3">
                              <strong>Error:</strong> {error}
                            </div>
                          )}
                       </div>                    
                       </div>
                       </div>
                                                 {/* Botón para hacer la petición */}
                                                 <div className="form-group">
                            <button
                            type="submit" className="form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center mt-4" 
                              onClick={handlePredictionRequest}
                              disabled={!jsonData || cargandoLogin}

                              >
                              {cargandoLogin ? <div className='loadingSpinner'></div> : 'Realizar Predicción'}
                            </button>
                          </div>
                       {responseData && (
                        <div className="col-md-12 grid-margin mt-4">
                            <div className="card">
                            <div className="card-body">
                            <h1 className="mt-4 text-center">RESULTADOS</h1>
                            <p className="mt-4 text-center">
                              <strong>Diagnóstico de Enfermedad de Parkinson:</strong>
                            </p>
                            <h2 className={`${responseData.prediction_class === 1 ? "text-danger" : "text-success"} mt-3 text-center`}>{ responseData.prediction_class === 1 ? "POSITIVO" : "NEGATIVO" }</h2>
                            <h4 className='text-center'>{responseData.prediction_percentage}% de probabilidad</h4>                   
                            <p className="mt-4 text-center">{responseData.message}</p>                
                            <div className="mt-4 justify-content-center align-items-center">
                                          {/* <input
                                          type="text"
                                          className="form-control mb-3"
                                          placeholder="Ingrese un valor"
                                          value={inputObservaciones}
                                          onChange={handleInputObservacionesChange}
                                        /> */}
                                        <h5>Observaciones: </h5>
                                                <textarea
          className="form-control mb-3"
          placeholder="Ingrese sus observaciones aquí"
          value={inputObservaciones}
          onChange={handleInputObservacionesChange}
          rows="4" // Número de filas visibles
        ></textarea>
                                        {error && <p className="text-danger text-center">{error}</p>}
                                        {!error && respObs && <p className="text-success text-center">Observaciones enviadas con éxito</p>}

                                        <button
                                          className="btn btn-primary me-3"
                                          onClick={handleSubmitObservaciones}
                                          disabled={observacionesLoading}
                                        >
                              {observacionesLoading ? <div className='loadingSpinner'></div> : 'ENVIAR OBSERVACIONES'}
                                        </button>
                              <button className="btn btn-dark me-3" onClick={handleDownloadPDF}>
                                DESCARGAR RESULTADOS
                              </button>
                              </div>
                              </div>
                              </div>
                              </div>
                            
                          )} 

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