import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaShoppingCart } from 'react-icons/fa';

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    os: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get predicted price from navigation state
  const predictedPrice = location.state?.predictedPrice;

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        let url = 'http://127.0.0.1:8000/api/laptops/';
        const params = new URLSearchParams();
        
        if (predictedPrice) {
          params.append('predicted_price', predictedPrice);
        }
        
        if (filters.os) {
          params.append('os', filters.os);
        }
        
        if (filters.brand) {
          params.append('brand', filters.brand);
        }
        
        url += `?${params.toString()}`;
        
        const response = await fetch(url);
        const data = await response.json();
        setLaptops(data);
      } catch (error) {
        console.error('Error fetching laptops:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLaptops();
  }, [predictedPrice, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      os: '',
      brand: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {predictedPrice ? `Laptops around €${predictedPrice}` : 'Browse Laptops'}
          </h1>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OS</label>
                <select
                  name="os"
                  value={filters.os}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All OS</option>
                  <option value="Windows">Windows</option>
                  <option value="MacOS">MacOS</option>
                  <option value="ChromeOS">ChromeOS</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All Brands</option>
                  <option value="Apple">Apple</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Asus">Asus</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="€ Min"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="€ Max"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Laptops Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : laptops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laptops.map((laptop) => (
              <div key={laptop.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {laptop.image_url ? (
                    <img src={laptop.image_url} alt={laptop.model} className="h-full object-contain" />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{laptop.brand} {laptop.model}</h3>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                      {laptop.os}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-gray-500 text-sm ml-1">(24)</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">RAM:</span> {laptop.ram}GB
                    </div>
                    <div>
                      <span className="text-gray-500">Storage:</span> {laptop.storage}GB {laptop.storage_type}
                    </div>
                    <div>
                      <span className="text-gray-500">Screen:</span> {laptop.screen_size}"
                    </div>
                    <div>
                      <span className="text-gray-500">CPU:</span> {laptop.cpu}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">€{laptop.price}</span>
                    <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700">No laptops found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}