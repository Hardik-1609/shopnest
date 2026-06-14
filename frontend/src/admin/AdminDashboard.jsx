import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchStats = async () => {
            try {
                const res = await fetch('/api/analytics', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setStats(data);
                } else {
                    if (res.status === 401) {
                        navigate('/login');
                    }
                    setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, [user, navigate]);

    return (
        <div className='container mx-auto px-5 py-20'>
            <div className="admin-data-card p-5 bg-[#18181B] border border-[#333] rounded-lg">
                <div>
                    <h2 className='text-3xl text-primary font-semibold mb-2'>Admin Dashboard</h2>
                </div>
                <p className='text-lg text-white'>Welcome Back, <span>{user?.name}</span></p>

                {stats ? (
                    <div className='grid grid-cols-4 gap-5 py-8'>
                        <div className='text-center p-8 bg-secondary border border-body rounded-lg'>
                            <h4 className='text-xl text-primary font-semibold mb-2'>Total Orders</h4>
                            <h2 className='text-5xl text-white font-semibold mb-2'>{stats.totalOrders}</h2>
                        </div>
                        <div className='text-center p-8 bg-secondary border border-body rounded-lg'>
                            <h4 className='text-xl text-primary font-semibold mb-2'>Total Products</h4>
                            <h2 className='text-5xl text-white font-semibold mb-2'>{stats.totalProducts}</h2>
                        </div>
                        <div className='text-center p-8 bg-secondary border border-body rounded-lg'>
                            <h4 className='text-xl text-primary font-semibold mb-2'>Total Users</h4>
                            <h2 className='text-5xl text-white font-semibold mb-2'>{stats.totalUsers}</h2>
                        </div>
                        <div className='text-center p-8 bg-secondary border border-body rounded-lg'>
                            <h4 className='text-xl text-primary font-semibold mb-2'>Total Revenue</h4>
                            <h2 className='text-5xl text-white font-semibold mb-2'>₹{Number(stats.totalRevenue ?? 0).toFixed(2)}</h2>
                        </div>
                    </div>
                ) : (
                    <div className='text-center text-2xl text-primary'>Loading metrics...</div>
                )}

                <div>
                    <h3 className='text-xl text-white mb-5'>Administrative Controls</h3>
                    <div className='flex gap-5'>
                        <button className="bg-primary text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded cursor-pointer" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
                        <button className="bg-neutral-700 text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded cursor-pointer" onClick={() => navigate('/admin/products')}>📦 Manage Products</button>
                        <button className="bg-neutral-700 text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded cursor-pointer" onClick={() => navigate('/admin/orders')}>🚚 Manage Orders</button>
                        <button className="bg-neutral-700 text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded cursor-pointer" onClick={() => navigate('/admin/users')}>👥 Users Directory</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;