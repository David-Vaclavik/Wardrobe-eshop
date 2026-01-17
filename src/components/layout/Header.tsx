import { Link } from "react-router";
import "./../../styles/Header.css";
import logo40 from "../../assets/logo40.svg";
import { ShoppingCart, Store } from "lucide-react";
import { SearchBar } from "../SearchBar";

export function Header() {
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
          <Link to="/cart">
            <ShoppingCart size={36} />
          </Link>
        </div>
      </div>
    </header>
  );
}
