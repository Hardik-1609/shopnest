import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        adminToken: "",
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! You can now log in.");
                login(data);
                navigate("/shop");
            } else {
                alert(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container h-[100vh] flex items-center justify-center mx-auto">
            <div className="register-card w-[30%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
                <h2 className="text-3xl text-center text-white font-semibold mb-6">User Registration</h2>
                <form onSubmit={handleChange} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <input
                        type="text"
                        name="adminToken"
                        placeholder="Admin Token (Optional)"
                        className="w-full bg-secondary text-white p-3 rounded-lg"
                        value={formData.adminToken}
                        onChange={(e) => setFormData({ ...formData, adminToken: e.target.value })} />
                    <button type="submit" className="bg-primary block mx-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded">
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-300 mt-4">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
