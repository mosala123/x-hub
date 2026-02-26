'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaStar, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { FiZoomIn } from "react-icons/fi";
import AllArivalesComponents from '@/components/arrivalscomponent/AllArivalesComponents';
import './ProductDetails.css';
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

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  const colors = [
    { name: 'black', code: '#1a1a1a' },
    { name: 'white', code: '#ffffff' },
    { name: 'navy', code: '#000080' },
    { name: 'red', code: '#dc2626' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    return (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  };

  const calculateSavedAmount = () => {
    if (!product) return 0;
    return (product.price * product.discountPercentage / 100).toFixed(2);
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

  const getStockStatus = () => {
    if (!product) return { class: 'out-of-stock', text: 'Out of Stock' };
    if (product.stock > 20) return { class: 'in-stock', text: 'In Stock' };
    if (product.stock > 5) return { class: 'low-stock', text: 'Limited Stock' };
    if (product.stock > 0) return { class: 'low-stock', text: `Only ${product.stock} left` };
    return { class: 'out-of-stock', text: 'Out of Stock' };
  };

  const reviews = [
    {
      id: 1,
      name: 'Alex Johnson',
      rating: 5,
      date: '2 days ago',
      text: 'Absolutely love this product! The quality is amazing and it fits perfectly. Will definitely buy again.'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      rating: 4,
      date: '1 week ago',
      text: 'Great product for the price. Shipping was fast and customer service was helpful.'
    },
    {
      id: 3,
      name: 'Mike Brown',
      rating: 5,
      date: '2 weeks ago',
      text: 'Exceeded my expectations! The material is high quality and the design is beautiful.'
    }
  ];

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="product-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="empty-state">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => router.back()} className="back-btn">
            <IoMdArrowBack /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();
  const productImages = [product.thumbnail, ...(product.images || [])].slice(0, 5);

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <Link href="/" className="breadcrumb-item">Home</Link>
        <span className="breadcrumb-separator">›</span>
        <Link href="/products" className="breadcrumb-item">Products</Link>
        <span className="breadcrumb-separator">›</span>
        <Link href={`/products?category=${product.category}`} className="breadcrumb-item capitalize">
          {product.category}
        </Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item active">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <div className="product-main">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={productImages[selectedImage]} 
              alt={product.title}
            />
            <div className="image-badges">
              {product.id > 90 && <span className="badge new">NEW</span>}
              {product.discountPercentage > 0 && (
                <span className="badge discount">-{product.discountPercentage}%</span>
              )}
            </div>
            <div className="zoom-indicator">
              <FiZoomIn /> Hover to zoom
            </div>
          </div>

          <div className="image-thumbnails">
            {productImages.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          <span className="product-brand">{product.brand}</span>
          <h1 className="product-title">{product.title}</h1>

          {/* Rating */}
          <div className="product-rating">
            <div className="rating-stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({reviews.length} reviews)</span>
          </div>

          {/* Price */}
          <div className="product-price-section">
            <div className="price-container">
              <span className="current-price">${calculateDiscountedPrice()}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="original-price">${product.price}</span>
                  <span className="discount-badge-large">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="save-amount">
                You save: ${calculateSavedAmount()}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="stock-status-large">
            <span className={`stock-indicator ${stockStatus.class}`}></span>
            <span className="stock-text">{stockStatus.text}</span>
            <span className="stock-count">{product.stock} units available</span>
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Colors */}
          <div className="product-options">
            <h4 className="option-title">
              Color: <span>{selectedColor}</span>
            </h4>
            <div className="color-options">
              {colors.map(color => (
                <div
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.code, border: color.name === 'white' ? '1px solid #ddd' : 'none' }}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="product-options">
            <h4 className="option-title">
              Size: <span>{selectedSize}</span>
            </h4>
            <div className="size-options">
              {sizes.map(size => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="quantity-selector">
            <span className="quantity-label">Quantity:</span>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= product.stock) {
                    setQuantity(val);
                  }
                }}
              />
              <button
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className={`wishlist-btn-large ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
              Wishlist
            </button>
          </div>

          {/* Delivery Info */}
          <div className="delivery-info">
            <div className="info-item">
              <FaTruck className="info-icon" />
              <div className="info-text">
                <strong>Free Delivery</strong>
                <small>On orders over $50</small>
              </div>
            </div>
            <div className="info-item">
              <FaUndo className="info-icon" />
              <div className="info-text">
                <strong>30 Day Returns</strong>
                <small>Money back guarantee</small>
              </div>
            </div>
            <div className="info-item">
              <FaShieldAlt className="info-icon" />
              <div className="info-text">
                <strong>Secure Payment</strong>
                <small>100% secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{product.description}</p>
              <h4>Key Features:</h4>
              <ul>
                <li>Premium quality material</li>
                <li>Modern and stylish design</li>
                <li>Comfortable fit for all day wear</li>
                <li>Easy to care and maintain</li>
                <li>Versatile for multiple occasions</li>
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <table className="specs-table">
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td className="capitalize">{product.category}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>Premium Cotton Blend</td>
                </tr>
                <tr>
                  <td>Care Instructions</td>
                  <td>Machine wash cold, tumble dry low</td>
                </tr>
                <tr>
                  <td>Country of Origin</td>
                  <td>Imported</td>
                </tr>
                <tr>
                  <td>Warranty</td>
                  <td>30 days manufacturer warranty</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-summary">
                <div className="average-rating">
                  <div className="big-number">{product.rating}</div>
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  <div>Overall Rating</div>
                </div>
                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
                    const percentage = (count / reviews.length) * 100;
                    return (
                      <div key={star} className="rating-bar-item">
                        <span>{star} stars</span>
                        <div className="rating-bar">
                          <div className="rating-bar-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.name}</span>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                        ))}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2 className="related-title">You May Also Like</h2>
        <AllArivalesComponents />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
