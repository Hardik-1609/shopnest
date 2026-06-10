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
    <div className="container mx-auto">
      <div className="hero-title rounded-2xl border border-body bg-[radial-gradient(circle_at_top_right,_#f9731633,_#0000_60%),linear-gradient(135deg,_#18181b,_#09090b)] flex flex-col justify-around items-center mt-12 p-30">
        <h1 className="text-white text-5xl font-bold mb-8">
          Welcome to Our Store
        </h1>
        <p className="text-white text-xl mb-6">
          Discover our latest products and enjoy shopping with us!
        </p>
      </div>
      <div className="feature-product py-12">
        <h2 className="text-white text-3xl font-semibold mb-10">
          Featured Products
        </h2>
        {loading ? (
          <p className="text-white">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
