import { Link } from "react-router";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Wardrobe</h1>
        <h3>Beyond what you wear</h3>
        <Link to="/shop">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
}
