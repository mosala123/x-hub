'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import "./Arrivals.css";
import { useShop } from "../store/ShopContext";

interface Article {
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

const AllArivalesComponents = () => {
  const [products, setProducts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardHeight, setCardHeight] = useState(460);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/products?limit=8');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index < fullStars ? (
          <AiFillStar className="star-filled" />
        ) : index === fullStars && hasHalfStar ? (
          <AiFillStar className="star-half" />
        ) : (
          <AiOutlineStar className="star-empty" />
        )}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="arrivals-section">
        <div className="arrivals-container">
          <div className="arrivals-title">
            <h1>New <span>Arrivals</span></h1>
            <div className="title-decoration">
              <span className="line"></span>
              <span className="dot"></span>
              <span className="line"></span>
            </div>
          </div>
          
          <div className="skeleton-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="arrivals-section">
        <div className="arrivals-container">
          <div className="empty-state">
            <FaShoppingCart />
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchProducts} className="refresh-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="arrivals-section">
      <div className="arrivals-container">
        <div className="arrivals-title">
          <h1>New <span>Arrivals</span></h1>
          <div className="title-decoration">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>
        <div className="card-height-control">
          <label htmlFor="home-card-height">Card height</label>
          <input
            id="home-card-height"
            type="range"
            min={380}
            max={620}
            value={cardHeight}
            onChange={(e) => setCardHeight(Number(e.target.value))}
          />
          <span>{cardHeight}px</span>
        </div>

        <div className="products-grid" style={{ ['--card-min-height' as string]: `${cardHeight}px` }}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <Link href={`/arrivals/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                  />
                </Link>

                {product.discountPercentage > 0 && (
                  <span className="discount-badge">
                    -{product.discountPercentage}%
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  aria-label="Add to wishlist"
                >
                  <FiHeart />
                </button>

                <div className="product-overlay">
                  <button className="quick-view-btn" onClick={() => addToCart(product)}>
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="product-info">
                <Link href={`/arrivals/${product.id}`}>
                  <h3 className="product-title">{product.title}</h3>
                </Link>

                <p className="product-brand">{product.brand}</p>

                <div className="product-rating">
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-count">({product.rating})</span>
                </div>

                <div className="product-price">
                  <span className="current-price">
                    ${calculateDiscountedPrice(product.price, product.discountPercentage)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="original-price">${product.price}</span>
                      <span className="save-badge">
                        Save ${(product.price * product.discountPercentage / 100).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                <div className="stock-status">
                  <span className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}></span>
                  <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <Link href="/arrivals" className="view-all-btn">
            View All Arrivals
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16666 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllArivalesComponents;
