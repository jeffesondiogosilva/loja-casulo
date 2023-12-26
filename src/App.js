import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Adm from './Adm';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adm" element={<Adm />} />
      </Routes>
    </Router>

  );
}

export default App;
