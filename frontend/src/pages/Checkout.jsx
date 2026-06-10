import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import ordersuccess from "./OrderSuccess";

function Checkout() {
    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: "",
        street: "",
        city: "",
        country: "",
        postalCode: "",
    });

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const formattedItems = cartItems.map((item) => ({
        product: item.id,
        qty: item.quantity,
        price: item.price,
    }));

    const handlePayment = async () => {
        try {
            const orderRes = await fetch("/api/payments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: totalPrice }),
            });

            const orderData = await orderRes.json();
            const order = orderData.order || orderData;

            if (!orderRes.ok || !orderData.key || !order || !order.id) {
                const fallback = window.confirm("Razorpay Keys unconfigured or order creation failed. Use student bypass? (This will not process real payments)");
                if (fallback) {
                    return bypassPayment();
                } else {
                    return alert("Payment failed. Please try again later.");
                }
            }

            const options = {
                key: orderData.key,
                amount: order.amount,
                currency: order.currency,
                name: "E-Commerce App",
                description: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await fetch("/api/payments/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(response),
                    });
                    if (verifyRes.ok) {
                        const saveOrderRes = await fetch("/api/orders", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${user.token}`,
                            },
                            body: JSON.stringify({
                                items: formattedItems,
                                totalAmount: totalPrice,
                                address,
                                paymentId: response.razorpay_payment_id,
                            }),
                        });
                        if (saveOrderRes.ok) {
                            dispatch(clearCart());
                            navigate("/ordersuccess");
                        } else {
                            alert("Failed to save order. Please contact support.");
                        }
                    } else {
                        alert("Payment verification failed. Please try again.");
                    }
                },
                prefill: {
                    name: address.fullName,
                    email: user.email,
                    contact: "9999999999",
                },
                theme: {
                    color: "#F37254",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    const bypassPayment = async () => {
        const saveOrderRes = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                items: formattedItems,
                totalAmount: totalPrice,
                address,
                paymentId: 'bypass_txn_' + Date.now(),
            }),
        });
        const saveOrderData = await saveOrderRes.json();
        if (saveOrderRes.ok) {
            dispatch(clearCart());
            navigate("/ordersuccess");
        } else {
            alert(saveOrderData.message || "Failed to save order. Please try again later.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to proceed with checkout.");
            navigate("/login");
            return;
        }
        handlePayment();
    };

    return (
        <div className="container h-[100vh] flex items-center justify-center mx-auto">
            <div className="register-card w-[40%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
                <h2 className="text-3xl text-center text-white font-semibold mb-6">Shopping Address</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" className="w-full bg-secondary text-white p-3 rounded-lg" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                    <input type="text" className="w-full bg-secondary text-white p-3 rounded-lg" placeholder="Street" required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                    <input type="text" className="w-full bg-secondary text-white p-3 rounded-lg" placeholder="City" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    <input type="text" className="w-full bg-secondary text-white p-3 rounded-lg" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
                    <input type="text" className="w-full bg-secondary text-white p-3 rounded-lg" placeholder="Country" required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                    <div className="checkout-summary flex flex-col items-end mt-6 pt-6 border-t border-[#333]">
                        <h4 className="text-white font-bold mb-3 text-xl">Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
                        <button type="submit" className="bg-primary block ms-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded">
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;