'use client'
import Link from "next/link"
import { useState, useEffect } from "react";
import "./HeroSection.css"; // استيراد ملف CSS

const HeroSectionPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "FIND CLOTHES THAT MATCHES YOUR STYLE",
      description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
      image: "/download-removebg-preview (7).png",
    },
    {
      title: "SUMMER COLLECTION 2024",
      description: "Discover the latest trends and styles for the upcoming season. Fresh looks for every occasion.",
      image: "/hero-image-2.png",
    },
    {
      title: "EXCLUSIVE DISCOUNTS",
      description: "Get up to 50% off on selected items. Limited time offer. Shop now and save big!",
      image: "/hero-image-3.png",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "200+", label: "International Brands" },
    { number: "2,000+", label: "High-Quality Products" },
    { number: "30,000+", label: "Happy Customers" },
  ];

  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "CALVIN KLEIN"];

  return (
    <div className="hero-wrapper ">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-slide">
                <h1 className="hero-title mt-5 pt-5">
                  {slides[currentSlide].title.split(' ').map((word, i) => 
                    word === 'STYLE' || word === 'COLLECTION' || word === 'DISCOUNTS' ? (
                      <span key={i} className="highlight">{word} </span>
                    ) : (
                      word + ' '
                    )
                  )}
                </h1>
                
                <p className="hero-description">
                  {slides[currentSlide].description}
                </p>

                <div className="hero-buttons">
                  <Link href="/arrivals" className="btn-shop">
                    Shop Now
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Link>
                  
                  <Link href="/products" className="btn-browse">
                    Browse Collection
                  </Link>
                </div>

                {/* Stats */}
                <div className="stats-container">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <h2>{stat.number}</h2>
                      <p>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hero-image-wrapper">
              <div className="hero-image-container">
                <img
                  src={slides[currentSlide].image}
                  alt="Fashion Model"
                  className="hero-image"
                />
                
                {/* Floating Elements */}
                <div className="floating-badge badge-1">
                  <span className="badge-icon">✨</span>
                  <div className="badge-text">
                    <strong>New Arrivals</strong>
                    <small>500+ Products</small>
                  </div>
                </div>
                
                <div className="floating-badge badge-2">
                  <span className="badge-icon">🔥</span>
                  <div className="badge-text">
                    <strong>Hot Sale</strong>
                    <small>Up to 70% off</small>
                  </div>
                </div>

                {/* Slide Indicators */}
                <div className="slide-indicators">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Bar */}
      <div className="brands-bar">
        <div className="brands-track">
          {[...brands, ...brands].map((brand, index) => (
            <span key={index} className="brand-item">{brand}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionPage;