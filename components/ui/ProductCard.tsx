import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../app/context/CurrencyContext';
import { useCompare } from '../../app/context/CompareContext';
import { useWishlist } from '../../app/context/WishlistContext';
import { Eye, ShoppingCart, BookOpen, BarChart3, Heart } from 'lucide-react';

interface Product {
  id: string;
  price: number;
  name: string;
  slug: string;
  imageUrl: string;
  categoryName?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, currency } = useCurrency();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCompare = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      // Convert product to match CompareContext interface
      const compareProduct = {
        _id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        slug: product.slug,
        category: product.categoryName,
      };
      addToCompare(compareProduct);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      // Convert product to match WishlistContext interface
      const wishlistProduct = {
        _id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        slug: product.slug,
        category: product.categoryName,
      };
      addToWishlist(wishlistProduct);
    }
  };

  const isVideo = product.imageUrl && (product.imageUrl.includes('video') || product.imageUrl.endsWith('.mp4'));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {isVideo ? (
        <video
          src={product.imageUrl}
          className="w-full h-80 object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        />
      ) : (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover"
          onError={() => setImageError(true)}
        />
      )}
      {isVideo && videoError && (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Video unavailable</p>
        </div>
      )}
      {!isVideo && imageError && (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Image unavailable</p>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600">{currency} {convertPrice(product.price).toFixed(2)}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href={`/product/${product.slug}`}>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Eye size={16} />
              View Product
            </button>
          </Link>
          {product.categoryName === 'booking' ? (
            <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
              <BookOpen size={16} />
              Book
            </button>
          ) : (
            <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          )}
          <button
            onClick={handleCompare}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
              isInCompare(product.id)
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
            }`}
          >
            <BarChart3 size={16} />
            {isInCompare(product.id) ? 'Remove' : 'Compare'}
          </button>
          <button
            onClick={handleWishlist}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
              isInWishlist(product.id)
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700'
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
            }`}
          >
            <Heart size={16} />
            {isInWishlist(product.id) ? 'Remove' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
