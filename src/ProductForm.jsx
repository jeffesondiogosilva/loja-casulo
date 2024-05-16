import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './App.css';

function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = async (e) => {
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

    return (
        <div>
            <a href="/adm">Ir para listagem</a>
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
    );
}

export default ProductForm;
