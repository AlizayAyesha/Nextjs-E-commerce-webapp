// File: my-app/app/components/product.tsx

"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import ProductCard from '../../components/ui/ProductCard';

interface Product {
  _id: string; // This will serve as your id
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  imageUrl: string | null;
  description: string | null;
  videoUrl?: string | null;
}

// Create the Sanity client
const client = createClient({
  projectId: '7p0muvi9',
  dataset: 'production',
  apiVersion: '2024-10-09',
  useCdn: true,
});

// Fetch all products from Sanity
async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
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

// Main component to display all products
export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        console.log('Fetched all products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Current products state:', products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard 
                key={product._id} 
                product={{
                  id: product._id,
                  price: typeof product.price === 'number' ? product.price : 0, // Ensure price is a number
                  name: product.name,
                  slug: product.slug,
                  imageUrl: product.imageUrl || '/placeholder.jpg', // Provide a fallback if null
                }} 
              />
            ))}
          </div>
        ) : (
          <p>No products available at the moment.</p>
        )}
      </div>
    </div>
  );
}
