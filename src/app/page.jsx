// src/app/page.jsx
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Search, ShoppingCart, Zap, Shield, Clock, Truck, Star, Menu, X, User, Package, Settings, LogOut } from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();

  const featuredProducts = [
    { id: 1, name: 'Bridge Rectifier IC', price: '20', image: '🔌', category: 'Power Components' },
    { id: 2, name: 'Voltage Regulator 7805', price: '15', image: '⚡', category: 'Power Components' },
    { id: 3, name: 'Breadboard 830 Points', price: '60', image: '📋', category: 'Tools & Accessories' },
    { id: 4, name: 'Transformer 220V-12V', price: '220', image: '🔋', category: 'Power Components' },
    { id: 5, name: 'Resistor Pack (220Ω)', price: '6', image: '🎯', category: 'Passive Components' },
    { id: 6, name: 'Jumper Wires Set', price: '20', image: '🔗', category: 'Tools & Accessories' },
  ];

  const categories = [
    { name: 'Power Components', icon: '⚡', count: 12 },
    { name: 'Passive Components', icon: '🎯', count: 24 },
    { name: 'Tools & Accessories', icon: '🔧', count: 18 },
    { name: 'Circuit Building', icon: '📋', count: 15 },
  ];

  const testimonials = [
    { name: 'Ahmed Rahman', text: 'Best quality components at affordable prices! Fast delivery too.', rating: 5 },
    { name: 'Tasnia Islam', text: 'Perfect for my university projects. Great customer service!', rating: 5 },
    { name: 'Rafiq Hassan', text: 'Reliable seller with genuine products. Highly recommended!', rating: 5 },
  ];

  const stats = [
    { icon: '📦', value: '50+', label: 'Products' },
    // { icon: '👥', value: '2000+', label: 'Happy Customers' },
    { icon: '⭐', value: '4.9/5', label: 'Rating' },
    { icon: '🚚', value: '7-10 Days', label: 'Delivery' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ELECTROBOX
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Products</Link>
              <a href="#categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Categories</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {!session ? (
                <>
                  <Link 
                    href="/login"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/login"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      {session.user.image ? (
                        <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{session.user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>
                      <Link href="/add-product" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                        <Package className="w-4 h-4" />
                        <span>Add Product</span>
                      </Link>
                      <Link href="/manage-products" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Manage Products</span>
                      </Link>
                      <button 
                        onClick={() => {signOut(); setShowUserMenu(false);}}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/products" className="block py-2 text-gray-700 hover:text-blue-600">Products</Link>
              <a href="#categories" className="block py-2 text-gray-700 hover:text-blue-600">Categories</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
              {!session ? (
                <div className="mt-4 space-y-2">
                  <Link href="/login" className="block w-full py-2 text-center text-blue-600 border border-blue-600 rounded-lg">Login</Link>
                  <Link href="/login" className="block w-full py-2 text-center bg-blue-600 text-white rounded-lg">Register</Link>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <Link href="/add-product" className="block py-2 text-left px-4 hover:bg-gray-50 rounded-lg">Add Product</Link>
                  <Link href="/manage-products" className="block py-2 text-left px-4 hover:bg-gray-50 rounded-lg">Manage Products</Link>
                  <button onClick={() => signOut()} className="block w-full py-2 text-left px-4 text-red-600 hover:bg-gray-50 rounded-lg">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Power Your Projects with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Quality Components
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              From basic resistors to advanced power supplies - everything you need for your electronics projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/products" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
              </Link>
              <Link href="/products" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                View Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 hover:transform hover:-translate-y-1 transition-transform">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you need for your project</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} Products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Top picks for your electronics projects</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center h-48 group-hover:scale-110 transition-transform">
                  <span className="text-7xl">{product.image}</span>
                </div>
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">High-quality component for all your projects</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">৳{product.price}</span>
                    <Link href="/products" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ELECTROBOX?</h2>
            <p className="text-xl text-gray-600">Your trusted partner in electronics</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Genuine Products</h3>
              <p className="text-gray-600">100% authentic components from trusted manufacturers</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across Bangladesh within 24-48 hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help with your technical queries</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing without compromising quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by students and professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ELECTROBOX</span>
              </div>
              <p className="text-gray-400">Your one-stop shop for quality electronic components in Bangladesh</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ELECTROBOX. All rights reserved. Made with ❤️ for makers in Bangladesh</p>
          </div>
        </div>
      </footer>
    </div>
  );
}