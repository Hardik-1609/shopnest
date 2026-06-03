import react from "react";
import { Link } from "react-router-dom";

const ProductCards = ({ product }) => {
  return (
    <div className="border relative border-body hover:border-primary rounded-lg">
      <div className="product-img w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-55 object-cover mb-4 rounded-t-lg"
        />
      </div>
      <div className="product-details p-5">
        <div className="product-info">
          <h2 className="text-2xl text-white font-semibold mb-2">
            {product.name}
          </h2>
          <p className="text-lg text-gray-300 mb-4">{product.description}</p>
          <p className="text-xl text-white font-bold mb-15">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Link
          to={`/products/${product.id || product._id}`}
          className="block absolute bottom-5 bg-primary text-white hover:bg-white hover:text-primary text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCards;
