import React from 'react';
import './App.css';
import ProductForm from './ProductForm';
import List from './List';

function Adm() {
  return (
    <div className="painel-adm">

      <h1 className="title-painel">Painel do Administrador</h1>

      <hr />

      <List />

    </div>
  );
}

export default Adm;


