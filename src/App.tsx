import { Outlet } from "react-router";
import "./styles/Variables.css";
import "./styles/App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ErrorState } from "./components/ErrorState";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { products, error, isLoading, hasMore, setSkip } = useProducts();

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
            }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
