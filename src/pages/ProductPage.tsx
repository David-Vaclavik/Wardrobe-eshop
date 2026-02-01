import { useOutletContext, useParams } from "react-router";
import type { OutletContext } from "../types";
import "../styles/ProductPage.css";
import { priceFormatter } from "../config/locale";
import { ImageCarousel } from "../components/ImageCarousel";
import { QuantityControl } from "../components/QuantityControl";

export function ProductPage() {
  const { id } = useParams();
  const { products } = useOutletContext<OutletContext>();
  const product = products.find((product) => product.id === Number(id));

  if (!product) return null;

  return (
    <div className="product-page">
      <ImageCarousel product={product} />

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

        <QuantityControl product={product} />
      </div>
    </div>
  );
}
