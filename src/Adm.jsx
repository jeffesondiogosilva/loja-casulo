import React, { useState, useEffect } from 'react';
import './App.css';
import './Adm.css';
import ProductForm from './ProductForm';
import List from './List';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Adm() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const email = prompt('Email:');
    const password = prompt('Password:');
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="painel-adm">
          <h1 className="title-painel">Painel do Administrador</h1>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <ProductForm />
          <List />
        </div>
      ) : (
        <div>
          <h1>Você não está autenticado</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Adm;
