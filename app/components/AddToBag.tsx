'use client';

import React from 'react';
import { Button } from "@/app/components/ui/button"; // Import the Button component
import { useShoppingCart } from "use-shopping-cart"; // Import the useShoppingCart hook

// Define the ProductCart interface
export interface ProductCart {
  name: string;
  description: string;
  price: number; // Change this to number
  currency: string;
  image: string; // Ensure this is a string representing the image URL
  sku: string; // Add SKU property to match the expected structure
}



export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  sku, // Include SKU in props
}: ProductCart) {
  const { addItem, handleCartClick, cartDetails } = useShoppingCart(); // Destructure necessary functions from the shopping cart hook

  // Create the product object
  const product = {
    name,
    description,
    price, // Ensure this is a number
    currency,
    image, // Use the image URL directly
    sku, // Include SKU
  };

  // Function to check if the item already exists in the cart
  const isProductInCart = () => {
    if (!cartDetails) return false; // Check if cartDetails is defined
    return Object.values(cartDetails).some(
      (item: Record<string, unknown>) => item.name === product.name && item.price === product.price // Adjust logic as needed
    );
  };

  // Function to get the current quantity of the product in the cart
  const getProductQuantity = () => {
    if (!cartDetails) return 0; // Check if cartDetails is defined
    const item = Object.values(cartDetails).find(
      (item: Record<string, unknown>) => item.name === product.name && item.price === product.price
    );
    return item ? (item.quantity as number) : 0;
  };

  const handleAddToBag = () => {
    if (isProductInCart()) {
      // If the product is already in the cart, increase its quantity
      const currentQuantity = getProductQuantity();
      addItem({ ...product, quantity: currentQuantity + 1 }); // Increase quantity
    } else {
      // If the product is not in the cart, add it
      addItem(product);
    }
    handleCartClick(); // Open the cart
  };

  return (
    <Button
      onClick={handleAddToBag}
      className="w-full bg-orange-500 text-white px-6 py-3 text-lg font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
    >
      Add to Bag
    </Button>
  );
}
