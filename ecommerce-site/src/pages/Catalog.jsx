import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import ProductList from "../components/ProductList.jsx";
import Nav from "../components/Nav.jsx";

const categories = [
  { slug: "laptops", label: "Laptops & Tablets" },
  { slug: "desktops", label: "Desktops" },
  { slug: "cpus", label: "CPUs" },
  { slug: "keyboards", label: "Keyboards" },
  { slug: "mice", label: "Mice" },
  { slug: "monitors", label: "Monitors" },
];

const brands = [
  { slug: "intel", label: "Intel" },
  { slug: "amd", label: "AMD" },
  { slug: "logitech", label: "Logitech" },
  { slug: "asus", label: "ASUS" },
  { slug: "hp", label: "HP" },
  { slug: "corsair", label: "Corsair" },
  { slug: "dell", label: "Dell" },
  { slug: "samsung", label: "Samsung" },
  { slug: "apple", label: "Apple" },
  { slug: "msi", label: "MSI" },
  { slug: "razer", label: "Razer" },
  { slug: "steelseries", label: "SteelSeries" },
  { slug: "microsoft", label: "Microsoft" },
  { slug: "acer", label: "Acer" },
  { slug: "lenovo", label: "Lenovo" },
];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";

    setSelectedCategory(category);
    setSelectedBrand(brand);

    let filtered = products;

    if (category) filtered = filtered.filter((p) => p.category === category);
    if (brand) filtered = filtered.filter((p) => p.brand === brand);

    setFilteredProducts(filtered);
  }, [searchParams]);

  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  }

  function handleBrandChange(e) {
    const brand = e.target.value;
    setSelectedBrand(brand);
    if (brand) {
      searchParams.set("brand", brand);
    } else {
      searchParams.delete("brand");
    }
    setSearchParams(searchParams);
  }

  return (
    <><Nav />
      <div className="container py-4">
        <h1>Catalog</h1>

        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="categorySelect" className="form-label">
              Filter by Category
            </label>
            <select
              id="categorySelect"
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="brandSelect" className="form-label">
              Filter by Brand
            </label>
            <select
              id="brandSelect"
              className="form-select"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.slug} value={brand.slug}>
                  {brand.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProductList products={filteredProducts} />
      </div>
    </>
  );
}
