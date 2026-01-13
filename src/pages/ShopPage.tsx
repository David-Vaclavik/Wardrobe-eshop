import { Link, useOutletContext } from "react-router";
import type { OutletContext } from "../types";

export function ShopPage() {
  const { setSkip, products } = useOutletContext<OutletContext>();
  return (
    <>
      <h1>Shop Page</h1>
      {/* temporary buttons for testing purposes only */}
      <button onClick={() => console.log(products)}>CLG products</button>
      <button onClick={() => setSkip((prev) => prev + 20)}>+20</button>
      {/* product has an dynamic id parameter, hardcoded for now */}
      {/* temporary solution for testing purposes only, later it will be assigned properly to each product */}
      <Link to="/product/1">
        <button>Product 1</button>
      </Link>
      <Link to="/product/2">
        <button>Product 2</button>
      </Link>
      <Link to="/product/3">
        <button>Product 3</button>
      </Link>
    </>
  );
}
