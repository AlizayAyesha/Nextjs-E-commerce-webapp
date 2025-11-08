'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Brain,
  Target,
  ShoppingCart,
  Star
} from 'lucide-react';

// Mock data for analytics
const dailyOrders = [
  { date: '2025-01-01', orders: 45, revenue: 12500 },
  { date: '2025-01-02', orders: 52, revenue: 15800 },
  { date: '2025-01-03', orders: 38, revenue: 9200 },
  { date: '2025-01-04', orders: 61, revenue: 18900 },
  { date: '2025-01-05', orders: 49, revenue: 14200 },
  { date: '2025-01-06', orders: 55, revenue: 16800 },
  { date: '2025-01-07', orders: 67, revenue: 22100 },
];

const monthlyData = {
  currentMonth: {
    orders: 1247,
    revenue: 387650,
    customers: 892,
    avgOrderValue: 311
  },
  previousMonth: {
    orders: 1189,
    revenue: 356890,
    customers: 834,
    avgOrderValue: 300
  }
};

const topProducts = [
  { id: '1', name: 'Rolex Submariner', category: 'Luxury', orders: 145, revenue: 1160000, growth: 23, imageUrl: 'https://i.pinimg.com/1200x/0f/6d/ad/0f6dad5e947ba2037a3e30aab0021d7f.jpg' },
  { id: '2', name: 'Italian Tassel Wool Coat', category: 'Women', orders: 98, revenue: 29400, growth: 15, imageUrl: 'https://i.pinimg.com/736x/44/68/86/4468863df6bab63599738e7aba0b9033.jpg' },
  { id: '3', name: 'Aston Martin DB12', category: 'Luxury', orders: 76, revenue: 17500000, growth: 31, imageUrl: 'https://v1.pinimg.com/videos/mc/720p/4e/5c/d6/4e5cd6844136d8b5d11300d60c0c0619.mp4' },
  { id: '4', name: 'Floral Print Shirt', category: 'Women', orders: 87, revenue: 26100, growth: -5, imageUrl: 'https://i.pinimg.com/736x/fc/11/c6/fc11c630f290ac1ed681c6a879fd28ea.jpg' },
  { id: '5', name: 'Kids Jump Suit', category: 'Kids', orders: 92, revenue: 7360, growth: 18, imageUrl: 'https://cdn.sanity.io/images/7p0muvi9/production/d7a1767aebd9d31c2930d1b3bb517feb0ad22223-736x903.png' },
];

interface AIInsight {
  type: 'trend' | 'warning' | 'opportunity' | 'prediction';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);

  // Set fallback insights on component mount
  useEffect(() => {
    setAiInsights([
      {
        type: 'trend',
        title: 'Luxury Items Showing Strong Growth',
        description: 'Luxury category products have seen 28% growth this month. Consider increasing inventory for high-demand items.',
        impact: 'high'
      },
      {
        type: 'warning',
        title: 'Women\'s Floral Print Shirt Declining',
        description: 'Sales of Floral Print Shirt have dropped 5% this month. Consider seasonal promotion or replacement.',
        impact: 'medium'
      },
      {
        type: 'opportunity',
        title: 'Kids Category Emerging Trend',
        description: 'Kids products showing consistent 15-20% monthly growth. Expand kids collection for better market capture.',
        impact: 'high'
      },
      {
        type: 'prediction',
        title: 'Weekend Sales Pattern Detected',
        description: 'AI predicts 35% higher weekend sales. Optimize staffing and marketing for weekends.',
        impact: 'medium'
      }
    ]);
  }, []);

  const currentMonth = monthlyData.currentMonth;
  const previousMonth = monthlyData.previousMonth;

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Analytics Dashboard</h1>
                <p className="text-sm text-gray-600">Smart insights powered by artificial intelligence</p>
              </div>
            </div>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Orders</p>
                <p className="text-2xl font-bold text-gray-900">{currentMonth.orders.toLocaleString()}</p>
                <div className={`flex items-center text-sm ${getGrowthColor(parseFloat(calculateGrowth(currentMonth.orders, previousMonth.orders)))}`}>
                  {getGrowthIcon(parseFloat(calculateGrowth(currentMonth.orders, previousMonth.orders)))}
                  {calculateGrowth(currentMonth.orders, previousMonth.orders)}% from last month
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${currentMonth.revenue.toLocaleString()}</p>
                <div className={`flex items-center text-sm ${getGrowthColor(parseFloat(calculateGrowth(currentMonth.revenue, previousMonth.revenue)))}`}>
                  {getGrowthIcon(parseFloat(calculateGrowth(currentMonth.revenue, previousMonth.revenue)))}
                  {calculateGrowth(currentMonth.revenue, previousMonth.revenue)}% from last month
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">{currentMonth.customers.toLocaleString()}</p>
                <div className={`flex items-center text-sm ${getGrowthColor(parseFloat(calculateGrowth(currentMonth.customers, previousMonth.customers)))}`}>
                  {getGrowthIcon(parseFloat(calculateGrowth(currentMonth.customers, previousMonth.customers)))}
                  {calculateGrowth(currentMonth.customers, previousMonth.customers)}% from last month
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">${currentMonth.avgOrderValue}</p>
                <div className={`flex items-center text-sm ${getGrowthColor(parseFloat(calculateGrowth(currentMonth.avgOrderValue, previousMonth.avgOrderValue)))}`}>
                  {getGrowthIcon(parseFloat(calculateGrowth(currentMonth.avgOrderValue, previousMonth.avgOrderValue)))}
                  {calculateGrowth(currentMonth.avgOrderValue, previousMonth.avgOrderValue)}% from last month
                </div>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Orders Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Daily Orders Trend</h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>

            <div className="space-y-4">
              {dailyOrders.map((day) => (
                <div key={day.date} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 text-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(day.orders / 70) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{day.orders} orders</div>
                    <div className="text-xs text-gray-500">${day.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h2>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 relative rounded-lg overflow-hidden bg-gray-200">
                      {product.imageUrl.includes('video') || product.imageUrl.endsWith('.mp4') ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <Package className="h-6 w-6 text-gray-600" />
                        </div>
                      ) : (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-600">{product.orders} orders</span>
                        <span className="text-xs text-gray-600">${product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center text-sm font-medium ${getGrowthColor(product.growth)}`}>
                      {getGrowthIcon(product.growth)}
                      {product.growth}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">growth</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 mb-6">
            <Brain className="h-6 w-6 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    insight.type === 'trend' ? 'bg-green-100 text-green-600' :
                    insight.type === 'warning' ? 'bg-red-100 text-red-600' :
                    insight.type === 'opportunity' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {insight.type === 'trend' && <TrendingUp className="h-4 w-4" />}
                    {insight.type === 'warning' && <TrendingDown className="h-4 w-4" />}
                    {insight.type === 'opportunity' && <Star className="h-4 w-4" />}
                    {insight.type === 'prediction' && <Brain className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Statement */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Statement</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">January 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentMonth.orders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${currentMonth.revenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{currentMonth.customers}</div>
              <div className="text-sm text-gray-600">Unique Customers</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-md font-medium text-gray-900 mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Best Performing Day:</span>
                <span className="font-medium">January 7th (67 orders)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Top Category:</span>
                <span className="font-medium">Luxury (45% of revenue)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Retention:</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conversion Rate:</span>
                <span className="font-medium">3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
