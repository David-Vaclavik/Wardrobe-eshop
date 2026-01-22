import { Outlet, useSearchParams } from "react-router";
import "./styles/Variables.css";
import "./styles/App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { useState } from "react";
import { ErrorState } from "./components/ErrorState";
import { useCart } from "./hooks/useCart";
import { useProducts } from "./hooks/useProducts";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [skip, setSkip] = useState(0);
  const category = searchParams.get("category") || null;

  const cart = useCart();

  const { products, error, isLoading, hasMore, setProducts, setHasMore } = useProducts(
    category,
    skip
  );

  const handleCategoryChange = (newCategory: string | null) => {
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }

    setProducts([]);
    setSkip(0);
    setHasMore(true);
  };

  return (
    <>
      <Header />
      <main>
        {error ? (
          <ErrorState message={error} />
        ) : (
          <Outlet
            context={{
              setSkip,
              products,
              isLoading,
              hasMore,
              cart,
              handleCategoryChange,
            }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
