'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart"; // Just import useShoppingCart
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Define your own Product type
interface ProductAttributes {
  name: string;
  price: number;
  image: string;
  description?: string;
  currency: string; // Add currency here
  // Add any other attributes required for your products
}

interface Product extends ProductAttributes {
  sku: string; // This is required by use-shopping-cart
}

interface ShoppingCartProps {
  onContinueShopping: () => void; 
}

export default function ShoppingCart({ onContinueShopping }: ShoppingCartProps) {
  const router = useRouter();
  const {
    cartCount = 0,
    cartDetails,
    shouldDisplayCart,
    removeItem,
    incrementItem,
    addItem,
  } = useShoppingCart();

  const calculateTotalPrice = () => {
    if (!cartDetails) return 0;

    const total = Object.values(cartDetails).reduce((acc: number, item) => {
      const price = item.price ?? 0;
      const quantity = item.quantity ?? 1;
      return acc + (price * quantity);
    }, 0);

    return total;
  };

  const totalPrice = calculateTotalPrice();
  const shippingCost = 5.00; 
  const grandTotal = totalPrice + shippingCost;

  const handleAddToCart = (product: Product) => {
    const existingProduct = Object.values(cartDetails ?? {}).find((item) => item.name === product.name);

    if (existingProduct) {
      incrementItem(existingProduct.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => {}}> {/* Provide a toggle function if necessary */}
      <SheetTrigger asChild>
        <div className="flex items-center gap-4 p-5 rounded-md bg-transparent hover:bg-white hover:bg-opacity-10 transition duration-300 cursor-pointer">
          <ShoppingBag className="h-10 w-10 text-white" />
          <span className="text-xs font-semibold text-white">Cart</span>
        </div>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6 text-center">You don&apos;t have any items</h1>
              ) : (
                <>
                  <h1 className="py-6 text-center">
                    You have {cartCount} item{cartCount > 1 ? 's' : ''} in your cart!
                  </h1>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 overflow-hidden rounded-md border border-gray-200">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt={entry.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="flex ml-4 flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-800">
                          <h2 className="font-bold text-lg text-gray-800">{entry.name}</h2>
                          <p className="text-sm text-gray-600">${entry.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{entry.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">QTY:</span> {entry.quantity}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(entry.id)}
                            className="font-medium text-primary hover:text-primary/80"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Shipping:</p>
              <p>${shippingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <p>Total:</p>
              <p>${grandTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <button
              onClick={onContinueShopping} 
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push('/checkout')}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
