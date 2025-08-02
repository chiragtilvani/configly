// frontend/src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaChartLine, FaSearchDollar, FaLaptop, FaMobileAlt, FaTablet, FaRegSmile, FaShieldAlt, FaLightbulb } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Modern Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-16 md:py-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            CPS
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ConfigPrice
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/predict")}
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>Try Predictor</span>
            <FaArrowRight className="text-sm" />
          </button>
          <button className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-full shadow-lg">
            <FaArrowRight />
          </button>
        </div>
      </nav>

      {/* Hero Section with Animation */}
      <section className="relative overflow-hidden text-center py-16 md:py-28 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Smart Tech Shopping Starts Here
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered price predictor helps you find the perfect laptop, phone, or tablet at the right price. No more overpaying for tech!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/predict")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Predict Your Price</span>
              <FaArrowRight />
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full text-lg hover:bg-indigo-50 transition-all duration-300">
              How It Works
            </button>
          </div>
        </div>
        
        {/* Device Mockups */}
        <div className="mt-16 flex justify-center items-end space-x-2 md:space-x-8">
          <div className="w-16 h-24 md:w-24 md:h-36 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <FaMobileAlt className="text-gray-400 text-xl md:text-3xl" />
          </div>
          <div className="w-24 h-20 md:w-36 md:h-28 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <FaTablet className="text-gray-400 text-xl md:text-3xl" />
          </div>
          <div className="w-32 h-16 md:w-48 md:h-24 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl shadow-lg flex items-center justify-center">
            <FaLaptop className="text-gray-400 text-xl md:text-3xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Why Choose ConfigPrice?</h2>
          <p className="text-gray-600">
            We combine machine learning with market data to give you the most accurate price predictions for your dream devices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaChartLine className="text-3xl text-indigo-600" />,
              title: "AI-Powered Predictions",
              desc: "Our models analyze thousands of data points to estimate fair prices based on current market trends."
            },
            {
              icon: <FaSearchDollar className="text-3xl text-purple-600" />,
              title: "No More Overpaying",
              desc: "Avoid spending more than necessary by knowing the optimal price range before you shop."
            },
            {
              icon: <FaLightbulb className="text-3xl text-indigo-600" />,
              title: "Informed Decisions",
              desc: "Compare predicted prices with actual listings to make smarter purchasing choices."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How Our Price Predictor Works</h2>
          
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Select Your Device Type",
                desc: "Choose whether you're looking for a laptop, smartphone, or tablet to get started.",
                icon: <FaLaptop className="text-2xl text-white" />
              },
              {
                step: "2",
                title: "Configure Your Specs",
                desc: "Select your desired specifications like processor, RAM, storage, and other features.",
                icon: <FaMobileAlt className="text-2xl text-white" />
              },
              {
                step: "3",
                title: "Get Price Prediction",
                desc: "Our AI analyzes current market data and gives you a fair price range for your configuration.",
                icon: <FaChartLine className="text-2xl text-white" />
              },
              {
                step: "4",
                title: "Shop With Confidence",
                desc: "Use our prediction to find the best deals and avoid overpaying for your tech.",
                icon: <FaRegSmile className="text-2xl text-white" />
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shrink-0 shadow-md">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Categories */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Find Prices For Your Device</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Laptops",
              desc: "Predict prices for Windows, MacBooks, and Chromebooks based on specs like CPU, GPU, RAM and more.",
              icon: <FaLaptop className="text-4xl text-indigo-600" />,
              bg: "from-blue-50 to-indigo-50"
            },
            {
              title: "Smartphones",
              desc: "Get accurate price estimates for iPhones, Android phones based on storage, camera specs and features.",
              icon: <FaMobileAlt className="text-4xl text-purple-600" />,
              bg: "from-purple-50 to-pink-50"
            },
            {
              title: "Tablets",
              desc: "Find fair prices for iPads, Android tablets and Windows tablets with your preferred configuration.",
              icon: <FaTablet className="text-4xl text-indigo-600" />,
              bg: "from-indigo-50 to-blue-50"
            }
          ].map((device, i) => (
            <div key={i} className={`bg-gradient-to-br ${device.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full`}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                {device.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{device.title}</h3>
              <p className="text-gray-600 mb-4">{device.desc}</p>
              <button 
                onClick={() => navigate("/predict")}
                className="text-indigo-600 font-medium flex items-center space-x-1 hover:text-indigo-800 transition-colors"
              >
                <span>Predict Price</span>
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Saved me $250 on my new laptop! The prediction was spot on with actual market prices.",
                name: "Sarah K.",
                role: "Graphic Designer"
              },
              {
                quote: "As a student on a budget, this helped me find the perfect phone without overspending.",
                name: "Michael T.",
                role: "College Student"
              },
              {
                quote: "Incredibly accurate for high-end gaming laptops. Found my ideal specs at the right price.",
                name: "David R.",
                role: "Gamer & Streamer"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Perfect Tech Deal?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Stop guessing prices and start shopping smart. Get your personalized price prediction in seconds.
          </p>
          <button
            onClick={() => navigate("/predict")}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Try Our Predictor Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                CPS
              </div>
              <h3 className="text-xl font-bold text-white">ConfigPrice</h3>
            </div>
            <p className="text-gray-400">
              Smart price predictions for your tech purchases. Never overpay again.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ConfigPrice. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}