"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Product {
  _id: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  imageUrl: string | null;
  description: string | null;
}

const client = createClient({
  projectId: '7p0muvi9',
  dataset: 'production',
  apiVersion: '2024-10-09',
  useCdn: true,
});

async function getData(): Promise<Product[]> {
  const query = `*[_type == "product" && category->name == "Men"] | order(_createdAt desc)[0...4] {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image.asset->url,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export default function Newest() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <div className='mx-auto max-w-2xl px-4 py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Our New Products</h2>
          
          {/* Correct "See All" link */}
          <a href='/product' className='text-primary flex items-center gap-x-1'>
            See All
            <span>
              <ArrowRight />
            </span>
          </a>
        </div>
        
        {products && products.length > 0 ? (
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {products.map((product: Product) => (
              <div key={product._id}>
                <Image
                  src={product.imageUrl ?? '/default-image.jpg'}
                  alt={product.name}
                  className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full h-90 object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
                <div className="mt- flex justify-between">
                  <h3 className="text-sm font-extrabold text-gray-900 mt-6">
                   
                    <a href={`/product/${product.slug}`}>{product.name}</a>
                  </h3>
                  <p className="mt-6 text-xs text-green-500">{product.price}</p>
                  <a
  href={`/product/${product.slug}`}
  className="bg-white mt-5 inline-block px-2 py-0 bg-primary text-black font-semibold text-xs rounded-md transition"
>
  View More
</a>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available at the moment.</p>
        )}
      </div>
    </div>
  );
}
