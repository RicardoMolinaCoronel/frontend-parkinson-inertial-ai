import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import 'simple-line-icons/dist/styles/simple-line-icons.css'
import 'flag-icons/css/flag-icons.min.css'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
