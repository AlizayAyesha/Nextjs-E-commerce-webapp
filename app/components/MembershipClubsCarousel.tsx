"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MembershipClubsCarousel() {
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
      url: "https://v1.pinimg.com/videos/mc/720p/36/45/bd/3645bd16d43723c3c48edd8407bf1ec3.mp4", // Placeholder - user will replace
      title: "Exclusive Club Access",
      description: "Unlock premium membership benefits with our exclusive discounts.",
    },
    {
      url: "https://v1.pinimg.com/videos/mc/720p/2c/dd/6c/2cdd6c6be47755dba680ea8ab88c4c81.mp4", // Placeholder - user will replace
      title: "VIP Membership Perks",
      description: "Enjoy unparalleled savings and privileges with our membership clubs.",
    },
    {
      url: "https://v1.pinimg.com/videos/mc/720p/4e/5c/d6/4e5cd6844136d8b5d11300d60c0c0619.mp4", // Placeholder - user will replace
      title: "Elite Club Discounts",
      description: "Discover extraordinary deals available only to our valued members.",
    },
  ];

  return (
    <div className="bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-12">
          Membership Clubs Discounts
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
      </div>
    </div>
  );
}
