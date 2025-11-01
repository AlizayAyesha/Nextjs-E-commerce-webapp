"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import productsData from "../components/query-result.json";
import ProductCard from "../../components/ui/ProductCard";



export default function MembershipPage() {
  const [bookingProducts, setBookingProducts] = useState([]);

  useEffect(() => {
    const allProducts = productsData.map((p) => ({
      ...p,
      price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
    }));
    const filteredProducts = allProducts.filter((product) => product.categoryName === 'booking');
    setBookingProducts(filteredProducts);
  }, []);

  // Featured carousel memberships
  const featured = [
    {
      title: "Cruise",
      image: "https://v1.pinimg.com/videos/mc/720p/7f/3a/e5/7f3ae52c4d8ea53ca1f09881db55fca0.mp4",
      description: "Luxury cruise ship membership",
      slug: "cruise-booking",
    },
    {
      title: "Ski",
      image: "https://v1.pinimg.com/videos/mc/720p/90/bf/41/90bf4119c7db4a80ecabdb88178413a0.mp4",
      description: "Skiing mountain club",
      slug: "ski-booking",
    },
    {
      title: "Trophy Hunting Club",
      image: "https://i.pinimg.com/736x/59/6f/70/596f70ac9a4dcf35afc27b188800aa4d.jpg",
      description: "Trophy hunting club",
      slug: "trophy-hunting-booking",
    },
  ];



  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #ffffff, #f6f6f6)",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      {/* Featured Carousel */}
      <section style={{ padding: "50px 0" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "40px",
            color: "#1a1a1a",
            letterSpacing: "1px",
          }}
        >
          Featured Memberships
        </h1>

        <div style={{ width: "85%", margin: "0 auto" }}>
          <Slider {...settings}>
            {featured.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    position: "relative",
                    height: "75vh",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  }}
                >
                  {item.image.includes('.mp4') ? (
                    <video
                      src={item.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(75%)",
                      }}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      style={{
                        objectFit: "cover",
                        filter: "brightness(75%)",
                      }}
                    />
                  )}

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      textAlign: "center",
                      padding: "0 20px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: "700",
                        marginBottom: "15px",
                      }}
                    >
                      {item.title}
                    </h2>
                    <p
                      style={{
                        maxWidth: "700px",
                        fontSize: "1.1rem",
                        lineHeight: "1.6",
                        color: "#eee",
                      }}
                    >
                      {item.description}
                    </p>
                    <Link href={`/product/${item.slug}`}>
                      <button
                        style={{
                          marginTop: "25px",
                          background:
                            "linear-gradient(to right, #ffcc00, #ff8800)",
                          color: "#000",
                          border: "none",
                          padding: "12px 30px",
                          fontWeight: "600",
                          borderRadius: "30px",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background =
                            "linear-gradient(to right, #ffdd33, #ffaa22)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background =
                            "linear-gradient(to right, #ffcc00, #ff8800)")
                        }
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Other Memberships Section */}
      <section style={{ width: "90%", margin: "60px auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "40px",
            color: "#222",
          }}
        >
          Explore More Memberships
        </h2>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-8">
            Experience unparalleled luxury with our exclusive booking services. From private jets to yacht charters, indulge in the finest adventures.
          </p>
        </div>

        {bookingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bookingProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  price: typeof product.price === 'number' ? product.price : 0,
                  name: product.name,
                  slug: product.slug,
                  imageUrl: product.imageUrl || '/placeholder.jpg',
                  categoryName: product.categoryName,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No booking products available at the moment.</p>
        )}
      </section>


    </div>
  );
}
