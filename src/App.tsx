import { Outlet } from "react-router";
import "./styles/Variables.css";
import "./styles/App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { useEffect, useState } from "react";
import { fetchPaginatedProducts } from "./services/productsApi";
import type { Product } from "./types";
import { ErrorState } from "./components/ErrorState";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Maybe it's time to move this shit to custom hook? IDK
  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const data = await fetchPaginatedProducts(skip);

        if (ignore) return;

        setProducts((prev) => {
          const newProducts = [...prev, ...data.products];

          if (newProducts.length >= data.total) {
            setHasMore(false);
          }

          return newProducts;
        });
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "An error occurred");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    if (hasMore) {
      loadProducts();
    }

    return () => {
      ignore = true;
    };
  }, [skip, hasMore]);

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet context={{ setSkip, products, isLoading, hasMore }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
