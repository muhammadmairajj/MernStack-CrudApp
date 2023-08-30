import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeDetail from "./pages/EmployeeDetails";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={ <EmployeeDetail /> } />
          <Route path="/EditEmployee/editID/:id" element={ <EditEmployee /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
