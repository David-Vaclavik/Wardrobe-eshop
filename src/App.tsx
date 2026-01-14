import { Outlet } from "react-router";
import "./styles/Variables.css";
import "./styles/App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { useEffect, useState } from "react";
import { fetchPaginatedProducts } from "./services/productsApi";
import type { Product } from "./types";

function App() {
  // Fetch products on mount for testing purposes, will be refactored and moved in the next task
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        const data = await fetchPaginatedProducts(skip);

        if (ignore) return;
        setProducts((prev) => [...prev, ...data.products]);
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "An error occurred");
        }
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [skip]);

  if (error) return <p>Error: {error}</p>;
  if (!products) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <main>
        <Outlet context={{ setSkip, products }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
