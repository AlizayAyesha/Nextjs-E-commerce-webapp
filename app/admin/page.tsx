'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Upload, Image, Video, Package, Users, BarChart3, Settings } from 'lucide-react';
import { client } from '../../lib/sanity';
import AIProductAssistant from '../components/AIProductAssistant';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
  description?: string;
  slug: {
    current: string;
  };
}

interface Category {
  _id: string;
  name: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData, usersData] = await Promise.all([
        client.fetch(`
          *[_type == "product"] {
            _id,
            name,
            price,
            category,
            image {
              asset->{
                url
              }
            },
            description,
            slug
          }
        `),
        client.fetch('*[_type == "category"]{_id, name}'),
        client.fetch('*[_type == "user"]')
      ]);

      // Process products to handle category references
      const processedProducts = productsData.map((product: unknown) => {
        const p = product as Record<string, unknown>;
        return {
          ...p,
          category: typeof p.category === 'string'
            ? { _id: p.category, name: p.category }
            : p.category
        };
      });

      setProducts(processedProducts);
      setCategories(categoriesData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    // Safety checks for undefined properties
    const productName = product.name || '';
    const productCategory = product.category?.name || '';

    const matchesCategory = selectedCategory === 'all' || product.category?._id === selectedCategory;
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         productCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== productId));
      // In a real app, this would make an API call to delete from database
    }
  };

  const handleEditProduct = (productId: string) => {
    // For demo purposes, just show an alert
    alert(`Edit product functionality would open for product ID: ${productId}`);
  };

  const handleAddProduct = async (newProduct: unknown) => {
    try {
      const p = newProduct as Record<string, unknown>;
      // Find the category by name
      const category = categories.find(cat => cat.name === p.categoryName);
      if (!category) {
        alert('Selected category not found. Please create the category first.');
        return;
      }

      // For now, we'll create the product without an image since image upload requires additional setup
      // In a real implementation, you'd upload the image to Sanity first
      await client.create({
        _type: 'product',
        name: p.title || 'Unnamed Product',
        price: typeof p.price === 'string' ? parseFloat(p.price as string) : p.price,
        category: {
          _type: 'reference',
          _ref: category._id
        },
        description: p.description,
        // Note: Image upload would need to be implemented separately
      });

      // Refetch products to get the updated list with proper references
      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Uploads Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setShowUploadForm(true)}
              className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={categories.length === 0}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
            <Link
              href="/admin/analytics"
              className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit className="h-5 w-5 mr-2" />
              Categories
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              Users
            </Link>
            <Link
              href="/admin/balance"
              className="flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <div className="h-5 w-5 mr-2">💰</div>
              Balance
            </Link>
            <Link
              href="/admin/bank-accounts"
              className="flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <div className="h-5 w-5 mr-2">🏦</div>
              Bank Accounts
            </Link>
          </div>
          {categories.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    No categories found
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>You need to create categories before adding products. <Link href="/admin/categories" className="font-medium underline text-yellow-700 hover:text-yellow-600">Go to Categories →</Link></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Products Management</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {product.image?.asset?.url?.includes('video') || product.image?.asset?.url?.endsWith('.mp4') ? (
                            <Video className="h-12 w-12 text-gray-400" />
                          ) : (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <Image className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.slug.current}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || '0').toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image?.asset?.url?.includes('video') || product.image?.asset?.url?.endsWith('.mp4') ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Video
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Image
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product._id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first product.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Product Assistant Modal */}
      {showUploadForm && (
        <AIProductAssistant
          onClose={() => setShowUploadForm(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
}
