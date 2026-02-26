'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaStar, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdNewReleases } from "react-icons/md";
import './Arrivals.css';
import { useShop } from '@/components/store/ShopContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ArrivalsPages = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [email, setEmail] = useState('');
  const [cardHeight, setCardHeight] = useState(470);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products?limit=100');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, sortBy]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing! We'll send updates to ${email}`);
      setEmail('');
    }
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  const getStockStatus = (stock: number) => {
    if (stock > 20) return { class: 'high', text: 'In Stock' };
    if (stock > 5) return { class: 'medium', text: 'Limited Stock' };
    if (stock > 0) return { class: 'low', text: `Only ${stock} left` };
    return { class: 'low', text: 'Out of Stock' };
  };

  const newArrivals = filteredProducts.filter(p => p.id > 90); // Assume newer products have higher IDs
  const featuredProduct = products.find(p => p.id === 1);

  if (loading) {
    return (
      <div className="arrivals-page">
        <div className="arrivals-loading">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="loading-card">
              <div className="loading-image"></div>
              <div className="loading-content">
                <div className="loading-line"></div>
                <div className="loading-line short"></div>
                <div className="loading-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="arrivals-page">
      {/* Hero Section */}
      <div className="arrivals-hero">
        <div className="hero-content">
          <h1>
            New <span>Arrivals</span>
          </h1>
          <p>Discover the latest trends and styles for the new season. Fresh looks, exclusive designs, and limited editions just for you.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="number">{newArrivals.length}+</span>
              <span className="label">New Items</span>
            </div>
            <div className="hero-stat">
              <span className="number">Up to 70%</span>
              <span className="label">Limited Offers</span>
            </div>
            <div className="hero-stat">
              <span className="number">Free Ship</span>
              <span className="label">On $50+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="arrivals-breadcrumb">
        <Link href="/" className="breadcrumb-item">Home</Link>
        <FaAngleRight className="breadcrumb-separator" />
        <span className="breadcrumb-item active">New Arrivals</span>
      </div>

      {/* Header */}
      <div className="arrivals-header">
        <div className="header-title">
          <h1>Fresh Looks</h1>
          <p>
            <MdNewReleases />
            <span>{filteredProducts.length}</span> products available
          </p>
        </div>

        <div className="filter-bar">
          <div className="search-box">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search arrivals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        <div className="card-height-control">
          <label htmlFor="arrivals-card-height">Card height</label>
          <input
            id="arrivals-card-height"
            type="range"
            min={390}
            max={650}
            value={cardHeight}
            onChange={(e) => setCardHeight(Number(e.target.value))}
          />
          <span>{cardHeight}px</span>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="arrivals-empty">
          <div className="empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or check back later for new arrivals.</p>
        </div>
      ) : (
        <div className="arrivals-grid" style={{ ['--arrival-card-height' as string]: `${cardHeight}px` }}>
          {filteredProducts.slice(0, 12).map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div key={product.id} className="arrival-card">
                <div className="card-badge">
                  {product.id > 90 && <span className="badge-new">NEW</span>}
                  {product.discountPercentage > 15 && (
                    <span className="badge-discount">-{product.discountPercentage}%</span>
                  )}
                </div>

                <div className="card-image">
                  <Link href={`/arrivals/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                    />
                  </Link>

                  <div className="card-actions">
                    <button
                      className={`action-btn wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  <div className="quick-view-overlay">
                    <Link href={`/arrivals/${product.id}`} className="quick-view-btn">
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-brand">{product.brand}</div>
                  <h3 className="card-title">
                    <Link href={`/arrivals/${product.id}`}>{product.title}</Link>
                  </h3>

                  <div className="card-rating">
                    <div className="rating-stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-count">({product.rating})</span>
                  </div>

                  <div className="card-price">
                    <span className="current-price">
                      ${calculateDiscountedPrice(product.price, product.discountPercentage)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="original-price">${product.price}</span>
                        <span className="save-badge">
                          Save {product.discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="stock-info">
                      <span className={`stock-dot ${stockStatus.class}`}></span>
                      <span>{stockStatus.text}</span>
                    </div>
                    <button className="add-to-cart-btn" title="Add to Cart" onClick={() => addToCart(product)}>
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Featured Banner */}
      {featuredProduct && (
        <div className="featured-banner">
          <div className="banner-content">
            <h2>
              Featured: <span>{featuredProduct.title}</span>
            </h2>
            <p>{featuredProduct.description}</p>
            <Link href={`/arrivals/${featuredProduct.id}`} className="banner-btn">
              Shop Now → 
            </Link>
          </div>
          <div className="banner-image">
            <img src={featuredProduct.thumbnail} alt={featuredProduct.title} />
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="arrivals-newsletter">
        <div className="newsletter-content">
          <h2>Never Miss New Arrivals</h2>
          <p>Subscribe to get notified about our latest products and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArrivalsPages;
