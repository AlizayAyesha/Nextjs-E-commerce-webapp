// File: my-app/app/product/page.tsx

"use client"; 

import AllProducts from '../components/product'; 

export default function ProductsPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold text-center py-6'>All Products</h1>
      <AllProducts />
    </div>
  );
}
