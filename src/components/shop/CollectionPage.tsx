'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { useShop } from '../store/ShopContext';
import './CollectionPage.css';

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
}

interface CollectionPageProps {
  title: string;
  subtitle: string;
  endpoint: string;
  emptyText: string;
  highlight?: 'sale' | 'brand';
}

const CollectionPage = ({
  title,
  subtitle,
  endpoint,
  emptyText,
  highlight = 'sale',
}: CollectionPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cardHeight, setCardHeight] = useState(460);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const filteredProducts = useMemo(() => {
    const base = [...products];
    if (highlight === 'sale') {
      base.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }
    if (!search.trim()) return base;
    const query = search.toLowerCase();
    return base.filter((item) =>
      `${item.title} ${item.brand}`.toLowerCase().includes(query)
    );
  }, [products, search, highlight]);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    return Array.from({ length: 5 }).map((_, index) =>
      index < full ? (
        <FaStar key={`${rating}-${index}`} className="cp-star cp-star-filled" />
      ) : (
        <FaRegStar key={`${rating}-${index}`} className="cp-star" />
      )
    );
  };

  return (
    <section className={`collection-page ${highlight === 'brand' ? 'brand' : 'sale'}`}>
      <div className="cp-header">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="cp-tools">
          <input
            type="text"
            placeholder="Search product or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="cp-height-control">
            <label htmlFor={`${highlight}-height`}>Card</label>
            <input
              id={`${highlight}-height`}
              type="range"
              min={360}
              max={640}
              value={cardHeight}
              onChange={(e) => setCardHeight(Number(e.target.value))}
            />
            <span>{cardHeight}px</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="cp-grid cp-loading">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="cp-card-skeleton" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="cp-empty">{emptyText}</div>
      ) : (
        <div className="cp-grid" style={{ ['--cp-card-height' as string]: `${cardHeight}px` }}>
          {filteredProducts.map((product) => (
            <article className="cp-card" key={product.id}>
              <Link href={`/arrivals/${product.id}`} className="cp-image-wrap">
                <img src={product.thumbnail} alt={product.title} className="cp-image" loading="lazy" />
                {product.discountPercentage > 0 ? (
                  <span className="cp-discount">-{Math.round(product.discountPercentage)}%</span>
                ) : null}
              </Link>

              <button
                className={`cp-heart ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              <div className="cp-info">
                <p className="cp-brand">{product.brand}</p>
                <h3>
                  <Link href={`/arrivals/${product.id}`}>{product.title}</Link>
                </h3>
                <div className="cp-rating">
                  {renderStars(product.rating)}
                  <span>({product.rating})</span>
                </div>
                <div className="cp-price-row">
                  <strong>${product.price}</strong>
                  <span>{product.stock > 0 ? `${product.stock} left` : 'Out of stock'}</span>
                </div>
                <button className="cp-cart" onClick={() => addToCart(product)}>
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CollectionPage;
