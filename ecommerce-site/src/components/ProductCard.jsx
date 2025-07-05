export default function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img
        src={product.img}
        alt={product.name}
        className="card-img-top product-image"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.specs}</p>
        <p className="card-text fw-bold">${product.price}.00</p>
        <button className="btn btn-primary mt-auto">Add to Cart</button>
      </div>
    </div>
  );
}
