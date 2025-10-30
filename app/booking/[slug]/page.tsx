import productsData from '../../components/query-result.json';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface BookingPageProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string) {
  const product = productsData.find(p => p.slug === slug);
  if (product && product.categoryName === 'booking') {
    return {
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price,
    };
  }
  return null;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) {
    return <div>Booking not found</div>;
  }

  return (
    <div className='bg-white min-h-screen'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8 py-8'>
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Image/Video Container */}
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
              Booking
            </span>
          </div>

          <div>
            <div className='md:py-8'>
              <div className='mb-2 md:mb-3'>
                <span className='mb-0.5 inline-block text-gray-500'>
                  {data.categoryName}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

              <div className='mb-6 flex items-center gap-3 md:mb-10'>
                <span className="flex items-center text-yellow-500 bg-yellow-200 rounded-full px-4 py-1 text-sm gap-x-2">
                  4.8
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 ml-1"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </span>
                <span className='text-sm text-gray-600'>Premium Experience</span>
              </div>

              <div className='mb-6'>
                <div className='flex items-end gap-2'>
                  <span className='text-2xl font-bold text-gray-800 md:text-3xl'>
                    ${data.price}
                  </span>
                  <span className='mb-0.5 text-gray-700 line-through'>
                    ${(data.price + 500)}
                  </span>
                </div>
                <span className='text-sm text-gray-600'>
                  Per person, all inclusive
                </span>
              </div>

              {/* Booking Form */}
              <div className='mb-8 p-6 bg-gray-50 rounded-lg'>
                <h3 className='text-lg font-semibold mb-4'>Book Your Experience</h3>
                <form className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='Enter your full name'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Email
                      </label>
                      <input
                        type='email'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='Enter your email'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Phone
                      </label>
                      <input
                        type='tel'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='Enter your phone'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Number of Guests
                      </label>
                      <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Preferred Date
                    </label>
                    <input
                      type='date'
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Special Requests
                    </label>
                    <textarea
                      rows={3}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                      placeholder='Any special requirements or preferences...'
                    />
                  </div>
                </form>
              </div>

              <div className='flex gap-2.5'>
                <Button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold">
                  Confirm Booking
                </Button>
                <Link href="/luxury-bookings" passHref>
                  <Button variant="outline" className="px-8 py-3 rounded-lg border-gray-300 hover:bg-gray-50">
                    Back to Bookings
                  </Button>
                </Link>
              </div>

              <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
                <h4 className='font-semibold text-blue-800 mb-2'>What's Included:</h4>
                <ul className='text-sm text-blue-700 space-y-1'>
                  <li>• Premium experience with expert guides</li>
                  <li>• All necessary equipment and safety gear</li>
                  <li>• Transportation to/from location</li>
                  <li>• Refreshments and meals</li>
                  <li>• Professional photography</li>
                  <li>• 24/7 support during your booking</li>
                </ul>
              </div>

              <p className='mt-8 text-base text-gray-500 tracking-wide'>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
