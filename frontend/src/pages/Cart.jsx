import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantity = (item, quantity) => {
    if (quantity > 0) {
      dispatch(addToCart({ ...item, quantity }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container py-20">
      <h2 className="text-4xl font-bold text-white mb-10">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center w-[30%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
          <p className="text-2xl text-white font-medium mb-6">Your cart is empty.</p>
          <Link to="/shop" className="bg-primary block mx-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded">
            Go back to shopping
          </Link>
        </div>
      ) : (
        <div className="flex gap-10 items-start">
          <div className="grid grid-cols-1 gap-4 w-[60%]">
            {cartItems.map((item) => (
              <div key={item.id} className="w-full mx-auto flex flex-row justify-start items-center gap-20 p-5 border bg-[#18181B] border-[#333] rounded-lg">
                <div className="cart-item-img">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="cart-item-info">
                  <h3 className="text-2xl text-white font-medium mb-2">{item.name}</h3>
                  <p className="text-xl text-white font-medium mb-4">${item.price.toFixed(2)}</p>
                  <div className="cart-btn flex items-center mb-3">
                    <button
                      onClick={() => handleQuantity(item, item.quantity - 1)}
                      className="bg-primary block text-white hover:bg-white hover:text-primary font-medium py-1 px-3 rounded"
                    >
                      -
                    </button>
                    <span className="bg-[#333] block text-md text-white font-medium py-1 px-3 mx-3 rounded">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item, item.quantity + 1)}
                      className="bg-primary block text-white hover:bg-white hover:text-primary font-medium py-1 px-3 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-2 bg-red-500 text-white hover:bg-red-600 py-1 px-3 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center w-[40%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
            <p className="text-2xl text-white font-medium mb-6">Total: {totalPrice.toFixed(2)}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-primary block mx-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
