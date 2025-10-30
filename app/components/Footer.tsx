"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const LuxuryFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-gray-300 overflow-hidden">
      {/* ✨ Subtle Gold Sparkle Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(249,220,130,0.15)_1px,transparent_1px)] bg-[length:60px_60px] animate-glitter pointer-events-none"></div>

      {/* ✨ Floating gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#f7d47b] rounded-full opacity-60 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Top Section */}
      <div className="relative border-b border-[#b38b2f33] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#b38b2f] to-[#f7d47b] bg-clip-text text-transparent tracking-wider drop-shadow-[0_1px_4px_rgba(179,139,47,0.4)]">
            Brand Directory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Haute Couture",
                items: [
                  "Designer Gowns",
                  "Luxury Suits",
                  "Evening Dresses",
                  "Tailored Jackets",
                  "Silk & Cashmere",
                ],
              },
              {
                title: "Exclusive Footwear",
                items: [
                  "Italian Leather",
                  "Heels & Loafers",
                  "Limited Editions",
                  "Handcrafted Boots",
                  "Bespoke Sneakers",
                ],
              },
              {
                title: "Fine Jewellery",
                items: [
                  "Diamond Necklaces",
                  "Gold Earrings",
                  "Engagement Rings",
                  "Platinum Bracelets",
                  "Luxury Watches",
                ],
              },
              {
                title: "Luxury Essentials",
                items: [
                  "Fragrances",
                  "Skincare",
                  "Luxury Perfume Oils",
                  "Makeup & Glow",
                  "Hair & Body Care",
                ],
              },
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-semibold text-[#f7d47b] border-b border-[#b38b2f66] pb-2">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block text-gray-400 hover:text-[#f7d47b] hover:drop-shadow-[0_0_6px_#f7d47b80] transition-all duration-300 hover:translate-x-1"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="relative border-b border-[#b38b2f33] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {[
            {
              title: "Luxury Spheres",
              items: ["Yachts", "Private Jets", "Resorts", "Watches", "Fashion Houses"],
            },
            {
              title: "Our Offerings",
              items: ["Memberships", "Concierge Services", "Events", "Investments", "Estate Access"],
            },
            {
              title: "The Maison",
              items: ["About Us", "Philosophy", "Heritage", "Privacy Policy", "Contact"],
            },
            {
              title: "Exclusives",
              items: ["Limited Editions", "Collaborations", "Gifting", "Press", "Careers"],
            },
          ].map((col, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-lg font-bold text-[#f7d47b]">{col.title}</h2>
              <div className="space-y-2">
                {col.items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-[#f7d47b] hover:drop-shadow-[0_0_6px_#f7d47b80] transition-all duration-300"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact & Follow */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#f7d47b]">Contact</h2>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#f7d47b]" />
                  <address className="not-italic">
                    419 State 414 Rte <br /> Beaver Dams, New York, USA
                  </address>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#f7d47b]" />
                  <a href="tel:+6079368058" className="hover:text-[#f7d47b] transition-colors">
                    (607) 936-8058
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#f7d47b]" />
                  <a href="mailto:info@luxuria.com" className="hover:text-[#f7d47b] transition-colors">
                    info@luxuria.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#f7d47b]">Follow Us</h2>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#b38b2f] hover:to-[#f7d47b] hover:text-black transition-all duration-500 transform hover:scale-110 shadow-md hover:shadow-[#f7d47b]/40"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative py-8 bg-[#0e0e0e]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <img src="https://www.pikpng.com/pngl/b/286-2864817_visa-mastercard-and-american-express-for-international-visa.png" alt="payment methods" className="h-8 opacity-80" />
          <p className="text-gray-500 text-sm text-center md:text-right">
            ©{" "}
            <Link href="#" className="text-[#f7d47b] font-semibold hover:text-[#e2b94b] transition-all">
              Alizay Ayesha
            </Link>{" "}
            — All Rights Reserved. Crafted with Grace & Gold ✨
          </p>
        </div>
      </div>

      {/* Animations */}
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
          animation: glitter 18s linear infinite;
          opacity: 0.25;
        }
      `}</style>
    </footer>
  );
};

export default LuxuryFooter;
