"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LuxuryCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  const videos = [
    {
      url: "/videos/jet.mp4",
      title: "Private Jet",
      description: "Fly Beyond Limits ",
    },
    {
      url: "/videos/yatch.mp4",
      title: "Luxury Yacht",
      description: "Sail in Style ⛵",
    },
    {
      url: "/videos/helicopter.mp4",
      title: "Helicopter Tour",
      description: "Sky High Adventures 🚁",
    },
    {
      url: "/videos/jetskieclub.mp4",
      title: "Jet Ski Club",
      description: "Thrill on the Waves 🏄‍♂️",
    },
  ];

  return (
    <div className="bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-12">
          Elite Memmbershiph Clubs
        </h2>

        <Slider {...settings}>
          {videos.map((video, index) => (
            <div key={index} className="px-4">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <video
                  src={video.url}
                  className="w-full h-[500px] object-cover rounded-3xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-lg text-gray-200">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="mt-12 text-center">
          <a
            href="/membership"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Join Memberships on 50% Off
          </a>
        </div>
      </div>
    </div>
  );
}
