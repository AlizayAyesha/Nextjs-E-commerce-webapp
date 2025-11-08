'use client';

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video, Save, Loader } from 'lucide-react';

interface ProductUploadFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

export default function ProductUploadForm({ onClose, onSave }: ProductUploadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryName: '',
    slug: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Men', 'Women', 'Kids', 'Luxury', 'Top picks', 'booking'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.categoryName) newErrors.categoryName = 'Category is required';
    if (!selectedFile) newErrors.file = 'Please select an image or video file';

    // Validate price is a number
    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUploading(true);

    try {
      // In a real app, you would upload the file to a cloud storage service
      // For demo purposes, we'll simulate the upload and create a mock URL
      const mockImageUrl = selectedFile?.type.startsWith('video/')
        ? `/videos/${formData.slug}.mp4`
        : `https://picsum.photos/400/320?random=${Date.now()}`;

      const newProduct = {
        _id: `new-product-${Date.now()}`,
        ...formData,
        price: parseFloat(formData.price),
        imageUrl: mockImageUrl,
        createdAt: new Date().toISOString(),
      };

      onSave(newProduct);
      onClose();
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to upload product. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image/Video *
            </label>
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload a file
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      PNG, JPG, GIF, MP4 up to 10MB
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    {selectedFile.type.startsWith('video/') ? (
                      <Video className="h-16 w-16 text-red-500" />
                    ) : (
                      <ImageIcon className="h-16 w-16 text-green-500" />
                    )}
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
                  {previewUrl && selectedFile.type.startsWith('image/') && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.categoryName && <p className="mt-1 text-sm text-red-600">{errors.categoryName}</p>}
            </div>
          </div>

          {/* Slug (auto-generated) */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              URL Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="auto-generated-slug"
            />
            <p className="mt-1 text-sm text-gray-500">Auto-generated from product name</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Product
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
