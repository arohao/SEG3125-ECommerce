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
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold text-danger">🔥 Hot Deals</h2>
        <p className="text-muted">These deals won't last long — grab them while they're hot!</p>
      </div>

      <div className="row">
        {hotDeals.map((p) => (
          <div key={p.id} className="col-6 col-md-3 mb-4">
            <Link
              to={`/catalog?deals=true&brand=${p.brand}&category=${p.category}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm border-0 position-relative hover-shadow transition">
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img-top p-3"
                  style={{ objectFit: "contain", height: "150px" }}
                />
                <div className="card-body px-3 pb-3 pt-1">
                  <h6 className="card-title small fw-semibold">{p.name}</h6>
                  <p className="card-text mb-1">
                    <del className="text-muted me-2">
                      ${p.originalPrice?.toFixed(2)}
                    </del>
                    <strong className="text-success">${p.price.toFixed(2)}</strong>
                  </p>
                </div>
                <span
                  className="badge bg-danger position-absolute top-0 end-0 m-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  {Math.round(p.discount * 100)}% OFF
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-10 col-md-5 col-lg-3">
          <Link
            to="/catalog?deals=true"
            className="btn btn-outline-danger w-100 fw-bold py-2"
            style={{ fontSize: "1.05rem" }}
          >
            🔍 See All Hot Deals
          </Link>
        </div>
      </div>
    </section>
  );
}
