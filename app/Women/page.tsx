import productsData from '../components/query-result.json';
import ProductCard from '../../components/ui/ProductCard';

interface Product {
  _id: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  imageUrl: string | null;
  description: string | null;
}

export default function WomenPage() {
  const womenProducts = productsData
    .filter((p) => p.categoryName === 'Women')
    .map((p) => ({
      ...p,
      price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
    }));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className='text-3xl font-bold text-center py-6'>Women's Products</h1>
        {womenProducts.length > 0 ? (
          <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {womenProducts.map((product: Product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  price: typeof product.price === 'number' ? product.price : 0,
                  name: product.name,
                  slug: product.slug,
                  imageUrl: product.imageUrl || '/placeholder.jpg',
                }}
              />
            ))}
          </div>
        ) : (
          <p>No products available for Women at the moment.</p>
        )}
      </div>
    </div>
  );
}
