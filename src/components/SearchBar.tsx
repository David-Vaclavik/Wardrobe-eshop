import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import type { Product } from "../types";
import { useNavigate, useSearchParams } from "react-router";
import { fetchProducts } from "../services/productsApi";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsOpen(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const normalizedQuery = inputValue.toLowerCase().trim();

      if (normalizedQuery === "") {
        setFilteredData([]);
        return;
      }

      fetchProducts(normalizedQuery, null, "id", "asc", 0, 0).then((data) => {
        // We filter again on client side because API searches multiple fields, we want title only
        setFilteredData(
          data.products
            .filter((item) => item.title.toLowerCase().includes(normalizedQuery))
            .splice(0, 5)
        );
      });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Changing search param triggers new fetch in useProducts hook
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === searchQuery) return;

    if (searchTerm) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          placeholder="Search..."
          value={searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={handleInput}
          onBlur={() => setIsOpen(false)}
          style={{ borderRadius: isOpen ? "8px 0 0 0" : "8px 0 0 8px" }}
        />

        <ul className={isOpen ? "open" : ""}>
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
              <li
                key={product.id}
                onPointerDown={() => {
                  setSearchTerm(product.title);
                  setIsOpen(false);
                }}
              >
                {product.title}
              </li>
            ))
          ) : (
            <li>No matches found</li>
          )}
        </ul>

        <button type="submit" style={{ borderRadius: isOpen ? "0 8px 0 0" : "0 8px 8px 0" }}>
          Search
        </button>
      </form>
    </div>
  );
}
