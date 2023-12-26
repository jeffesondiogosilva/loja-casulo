import React from 'react';
import './App.css';

function List() {
    const itens = [
        { id: 1, nome: 'Item 1', detalhes: 'Detalhes do Item 1' },
        { id: 2, nome: 'Item 2', detalhes: 'Detalhes do Item 2' },
        // Adicione mais itens conforme necessário
      ];
    
      return (
        <div className="lista-cms">

            <h2>Lista de produtos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.detalhes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }

export default List;


