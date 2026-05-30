import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Adjust the path as needed
  const cartItems = useSelector((state) => state.cart.items); // Adjust the path as needed
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="nav-bar py-5 px-12 bg-secondary border-b border-body">
      <div className="grid grid-cols-2 items-center justify-between">
        <div className="logo flex items-center space-x-2">
          <Link
            className="flex items-center gap-3 text-3xl text-white font-bold"
            to="/"
          >
            <img
              src="./logo.png"
              alt="ShopNest Logo"
              className="h-10 rounded shadow-[0_0_20px_#ed5d0e80] w-auto"
            />
            ShopNest
          </Link>
        </div>
        <div className="menu flex justify-end">
          <ul className="flex space-x-6 text-body">
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Hi, {user.name}</Link>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link to="/admin">Admin Dashboard</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
