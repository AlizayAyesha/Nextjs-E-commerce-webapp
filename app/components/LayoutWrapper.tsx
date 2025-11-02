'use client';

import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import Link from 'next/link';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const router = useRouter();

  const onContinueShopping = () => {
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <Header onContinueShopping={onContinueShopping} />
      {children}
      <Footer />

      {/* Sticky Bottom Nav for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/product" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs">Shop</span>
          </Link>
          <Link href="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
            <Heart className="w-6 h-6" />
            <span className="text-xs">Wishlist</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
}
