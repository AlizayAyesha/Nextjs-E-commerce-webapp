"use client";

import { useEffect, useState } from 'react';
import productsData from '../components/query-result.json';
import ProductCard from '../../components/ui/ProductCard';

interface Product {
  _id: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  imageUrl: string | null;
  description: string | null;
}

export default function LuxuryBookingsPage() {
  const [bookingProducts, setBookingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = productsData.map((p) => ({
      ...p,
      price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
    }));
    const filteredProducts = allProducts.filter((product) => product.categoryName === 'booking');
    setBookingProducts(filteredProducts);
  }, []);

  return (
    <div className="bg-white py-16">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-12'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>Luxury Bookings</h1>
          <a href='/membership' className='text-indigo-600 hover:text-indigo-800 flex items-center gap-x-2 font-semibold transition-colors duration-200'>
            Explore Memberships
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Booking Products</h2>
          {bookingProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {bookingProducts.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    id: product._id,
                    price: typeof product.price === 'number' ? product.price : 0,
                    name: product.name,
                    slug: product.slug,
                    imageUrl: product.imageUrl || '/placeholder.jpg',
                    categoryName: product.categoryName,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No booking products available at the moment.</p>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-8">
          </p>
          <a
            href="/membership"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Join Our Membership for Exclusive Access
          </a>
        </div>
      </div>
    </div>
  );
}
