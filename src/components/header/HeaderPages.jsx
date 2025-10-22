'use client'
import React, { useState } from 'react';
import "./HeaderStyle.css";
import Image from "next/image";
import Link from 'next/link';
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
// import { useSelector } from 'react-redux';

const HeaderPages = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setcartOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const togglecart = () => {
    setcartOpen(!cartOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  // const cart = useSelector((state: any) => state.cart || []);
  return (
    <header className="bg-white header" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 header-container headermo">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />

        <div className="flex flex-1 items-center justify-end md:justify-between sm:justify-end">
          <div className={`headerlink ${menuOpen ? "back" : ""}`}>
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link onClick={closeMenu} className="text-gray-500 transition hover:text-gray-500/75" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenu} className="text-gray-500 transition hover:text-gray-500/75" href="/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenu} className="text-gray-500 transition hover:text-gray-500/75" href="/top-sale">
                    Top Sale
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenu} className="text-gray-500 transition hover:text-gray-500/75" href="/arrivals">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenu} className="text-gray-500 transition hover:text-gray-500/75" href="/brands">
                    Brands
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="search-header">
                <CiSearch />
                <input type="text" placeholder="Search for products..." />
              </div>



              {/* cart  */}

              <div className='cart-header'>






                <div className="cart-icon" style={{ position: 'relative' }}>
                  <div onClick={togglecart} href="/cart"> <IoCartOutline style={{ fontSize: "30px", cursor: "pointer" }} /> </div>
                </div>

                <div className={`cart-header-shopping ${cartOpen ? "shopping-back" : ""}`}>
                  <div
                    className="  w-screen max-w-sm    bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
                    aria-modal="true"
                    role="dialog"
                    tabIndex="-1"
                  >
                    <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
                      <span className="sr-only">Close cart</span>

                      <svg style={{ cursor: "pointer" }} onClick={togglecart}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="mt-4 space-y-6">
                      <ul className="space-y-4">
                        <li className="flex items-center gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                            alt=""
                            className="size-16 rounded-sm object-cover"
                          />

                          <div>
                            <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline">XXS</dd>
                              </div>

                              <div>
                                <dt className="inline">Color:</dt>
                                <dd className="inline">White</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <form>
                              <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                              <input
                                type="number"
                                min="1"
                                value="1"
                                id="Line1Qty"
                                className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </form>

                            <button className="text-gray-600 transition hover:text-red-600">
                              <span className="sr-only">Remove item</span>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>

                        <li className="flex items-center gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                            alt=""
                            className="size-16 rounded-sm object-cover"
                          />

                          <div>
                            <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline">XXS</dd>
                              </div>

                              <div>
                                <dt className="inline">Color:</dt>
                                <dd className="inline">White</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <form>
                              <label htmlFor="Line2Qty" className="sr-only"> Quantity </label>

                              <input
                                type="number"
                                min="1"
                                value="1"
                                id="Line2Qty"
                                className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </form>

                            <button className="text-gray-600 transition hover:text-red-600">
                              <span className="sr-only">Remove item</span>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>

                        <li className="flex items-center gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                            alt=""
                            className="size-16 rounded-sm object-cover"
                          />

                          <div>
                            <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline">XXS</dd>
                              </div>

                              <div>
                                <dt className="inline">Color:</dt>
                                <dd className="inline">White</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <form>
                              <label htmlFor="Line3Qty" className="sr-only"> Quantity </label>

                              <input
                                type="number"
                                min="1"
                                value="1"
                                id="Line3Qty"
                                className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </form>

                            <button className="text-gray-600 transition hover:text-red-600">
                              <span className="sr-only">Remove item</span>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      </ul>

                      <div className="space-y-4 text-center">
                        <a
                          href="#"
                          className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                        >
                          View my cart (2)
                        </a>

                        <a
                          href="#"
                          className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        >
                          Checkout
                        </a>

                        <a
                          href="#"
                          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                        >
                          Continue shopping
                        </a>
                      </div>
                    </div>
                  </div>


                </div>

              </div>








            </div>

            <button
              className="menu-toggle block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPages;