import { useEffect, useRef, useState } from "react";
import type { Product } from "../types";
import "../styles/ImageCarousel.css";

type ImageCarouselProps = {
  product: Product;
};

export function ImageCarousel({ product }: ImageCarouselProps) {
  const [imageId, setImageId] = useState(0);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Ignore typing contexts, to not interfere with user input in search bar
      const isTypingContext =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if (isTypingContext) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setImageId((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setImageId((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product.images.length]);

  // Auto-scroll thumbnails to keep active thumb in view
  useEffect(() => {
    if (activeThumbRef.current && thumbsContainerRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [imageId]);

  if (!product.images || product.images.length === 0) {
    return <div className="image-carousel-empty">No images available</div>;
  }

  return (
    <div className="image-carousel">
      <img
        className="image-main"
        src={product.images[imageId]}
        alt={product.title}
        draggable={false}
      />

      <div className="carousel-thumbs" ref={thumbsContainerRef}>
        {product.images.map((image, index) => (
          <button
            key={index}
            ref={index === imageId ? activeThumbRef : null}
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
