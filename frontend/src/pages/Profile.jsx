import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            if (!user) {
                navigate("/login");
                return;
            }
            const fetchMyOrsers = async () => {
                try {
                    const response = await fetch("/api/orders/myorders", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setOrders(Array.isArray(data.orders) ? data.orders : []);
                    } else {
                        if (response.status === 401) {
                            logout();
                            navigate('/login');
                        }
                        setOrders([]);
                    }
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchMyOrsers();
        }, [user, navigate]
    );

    const handelLogout = () => {
        logout();
        navigate('/login')
    }

    if (!user) return null;

    return (
        <div className="container py-20 ">
            <div className="user-order w-[70%] mx-auto p-5 bg-[#18181B] border border-[#333] rounded-lg">
                <div className="user-info-card flex justify-between items-baseline pb-4 border-b border-[#333]">
                    <div className="user-info">
                        <h2 className="text-3xl text-white font-semibold mb-3"><span className="text-accent">{user.name}</span> Profile</h2>
                        <p className="text-gray-300 mb-3"><strong>Name:</strong> {user.name}</p>
                        <p className="text-gray-300 mb-3"><strong>Email:</strong> {user.email}</p>;
                        <span className="text-gray-300 inline-block mb-3 p-2 text-sm font-medium text-accent bg-[#ed5d0e33] rounded-lg">Account Type: {user.role.toUpperCase()}</span>
                    </div>
                    <button onClick={handelLogout} className="mt-2 bg-red-500 text-white hover:bg-red-600 py-1 px-3 rounded">Logout</button>
                </div>
                <div className="user-order pt-4">
                    <h3 className="text-2xl text-primary font-semibold mb-5">Order History</h3>
                    {loading ? (<p className="text-gray-300 text-center">Fetching Your Product</p>) : orders.length === 0 ? (
                        <div className="text-center w-[50%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
                            <p className="text-2xl text-white font-medium mb-6">You haven't placed any orders yet.</p>
                            <Link to="/shop" className="bg-primary block mx-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded">
                                Go back to shopping
                            </Link>
                        </div>
                    ) : (<div className="user-info-card flex flex-col gap-5 justify-between items-baseline pb-4 border-b border-[#333]">
                        {orders.map(order => (
                            <div className="user-info-inner p-5 w-full flex justify-between items-start bg-secondary border border-body rounded-lg" key={order._id}>
                                <div className="user-info">
                                    <p className="text-gray-300 mb-3"><strong>Order Id:</strong> {order._id}</p>
                                    <p className="text-gray-300 mb-3"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p className="text-gray-300"><strong>Total Amount:</strong> <span className="text-green-500">${order.totalAmount.toFixed(2)}</span></p>
                                </div>
                                <span className="inline-block mt-2 bg-red-500 text-white hover:bg-red-600 py-1 px-3 rounded">{order.status}</span>
                            </div>
                        ))
                        }
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default Profile