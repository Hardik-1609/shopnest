import react, { createContext, useState } from "react";
import { link } from "react-router-dom";

const ProductCards = ({ product }) => {
  return (
    <div className="border rounded-lg p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <div className="product-info">
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
      </div>
      <Link
        to={`/products/${product.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
};
