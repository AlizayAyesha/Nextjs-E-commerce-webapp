'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';
import { useWishlist } from '../context/WishlistContext';

import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  Star,
  CheckCircle,
  CreditCard as CardIcon,
  TrendingUp,
  Package,
  ChevronRight,
  BarChart3
} from 'lucide-react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [userStats] = useState({
    totalOrders: 12,
    wishlistItems: 8,
    totalSpent: 1250,
    averageRating: 4.8
  });

  const { cartCount } = useShoppingCart();
  const { wishlistCount } = useWishlist();
  // const { compareCount } = useCompare();

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = () => {
    alert('Profile updated successfully!');
  };

  const recentActivities = [
    {
      icon: CheckCircle,
      content: 'Order #1234 has been delivered',
      time: '2 days ago',
      type: 'success'
    },
    {
      icon: CardIcon,
      content: 'Payment processed for order #1235',
      time: '5 days ago',
      type: 'info'
    },
    {
      icon: Heart,
      content: 'Added 3 items to wishlist',
      time: '1 week ago',
      type: 'primary'
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, count: cartCount },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlistCount },
    { id: 'account', label: 'Account', icon: User },
    { id: 'checkout', label: 'Checkout', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="dashboard-content flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="dashboard-sidebar lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="sidebar-header p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Dashboard
                </h2>
              </div>

              <nav className="sidebar-nav p-4">
                <ul className="nav-list space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.id} className="nav-item">
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`nav-link w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.count !== undefined && item.count > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-main flex-1">
            <div className="main-header mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {profile.firstName}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Manage your account and orders
              </p>
            </div>

            <div className="main-content">
              {/* Overview Section */}
              {activeSection === 'overview' && (
                <section className="dashboard-section">
                  <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="stat-card bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
                      <div className="stat-icon mb-4">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div className="stat-info">
                        <h3 className="text-3xl font-bold mb-1">{userStats.totalOrders}</h3>
                        <p className="text-blue-100">Total Orders</p>
                      </div>
                    </div>

                    <div className="stat-card bg-gradient-to-r from-pink-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl">
                      <div className="stat-icon mb-4">
                        <Heart className="w-8 h-8" />
                      </div>
                      <div className="stat-info">
                        <h3 className="text-3xl font-bold mb-1">{userStats.wishlistItems}</h3>
                        <p className="text-pink-100">Wishlist Items</p>
                      </div>
                    </div>

                    <div className="stat-card bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-xl">
                      <div className="stat-icon mb-4">
                        <TrendingUp className="w-8 h-8" />
                      </div>
                      <div className="stat-info">
                        <h3 className="text-3xl font-bold mb-1">${userStats.totalSpent}</h3>
                        <p className="text-green-100">Total Spent</p>
                      </div>
                    </div>

                    <div className="stat-card bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl text-white shadow-xl">
                      <div className="stat-icon mb-4">
                        <Star className="w-8 h-8" />
                      </div>
                      <div className="stat-info">
                        <h3 className="text-3xl font-bold mb-1">{userStats.averageRating}</h3>
                        <p className="text-yellow-100">Average Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="recent-activity bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      Recent Activity
                    </h2>
                    <ul className="activity-list space-y-4">
                      {recentActivities.map((activity, index) => (
                        <li key={index} className="activity-item flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className={`activity-icon w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                            activity.type === 'info' ? 'bg-blue-100 dark:bg-blue-900' :
                            'bg-purple-100 dark:bg-purple-900'
                          }`}>
                            <activity.icon className={`w-5 h-5 ${
                              activity.type === 'success' ? 'text-green-600 dark:text-green-400' :
                              activity.type === 'info' ? 'text-blue-600 dark:text-blue-400' :
                              'text-purple-600 dark:text-purple-400'
                            }`} />
                          </div>
                          <div className="activity-content flex-1">
                            <p className="text-gray-900 dark:text-white font-medium">{activity.content}</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Account Section */}
              {activeSection === 'account' && (
                <section className="dashboard-section">
                  <div className="account-page">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Information</h1>

                    <div className="auth-forms">
                      <div id="profile-form" className="account-form active bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                        <div className="form-group mb-6">
                          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="form-group mb-6">
                          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="form-group mb-6">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="form-group mb-6">
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="form-group mb-8">
                          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Address
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            value={profile.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            rows={4}
                          />
                        </div>

                        <button
                          onClick={handleUpdateProfile}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold shadow-lg"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Cart Section */}
              {activeSection === 'cart' && (
                <section className="dashboard-section">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Cart</h2>
                    <div className="redirect-message text-center py-12">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Your cart is managed on a dedicated page.</p>
                      <Link href="/cart" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg">
                        Go to Cart
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Wishlist Section */}
              {activeSection === 'wishlist' && (
                <section className="dashboard-section">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Wishlist</h2>
                    <div className="redirect-message text-center py-12">
                      <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Your wishlist is managed on a dedicated page.</p>
                      <Link href="/wishlist" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-pink-600 hover:to-red-600 transition-all font-semibold shadow-lg">
                        Go to Wishlist
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Checkout Section */}
              {activeSection === 'checkout' && (
                <section className="dashboard-section">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h2>
                    <div className="redirect-message text-center py-12">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Ready to complete your purchase?</p>
                      <Link href="/checkout" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all font-semibold shadow-lg">
                        Proceed to Checkout
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Orders Section */}
              {activeSection === 'orders' && (
                <section className="dashboard-section">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h2>
                    <div className="orders-list space-y-6">
                      {/* Sample Order Cards */}
                      <div className="order-card border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <div className="order-header flex justify-between items-start mb-4">
                          <div className="order-info">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order #1234</h3>
                            <p className="text-gray-600 dark:text-gray-400">Placed on March 15, 2024</p>
                          </div>
                          <div className="order-status">
                            <span className="status delivered bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                              Delivered
                            </span>
                          </div>
                        </div>
                        <div className="order-items mb-4">
                          <div className="order-item flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                            <div className="item-details flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Men&apos;s Winter Jacket</h4>
                              <p className="text-gray-600 dark:text-gray-400">Qty: 1</p>
                              <p className="text-gray-600 dark:text-gray-400">$89.99</p>
                            </div>
                          </div>
                        </div>
                        <div className="order-footer flex justify-between items-center">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">Total: $89.99</p>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
