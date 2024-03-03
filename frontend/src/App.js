import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Header from "./component/Header";
import Dashboard from "./Pages/Dashboard";
import "./App.scss";


function App() {

  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
