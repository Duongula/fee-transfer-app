import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.scss";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Header from "./component/Header";
import Dashboard from "./Pages/Dashboard";
import CreateTransfer from "./Pages/CreateTransfer";
import Transfers from './Pages/Transfers';
import OtpPage from './Pages/OtpPage';


function App() {

  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateTransfer />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/transfer" exact element={<Transfers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
