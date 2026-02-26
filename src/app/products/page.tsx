'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { IoFilterCircle, IoGrid, IoList } from "react-icons/io5";
import { FaRegStar, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import './Products.css';
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

const ProductsPages = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cardHeight, setCardHeight] = useState(460);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  const itemsPerPage = 9;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Price filter
    filtered = filtered.filter(product => product.price <= priceRange);

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter(product => 
        Math.floor(product.rating) >= selectedRating
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - no sorting
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategories, selectedBrands, priceRange, selectedRating, sortBy, searchQuery]);

  // Handle category selection
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle brand selection
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(1000);
    setSelectedRating(null);
    setSortBy('featured');
    setSearchQuery('');
  };

  // Get unique categories and brands
  const categories = Array.from(new Set(products.map(product => product.category)));
  const brands = Array.from(new Set(products.map(product => product.brand)));

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render stars
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

  // Calculate discounted price
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-loading">
          {[...Array(6)].map((_, i) => (
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
    <div className="products-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-item">Home</Link>
        <span className="breadcrumb-separator"><FaAngleRight /></span>
        <span className="breadcrumb-item active">Products</span>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h1>All Products</h1>
        <p>Discover our collection of high-quality products</p>
      </div>

      {/* Mobile Filter Toggle */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setMobileFilterOpen(true)}
      >
        <IoFilterCircle /> Filter Products
      </button>

      {/* Mobile Filter Overlay */}
      <div 
        className={`mobile-filter-overlay ${mobileFilterOpen ? 'active' : ''}`}
        onClick={() => setMobileFilterOpen(false)}
      />

      {/* Main Layout */}
      <div className="products-layout">
        {/* Filter Sidebar */}
        <div className={`filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="filter-header">
            <h3><IoFilterCircle /> Filters</h3>
            <button onClick={resetFilters} className="reset-filter-btn">
              Reset All
            </button>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span className="capitalize">{category}</span>
                  <span className="count">
                    ({products.filter(p => p.category === category).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="filter-section">
            <h4>Brands</h4>
            <div className="filter-options">
              {brands.map(brand => (
                <label key={brand} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span>{brand}</span>
                  <span className="count">
                    ({products.filter(p => p.brand === brand).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range">
              <div className="range-slider">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
              </div>
              <div className="price-values">
                <span>$0</span>
                <span>${priceRange}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="filter-section">
            <h4>Minimum Rating</h4>
            <div className="filter-options">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="rating-option">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(rating)}
                  />
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                    ))}
                  </div>
                  <span className="rating-text">& Up</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Content */}
        <div className="products-content">
          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange < 1000 || selectedRating) && (
            <div className="active-filters">
              <span>Active filters:</span>
              {selectedCategories.map(cat => (
                <span key={cat} className="filter-tag">
                  {cat}
                  <button onClick={() => handleCategoryToggle(cat)}>×</button>
                </span>
              ))}
              {selectedBrands.map(brand => (
                <span key={brand} className="filter-tag">
                  {brand}
                  <button onClick={() => handleBrandToggle(brand)}>×</button>
                </span>
              ))}
              {priceRange < 1000 && (
                <span className="filter-tag">
                  Under ${priceRange}
                  <button onClick={() => setPriceRange(1000)}>×</button>
                </span>
              )}
              {selectedRating && (
                <span className="filter-tag">
                  {selectedRating}+ Stars
                  <button onClick={() => setSelectedRating(null)}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Toolbar */}
          <div className="products-toolbar">
            <div className="results-count">
              Showing <strong>{paginatedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
            </div>
            
            <div className="sort-section">
              <span className="sort-label">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <IoGrid />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <IoList />
                </button>
              </div>
            </div>

            <div className="card-height-control">
              <label htmlFor="products-card-height">Card height</label>
              <input
                id="products-card-height"
                type="range"
                min={360}
                max={620}
                value={cardHeight}
                onChange={(e) => setCardHeight(Number(e.target.value))}
              />
              <span>{cardHeight}px</span>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria</p>
              <button onClick={resetFilters} className="reset-btn">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`products-grid ${viewMode}`} style={{ ['--product-card-height' as string]: `${cardHeight}px` }}>
              {paginatedProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image-wrapper">
                    <Link href={`/arrivals/${product.id}`}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                      />
                    </Link>

                    {product.discountPercentage > 0 && (
                      <span className="product-badge">
                        -{product.discountPercentage}%
                      </span>
                    )}

                    <button
                      className={`product-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <div className="quick-view">
                      <Link href={`/arrivals/${product.id}`} className="quick-view-btn">Quick View</Link>
                    </div>
                  </div>

                  <div className="product-info">
                    <div className="product-brand">{product.brand}</div>
                    <h3 className="product-title">
                      <Link href={`/arrivals/${product.id}`}>{product.title}</Link>
                    </h3>

                    <div className="product-rating">
                      <div className="rating-stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="rating-count">({product.rating})</span>
                    </div>

                    <div className="product-prices">
                      <span className="current-price">
                        ${calculateDiscountedPrice(product.price, product.discountPercentage)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="original-price">${product.price}</span>
                          <span className="discount-badge-small">
                            Save {product.discountPercentage}%
                          </span>
                        </>
                      )}
                    </div>

                    <div className="stock-status">
                      <span className={`stock-indicator ${
                        product.stock > 10 ? 'in-stock' : 
                        product.stock > 0 ? 'low-stock' : 'out-of-stock'
                      }`}></span>
                      <span>
                        {product.stock > 10 ? 'In Stock' :
                         product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                      </span>
                    </div>

                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                  return <span key={pageNum}>...</span>;
                }
                return null;
              })}
              
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPages;
