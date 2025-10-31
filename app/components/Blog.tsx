"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Blog = () => {
  const blogPosts = [
    {
      image: "https://i.pinimg.com/736x/71/ac/5e/71ac5e4ee56e3d1b171260ee4bc0a485.jpg",
      category: "Elite Lifestyle",
      title: "The Art of Living Lavishly — Inside the World of Modern Aristocrats",
      author: "Alizay Yousfzai",
      date: "2025-05-01",
    },
    {
      image: "https://i.pinimg.com/736x/cd/0c/f7/cd0cf7e0e0fca1e3105975f29193253d.jpg",
      category: "Private Travel",
      title: "From Jet Decks to Ocean Views — Redefining the Luxury Voyage",
      author: "Alexander Pierce",
      date: "2025-04-22",
    },
    {
      image: "https://i.pinimg.com/1200x/77/a5/b5/77a5b521f0cd5048671a799ce968c9f2.jpg",
      category: "Bespoke Fashion",
      title: "Couture Beyond Time — Where Elegance Meets Identity",
      author: "Elena Dior",
      date: "2025-04-12",
    },
    {
      image: "https://i.pinimg.com/736x/be/c5/7b/bec57b3acc85e865f9c5418b3a531de8.jpg",
      category: "Exclusive Memberships",
      title: "The Privileged Circle — Unlocking Access to Limitless Luxury",
      author: "Daniel Cruz",
      date: "2025-03-30",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    cssEase: "ease-in-out",
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* ✨ Golden Glitter Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(245,215,142,0.25)_1px,transparent_1px)] bg-[length:40px_40px] animate-glitter pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-[#c9a646] to-[#f5d78e] bg-clip-text text-transparent mb-4">
            The Essence of Luxury
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Indulge in stories of opulence, innovation, and timeless sophistication — crafted for the connoisseurs of luxury.
          </p>
        </div>

        {/* Carousel */}
        <Slider {...settings}>
          {blogPosts.map((post, index) => (
            <div key={index} className="px-4">
              <div className="bg-white border border-[#f5d78e80] rounded-3xl shadow-[0_8px_25px_rgba(245,215,142,0.2)] hover:shadow-[0_12px_35px_rgba(245,215,142,0.35)] transition-all duration-300">
                <Link href="#">
                  <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <span className="inline-block bg-gradient-to-r from-[#f5d78e] to-[#c9a646] text-white text-xs px-4 py-1 rounded-full uppercase tracking-wider mb-3">
                    {post.category}
                  </span>
                  <Link href="#">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-snug hover:text-[#c9a646] transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm">
                    By{" "}
                    <cite className="font-semibold text-[#c9a646] not-italic">
                      {post.author}
                    </cite>{" "}
                    /{" "}
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ✨ Glitter Animation */}
      <style jsx>{`
        @keyframes glitter {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100px 100px;
          }
        }
        .animate-glitter {
          animation: glitter 10s linear infinite;
          opacity: 0.2;
        }
      `}</style>
    </section>
  );
};

export default Blog;
