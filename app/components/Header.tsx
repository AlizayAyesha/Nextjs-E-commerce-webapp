'use client';

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, BarChart3, User } from "lucide-react";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCart } from "use-shopping-cart";
import { useCompare } from "../context/CompareContext";
import { useWishlist } from "../context/WishlistContext";
import productsData from './query-result.json';

interface HeaderProps {
  onContinueShopping: () => void;
}

type ProductData = {
  _id: string;
  categoryName: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number | string;
  slug: string;
};

type SearchResult =
  | { type: 'category'; name: string; url: string }
  | { type: 'product'; _id: string; categoryName: string; description: string; imageUrl: string; name: string; price: number | string; slug: string };

export default function Header({ onContinueShopping }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const { handleCartClick } = useShoppingCart();
  const { compareCount } = useCompare();
  const { wishlistCount } = useWishlist();

  // Smart search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const categories = [...new Set(productsData.map((p: ProductData) => p.categoryName))] as string[];
      const categoryResults = categories.filter((cat: string) =>
        cat.toLowerCase().includes(query.toLowerCase())
      ).map((cat: string) => ({ type: 'category', name: cat, url: cat === 'Luxury' ? '/luxury' : `/${cat.replace(/\s+/g, '').toLowerCase()}` } as const));

      const productResults = productsData.filter((product: ProductData) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.slug.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3).map((product: ProductData) => ({ type: 'product', ...product } as const)); // Limit to 3 products

      setSearchResults([...categoryResults, ...productResults].slice(0, 5)); // Combine and limit to 5
    } else {
      setSearchResults([]);
    }
  };

  // Handle focus to show category suggestions
  const handleFocus = () => {
    setIsFocused(true);
    if (searchResults.length === 0) {
      const categories = [...new Set(productsData.map((p: ProductData) => p.categoryName))] as string[];
      const categoryResults = categories.map((cat: string) => ({ type: 'category', name: cat, url: cat === 'Luxury' ? '/luxury' : `/${cat.replace(/\s+/g, '').toLowerCase()}` } as const));
      setSearchResults(categoryResults.slice(0, 5)); // Show top 5 categories
    }
  };

  // Handle blur to hide dropdown
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Delay to allow click on links
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Search Bar, Compare, and User Icon */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-xs md:max-w-lg relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {(searchResults.length > 0 && (isFocused || searchQuery.length > 0)) && (
                <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-600">
                  {searchResults.map((result, index) => (
                    result.type === 'category' ? (
                      <Link key={`cat-${index}`} href={result.url} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span> {result.name}
                      </Link>
                    ) : (
                      <Link key={result._id} href={`/product/${result.slug}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Product:</span> {result.name}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Compare Link */}
            <Link href="/compare" className="flex md:hidden items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 relative">
              <BarChart3 size={20} />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* User Dashboard Icon */}
            <Link href="/profile" className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Compare Link */}
            <Link href="/compare" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 relative">
              <BarChart3 size={20} />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Favorites/Wishlist */}
            <Link href="/wishlist" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 relative">
              <Heart size={20} />
              <span className="hidden sm:inline">Favorites</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <div onClick={handleCartClick} className="hidden md:block">
              <ShoppingCart onContinueShopping={onContinueShopping} />
            </div>


          </div>
        </div>
      </div>


    </div>
  );
}
