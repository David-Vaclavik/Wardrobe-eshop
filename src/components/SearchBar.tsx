import { useState } from "react";
import "../styles/SearchBar.css";

// Placeholder data for now, don't want to deal with API yet
const placeholderData = [
  { id: 1, title: "Red Shirt" },
  { id: 2, title: "Blue Jeans" },
  { id: 3, title: "Green Hat" },
  { id: 4, title: "Yellow Jacket" },
  { id: 5, title: "Black Shoes" },
  { id: 6, title: "Red Socks" },
];

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(placeholderData);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsOpen(true);

    const filtered = placeholderData.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // For now a placeholder submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
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
          {filteredData.map((product) => (
            <li
              key={product.id}
              onPointerDown={() => {
                setSearchTerm(product.title);
                setIsOpen(false);
              }}
            >
              {product.title}
            </li>
          ))}
        </ul>

        <button type="submit" style={{ borderRadius: isOpen ? "0 8px 0 0" : "0 8px 8px 0" }}>
          Search
        </button>
      </form>
    </div>
  );
}
