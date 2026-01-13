import { Outlet } from "react-router";
import "./styles/App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { useEffect } from "react";
import { fetchAllProducts } from "./services/productsApi";

function App() {
  // Fetch products on mount for testing purposes, will be refactored and moved in the next task
  useEffect(() => {
    fetchAllProducts()
      .then((products) => {
        console.log("Fetched products:", products);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
