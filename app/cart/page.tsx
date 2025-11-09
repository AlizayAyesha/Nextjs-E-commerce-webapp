'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cartCount = 0,
    cartDetails,
    removeItem,
    clearCart,
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

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Add some items to your cart to get started</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Cart Items ({cartCount})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {Object.values(cartDetails ?? {}).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                      <Image
                        src={(entry.image as string) || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='}
                        alt={entry.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{entry.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{entry.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Qty:</span> {entry.quantity}
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">${entry.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(entry.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all font-semibold shadow-lg"
                >
                  Proceed to Checkout
                </button>
                <Link
                  href="/"
                  className="block w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-semibold text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
