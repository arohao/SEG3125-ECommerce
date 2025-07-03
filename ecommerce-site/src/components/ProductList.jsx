import React from "react";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="row g-4">
      {products.map(({ id, name, price, img }) => (
        <div key={id} className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body d-flex flex-column">
              <h6 className="card-title">{name}</h6>
              <p className="mt-auto fw-bold text-success">{price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
