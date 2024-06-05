import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import NavRoutes from './Routes/NavRoutes'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <NavRoutes></NavRoutes>
      </Router>
    </>

  )
}

export default App
