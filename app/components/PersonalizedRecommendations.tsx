'use client';

import React, { useEffect, useState } from 'react';
import { urlFor, ImageSource } from '@/lib/imageUrl';
import { client } from '../../lib/sanity';
import { useUserInteractions } from '../context/UserInteractionContext';
import { recommendationEngine, RecommendationResult } from '../../lib/recommendationEngine';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: ImageSource | string; // Allow both Sanity image objects and string URLs
  category: string;
  score?: number;
  slug?: string;
}

const PersonalizedRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { interactions } = useUserInteractions();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log('Starting AI-powered recommendations...');

        // Initialize the recommendation engine (TensorFlow will be loaded lazily if needed)
        await recommendationEngine.initializeModel();

        // Load TensorFlow lazily for better performance
        try {
          await import('@tensorflow/tfjs');
        } catch {
          console.warn('TensorFlow lazy loading failed, using basic recommendations');
        }

        // Get all available products
        let allProducts: Array<{ id: string; name: string; category: string; price: number; imageUrl?: string; slug?: string }> = [];
        const productImageMap: Map<string, string> = new Map();

        try {
          // Try Sanity first
          const sanityProducts = await client.fetch(`
            *[_type == "product"] {
              _id,
              name,
              price,
              category,
              image,
              "slug": slug.current
            }
          `);

          console.log('Sanity products fetched:', sanityProducts?.length || 0);

          if (sanityProducts && sanityProducts.length > 0) {
            allProducts = sanityProducts.map((p: Record<string, unknown>) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const imageUrl = p.image ? urlFor(p.image as any) : '/placeholder-image.png';
              productImageMap.set(p._id as string, imageUrl);
              return {
                id: p._id as string,
                name: (p.name as string) || 'Unknown Product',
                category: (p.category as string) || 'General',
                price: typeof p.price === 'number' ? p.price as number : parseFloat(p.price as string) || 0,
                imageUrl,
                slug: (p.slug as string) || (p._id as string)
              };
            });
          }
        } catch (sanityError) {
          console.log('Sanity not available, using JSON fallback:', sanityError);
        }

        // Fallback to JSON if no Sanity products
        if (allProducts.length === 0) {
          try {
            const fallbackProducts = await import('./query-result.json');
            console.log('JSON fallback products:', fallbackProducts.default?.length || 0);
            allProducts = fallbackProducts.default.map((p: Record<string, unknown>) => {
              productImageMap.set(p._id as string, (p.imageUrl as string) || '/placeholder-image.png');
              return {
                id: p._id as string,
                name: (p.name as string) || 'Unknown Product',
                category: (p.categoryName as string) || 'General',
                price: typeof p.price === 'number' ? p.price as number : parseFloat((p.price as string).replace('$', '')) || 0,
                imageUrl: (p.imageUrl as string) || '/placeholder-image.png',
                slug: (p.slug as string) || (p._id as string)
              };
            });
          } catch (jsonError) {
            console.error('JSON fallback failed:', jsonError);
          }
        }

        console.log('Available products for AI:', allProducts.length);
        console.log('Sample products:', allProducts.slice(0, 3));

        // Get AI-powered recommendations
        let aiRecommendations: RecommendationResult[] = [];

        if (interactions.length > 0) {
          // Use hybrid recommendations if user has interaction history
          const userId = interactions[0]?.userId || 'anonymous';
          console.log('Generating AI recommendations for user:', userId);
          console.log('User interactions:', interactions.length);

          aiRecommendations = recommendationEngine.getHybridRecommendations(
            interactions,
            allProducts,
            userId,
            4
          );
          console.log('AI recommendations generated:', aiRecommendations.length, aiRecommendations);
        } else {
          console.log('No user interactions found, will use fallback recommendations');
        }

        // If not enough AI recommendations, fill with content-based or random
        if (aiRecommendations.length < 4) {
          const viewedProducts = interactions
            .filter(i => i.action === 'view')
            .map(i => i.productId);

          if (viewedProducts.length > 0) {
            const contentBased = recommendationEngine.getContentBasedRecommendations(
              allProducts,
              viewedProducts,
              4 - aiRecommendations.length
            );
            aiRecommendations = [...aiRecommendations, ...contentBased];
          }
        }

        // If still not enough, add random products
        if (aiRecommendations.length < 4) {
          const recommendedIds = new Set(aiRecommendations.map(r => r.productId));
          const remainingProducts = allProducts.filter(p => !recommendedIds.has(p.id));

          for (let i = aiRecommendations.length; i < 4 && remainingProducts.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * remainingProducts.length);
            const randomProduct = remainingProducts.splice(randomIndex, 1)[0];
            aiRecommendations.push({
              productId: randomProduct.id,
              score: 0.1,
              reason: 'Random selection'
            });
          }
        }

        // Convert recommendation results to Product objects
        const recommendedProducts: Product[] = aiRecommendations.map(rec => {
          const productData = allProducts.find(p => p.id === rec.productId);
          if (!productData) {
            console.warn('Product not found for recommendation:', rec.productId);
            return null;
          }

          // Get the correct image URL
          const imageUrl = productImageMap.get(productData.id) || productData.imageUrl || '/placeholder-image.png';

          return {
            _id: productData.id,
            name: productData.name,
            price: productData.price,
            image: imageUrl, // Set the actual image URL
            category: productData.category,
            slug: productData.slug || productData.id // Use actual slug if available, fallback to id
          };
        }).filter(Boolean) as Product[];

        console.log('Recommended products created:', recommendedProducts.length);
        console.log('Sample recommended products:', recommendedProducts.slice(0, 2));

        // Debug video detection
        const videoProducts = recommendedProducts.filter(p => isVideo(p));
        console.log('Video products detected:', videoProducts.length, videoProducts.map(p => ({ name: p.name, image: p.image })));

        console.log('Final recommendations:', recommendedProducts.length);
        setRecommendations(recommendedProducts);

      } catch {
        console.error('Error in AI recommendations');
        // Ultimate fallback to random products
        try {
          const fallbackProducts = await import('./query-result.json');
          const processedProducts = fallbackProducts.default
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((p: Record<string, unknown>) => ({
              _id: p._id as string,
              name: p.name as string,
              price: typeof p.price === 'number' ? p.price as number : parseFloat((p.price as string).replace('$', '')),
              image: p.imageUrl as string,
              category: p.categoryName as string,
              slug: p.slug as string
            }));
          setRecommendations(processedProducts);
        } catch {
          console.error('All fallbacks failed');
          setRecommendations([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [interactions]);

  const handleImageError = (productId: string) => {
    console.warn('Image failed to load for product:', productId);
    setImageErrors(prev => new Set(prev).add(productId));
  };

  const handleCardClick = (product: Product) => {
    if (product.slug) {
      router.push(`/product/${product.slug}`);
    } else {
      // Fallback to ID if no slug
      router.push(`/product/${product._id}`);
    }
  };

  const getImageUrl = (product: Product) => {
    if (imageErrors.has(product._id)) {
      return '/placeholder-image.png';
    }

    // The product.image should already be a resolved string URL
    // from our earlier processing
    if (typeof product.image === 'string' && product.image) {
      // For images
      if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
        return product.image; // External URL
      }

      if (product.image.startsWith('/')) {
        return product.image; // Absolute path
      }

      // Try to construct a valid URL
      try {
        // If it's a relative path without leading slash, add it
        if (!product.image.startsWith('/') && !product.image.includes('://')) {
          return '/' + product.image;
        }
      } catch {
        console.warn('Invalid image URL for product:', product._id, product.image);
      }
    }

    // Fallback to placeholder
    return '/placeholder-image.png';
  };

  const isVideo = (product: Product) => {
    if (typeof product.image === 'string') {
      return product.image.includes('.mp4') ||
             product.image.includes('video') ||
             product.image.includes('.mov') ||
             product.image.includes('.avi') ||
             product.image.includes('.webm');
    }
    return false;
  };

  if (loading) return <div className="p-4">Loading recommendations...</div>;

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-red-600">AI-Powered Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recommendations.map((product: Product) => (
            <div
              key={product._id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative cursor-pointer"
              onClick={() => handleCardClick(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(product);
                }
              }}
            >
              <div className="relative overflow-hidden">
                <div className="relative w-full h-80">
                  {isVideo(product) ? (
                    <video
                      src={getImageUrl(product)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={() => handleImageError(product._id)}
                    />
                  ) : (
                    <Image
                      src={getImageUrl(product)}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(product._id)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    />
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
