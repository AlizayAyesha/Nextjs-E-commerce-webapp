"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '../../app/context/CurrencyContext';
import { useCompare } from '../../app/context/CompareContext';
import { useWishlist } from '../../app/context/WishlistContext';
import { useUserInteractions } from '../../app/context/UserInteractionContext';
import { useShoppingCart } from 'use-shopping-cart';
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
  const { addInteraction } = useUserInteractions();
  const { addItem } = useShoppingCart();
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Track product view when component mounts
  useEffect(() => {
    addInteraction({
      productId: product.id,
      action: 'view',
      productData: {
        name: product.name,
        category: product.categoryName || '',
        price: product.price,
      },
    });
  }, [product.id, product.name, product.categoryName, product.price, addInteraction]);

  const handleCompare = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      // Track remove from compare
      addInteraction({
        productId: product.id,
        action: 'like', // Using 'like' as a general positive interaction
        productData: {
          name: product.name,
          category: product.categoryName || '',
          price: product.price,
        },
      });
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
      // Track add to compare
      addInteraction({
        productId: product.id,
        action: 'like',
        productData: {
          name: product.name,
          category: product.categoryName || '',
          price: product.price,
        },
      });
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      // Track remove from wishlist
      addInteraction({
        productId: product.id,
        action: 'like',
        productData: {
          name: product.name,
          category: product.categoryName || '',
          price: product.price,
        },
      });
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
      // Track add to wishlist
      addInteraction({
        productId: product.id,
        action: 'like',
        productData: {
          name: product.name,
          category: product.categoryName || '',
          price: product.price,
        },
      });
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      currency: 'USD',
    });
    // Track add to cart
    addInteraction({
      productId: product.id,
      action: 'add_to_cart',
      productData: {
        name: product.name,
        category: product.categoryName || '',
        price: product.price,
      },
    });
  };

  const isVideo = product.imageUrl && (product.imageUrl.includes('video') || product.imageUrl.endsWith('.mp4'));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {isVideo ? (
        <video
          src={product.imageUrl}
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        />
      ) : (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={320}
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
          onError={() => setImageError(true)}
        />
      )}
      {isVideo && videoError && (
        <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Video unavailable</p>
        </div>
      )}
      {!isVideo && imageError && (
        <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Image unavailable</p>
        </div>
      )}
      <div className="p-2 sm:p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600">{currency} {convertPrice(product.price).toFixed(2)}</p>
        <div className="mt-4 space-y-2">
          {/* Primary Action Button */}
          <div className="w-full">
            {product.categoryName === 'booking' ? (
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 text-lg font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
                <BookOpen size={18} />
                <span>Book Now</span>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 text-lg font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
            )}
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-3 gap-2">
            <Link href={`/product/${product.slug}`} className="col-span-1">
              <button className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-2 text-sm font-medium rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                <Eye size={14} />
                <span className="hidden xs:inline">View</span>
              </button>
            </Link>

            <button
              onClick={handleCompare}
              className="w-full flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium rounded-md shadow-md transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
            >
              <BarChart3 size={14} />
              <span className="hidden xs:inline">{isInCompare(product.id) ? 'Rem' : 'Comp'}</span>
            </button>

            <button
              onClick={handleWishlist}
              className="w-full flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium rounded-md shadow-md transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700"
            >
              <Heart size={14} />
              <span className="hidden xs:inline">{isInWishlist(product.id) ? 'Rem' : 'Fav'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
