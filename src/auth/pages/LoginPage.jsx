import '../../styles/login-style.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginService from '../../services/LoginService';
import '../../assets/css/LoadingSpinner.css'
import { rootPath } from '../../rootPath';
export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [cargandoLogin, setCargandoLogin] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()
        setCargandoLogin(true)
        try {
            /*const user = await LoginService.login({
                user: username,
                password: password
            })*/
            const user = { "id":5,"user":"sistemas","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsInVzZXIiOiJzaXN0ZW1hcyIsInJvbCI6MTAwLCJleHAiOjE3MzQ3MTM5MDAsImlhdCI6MTczNDM2ODMwMH0.BYwQNepCCYSqzszbE-oWCPm0HA1nbf-MTv6IsVhg5nc"}

            console.log(user)
            setErrorMessage(null)
            setUsername('')
            setPassword('')
            login(user);
            setCargandoLogin(false)
            navigate(rootPath + "/dashboard", {
                replace: true,
            });
            return;
            //  setUser(user)


        } catch (e) {
            console.log(e)
            setErrorMessage("Usuario y/o contraseña incorrectos")
        } finally {
            setCargandoLogin(false)
        }
    }
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Predicción de Enfermedad de Parkinson mediante sensores IMU</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h2>Predicción de Enfermedad de Parkinson</h2>
                                    <p>Predecir si una persona tiene Enfermedad de Parkinson mediante el análisis
                                        de la marcha usando sensores IMU
                                    </p>
                                    {/* <a href="#" className="btn btn-white btn-outline-white">Sign Up</a> */}
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Iniciar Sesión</h3>
                                    </div>
                                    {/*<div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                                        </p>
    </div> */}
                                </div>
                                <form onSubmit={handleLogin} className="signin-form">
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="name">Usuario</label>
                                        <input type="text" value={username} name="Usuario" className="form-control" placeholder="Usuario" onChange={(event) => setUsername(event.target.value)} required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="password">Contraseña</label>
                                        <input type="password" value={password} name="Password" className="form-control" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} required />
                                    </div>
                                    {errorMessage && <div className="form-group mb-3">
                                        <small className="text-danger">{errorMessage}</small>                                    </div>}
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center" disabled={cargandoLogin}>
                                            {cargandoLogin ? <div className='loadingSpinner'></div> : 'Iniciar sesión'}
                                        </button>
                                    </div>
                                    {/* <div className="form-group d-md-flex">
                                        <div className="w-50 text-left">
                                            <label className="checkbox-wrap checkbox-primary mb-0">Recuérdame
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="#">Olvide la contraseña</a>
                                        </div>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


