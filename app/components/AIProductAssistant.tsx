'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, Save, Eye, RefreshCw, AlertTriangle, Package } from 'lucide-react';

interface ProductData {
  title: string;
  description: string;
  price: string;
  categoryName: string;
  stock: number;
  imageUrl: string;
}

interface AIAnalysis {
  title: string;
  description: string;
  suggestedCategory: string;
  priceRange: string;
  keyFeatures: string[];
  targetAudience: string;
  styleKeywords: string[];
}

interface AIProductAssistantProps {
  onClose: () => void;
  onSave: (product: ProductData) => void;
}

export default function AIProductAssistant({ onClose, onSave }: AIProductAssistantProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [formData, setFormData] = useState<ProductData>({
    title: '',
    description: '',
    price: '',
    categoryName: 'Luxury',
    stock: 10,
    imageUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = ['Men', 'Women', 'Kids', 'Luxury', 'Top picks'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData(prev => ({ ...prev, imageUrl: url }));
      setAiAnalysis(null); // Reset AI analysis when new image is selected
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setAiAnalysis(null);
  };

  const generateWithAI = async () => {
    if (!formData.description.trim()) {
      alert('Please write a product description first, then AI will enhance it.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/enhance-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.description,
          title: formData.title,
          category: formData.categoryName,
          price: formData.price
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update only the description with AI-enhanced version
        setFormData(prev => ({
          ...prev,
          description: data.analysis.enhancedDescription
        }));

        // Clear any previous AI analysis display
        setAiAnalysis(null);
      } else {
        throw new Error('AI enhancement failed');
      }
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      alert('Failed to enhance description with AI. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!selectedFile) newErrors.file = 'Please select a product image';

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // In a real app, you would upload the image to cloud storage first
    // For demo purposes, we'll use the preview URL
    const productData: ProductData = {
      ...formData,
      price: parseFloat(formData.price).toFixed(2)
    };

    onSave(productData);
    onClose();
  };

  const isOutOfStock = formData.stock === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Product Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Upload & AI Analysis */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image *
                </label>
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload product image
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <ImageIcon className="h-16 w-16 text-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      {previewUrl && (
                        <div className="mt-4">
                          <img
                            src={previewUrl}
                            alt="Product preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
              </div>

              {/* AI Generate Button - Now only for description enhancement */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={generateWithAI}
                  disabled={!formData.description.trim() || isAnalyzing}
                  className="flex items-center px-3 py-1.5 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="animate-spin h-4 w-4 mr-1" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>

              {/* AI Analysis Results */}
              {aiAnalysis && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-900 mb-3">AI Analysis Results</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-purple-700">Suggested Price:</span>
                      <span className="text-purple-600 ml-2">{aiAnalysis.priceRange}</span>
                    </div>
                    <div>
                      <span className="font-medium text-purple-700">Target Audience:</span>
                      <span className="text-purple-600 ml-2">{aiAnalysis.targetAudience}</span>
                    </div>
                    <div>
                      <span className="font-medium text-purple-700">Key Features:</span>
                      <ul className="text-purple-600 ml-4 mt-1 list-disc">
                        {aiAnalysis.keyFeatures.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter product title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter product description"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Price and Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price (USD) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="0.00"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>

                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      id="categoryName"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock Quantity */}
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="10"
                  />
                  {isOutOfStock && (
                    <div className="mt-2 flex items-center text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Out of Stock</span>
                    </div>
                  )}
                  {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isOutOfStock}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isOutOfStock ? 'Save as Draft' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
