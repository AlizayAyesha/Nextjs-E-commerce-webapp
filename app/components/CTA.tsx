"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://i.pinimg.com/736x/00/de/b2/00deb2cfeca9e84539dad06dd625d087.jpg" // replace with your luxury background image
        alt="Elite Experience"
        fill
        className="object-cover brightness-[0.4]"
        priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <div className="bg-black/50 backdrop-blur-md p-10 rounded-3xl border border-[#f5d78e40] shadow-[0_0_30px_rgba(245,215,142,0.2)] hover:shadow-[0_0_50px_rgba(245,215,142,0.4)] transition-all duration-500">
          <p className="text-[#f5d78e] uppercase tracking-widest font-medium text-lg mb-2">
            Exclusive Offer
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#f5d78e] to-[#b8913c] bg-clip-text text-transparent mb-6">
            The Luxury Experience Awaits
          </h2>
          <p className="text-gray-200 text-lg max-w-xl mx-auto mb-8">
            Unlock elite memberships, private bookings, and timeless
            sophistication — all curated for the refined few.
          </p>
          <Link
            href="#"
            className="inline-block bg-gradient-to-r from-[#f5d78e] to-[#b8913c] text-black font-semibold px-10 py-4 rounded-full shadow-[0_0_15px_rgba(245,215,142,0.3)] hover:scale-105 transition-transform duration-300"
          >
            Discover Luxury
          </Link>
        </div>
      </div>

      {/* Decorative overlay glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
    </section>
  );
};

export default CTA;
