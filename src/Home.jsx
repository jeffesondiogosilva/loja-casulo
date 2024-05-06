import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Home.css';
import logo from './storage/img/WhatsApp_Image_2023-12-24_at_15.19.50-removebg-preview.png'


function Home() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const produtosCollection = await firebase.firestore().collection('produtos').get();
                const produtosData = produtosCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProdutos(produtosData);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="" />
                <h1>Catálogo</h1>
            </header>

            <div className="catalog">
                <div className="produtos-container">
                    {produtos.map(produto => (
                        <div className="produto" key={produto.id}>
                            <img className="img-produto" src={produto.imageUrl} alt={produto.name} />
                            <p className='descricao'>{produto.name}</p>
                            <p className='valor_produto'>R$ {produto.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Home;
