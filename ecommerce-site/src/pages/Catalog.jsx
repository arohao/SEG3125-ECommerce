import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import ProductList from "../components/ProductList.jsx";
import Nav from "../components/Nav.jsx";

// Normalize prices and prepare deal flags
const rawProducts = products.map((p) => ({
  ...p,
  price: parseFloat(p.price.replace(/[^0-9.]/g, "")),
  originalPrice: p.originalPrice
    ? parseFloat(p.originalPrice.replace(/[^0-9.]/g, ""))
    : null,
}));

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(rawProducts);
  const [dealsFilter, setDealsFilter] = useState("all");

  const priceValues = rawProducts.map((p) => p.price);
  const globalMin = Math.min(...priceValues);
  const globalMax = Math.max(...priceValues);
  const [minPrice, setMinPrice] = useState(globalMin);
  const [maxPrice, setMaxPrice] = useState(globalMax);

  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showDeals, setShowDeals] = useState(false);

  useEffect(() => {
    const categoriesFromParams = searchParams.getAll("category");
    const brandsFromParams = searchParams.getAll("brand");
    const dealsParam = searchParams.get("deals");

    setSelectedCategories(categoriesFromParams);
    setSelectedBrands(brandsFromParams);

    if (dealsParam === "true") {
      setDealsFilter("deals");
    } else if (dealsParam === "false") {
      setDealsFilter("no-deals");
    } else {
      setDealsFilter("all");
    }

    let filtered = rawProducts;

    if (categoriesFromParams.length > 0) {
      filtered = filtered.filter((p) =>
        categoriesFromParams.includes(p.category)
      );
    }

    if (brandsFromParams.length > 0) {
      filtered = filtered.filter((p) =>
        brandsFromParams.includes(p.brand)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (dealsParam === "true") {
      filtered = filtered.filter((p) => p.deal);
    } else if (dealsParam === "false") {
      filtered = filtered.filter((p) => !p.deal);
    }

    filtered.sort((a, b) => {
      const aDiscount =
        a.originalPrice && a.originalPrice > a.price
          ? (a.originalPrice - a.price) / a.originalPrice
          : 0;
      const bDiscount =
        b.originalPrice && b.originalPrice > b.price
          ? (b.originalPrice - b.price) / b.originalPrice
          : 0;
      return bDiscount - aDiscount;
    });

    setFilteredProducts(filtered);
  }, [searchParams, minPrice, maxPrice]);

  const updateParams = (key, values) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    values.forEach((v) => newParams.append(key, v));
    setSearchParams(newParams);
  };

  const handleCategoryChange = (slug) => {
    const updated = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];
    setSelectedCategories(updated);
    updateParams("category", updated);
  };

  const handleBrandChange = (slug) => {
    const updated = selectedBrands.includes(slug)
      ? selectedBrands.filter((b) => b !== slug)
      : [...selectedBrands, slug];
    setSelectedBrands(updated);
    updateParams("brand", updated);
  };

  const handleDealsChange = (value) => {
    setDealsFilter(value);
    const newParams = new URLSearchParams(searchParams);
    if (value === "deals") {
      newParams.set("deals", "true");
    } else if (value === "no-deals") {
      newParams.set("deals", "false");
    } else {
      newParams.delete("deals");
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice(globalMin);
    setMaxPrice(globalMax);
    setDealsFilter("all");
    setSearchParams({});
  };

  return (
    <>
      <Nav />
      <div className="container py-4">
        <h1 className="mb-4">Catalog</h1>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm sticky-top" style={{ top: "80px" }}>
              <div className="card-body">

                {/* Categories */}
                <button
                  className="btn btn-link w-100 text-start"
                  onClick={() => setShowCategories((v) => !v)}
                >
                  <strong>Categories</strong>
                  <span className="float-end">
                    {showCategories ? "▲" : "▼"}
                  </span>
                </button>
                {showCategories && (
                  <div className="mb-3">
                    {categories.map((cat) => (
                      <div className="form-check" key={cat.slug}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`cat-${cat.slug}`}
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => handleCategoryChange(cat.slug)}
                        />
                        <label
                          htmlFor={`cat-${cat.slug}`}
                          className="form-check-label"
                        >
                          {cat.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Brands */}
                <button
                  className="btn btn-link w-100 text-start"
                  onClick={() => setShowBrands((v) => !v)}
                >
                  <strong>Brands</strong>
                  <span className="float-end">{showBrands ? "▲" : "▼"}</span>
                </button>
                {showBrands && (
                  <div className="mb-3">
                    {brands.map((brand) => (
                      <div className="form-check" key={brand.slug}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`brand-${brand.slug}`}
                          checked={selectedBrands.includes(brand.slug)}
                          onChange={() => handleBrandChange(brand.slug)}
                        />
                        <label
                          htmlFor={`brand-${brand.slug}`}
                          className="form-check-label"
                        >
                          {brand.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Range */}
                <button
                  className="btn btn-link w-100 text-start"
                  onClick={() => setShowPrice((v) => !v)}
                >
                  <strong>Price Range</strong>
                  <span className="float-end">{showPrice ? "▲" : "▼"}</span>
                </button>
                {showPrice && (
                  <div className="mb-3">
                    <label className="form-label">
                      Min: ${minPrice.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={globalMin}
                      max={globalMax}
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(Math.min(Number(e.target.value), maxPrice))
                      }
                    />

                    <label className="form-label mt-3">
                      Max: ${maxPrice.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={globalMin}
                      max={globalMax}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Math.max(Number(e.target.value), minPrice))
                      }
                    />
                  </div>
                )}

                {/* Deals */}
                <button
                  className="btn btn-link w-100 text-start"
                  onClick={() => setShowDeals((v) => !v)}
                >
                  <strong>Deals</strong>
                  <span className="float-end">{showDeals ? "▲" : "▼"}</span>
                </button>
                {showDeals && (
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="dealsAll"
                        name="dealsFilter"
                        checked={dealsFilter === "all"}
                        onChange={() => handleDealsChange("all")}
                      />
                      <label htmlFor="dealsAll" className="form-check-label">
                        All Products
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="dealsOnly"
                        name="dealsFilter"
                        checked={dealsFilter === "deals"}
                        onChange={() => handleDealsChange("deals")}
                      />
                      <label htmlFor="dealsOnly" className="form-check-label">
                        Deals Only
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="noDeals"
                        name="dealsFilter"
                        checked={dealsFilter === "no-deals"}
                        onChange={() => handleDealsChange("no-deals")}
                      />
                      <label htmlFor="noDeals" className="form-check-label">
                        No Deals
                      </label>
                    </div>
                  </div>
                )}

                <button
                  className="btn btn-outline-secondary w-100 mt-4"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-md-9">
            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} />
            ) : (
              <div className="alert alert-warning">
                No products match your selected filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
