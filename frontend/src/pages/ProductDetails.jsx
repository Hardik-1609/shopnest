import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1
            }));
            alert('Product added to cart!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container product-details py-20 mx-auto">
            <div className="breadcrumb">
                <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.className} / {product.name}
            </div>
            <div className="product-detail-card flex flex-col md:flex-row gap-20 p-5 border bg-[#18181B] border-[#333] rounded-lg">
                <div className="product-img w-[50%]">
                    <img className="w-full h-full object-cover rounded-lg" src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info w-[50%] flex flex-col justify-between">
                    <div className="product-brief">
                        <h1 className="text-4xl mb-2 font-bold text-white">{product.name}</h1>
                        <p className="description text-body text-xl mb-6">{product.description}</p>
                        <p className="price text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="product-stock">
                        <button onClick={handleAddToCart} className="bg-primary block text-white hover:bg-white hover:text-primary font-medium py-2 px-4 mb-4 rounded">Add to Cart</button>
                        <p className="text-lg font-medium text-green-500">
                            {product.stock > 0 ? `In Stock (${product.stock} units Available)` : 'Out of Stock'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
