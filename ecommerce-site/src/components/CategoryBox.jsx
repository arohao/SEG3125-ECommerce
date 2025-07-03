import React from "react";
import "../styles/component_styles/CategoryBox.css";

const categories = [
  { name: "Laptops + Tablets", featured: true, icon: "bi-laptop" },
  { name: "Desktops", featured: true, icon: "bi-pc-display" },
  { name: "CPUs", icon: "bi-cpu" },
  { name: "Keyboards", icon: "bi-keyboard" },
  { name: "Mice", icon: "bi-mouse" },
  { name: "Monitors", icon: "bi-display" },
  { name: "Motherboards", icon: "bi-motherboard" },
  { name: "RAM", icon: "bi-memory" },
  { name: "Storage Drives", icon: "bi-hdd" },
  { name: "Power Supplies", icon: "bi-plug" },
];

const featured = categories.filter((c) => c.featured);
const regular = categories.filter((c) => !c.featured);
const mid = Math.ceil(regular.length / 2);
const col1 = regular.slice(0, mid);
const col2 = regular.slice(mid);

const CategoryBox = () => {
  const renderCategory = (cat, isFeatured) => (
    <li
      key={cat.name}
      className={`list-group-item ${isFeatured ? "featured-category" : "text-muted"}`}
    >
      <i className={`bi ${cat.icon} me-2`}></i>
      {cat.name}
    </li>
  );

  return (
    <div className="category-container d-flex justify-content-center">
      <div className="category-box card shadow-sm p-4 w-90">
        <h4 className="mb-3">Shop by Category</h4>
        <ul className="list-group list-group-flush mb-4">
          {featured.map((cat) => renderCategory(cat, true))}
        </ul>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              {col1.map((cat) => renderCategory(cat, false))}
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              {col2.map((cat) => renderCategory(cat, false))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBox;
