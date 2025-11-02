"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, Heart, Bell, Gift, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import productsData from './query-result.json';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LuxuryCarousel from './LuxuryCarousel';

interface Product {
  _id: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  imageUrl: string | null;
  description: string | null;
}

export default function Newest() {
  const [products, setProducts] = useState<Product[]>([]);
  const [topPicks, setTopPicks] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [stockAlerts, setStockAlerts] = useState<{ [key: string]: boolean }>({});
  const [showSpinGame, setShowSpinGame] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [showLuxuryPerfumePopup, setShowLuxuryPerfumePopup] = useState(false);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const { convertPrice, currency } = useCurrency();
  const { addToWishlist: addToWishlistContext, removeFromWishlist: removeFromWishlistContext, isInWishlist } = useWishlist();

  useEffect(() => {
    const menProducts = productsData
      .filter((p) => p.categoryName === 'Men')
      .slice(0, 4)
      .map((p) => ({
        ...p,
        price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
      }));
    setProducts(menProducts);

    const topPicksProducts = productsData
      .filter((p) => p.categoryName === 'Top picks')
      .slice(0, 8)
      .map((p) => ({
        ...p,
        price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
      }));
    setTopPicks(topPicksProducts);

    // Load recently viewed from localStorage
    const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }

    // Load stock alerts from localStorage
    const savedAlerts = localStorage.getItem('stockAlerts');
    if (savedAlerts) {
      setStockAlerts(JSON.parse(savedAlerts));
    }
  }, []);



  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Show luxury perfume popup after 3 seconds
    const timer1 = setTimeout(() => {
      setShowLuxuryPerfumePopup(true);
    }, 3000);

    // Show subscribe popup after 10 seconds and then every 30 seconds
    const timer2 = setTimeout(() => {
      setShowSubscribePopup(true);
      interval = setInterval(() => {
        setShowSubscribePopup(true);
      }, 30000); // Every 30 seconds
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (interval) clearInterval(interval);
    };
  }, []);



  const addToRecentlyViewed = (product: Product) => {
    const newRecentlyViewed = [product, ...recentlyViewed.filter(p => p._id !== product._id)].slice(0, 5);
    setRecentlyViewed(newRecentlyViewed);
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
  };

  const subscribeToStockAlert = (productId: string) => {
    const newAlerts = { ...stockAlerts, [productId]: true };
    setStockAlerts(newAlerts);
    localStorage.setItem('stockAlerts', JSON.stringify(newAlerts));
    alert('Subscribed to stock alerts for this product!');
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setSpinResult(null);

    // Simulate spinning animation
    setTimeout(() => {
      const prizes = ['10% Off', '20% Off', 'Free Shipping', 'Try Again', '50% Off', 'Buy One Get One'];
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSpinResult(randomPrize);
      setIsSpinning(false);
    }, 2000);
  };



  return (
    <>
      <div className="bg-white py-16">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-12'>
          <h2 className='text-4xl font-extrabold tracking-tight text-red-600'>Hot Sale</h2>

          <Link href='/product' className='text-indigo-600 hover:text-indigo-800 flex items-center gap-x-2 font-semibold transition-colors duration-200'>
            See All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {products && products.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-0'>
            {products.map((product: Product) => (
              <div key={product._id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => isInWishlist(product._id) ? removeFromWishlistContext(product._id) : addToWishlistContext({
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.imageUrl || '',
                      slug: product.slug,
                      category: product.categoryName,
                      description: product.description || '',
                    })}
                    className={`p-2 rounded-full ${isInWishlist(product._id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:bg-red-500 hover:text-white transition-colors`}
                  >
                    <Heart className="w-4 h-4" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => subscribeToStockAlert(product._id)}
                    className={`p-2 rounded-full ${stockAlerts[product._id] ? 'bg-green-500 text-white' : 'bg-white text-gray-600'} hover:bg-green-500 hover:text-white transition-colors`}
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src={product.imageUrl ?? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                    width={300}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <Link href={`/product/${product.slug}`} onClick={() => addToRecentlyViewed(product)} className="hover:text-indigo-600 transition-colors duration-200">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">
                    {currency} {convertPrice(product.price).toFixed(2)}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => addToRecentlyViewed(product)}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    View More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        )}

        {/* Luxurious Bookings Carousel */}
        <div className="mt-20">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-yellow-400">★</span> Luxury Sale
            </h3>
            <Link href='/luxury' className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 md:hidden'>
              View More
            </Link>
          </div>

          <Slider
            dots={true}
            infinite={true}
            speed={900}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={5000}
            fade={true}
            cssEase="ease-in-out"
            arrows={false}
          >
            {[
              {
                url: "https://v1.pinimg.com/videos/mc/720p/36/45/bd/3645bd16d43723c3c48edd8407bf1ec3.mp4",
                title: "ROLLS-ROYCE PHANTOM SERIES II",
                desc: "Timeless craftsmanship meets modern elegance. Experience the pinnacle of luxury.",
                slug: "rolls-royce-phantom-series-ii",
              },
              {
                url: "https://v1.pinimg.com/videos/mc/720p/2c/dd/6c/2cdd6c6be47755dba680ea8ab88c4c81.mp4",
                title: "BENTLEY CONTINENTAL GT",
                desc: "Pure British luxury redefined. Grace, power, and sophistication in one frame.",
                slug: "bentley-continental-gt",
              },
            ].map((vid, i) => (
              <div key={i} className="px-6">
                <Link href={`/product/${vid.slug}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer">
                    <video
                      src={vid.url}
                      className="w-full h-[450px] object-cover rounded-3xl transition-transform duration-[2500ms] ease-in-out group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-10">
                      <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl transition-all duration-500 group-hover:bg-white/10">
                        <h4 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">{vid.title}</h4>
                        <p className="text-sm text-gray-200 mt-2">{vid.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

       {/* You May Also Like — Videos Carousel */}
<div className="hidden md:block mt-20">
  <div className="flex justify-between items-center mb-8">
    <h3 className="text-3xl font-extrabold text-gray-900">
      You May Also Like — Watch & Discover
    </h3>
    <Link href='/luxury' className='text-indigo-600 hover:text-indigo-800 flex items-center gap-x-2 font-semibold transition-colors duration-200'>
      More
      <ArrowRight className="w-5 h-5" />
    </Link>
  </div>

  <div className="carousel-container px-4">
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={3}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={4000}
      cssEase="ease-in-out"
      arrows={true}
      centerMode={true}
      centerPadding="60px"
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '40px',
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '80px',
            arrows: false,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '60px',
            arrows: false,
            dots: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '40px',
            arrows: false,
            dots: true,
          }
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '30px',
            arrows: false,
            dots: true,
          }
        }
      ]}
    >
      {[
        {
          url: "https://v1.pinimg.com/videos/mc/720p/4e/5c/d6/4e5cd6844136d8b5d11300d60c0c0619.mp4",
          title: "ASTON MARTIN DB12",
          slug: "aston-martin-db12",
        },
        {
          url: "https://v1.pinimg.com/videos/mc/720p/8d/b5/d7/8db5d723f96cc05bb4e8e7678d2b5fc1.mp4",
          title: "Mclaren 570S",
          slug: "mclaren-570s",
        },
        {
          url: "https://v1.pinimg.com/videos/mc/720p/d5/b9/50/d5b950936ff5da14a995da5d052765fa.mp4",
          title: "Ferrari F8 Spider",
          slug: "ferrari-f8-spider",
        },
        {
          url: "https://v1.pinimg.com/videos/mc/720p/36/45/bd/3645bd16d43723c3c48edd8407bf1ec3.mp4",
          title: "ROLLS-ROYCE PHANTOM SERIES II",
          slug: "rolls-royce-phantom-series-ii",
        },
        {
          url: "https://v1.pinimg.com/videos/mc/720p/2c/dd/6c/2cdd6c6be47755dba680ea8ab88c4c81.mp4",
          title: "BENTLEY CONTINENTAL GT",
          slug: "bentley-continental-gt",
        },
      ].map((vid, index) => (
        <div key={index} className="px-2">
          <Link href={`/product/${vid.slug}`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer bg-gray-100 mx-auto max-w-sm">
              <video
                src={vid.url}
                className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-in-out"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-start p-4">
                <h4 className="text-lg font-semibold text-white drop-shadow-md">
                  {vid.title}
                </h4>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  </div>
</div>

        {/* Top Picks */}
        {topPicks && topPicks.length > 0 && (
          <div className="mt-16">
            <div className='flex justify-between items-center mb-12'>
              <h2 className='text-4xl font-extrabold tracking-tight text-red-600'>Top Picks</h2>

              <Link href='/product' className='text-indigo-600 hover:text-indigo-800 flex items-center gap-x-2 font-semibold transition-colors duration-200'>
                See All
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-0'>
              {topPicks.map((product: Product) => (
                <div key={product._id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                      onClick={() => isInWishlist(product._id) ? removeFromWishlistContext(product._id) : addToWishlistContext({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.imageUrl || '',
                        slug: product.slug,
                        category: product.categoryName,
                        description: product.description || '',
                      })}
                      className={`p-2 rounded-full ${isInWishlist(product._id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:bg-red-500 hover:text-white transition-colors`}
                    >
                      <Heart className="w-4 h-4" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => subscribeToStockAlert(product._id)}
                      className={`p-2 rounded-full ${stockAlerts[product._id] ? 'bg-green-500 text-white' : 'bg-white text-gray-600'} hover:bg-green-500 hover:text-white transition-colors`}
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.imageUrl ?? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      <Link href={`/product/${product.slug}`} onClick={() => addToRecentlyViewed(product)} className="hover:text-indigo-600 transition-colors duration-200">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-2xl font-bold text-indigo-600 mb-4">
                      {currency} {convertPrice(product.price).toFixed(2)}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => addToRecentlyViewed(product)}
                      className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Luxury Carousel */}
        <LuxuryCarousel />

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Recently Viewed</h3>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-0'>
              {recentlyViewed.map((product: Product) => (
                <div key={product._id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.imageUrl ?? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      <Link href={`/product/${product.slug}`} className="hover:text-indigo-600 transition-colors duration-200">
                        {product.name}
                      </Link>
                    </h4>
                    <p className="text-xl font-bold text-indigo-600">
                      {currency} {convertPrice(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spin-to-Win Button */}
        <div className="fixed bottom-20 right-4 z-50">
          <button
            onClick={() => setShowSpinGame(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            <Gift className="w-6 h-6" />
          </button>
        </div>

        {/* Spin-to-Win Popup */}
        {showSpinGame && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Spin to Win!</h3>
              <p className="mb-4">Spin the wheel for a chance to win discounts!</p>

              {/* Spinning Wheel */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-32 h-32 rounded-full border-8 border-yellow-400 flex items-center justify-center text-2xl font-bold transition-transform duration-2000 ${
                    isSpinning ? 'animate-spin' : ''
                  }`}
                  style={{
                    background: 'conic-gradient(from 0deg, #fbbf24, #f59e0b, #d97706, #b45309, #92400e, #fbbf24)',
                  }}
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    {spinResult ? (
                      <span className="text-green-600 font-bold">{spinResult}</span>
                    ) : (
                      <Gift className="w-8 h-8 text-yellow-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowSpinGame(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {isSpinning ? 'Spinning...' : 'Spin Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Luxury Perfume 70% Off Popup */}
        {showLuxuryPerfumePopup && (
          <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-lg shadow-xl z-40 max-w-xs">
            <button
              onClick={() => setShowLuxuryPerfumePopup(false)}
              className="absolute top-1 right-1 text-white hover:text-gray-200"
            >
              ×
            </button>
            <div className="text-center">
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Luxury Perfume"
                width={80}
                height={80}
                className="mx-auto mb-2 rounded-lg"
              />
              <h4 className="font-bold text-lg mb-2 text-white">70% OFF</h4>
              <p className="text-sm mb-2 text-gray-300">Luxury Perfume</p>
              <Link
                href="/product/luxury-perfume"
                className="inline-block bg-gradient-to-r from-[#b38b2f] to-[#f7d47b] text-black px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}

{/* Subscribe Popup */}
{showSubscribePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] p-6 rounded-2xl max-w-sm w-full mx-4 border border-[#b38b2f] shadow-[0_0_25px_rgba(179,139,47,0.4)]">
      <button
        onClick={() => setShowSubscribePopup(false)}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-[#f7d47b] hover:bg-[#1f1f1f] rounded-full transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="text-center">
        <Image
          src="https://i.pinimg.com/736x/df/de/1b/dfde1bc6e80d8e39a4c4ab41dd47c49c.jpg"
          alt="Subscribe"
          width={300}
          height={300}
          className="rounded-xl mb-4 mx-auto border border-[#b38b2f] shadow-[0_0_15px_rgba(247,212,123,0.3)]"
        />
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#b38b2f] to-[#f7d47b] bg-clip-text text-transparent">
          Subscribe for Elite Access
        </h3>
        <p className="text-gray-400 mb-4">
          Unlock exclusive deals, early access & luxury updates delivered to your inbox.
        </p>

        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 bg-[#0f0f0f] border border-[#b38b2f]/40 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#b38b2f]"
          />
          <button className="bg-gradient-to-r from-[#b38b2f] to-[#f7d47b] text-black font-semibold px-4 py-2 rounded-r-lg hover:scale-105 transition-transform duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>


  </>
  );
}
