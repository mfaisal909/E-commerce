import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { productData, categoriesData } from "../../../static/data";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft, BiX } from "react-icons/bi";
import DropDown from "./DropDown";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const dropdownRef = useRef(null);

  // Search filter
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchData(filteredProducts);
  };

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white relative z-50">
      {/* ================= DESKTOP TOP HEADER ================= */}
      <div className="hidden md:block border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-[88px] flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center">
              <img
                src="https://images.seeklogo.com/logo-png/42/1/shop-logo-png_seeklogo-427433.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-5 pr-14 text-sm text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center shadow-sm">
                  <AiOutlineSearch className="text-white text-xl" />
                </button>

                {/* Search Result */}
                {searchTerm && searchData.length > 0 && (
                  <div className="absolute top-16 left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[999] max-h-96 overflow-y-auto">
                    {searchData.map((product) => {
                      const Product_name = product.name.replace(/\s+/g, "-");
                      return (
                        <Link key={product.id} to={`/product/${Product_name}`}>
                          <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={product.image || "https://via.placeholder.com/50"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500">View product</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Seller Button */}
            <Link
              to="/seller"
              className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Become Seller
              <IoIosArrowForward className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP BOTTOM NAV ================= */}
      <div
        className={`hidden md:block w-full bg-[#0f172a] transition-all duration-300 ${
          active ? "fixed top-0 left-0 shadow-2xl" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-6">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropDown(!dropDown)}
                className="h-11 min-w-[240px] rounded-2xl bg-white/95 backdrop-blur-md px-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BiMenuAltLeft className="text-xl text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    All Categories
                  </span>
                </div>
                <IoIosArrowDown
                  className={`text-gray-600 transition-transform duration-300 ${
                    dropDown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropDown && (
                <div className="absolute top-[54px] left-0 w-[240px] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[999]">
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                </div>
              )}
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-2">
              {[
                { name: "Home", path: "/" },
                { name: "Best Selling", path: "/best-selling" },
                { name: "Products", path: "/products" },
                { name: "Events", path: "/events" },
                { name: "FAQ", path: "/faq" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <button className="relative w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300">
                <AiOutlineHeart className="text-white text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow">
                  0
                </span>
              </button>

              {/* Cart */}
              <button className="relative w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300">
                <AiOutlineShoppingCart className="text-white text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow">
                  2
                </span>
              </button>

              {/* User */}
              <Link
                to="/login"
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300"
              >
                <AiOutlineUser className="text-white text-xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div
        className={`md:hidden bg-[#0f172a] transition-all duration-300 ${
          active ? "fixed top-0 left-0 w-full shadow-2xl z-50" : "relative"
        }`}
      >
        <div className="px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white"
              >
                {mobileMenu ? (
                  <BiX className="text-2xl" />
                ) : (
                  <BiMenuAltLeft className="text-2xl" />
                )}
              </button>

              <Link to="/">
                <img
                  src="https://images.seeklogo.com/logo-png/42/1/shop-logo-png_seeklogo-427433.png"
                  alt="Logo"
                  className="h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileSearch(!mobileSearch)}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white"
              >
                <AiOutlineSearch className="text-xl" />
              </button>

              <Link
                to="/login"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white"
              >
                <AiOutlineUser className="text-xl" />
              </Link>

              <button className="relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <AiOutlineShoppingCart className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      {mobileSearch && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-sm px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 pl-4 pr-12 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <AiOutlineSearch className="text-white text-lg" />
            </button>

            {searchTerm && searchData.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[999] max-h-72 overflow-y-auto">
                {searchData.map((product) => {
                  const Product_name = product.name.replace(/\s+/g, "-");
                  return (
                    <Link
                      key={product.id}
                      to={`/product/${Product_name}`}
                      onClick={() => setMobileSearch(false)}
                    >
                      <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden">
                          <img
                            src={product.image || "https://via.placeholder.com/40"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {product.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileMenu && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenu(false)}
          />

          {/* Sidebar */}
          <div className="md:hidden fixed top-0 left-0 z-50 w-[290px] h-full bg-white shadow-2xl">
            <div className="p-5 h-full overflow-y-auto">
              {/* Top */}
              <div className="flex items-center justify-between mb-6">
                <Link to="/" onClick={() => setMobileMenu(false)}>
                  <img
                    src="https://images.seeklogo.com/logo-png/42/1/shop-logo-png_seeklogo-427433.png"
                    alt="Logo"
                    className="h-10 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={() => setMobileMenu(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <BiX className="text-2xl text-gray-700" />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Best Selling", path: "/best-selling" },
                  { name: "Products", path: "/products" },
                  { name: "Events", path: "/events" },
                  { name: "FAQ", path: "/faq" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Categories */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <button
                  onClick={() => setDropDown(!dropDown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="text-sm font-semibold text-gray-800">
                    All Categories
                  </span>
                  <IoIosArrowDown
                    className={`text-gray-600 transition-transform duration-300 ${
                      dropDown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropDown && (
                  <div className="mt-3 rounded-2xl border border-gray-100 overflow-hidden">
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  </div>
                )}
              </div>

              {/* Seller Button */}
              <div className="mt-6">
                <Link
                  to="/seller"
                  onClick={() => setMobileMenu(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Become Seller
                  <IoIosArrowForward className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
