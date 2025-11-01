// components/Hero.tsx
"use client";

import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Link from 'next/link';

const Hero = () => {
  const videoUrl = "https://cdn.sanity.io/files/7p0muvi9/production/3de30ac087167a840a320764ce1f2b1937072f3d.mp4";

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-200 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              The Ultimate Destination for the <span className="text-yellow-500">Elite</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover a realm of sophistication. From luxury bookings to high-end collections — live beyond ordinary.
            </p>
            <Link href="/product">
              <Button className="bg-gradient-to-r from-yellow-500 to-blue-900 hover:from-yellow-600 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="mr-3 h-6 w-6" /> Start Shopping
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform rotate-3 opacity-20"></div>
            <video
              className="relative w-full h-auto rounded-2xl shadow-2xl"
              src={videoUrl}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
