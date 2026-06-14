import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', stock: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!user || user.role !== 'admin') {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert('Please select an image');

        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('image', image);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { Authorization: `Bearer ${user.token}` },
                body: data
            });
            const responseData = await res.json();

            if (res.ok) {
                alert('Product created successfully with Cloudinary Image URL!');
                navigate('/shop');
            } else {
                alert(responseData.message || 'Error creating product');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container px-5 py-20 flex items-center justify-center mx-auto">
            <div className="register-card w-[50%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
                <h2 className="text-3xl text-center text-white font-semibold mb-6">Add New Product</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type="text" placeholder="Product Name" required
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Description" required rows="4"
                        className="w-full min-h-[100px] mb-3 bg-secondary text-white p-3 rounded-lg"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        type="number" placeholder="Price" required
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <input
                        type="text" placeholder="Category" required
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <input
                        type="number" placeholder="Stock Quantity" required
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />

                    <div className='w-full min-h-[100px] bg-transparent px-3 border border-dashed border-primary rounded-lg'>
                        <label className='text-sm text-body my-3 block'>Upload Product Image (Cloudinary)</label>
                        <input
                            type="file" accept="image/*" required
                            className="w-full min-h-[100px] bg-transparent text-white"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="bg-primary block mx-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded">
                        {loading ? 'Uploading & Creating...' : 'Publish Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;