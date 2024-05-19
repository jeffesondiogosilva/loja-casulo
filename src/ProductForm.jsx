import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import './App.css';

function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        image: ''
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = async (e) => {
        if (!user) {
            console.error('Usuário não autenticado');
            return;
        }

        const imageFile = e.target.files[0];
        if (!imageFile) return;

        const storageRef = firebase.storage().ref().child(`images/${imageFile.name}`);
        try {
            const snapshot = await storageRef.put(imageFile);
            const downloadURL = await snapshot.ref.getDownloadURL();
            setProduct({
                ...product,
                imageUrl: downloadURL,
                image: snapshot.ref.fullPath
            });
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error('Usuário não autenticado');
            return;
        }

        try {
            await firebase.firestore().collection('produtos').add(product);
            console.log('Produto cadastrado com sucesso!');
            setProduct({
                name: '',
                price: '',
                description: '',
                imageUrl: '',
                image: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    };

    const handleLogin = async () => {
        const email = prompt('Email:');
        const password = prompt('Password:');
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div>
            <a className='btn-listagem' href="#lista">Ir para listagem</a>
            <h2>Cadastro de produtos</h2>
            {user ? (
                <div id='form-prod'>
                    <div className="form-container">                
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nome do Produto:</label>
                                <input type="text" name="name" value={product.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Preço:</label>
                                <input type="number" name="price" value={product.price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea name="description" value={product.description} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Imagem do Produto:</label>
                                <input type="file" name="image" onChange={handleImageChange} />
                                {product.imageUrl && <img src={product.imageUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                            </div>
                            <button type="submit">Cadastrar Produto</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Você precisa estar autenticado para cadastrar um produto</h2>
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default ProductForm;
