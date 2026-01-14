import { useOutletContext } from "react-router";
import type { OutletContext } from "../types";
import { ProductsGrid } from "../components/ProductsGrid";

export function ShopPage() {
  const { setSkip, products } = useOutletContext<OutletContext>();

  return (
    <>
      <h1>Shop Page</h1>
      {/* temporary buttons for testing purposes only */}
      <button onClick={() => console.log(products)}>CLG products</button>

      <ProductsGrid products={products} />

      {/* //TODO: make it infinite scroll, where scroll is trigger not button */}
      <button onClick={() => setSkip((prev) => prev + 20)}>Load +20 products</button>
    </>
  );
}
