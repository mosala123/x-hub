'use client'
import React, { useState, useEffect, useRef } from 'react';
import "./HeaderStyle.css";
import Image from "next/image";
import Link from 'next/link';
import { IoCartOutline } from "react-icons/io5";
import { CiSearch, CiHeart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useShop } from '../store/ShopContext';

const HeaderPages = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    wishlistCount,
    removeFromCart,
  } = useShop();

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // إغلاق القوائم عند تغيير الصفحة
  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // روابط التنقل
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/top-sale', label: 'Top Sale' },
    { href: '/arrivals', label: 'New Arrivals' },
    { href: '/brands', label: 'Brands' },
  ];

  return (
    <header className="header  ">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.svg" alt="Logo" width={100} height={40} className="w-auto h-8 sm:h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className="hidden sm:block search-header">
            <CiSearch className="text-gray-500" />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={toggleSearch}
            className="sm:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Search"
          >
            <CiSearch className="text-xl" />
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
            <CiHeart className="text-xl" />
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </Link>

          {/* Account */}
          {/* <Link href="/authontication" className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <FiUser className="text-xl" />
          </Link> */}

          {/* Cart */}
          <div className="cart-header" ref={cartRef}>
            <button
              onClick={toggleCart}
              className="cart-icon p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
              aria-label="Cart"
            >
              <IoCartOutline className="text-2xl" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Cart Dropdown */}
            <div className={`cart-dropdown ${cartOpen ? 'open' : ''}`}>
              <div className="cart-header-shopping">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Shopping Cart ({cartCount})</h3>
                    <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                      <IoClose className="text-xl" />
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <IoCartOutline className="text-5xl text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <button
                        onClick={toggleCart}
                        className="mt-4 text-blue-600 hover:underline"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-4 max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex items-center gap-4">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-gray-500">
                                ${item.price} x {item.quantity}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <IoClose />
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Subtotal:</span>
                          <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <Link
                          href="/cart"
                          className="block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition-colors"
                        >
                          View Cart
                        </Link>
                        <Link
                          href="/checkout"
                          className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 transition-colors"
                        >
                          Checkout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoClose className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="sm:hidden p-4 border-t">
          <form onSubmit={handleSearch} className="search-header">
            <CiSearch />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      <div ref={menuRef} className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <nav className="p-6">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block py-2 text-lg ${pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t">
              <Link href="/wishlist" onClick={closeMenu} className="flex items-center justify-between gap-2 py-2 text-gray-700">
                <span className="flex items-center gap-2"><CiHeart /> Wishlist</span>
                {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
              </Link>
            </li>
            <li>
              <Link href="/account" onClick={closeMenu} className="flex items-center gap-2 py-2 text-gray-700">
                <FiUser /> Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderPages;
