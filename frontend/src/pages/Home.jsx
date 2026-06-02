import react, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCrads";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.slice(0, 3)); // Display only the first 3 products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hero-title">
        <h1 className="text-3xl font-bold mb-8">Welcome to Our Store</h1>
        <p className="text-lg mb-6">
          Discover our latest products and enjoy shopping with us!
        </p>
      </div>
      <div className="feature-product">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
