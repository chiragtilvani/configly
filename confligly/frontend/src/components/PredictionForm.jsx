// frontend/src/pages/PredictHome.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaBars,
  FaTimes,
  FaHome,
  FaMobileAlt,
  FaLaptop,
  FaCog,
  FaHeart,  
  FaChartLine,
  FaChevronRight,
  FaChevronLeft,
  FaTablet
} from "react-icons/fa";

export default function PredictHome() {
  const navigate = useNavigate();
  const [predictionResult, setPredictionResult] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    deviceType: 'laptop',
    brand: '',
    ram: '',
    memory: '',
    screen_size: '',
    cpu: '',
    gpu: ''
  });

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setShowSidebar(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/predict/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch prediction");
//     }

//     const data = await response.json();
//     setPredictionResult(data.predicted_price); // assuming backend sends { predicted_price: 1339.9 }

//   } catch (error) {
//     console.error("Prediction error:", error);
//     setPredictionResult("Error predicting price.");
//   }
// };

// Add this to your handleSubmit function in PredictHome.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://127.0.0.1:8000/api/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch prediction");
    }

    const data = await response.json();
    setPredictionResult(data.predicted_price);
    
    // Navigate to laptops page with predicted price
    navigate("/laptops", { 
      state: { 
        predictedPrice: data.predicted_price,
        formData // Pass along the form data if needed
      } 
    });

  } catch (error) {
    console.error("Prediction error:", error);
    setPredictionResult("Error predicting price.");
  }
};


  const sidebarItems = [
    { name: "Dashboard", icon: <FaChartLine />, path: "/dashboard" },
    { name: "Mobiles", icon: <FaMobileAlt />, path: "/mobiles" },
    { name: "Laptops", icon: <FaLaptop />, path: "/laptops" },
    { name: "Configs", icon: <FaCog />, path: "/predict" },
    { name: "Wishlist", icon: <FaHeart />, path: "/wishlist" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Toggle Button (when sidebar is hidden) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed left-0 top-1/2 z-20 bg-indigo-600 text-white p-2 rounded-r-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          <FaChevronRight className="text-xl" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "w-64 md:w-72" : "w-0"
        } bg-white shadow-xl transition-all duration-300 overflow-hidden flex flex-col z-10`}
      >
        <div className="p-5 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold text-indigo-600">TechPrice AI</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaChevronLeft className="text-xl" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                window.location.pathname === item.path
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="text-center text-sm text-gray-500">
            <p>TechPrice AI v1.0</p>
            <p className="mt-1">© {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              <span className="text-indigo-600">TechPrice</span> AI
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/wishlist")}
              className="p-2 text-gray-600 hover:text-indigo-600 relative"
            >
              <FaHeart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Predict Your Device Price
              </h2>
              <p className="text-gray-600">
                Enter your desired specifications and our AI will predict the optimal price range.
              </p>
            </div>

            {/* Device Type Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Select Device Type</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'laptop', label: 'Laptop', icon: <FaLaptop className="text-2xl" /> },
                  { value: 'mobile', label: 'Mobile', icon: <FaMobileAlt className="text-2xl" /> },
                  { value: 'tablet', label: 'Tablet', icon: <FaTablet className="text-2xl" /> }
                ].map((device) => (
                  <button
                    key={device.value}
                    type="button"
                    onClick={() => setFormData({...formData, deviceType: device.value})}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center transition-all ${
                      formData.deviceType === device.value
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {device.icon}
                    <span className="mt-2 font-medium">{device.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prediction Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Brand</option>
                      {formData.deviceType === 'laptop' && (
                        <>
                          <option value="Apple">Apple</option>
                          <option value="Dell">Dell</option>
                          <option value="HP">HP</option>
                          <option value="Lenovo">Lenovo</option>
                          <option value="Asus">Asus</option>
                        </>
                      )}
                      {formData.deviceType === 'mobile' && (
                        <>
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="OnePlus">OnePlus</option>
                          <option value="Xiaomi">Xiaomi</option>
                          <option value="Google">Google</option>
                        </>
                      )}
                      {formData.deviceType === 'tablet' && (
                        <>
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="Microsoft">Microsoft</option>
                          <option value="Lenovo">Lenovo</option>
                          <option value="Amazon">Amazon</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-1">
                      RAM (GB)
                    </label>
                    <select
                      id="ram"
                      name="ram"
                      value={formData.ram}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select RAM</option>
                      {formData.deviceType === 'laptop' && (
                        [4, 8, 16, 32, 64].map(ram => (
                          <option key={ram} value={ram}>{ram}</option>
                        ))
                      )}
                      {formData.deviceType === 'mobile' && (
                        [2, 4, 6, 8, 12, 16].map(ram => (
                          <option key={ram} value={ram}>{ram}</option>
                        ))
                      )}
                      {formData.deviceType === 'tablet' && (
                        [2, 4, 6, 8, 12].map(ram => (
                          <option key={ram} value={ram}>{ram}</option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="memory" className="block text-sm font-medium text-gray-700 mb-1">
                      Storage
                    </label>
                    <select
                      id="memory"
                      name="memory"
                      value={formData.memory}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Storage</option>
                      {formData.deviceType === 'laptop' && (
                        ['128', '256', '512',].map(storage => (
                          <option key={storage} value={storage}>{storage}</option>
                        ))
                      )}
                      {['mobile', 'tablet'].includes(formData.deviceType) && (
                        ['32', '64', '128', '256', '512'].map(storage => (
                          <option key={storage} value={storage}>{storage}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="screen_size" className="block text-sm font-medium text-gray-700 mb-1">
                      Screen Size (inches)
                    </label>
                    <input
                      type="number"
                      id="screen_size"
                      name="screen_size"  
                      value={formData.screen_size}
                      onChange={handleInputChange}
                      placeholder="e.g. 13.3, 15.6, 6.1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      step="0.1"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cpu" className="block text-sm font-medium text-gray-700 mb-1">
                      Processor
                    </label>
                    <input
                      type="text"
                      id="cpu"
                      name="cpu"
                      value={formData.cpu}
                      onChange={handleInputChange}
                      placeholder="e.g. Intel i7, Snapdragon 888, Apple M1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="gpu" className="block text-sm font-medium text-gray-700 mb-1">
                      Graphics (optional)
                    </label>
                    <input
                      type="text"
                      id="gpu"
                      name="gpu"
                      value={formData.gpu}
                      onChange={handleInputChange}
                      placeholder="e.g. NVIDIA RTX 3060, AMD Radeon"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700"
                >
                  Predict Price Now
                </button>
                  {predictionResult && (
                  <div className="mt-4 text-lg font-semibold text-indigo-700">
                    Predicted Price: € {predictionResult}
                  </div>
                )}

              </div>
            </form>

            {/* Recent Predictions (example) */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Your Recent Predictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    device: 'MacBook Pro 14"',
                    specs: 'M1 Pro, 16GB, 512GB SSD',
                    predicted: '$1,899',
                    actual: '$1,899'
                  },
                  {
                    device: 'iPhone 13 Pro',
                    specs: 'A15 Bionic, 6GB, 256GB',
                    predicted: '$999',
                    actual: '$999'
                  }
                ].map((prediction, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{prediction.device}</h4>
                        <p className="text-sm text-gray-500">{prediction.specs}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-indigo-600">{prediction.predicted}</p>
                        <p className="text-xs text-gray-500">Actual: {prediction.actual}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}