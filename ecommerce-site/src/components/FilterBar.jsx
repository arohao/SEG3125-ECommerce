import { useSearchParams, useNavigate } from 'react-router-dom'
import '../styles/component_styles/FilterBar.css'

const brands = ['intel', 'amd', 'asus', 'logitech']
const categories = ['cpus', 'laptops', 'mice']

const FilterBar = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const currentBrand = searchParams.get('brand') || ''
  const currentCategory = searchParams.get('category') || ''

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    const newParams = new URLSearchParams(searchParams)
    if (value) newParams.set(key, value)
    else newParams.delete(key)

    navigate(`/catalog?${newParams.toString()}`)
  }

  const handleReset = () => {
    navigate('/catalog')
  }

  return (
    <div className="filter-bar d-flex align-items-center gap-3 my-3">
      <select name="brand" value={currentBrand} onChange={handleChange} className="form-select w-auto">
        <option value="">All Brands</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <select name="category" value={currentCategory} onChange={handleChange} className="form-select w-auto">
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <button onClick={handleReset} className="btn btn-outline-secondary">Reset</button>
    </div>
  )
}

export default FilterBar
