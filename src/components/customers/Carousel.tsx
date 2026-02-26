'use client'
import React, { useState, useRef, useEffect } from 'react';
import { GoCheck } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Alex K.",
      location: "New York, USA",
      rating: 5,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      avatar: "AK",
      verified: true,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah M.",
      location: "London, UK",
      rating: 5,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      avatar: "SM",
      verified: true,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "James L.",
      location: "Sydney, Australia",
      rating: 5,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      avatar: "JL",
      verified: true,
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Emily R.",
      location: "Paris, France",
      rating: 5,
      text: "The customer service at Shop.co is exceptional! They helped me find the perfect outfit for my event and the quality was outstanding. Will definitely shop again.",
      avatar: "ER",
      verified: true,
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Mike T.",
      location: "Toronto, Canada",
      rating: 5,
      text: "Fast shipping and great quality! I've ordered multiple times and always been satisfied with my purchases. Highly recommended!",
      avatar: "MT",
      verified: true,
      date: "1 day ago"
    },
    {
      id: 6,
      name: "Jessica P.",
      location: "Berlin, Germany",
      rating: 5,
      text: "Love the variety and quality of products. Shop.co has become my go-to for online shopping! The prices are reasonable and the styles are always up to date.",
      avatar: "JP",
      verified: true,
      date: "2 weeks ago"
    }
  ];

  const itemsPerView = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Auto play
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) > maxIndex ? 0 : prev + 1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) > maxIndex ? 0 : prev + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1) < 0 ? maxIndex : prev - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      nextSlide();
    }
    if (touchStart - touchEnd < -150) {
      prevSlide();
    }
  };

  const handleReadMore = (text) => {
    alert(text);
  };

  if (isLoading) {
    return (
      <div className="testimonials-wrapper">
        <div className="testimonials-header">
          <h2 className="testimonials-title">OUR HAPPY <span>CUSTOMERS</span></h2>
        </div>
        <div className="testimonials-loading">
          {[1, 2, 3].map((n) => (
            <div key={n} className="loading-card">
              <div className="loading-stars">
                <div className="loading-star"></div>
                <div className="loading-star"></div>
                <div className="loading-star"></div>
                <div className="loading-star"></div>
                <div className="loading-star"></div>
              </div>
              <div className="loading-avatar"></div>
              <div className="loading-line"></div>
              <div className="loading-line"></div>
              <div className="loading-line short"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="testimonials-wrapper">
      {/* Header */}
      <div className="testimonials-header">
        <h2 className="testimonials-title">
          OUR HAPPY <span>CUSTOMERS</span>
          <span className="title-badge">❤️ {testimonials.length}+ Reviews</span>
        </h2>
        
        <div className="testimonials-controls">
          <button 
            onClick={prevSlide} 
            className="control-btn"
            aria-label="Previous"
            disabled={currentIndex === 0}
          >
            <IoIosArrowBack />
          </button>
          <button 
            onClick={nextSlide} 
            className="control-btn"
            aria-label="Next"
            disabled={currentIndex >= maxIndex}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div 
        className="carousel-container"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-track">
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {/* Rating */}
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`star ${i < testimonial.rating ? 'filled' : ''}`} />
                ))}
                <span className="rating-text">{testimonial.rating}.0</span>
              </div>

              {/* Customer Info */}
              <div className="testimonial-customer">
                <div className="customer-avatar">
                  {testimonial.avatar}
                </div>
                <div className="customer-details">
                  <h3>
                    {testimonial.name}
                    {testimonial.verified && (
                      <span className="verified-badge" title="Verified Purchase">
                        <GoCheck />
                      </span>
                    )}
                  </h3>
                  <p className="customer-location">{testimonial.location}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="testimonial-text">
                "{testimonial.text.length > 120 
                  ? `${testimonial.text.substring(0, 120)}...` 
                  : testimonial.text}"
              </p>

              {/* Footer */}
              <div className="testimonial-footer">
                <span className="review-date">{testimonial.date}</span>
                <button 
                  className="read-more-btn" 
                  onClick={() => handleReadMore(testimonial.text)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
        />
      </div>

      {/* Stats */}
      <div className="testimonials-stats">
        <div className="stat">
          <span className="stat-value">4.8</span>
          <span className="stat-label">Average Rating</span>
        </div>
        <div className="stat">
          <span className="stat-value">{testimonials.length}+</span>
          <span className="stat-label">Verified Reviews</span>
        </div>
        <div className="stat">
          <span className="stat-value">98%</span>
          <span className="stat-label">Happy Customers</span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;