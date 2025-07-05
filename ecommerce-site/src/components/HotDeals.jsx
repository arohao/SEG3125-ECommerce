import { Link } from "react-router-dom";
import products from "../data/products.json";

const normalizeProducts = (rawProducts) =>
  rawProducts.map((p) => {
    const price = parseFloat(p.price.replace(/[^0-9.]/g, ""));
    const originalPrice = p.originalPrice
      ? parseFloat(p.originalPrice.replace(/[^0-9.]/g, ""))
      : null;
    const discount =
      originalPrice && originalPrice > price
        ? (originalPrice - price) / originalPrice
        : 0;
    return { ...p, price, originalPrice, discount };
  });

export default function HotDeals() {
  const rawProducts = normalizeProducts(products);

  const hotDeals = rawProducts
    .filter((p) => p.deal && p.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <section className="container my-5">
      <h2 className="mb-4 text-center">Hot Deals</h2>
      <div className="row">
        {hotDeals.map((p) => (
          <div key={p.id} className="col-6 col-md-3 mb-4">
            <Link
              to={`/catalog?deals=true&brand=${p.brand}&category=${p.category}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img-top"
                  style={{ objectFit: "contain", height: "150px" }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="card-text mb-1">
                    <del className="text-muted me-2">
                      ${p.originalPrice?.toFixed(2)}
                    </del>
                    <strong>${p.price.toFixed(2)}</strong>
                  </p>
                  <span className="badge bg-danger">
                    {Math.round(p.discount * 100)}% OFF
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link to="/catalog?deals=true" className="btn btn-primary">
          See All Hot Deals
        </Link>
      </div>
    </section>
  );
}
