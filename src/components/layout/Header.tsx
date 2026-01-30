import { Link } from "react-router";
import "./../../styles/Header.css";
import logo40 from "../../assets/logo40.svg";
import logo from "../../assets/logo.svg";
import { ShoppingCart, Store } from "lucide-react";
import { SearchBar } from "../SearchBar";
import { useCartContext } from "../../context/useCartContext";
import { Modal } from "../modal/Modal";

export function Header() {
  const { cartItems } = useCartContext();

  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const displayQuantity = quantity > 99 ? "99+" : quantity;

  return (
    <header>
      <div className="header-main">
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={logo40} alt="Shop Logo" />
          </Link>
          <Link to="/">
            <img className="logo-mobile" src={logo} alt="Shop Logo" />
          </Link>
        </div>

        <SearchBar className="header-search" />

        <div className="controls">
          <Modal />

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
