import productsData from '../components/query-result.json';
import { ArrowRight, Heart, Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrency } from '../context/CurrencyContext';

interface LuxuryPageProps {}

export default function LuxuryPage() {
  const luxuryProducts = productsData
    .filter((p) => p.categoryName === 'Luxury')
    .map((p) => ({
      ...p,
      price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
    }));

  return (
    <div className="bg-white py-16">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-12'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>Luxury Collection</h1>
          <Link href='/' className='text-indigo-600 hover:text-indigo-800 flex items-center gap-x-2 font-semibold transition-colors duration-200'>
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {luxuryProducts && luxuryProducts.length > 0 ? (
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {luxuryProducts.map((product) => (
              <div key={product._id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-green-500 hover:text-white transition-colors">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative overflow-hidden">
                  {product.imageUrl && product.imageUrl.includes('.mp4') ? (
                    <video
                      src={product.imageUrl}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={product.imageUrl ?? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                      width={300}
                      height={300}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <Link href={`/product/${product.slug}`} className="hover:text-indigo-600 transition-colors duration-200">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">
                    $ {product.price.toFixed(2)}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No luxury products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
