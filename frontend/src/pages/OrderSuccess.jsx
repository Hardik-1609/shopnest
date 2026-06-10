import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="container py-20 mx-auto h-screen flex justify-center items-center">
            <div className="text-center w-[40%] mx-auto flex flex-col justify-center items-center p-5 border bg-[#18181B] border-[#333] rounded-lg">
                <p className="text-2xl text-green-500 font-medium mb-6">Order Successful!</p>
                <Link to="/shop" className="bg-primary block mx-auto text-white hover:bg-white hover:text-primary font-medium py-2 px-4 rounded">
                    Go back to shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;