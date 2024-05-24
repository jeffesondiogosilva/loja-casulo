import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Home.css';
import logo from './storage/img/WhatsApp_Image_2023-12-24_at_15.19.50-removebg-preview.png';

const PRODUCTS_PER_PAGE = 8; // Número de produtos por página

function Home() {
    const [produtos, setProdutos] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [firstDoc, setFirstDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [hasPrev, setHasPrev] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchProdutos = async (direction) => {
        try {
            let query = firebase.firestore().collection('produtos').orderBy('name').limit(PRODUCTS_PER_PAGE);
            if (direction === 'next' && lastDoc) {
                query = query.startAfter(lastDoc);
            } else if (direction === 'prev' && firstDoc) {
                query = query.endBefore(firstDoc);
            }

            const snapshot = await query.get();
            const produtosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setProdutos(produtosData);
            setFirstDoc(snapshot.docs[0]);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === PRODUCTS_PER_PAGE);
            setHasPrev(direction === 'next' || produtos.length > PRODUCTS_PER_PAGE);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos('next');
    }, []);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img className='logo' src={logo} alt="" />
                <h1>Catálogo</h1>
            </header>

            <div className="catalog">
                <div className="produtos-container ">
                    {produtos.map(produto => (
                        <div className="produto" key={produto.id}>
                            <img
                                className="img-produto"
                                src={produto.imageUrl}
                                alt={produto.name}
                                onClick={() => openModal(produto.imageUrl)}
                            />
                            <p className='descricao'>{produto.name}</p>
                            <p className='valor_produto'>R$ {produto.price}</p>
                        </div>
                    ))}


                </div>
                <div className='d-flex justify-content-center'>

                    <div className="pagination">
                        <button style={{ backgroundColor: '#fff', color: '#000' }} onClick={() => fetchProdutos('prev')} disabled={!hasPrev}>
                            Anterior
                        </button>
                        <button style={{ backgroundColor: '#fff', color: '#000', marginLeft: '3px' }} onClick={() => fetchProdutos('next')} disabled={!hasPrev}>
                            Próximo
                        </button>
                    </div>
                </div>
            </div>

            {modalVisible && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedImage} alt="Produto Expandido" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
