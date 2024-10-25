// components/Hero.tsx
"use client";

import { Button } from "@/components/ui/button"; // Check if this path is correct
import { ShoppingCart } from "lucide-react";
import Link from 'next/link';

const Hero = () => {
  const videoUrl = "https://cdn.sanity.io/files/7p0muvi9/production/3de30ac087167a840a320764ce1f2b1937072f3d.mp4"; 

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col items-start sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-9 md:text-6xl">
            An Industrial Take on Streetwear
          </h1>
          <p className="mb-6 max-w-md leading-relaxed text-gray-800 xl:text-lg">
            Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
          </p>
          <Link href="/product">
            <Button className="bg-slate-500 text-black hover:text-white">
              <ShoppingCart className="mr-2 h-5 w-5" /> Start Shopping
            </Button>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 relative">
          <video
            className="w-full h-auto rounded-lg"
            src={videoUrl}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
