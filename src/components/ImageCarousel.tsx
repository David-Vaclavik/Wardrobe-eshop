import { useState } from "react";
import type { Product } from "../types";
import "../styles/ImageCarousel.css";

type ImageCarouselProps = {
  product: Product;
};

export function ImageCarousel({ product }: ImageCarouselProps) {
  const [imageId, setImageId] = useState(0);

  return (
    <div className="image-carousel">
      <img className="image-main" src={product.images[imageId]} alt={product.title} />

      <div className="carousel-thumbs">
        {product.images.map((image, index) => (
          <button
            key={index}
            className={index === imageId ? "active-thumb" : ""}
            onClick={() => setImageId(index)}
          >
            <img src={image} alt={`${product.title} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
