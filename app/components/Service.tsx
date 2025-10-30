"use client";

import React from "react";
import Link from "next/link";
import { Ship, Rocket, Phone, Undo, Ticket } from "lucide-react";

const Service = () => {
  const services = [
    {
      icon: <Ship className="w-8 h-8 text-[#c6a645]" />,
      title: "Global Concierge Delivery",
      desc: "Elite delivery to every destination worldwide.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-[#c6a645]" />,
      title: "Next-Day Priority Access",
      desc: "Experience ultra-fast handling for premium members.",
    },
    {
      icon: <Phone className="w-8 h-8 text-[#c6a645]" />,
      title: "24/7 Luxury Assistance",
      desc: "Personal support dedicated to your lifestyle.",
    },
    {
      icon: <Undo className="w-8 h-8 text-[#c6a645]" />,
      title: "Seamless Returns",
      desc: "Effortless exchange with white-glove service.",
    },
    {
      icon: <Ticket className="w-8 h-8 text-[#c6a645]" />,
      title: "Elite Reward Program",
      desc: "Earn prestige points with every experience.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-[#fffaf0] to-[#fef6dc] overflow-hidden">
      {/* Light golden shimmer overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,215,100,0.15),_transparent_70%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-[#c6a645] to-[#e3ca76] bg-clip-text text-transparent">
          Our Elite Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {services.map((service, index) => (
            <Link
              key={index}
              href="#"
              className="group relative flex flex-col items-center text-center bg-white border border-[#e9dfb8] rounded-2xl p-8 shadow-md hover:shadow-[0_0_25px_rgba(198,166,69,0.4)] hover:scale-[1.03] transition-all duration-500"
            >
              {/* Icon */}
              <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#fff6da] to-[#f7e7b1] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#c6a645] mb-2 tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
