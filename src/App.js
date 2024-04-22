import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Importe o Firebase
import 'firebase/compat/auth'; // Importe o módulo de autenticação
import Home from './Home';
import Adm from './Adm';
import ProductForm from './ProductForm';
import Login from './Login'; 

/// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYbBJj2n6OagdytHaMdiKPW1_VURUHMPI",
  authDomain: "loja-casulo.firebaseapp.com",
  databaseURL: "https://loja-casulo-default-rtdb.firebaseio.com",
  projectId: "loja-casulo",
  storageBucket: "loja-casulo.appspot.com",
  messagingSenderId: "509399001824",
  appId: "1:509399001824:web:dc706af444d622379d3e85",
  measurementId: "G-KZVTJ7TXNM"
};

const app = firebase.initializeApp(firebaseConfig);

// Exporte a instância do Firebase para que outros componentes possam acessá-la
export const firebaseApp = app;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adm" element={<Adm />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
