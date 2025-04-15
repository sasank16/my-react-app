import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Practise from "./components/Practise";
import Login from "./components/Login";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Practise />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
};

export default App;
