'use client';

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"; // Import dropdown menu components
import { useCurrency } from "../context/CurrencyContext";
import { useTheme } from "../context/ThemeContext";

const links = [
  { name: 'Home', url: '/' },
  { name: 'Men', url: '/Men' },
  { name: 'Women', url: '/Women' },
  { name: 'Kids', url: '/Kids' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

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
              <DropdownMenuItem>
                <Link href="/auth/signup">
                  <span className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-colors">
                    Create Account
                  </span>
                </Link>
              </DropdownMenuItem>

              {/* Sign In Option */}
              <DropdownMenuItem>
                <Link href="/auth/signin">
                  <span className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-colors">
                    Sign In
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </div>
    </header>
  );
}
