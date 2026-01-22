import { useOutletContext, useParams } from "react-router";
import type { OutletContext } from "../types";
import "../styles/ProductPage.css";
import { priceFormatter } from "../config/locale";
import { useState } from "react";

export function ProductPage() {
  const [imageId, setImageId] = useState(0);
  const { id } = useParams();
  const { cart } = useOutletContext<OutletContext>();
  const { cartItems, updateQuantity } = cart;

  const { products } = useOutletContext<OutletContext>();
  const product = products.find((product) => product.id === Number(id));

  if (!product) return null;

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  const handleImages = (direction: "prev" | "next") => {
    if (!product) return;

    if (direction === "next") {
      setImageId((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
    } else if (direction === "prev") {
      setImageId((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
    }
  };

  const handleQuantityClick = (quantity: number) => {
    if (!product) return;

    updateQuantity(product, quantity);
  };

  return (
    <div className="product-page">
      <div className="image-carousel">
        <img src={product.images[imageId]} alt={product.title} height={300} />
        <div className="image-carousel-controls">
          <button onClick={() => handleImages("prev")}>{"<"}</button>
          <button onClick={() => handleImages("next")}>{">"}</button>
        </div>
      </div>

      <div className="product-details">
        <h2>{product.title}</h2>

        <div className="product-info">
          <h2>Price: {priceFormatter.format(product.price)}</h2>
          <p>Product ID: {id}</p>
          <p>Category: {product.category}</p>
        </div>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className="quantity-controls">
          {quantityInCart === 0 ? (
            <button onClick={() => handleQuantityClick(1)}>Add to Cart</button>
          ) : (
            <>
              <button
                onClick={() => handleQuantityClick(-1)}
                style={{ borderRadius: "8px 0 0 8px" }}
              >
                -
              </button>
              <input type="number" min="0" value={quantityInCart} readOnly />
              <button
                onClick={() => handleQuantityClick(1)}
                style={{ borderRadius: "0 8px 8px 0" }}
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
