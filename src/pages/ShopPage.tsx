import { Link } from "react-router";

export function ShopPage() {
  return (
    <>
      <h1>Shop Page</h1>
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
