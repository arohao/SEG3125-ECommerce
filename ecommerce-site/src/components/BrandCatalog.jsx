import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList.jsx";

const brandData = {
  intel: {
    name: "Intel",
    description: "High performance CPUs and technology from Intel.",
    products: [
      { id: 1, name: "Intel Core i9-13900K", price: "$589", img: "https://via.placeholder.com/150" },
      { id: 2, name: "Intel Core i7-13700K", price: "$409", img: "https://via.placeholder.com/150" },
    ],
  },
  amd: {
    name: "AMD",
    description: "AMD processors, graphics cards, and more.",
    products: [
      { id: 3, name: "AMD Ryzen 9 7950X", price: "$699", img: "https://via.placeholder.com/150" },
      { id: 4, name: "AMD Ryzen 7 7700X", price: "$399", img: "https://via.placeholder.com/150" },
    ],
  },
  // Other brands...
};

const BrandCatalog = () => {
  const { brandSlug } = useParams();
  const brand = brandData[brandSlug];

  if (!brand) {
    console.log("brandSlug:", brandSlug);
    console.log("brandData keys:", Object.keys(brandData));
    return <h2>Brand not found</h2>;
  }

  return (
    <div className="container mt-5">
      <h1>{brand.name} Products</h1>
      <p>{brand.description}</p>
      <ProductList products={brand.products} />
    </div>
  );
};

export default BrandCatalog;
