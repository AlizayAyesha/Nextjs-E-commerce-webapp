'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, User, ShoppingCart, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Import dropdown menu components
import { useCurrency } from "../context/CurrencyContext";
import { useTheme } from "../context/ThemeContext";

const links = [
  { name: 'Home', url: '/' },
  { name: 'Men', url: '/Men' },
  { name: 'Women', url: '/Women' },
  { name: 'Kids', url: '/Kids' },
  { name: 'Compare', url: '/compare' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="mb-8 border-b bg-black text-white">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            LUX<span className="text-yellow-500">URY</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-12 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.url ? (
                <Link className="text-lg font-semibold text-green-400" href={link.url}>
                  {link.name}
                </Link>
              ) : (
                <Link
                  className="text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300"
                  href={link.url}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-white hover:text-green-500 transition-colors duration-300">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>

          {/* Currency Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300 cursor-pointer">
              {currency}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCurrency('USD')}>
                USD
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrency('EUR')}>
                EUR
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrency('PKR')}>
                PKR
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown Menu for Sign Up/Sign In */}
          <DropdownMenu>
            {/* Trigger for Dropdown */}
            <DropdownMenuTrigger className="text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300 cursor-pointer">
              SignUp
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {/* Create Account Option */}
              <DropdownMenuItem asChild>
                <Link href="/auth/signup">
                  <span className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-colors">
                    Create Account
                  </span>
                </Link>
              </DropdownMenuItem>

              {/* Sign In Option */}
              <DropdownMenuItem asChild>
                <Link href="/auth/signin">
                  <span className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-colors">
                    Sign In
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-green-500 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white border-t border-gray-700">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            {links.map((link, idx) => (
              <div key={idx}>
                {pathname === link.url ? (
                  <Link className="block text-lg font-semibold text-green-400" href={link.url}>
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    className="block text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300"
                    href={link.url}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Additional Mobile Links */}
            <div className="border-t border-gray-700 pt-4 space-y-4">
              <Link href="/profile" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                <User size={20} />
                Dashboard
              </Link>
              <Link href="/checkout" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                <ShoppingCart size={20} />
                Cart
              </Link>
              <Link href="/wishlist" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                <Heart size={20} />
                Wishlist
              </Link>
              <Link href="/luxury" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                Luxury
              </Link>
              <Link href="/luxury-bookings" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                Luxury Bookings
              </Link>
              <Link href="/membership" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                Membership
              </Link>
              <Link href="/booking" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                Booking
              </Link>
              <Link href="/compare" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300">
                Compare
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
