import { useCartContext } from "../context/useCartContext";
import type { Product } from "../types";
import "../styles/QuantityControl.css";

type QuantityControlProps = {
  product: Product;
};

export function QuantityControl({ product }: QuantityControlProps) {
  const { cartItems, updateQuantity } = useCartContext();

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  const handleQuantityClick = (quantity: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation
    updateQuantity(product, quantity);
  };

  //TODO: Refactor to use lucide icons for plus and minus buttons
  return (
    <div className="quantity-controls">
      {quantityInCart === 0 ? (
        <button onClick={(e) => handleQuantityClick(1, e)}>Add to Cart</button>
      ) : (
        <>
          <button
            onClick={(e) => handleQuantityClick(-1, e)}
            style={{ borderRadius: "8px 0 0 8px" }}
          >
            -
          </button>
          <input type="number" min="0" value={quantityInCart} readOnly />
          <button
            onClick={(e) => handleQuantityClick(1, e)}
            style={{ borderRadius: "0 8px 8px 0" }}
          >
            +
          </button>
        </>
      )}
    </div>
  );
}
