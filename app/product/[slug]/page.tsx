import productsData from '../../components/query-result.json';
import { Truck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import AddToBag from '../../components/AddToBag';
import Link from 'next/link';
import Image from 'next/image';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string) {
  const product = productsData.find(p => p.slug === slug);
  if (product) {
    return {
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price,
      sku: product._id, // Use _id as sku since JSON doesn't have sku
    };
  }
  return null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params before destructuring
  const { slug } = await params; // Correctly await params before accessing slug
  const data = await getData(slug);

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Image/Video and Sale Tag Container */}
          <div className="relative">
            {data.imageUrl && data.imageUrl.includes('.mp4') ? (
              <video
                src={data.imageUrl}
                className="w-full h-auto rounded-lg mb-4"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                src={data.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZSBBdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg=='}
                alt={data.name}
                width={500}
                height={300}
                className="w-full h-auto rounded-lg mb-4"
              />
            )}
            <span className='absolute left-0 top-0 rounded-br-lg bg-green-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white'>
              Sale
            </span>
          </div>

          <div>
            <div className='md:py-8'>
              <div className='mb-2 md:mb-3'>
                <span className='mb-0.5 inline-block text-gray-500'>
                  {data.categoryName}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{data.name}</h1>

              <div className='mb-6 flex items-center gap-3 md:mb-10'>
                <span className="flex items-center text-yellow-500 bg-yellow-200 rounded-full px-4 py-1 text-sm gap-x-2">
                  4.3
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 ml-1" 
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </span>
              </div>

              <div className='mb-4'>
                <div className='flex items-end gap-2'>
                  <span className='text-xl font-bold text-gray-800 md:text-2xl'>
                    {data.price}
                  </span>
                  <span className='mb-0.5 text-gray-700 line-through'>
                    {data.price + 30}
                  </span>
                </div>
                <span className='text-sm text-gray-600'>
                  Incl. Vat plus shipping
                </span>
              </div>

              <div className='mb-6 flex items-center gap-2 text-gray-500'>
                <Truck className='w-6 h-6' />
                <span className='text-sm'>
                  2-4 Days for Shipping
                </span>
              </div>

              <div className='flex gap-2.5'>
                {data.categoryName === 'booking' ? (
                  <Link href={`/booking/${data.slug}`} passHref>
                    <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                      Book Now
                    </Button>
                  </Link>
                ) : (
                  <>
                    <AddToBag
                      sku={data.sku} // Pass the sku here
                      currency='USD'
                      description={data.description}
                      image={data.imageUrl}
                      name={data.name}
                      price={data.price}
                      key={data._id}
                    />
                    <Link href="/checkout" passHref>
                      <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                        Check Out
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <p className='mt-12 text-base text-gray-500 tracking-wide'>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
