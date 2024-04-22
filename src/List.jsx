import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'; // Corrigido o caminho de importação para o Firebase
import 'firebase/compat/firestore'; // Corrigido o caminho de importação para o Firestore
import './App.css';

function List() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Função para buscar os produtos do Firestore
    const fetchProdutos = async () => {
      try {
        const snapshot = await firebase.firestore().collection('produtos').get();
        const produtosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProdutos(produtosData);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    // Chamar a função para buscar os produtos
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await firebase.firestore().collection('produtos').doc(id).delete();
      setProdutos(produtos.filter(produto => produto.id !== id)); // Remover o produto da lista local
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="lista-cms">
      <div className=''>
        <a href="/product-form" className='bg-success'>Cadastrar Produto</a>
      </div>
      <h2>Lista de produtos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Imagem</th>
            <th>Ações</th> {/* Adicionando uma coluna para as ações */}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.title}</td>
              <td>{produto.description}</td>
              <td>{produto.price}</td>
              <td>{produto.image}</td>
              <td>
                <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(produto.id)}>Excluir</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
