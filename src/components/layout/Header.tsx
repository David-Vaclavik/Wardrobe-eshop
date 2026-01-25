import { Link } from "react-router";
import "./../../styles/Header.css";
import logo40 from "../../assets/logo40.svg";
import { ShoppingCart, Store } from "lucide-react";
import { SearchBar } from "../SearchBar";
import type { CartItem } from "../../types";

type HeaderProps = {
  cartItems: CartItem[];
};

export function Header({ cartItems }: HeaderProps) {
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const displayQuantity = quantity > 99 ? "99+" : quantity;

  return (
    <header>
      <div className="header-main">
        <Link to="/">
          <img className="logo" src={logo40} alt="Shop Logo" />
        </Link>

        <SearchBar />

        <div className="controls">
          <Link to="/shop">
            <Store size={36} />
          </Link>

          <Link to="/cart" className="cart-icon">
            <ShoppingCart size={36} />
            {quantity > 0 && <span className="cart-badge">{displayQuantity}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
