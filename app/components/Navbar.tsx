'use client';

import { useState } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCart } from "use-shopping-cart";
import { Menu, X } from "lucide-react"; 
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Import dropdown menu components

const links = [
  { name: 'Home', url: '/' },
  { name: 'Men', url: '/Men' },
  { name: 'Women', url: '/Women' },
  { name: 'Kids', url: '/Kids' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  // Define the function to handle continuing shopping
  const onContinueShopping = () => {
    handleCartClick(); // Example: Close the cart
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="mb-8 border-b bg-black text-white">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Next<span className="text-green-500">Commerce</span>
          </h1>
        </Link>

        {/* Hamburger Menu for mobile */}
        <button
          className="block lg:hidden text-white"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
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

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="flex flex-col absolute top-16 left-0 w-full bg-black lg:hidden">
            {links.map((link, idx) => (
              <div key={idx} className="border-t border-gray-700">
                <Link
                  className="block py-4 px-6 text-lg font-semibold text-white hover:text-green-500 transition-colors duration-300"
                  href={link.url}
                  onClick={toggleMenu} // Close menu on link click
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-6">
          <div className="flex" onClick={handleCartClick}>
            <ShoppingCart onContinueShopping={onContinueShopping} /> {/* Pass the required prop */}
          </div>
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
        </div>
      </div>
    </header>
  );
}
