import { createClient } from '@sanity/client';
import { urlFor } from '@/lib/utils';
import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToBag from '@/app/components/AddToBag';
import Link from 'next/link';
import Image from 'next/image';

const client = createClient({
  projectId: '7p0muvi9',
  dataset: 'production',
  apiVersion: '2024-10-09',
  useCdn: true,
});

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    image,
    price,
    name,
    description,
    "categoryName": category->name,
    sku // Include the sku here
  }`;

  const params = { slug };
  const data = await client.fetch(query, params);
  return data;
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
          {/* Image and Sale Tag Container */}
          <div className="relative">
            {data.image && (
              <Image
                src={urlFor(data.image).url()}
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
                <AddToBag 
                  sku={data.sku} // Pass the sku here
                  currency='USD' 
                  description={data.description} 
                  image={urlFor(data.image).url()} 
                  name={data.name} 
                  price={data.price} 
                  key={data._id}
                />
                <Link href="/checkout" passHref>
                  <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                    Check Out
                  </Button>
                </Link>
              </div>

              <p className='mt-12 text-base text-gray-500 tracking-wide'>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
