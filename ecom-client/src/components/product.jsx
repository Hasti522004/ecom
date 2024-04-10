import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({
        product_name: '',
        product_description: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = () => {
        axios.get('http://localhost:3001/product')
            .then(res => {
                setProducts(res.data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/product', data)
            .then(res => {
                fetchAllProducts();
                setData({
                    product_name: '',
                    product_description: '',
                });
                setError(null);
            })
            .catch(err => {
                console.error('Error adding product:', err);
                setError('Error adding product. Please try again.');
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/product/${id}`)
            .then(res => {
                setProducts(products.filter(product => product.id !== id));
                setError(null);
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                setError('Error deleting product. Please try again.');
            });
    };

    return (
        <div>
            <h2>Product Management</h2>
            {error && <div>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="product_name"
                    placeholder="Enter Product Name"
                    value={data.product_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="product_description"
                    placeholder="Enter Product Description"
                    value={data.product_description}
                    onChange={handleChange}
                />
                <button type="submit">Add Product</button>
            </form>
            <div>
                <h3>Products:</h3>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <div>{product.product_name}</div>
                            <div>{product.product_description}</div>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductPage;
