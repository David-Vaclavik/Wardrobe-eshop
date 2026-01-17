import { useOutletContext, useParams } from "react-router";
import type { OutletContext } from "../types";
import "../styles/ProductPage.css";
import { priceFormatter } from "../config/locale";
import { useState } from "react";

export function ProductPage() {
  const [imageId, setImageId] = useState(0);
  const { id } = useParams();

  const { products } = useOutletContext<OutletContext>();
  const product = products.find((product) => product.id === Number(id));

  const handleImages = (direction: "prev" | "next") => {
    if (direction === "next") {
      setImageId((prev) => (prev < product!.images.length - 1 ? prev + 1 : 0));
    } else if (direction === "prev") {
      setImageId((prev) => (prev > 0 ? prev - 1 : product!.images.length - 1));
    }
  };

  if (!product) return null;

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
        <h3>Price: {priceFormatter.format(product.price)}</h3>
        <p>Product ID: {id}</p>
        <p>Category: {product.category}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
