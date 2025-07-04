import { Link } from 'react-router-dom'
import '../styles/component_styles/ShopByBrand.css'

const brands = [
  { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
  { name: 'AMD', logo: 'https://logo.clearbit.com/amd.com' },
  { name: 'NVIDIA', logo: 'https://logo.clearbit.com/nvidia.com' },
  { name: 'Corsair', logo: 'https://logo.clearbit.com/corsair.com' },
  { name: 'Logitech', logo: 'https://logo.clearbit.com/logitech.com' },
  { name: 'ASUS', logo: 'https://logo.clearbit.com/asus.com' },
  { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' }
]

const toSlug = (str) => str.toLowerCase().replace(/\s+/g, '-')

const ShopByBrand = () => {
  return (
    <div className="shop-brand-container d-flex flex-wrap justify-content-center gap-4 p-4">
      {brands.map((brand) => (
        <Link
          key={brand.name}
          to={`/catalog?brand=${toSlug(brand.name)}`}
          className="brand-card text-center p-2 text-decoration-none"
        >
          <img src={brand.logo} alt={brand.name} className="brand-logo mb-2" />
          <div className="brand-name">{brand.name}</div>
        </Link>
      ))}
    </div>
  )
}

export default ShopByBrand
