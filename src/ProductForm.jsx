import React, { useState } from 'react';
import './App.css'

function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        // Atualizando o estado com a imagem carregada
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de envio dos dados, incluindo a imagem
        console.log('Produto Cadastrado:', product);
    };

    return (
        <div className="form-container">

            <form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
                <div className="form-group">
                    <label>Nome do Produto:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Imagem do Produto:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default ProductForm;
