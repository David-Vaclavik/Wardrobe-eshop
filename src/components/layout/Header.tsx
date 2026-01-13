import { Link } from "react-router";
import "./../../styles/Header.css";

export function Header() {
  return (
    <header>
      <h1>Header</h1>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/shop">
          <button>Shop</button>
        </Link>
        {/* product has an dynamic id parameter, hardcoded for now */}
        {/* temporary solution for testing purposes only, will be removed later */}
        <Link to="/product/1">
          <button>Product</button>
        </Link>
        <Link to="/cart">
          <button>Cart</button>
        </Link>
        <Link to="/error">
          <button>ErrorPage</button>
        </Link>
      </nav>
    </header>
  );
}
