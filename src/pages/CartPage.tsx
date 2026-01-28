import "../styles/CartPage.css";
import type { Product } from "../types";
import { priceFormatter } from "../config/locale";
import { Trash2, X } from "lucide-react";
import { SHIPPING_FEE } from "../config/constants";
import { useCartContext } from "../context/useCartContext";

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, tax, total } =
    useCartContext();

  if (!cartItems) return null;

  const handleQuantityClick = (product: Product, quantity: number) => {
    updateQuantity(product, quantity);
  };

  return (
    <>
      <h1 className="main-h1">Order Summary</h1>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-items-header">
            <h2>Cart Items</h2>

            <button onClick={clearCart}>
              <X size={28} strokeWidth={2.5} color="red" />
              Clear Cart
            </button>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img src={item.product.images[0]} alt={item.product.title} />

              <div className="cart-item-details">
                <h3>{item.product.title}</h3>
                <h3>{priceFormatter.format(item.product.price)}</h3>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityClick(item.product, -1)}
                      style={{ borderRadius: "8px 0 0 8px" }}
                    >
                      -
                    </button>
                    <input type="number" min="0" value={item.quantity} readOnly />
                    <button
                      onClick={() => handleQuantityClick(item.product, 1)}
                      style={{ borderRadius: "0 8px 8px 0" }}
                    >
                      +
                    </button>
                  </div>

                  <button className="remove-button" onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h2>Summary</h2>

          <hr />

          <div className="subtotal">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span>{priceFormatter.format(subtotal)}</span>
            </div>

            <div className="subtotal-row">
              <span>Tax (21%)</span>
              <span>{priceFormatter.format(tax)}</span>
            </div>

            <div className="subtotal-row">
              <span>Shipping & Handling</span>
              <span>{priceFormatter.format(SHIPPING_FEE)}</span>
            </div>
          </div>

          <hr />

          <div className="total">
            <h3>Total</h3>
            <h3>{priceFormatter.format(total)}</h3>
          </div>

          <button>Checkout</button>
        </div>
      </div>
    </>
  );
}
