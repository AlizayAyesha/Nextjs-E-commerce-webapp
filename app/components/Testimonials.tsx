"use client";

import React from "react";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section
      className="relative py-24 bg-white text-gray-800 overflow-hidden"
    >
      {/* ✨ Golden Glitter Background ✨ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(245,215,142,0.3)_1px,transparent_1px)] bg-[length:40px_40px] animate-sparkle"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-[#c9a646] to-[#f5d78e] bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Voices from our elite clientele — where elegance meets experience.
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          className="max-w-lg mx-auto bg-white border border-[#f5d78e80] rounded-3xl p-10 text-center shadow-[0_10px_30px_rgba(245,215,142,0.25)] hover:shadow-[0_15px_40px_rgba(245,215,142,0.35)] transition-all duration-300"
        >
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#f5d78e] shadow-[0_0_20px_rgba(245,215,142,0.4)]">
              <Image
                src="https://i.pinimg.com/736x/d9/f1/01/d9f1016b0dd1544daa8c4920f3dd7e26.jpg"
                alt="Alizay"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Name & Title */}
          <h3 className="text-2xl font-semibold mb-1 text-[#c9a646]">
            Alizay
          </h3>
          <p className="text-gray-500 mb-6 text-sm">
            CEO & Founder of Luxury Store
          </p>

          {/* Quotation mark */}
          <div className="w-8 h-8 mx-auto mb-4 opacity-80">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1001/1001267.png"
              alt="quotation"
              width={32}
              height={32}
            />
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed italic">
            “Luxury is not just about what you own — it’s about the experiences
            that define who you are. Every service we offer is crafted with
            precision and grace.”
          </p>
        </div>
      </div>

      {/* ✨ Sparkle Animation Keyframes ✨ */}
      <style jsx>{`
        @keyframes sparkle {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100px 100px;
          }
        }
        .animate-sparkle {
          animation: sparkle 10s linear infinite;
          opacity: 0.4;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
