import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Importe o Firebase
import 'firebase/compat/firestore'; // Importe o Firestore
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Home from './Home';
import Adm from './Adm';
import ProductForm from './ProductForm'; // Importe o componente ProductForm
import 'firebase/compat/storage'; // Importe o Storage



// Configurações do Firebase
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adm" element={<Adm />} />
        <Route path="/product-form" element={<ProductForm firebase={firebase} />} /> {/* Passe a instância do Firebase como propriedade para ProductForm */}
      </Routes>
    </Router>
  );
}

export default App;
