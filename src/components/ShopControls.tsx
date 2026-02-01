import "../styles/ShopControls.css";
import { useSearchParams } from "react-router";
import { useCategoryList } from "../hooks/useCategoryList";

export function ShopControls() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || null;
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";

  const categories = useCategoryList();

  const handleCategoryChange = (newCategory: string | null) => {
    if (newCategory === category) return;

    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrder] = e.target.value.split("-");
    if (newSortBy === sortBy && newOrder === order) return;

    const params: Record<string, string> = {
      sortBy: newSortBy,
      order: newOrder,
    };

    if (search) {
      params.search = search;
    } else if (category !== "all") {
      params.category = category;
    }

    setSearchParams(params);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    handleCategoryChange(selected === "all" ? null : selected);
  };

  //TODO: Add new custom select CSS
  return (
    <div className="shop-controls">
      <select value={category} onChange={handleSelectChange}>
        <option key={"all"} value="all">
          All Categories
        </option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      <select onChange={handleSortByChange} value={`${sortBy}-${order}`}>
        <option value="id-asc">Sort by: Featured</option>
        <option value="price-asc">Sort by: Price (Low to High)</option>
        <option value="price-desc">Sort by: Price (High to Low)</option>
        <option value="rating-asc">Sort by: Rating (Low to High)</option>
        <option value="rating-desc">Sort by: Rating (High to Low)</option>
        <option value="title-asc">Sort by: Title (A to Z)</option>
        <option value="title-desc">Sort by: Title (Z to A)</option>
      </select>
    </div>
  );
}
