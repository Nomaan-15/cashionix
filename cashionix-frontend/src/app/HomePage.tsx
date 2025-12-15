"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  GitBranch,
  Search,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const searchRef = useRef(null);

  const rotatingTexts = [
    "Get Instant Cash",
    "Free Pickup",
    "Get Instant Payment",
  ];

  const suggestions = [
    {
      category: "Phones",
      items: [
        "iPhone 15 Pro Max",
        "iPhone 14",
        "iPhone 13",
        "Samsung Galaxy S24",
        "Samsung Galaxy S23",
        "OnePlus 12",
        "OnePlus 11",
        "Google Pixel 8",
      ],
    },
    {
      category: "Laptops",
      items: [
        "MacBook Pro M3",
        "MacBook Air M2",
        "Dell XPS 15",
        "HP Pavilion",
        "Lenovo ThinkPad",
        "ASUS ROG",
        "Acer Predator",
        "MSI Gaming",
      ],
    },
  ];

  const filteredSuggestions = suggestions
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      // Navigate to sell page with the device preselected
      window.location.href = `/sell?device=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (item: string) => {
    setSearchQuery(item);
    setShowSuggestions(false);
    // Navigate to sell page with the selected device
    window.location.href = `/sell?device=${encodeURIComponent(item)}`;
  };

  // Text rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-slate-900 text-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Sell Your Device,
                  <span className="block mt-2">
                    <span
                      className={`text-cyan-400 transition-all duration-500 inline-block ${
                        isAnimating
                          ? "opacity-0 -translate-y-4"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      {rotatingTexts[currentTextIndex]}
                    </span>
                  </span>
                </h1>
                <p className="text-xl text-purple-100 max-w-lg">
                  India's most trusted platform for buying and selling used
                  phones and laptops. Get the best prices with instant quotes
                  and free pickup.
                </p>
              </div>

              {/* Search Bar with Suggestions */}
              <div className="relative" ref={searchRef}>
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-full shadow-lg border border-slate-700 p-1">
                  <div className="flex items-center">
                    <Search className="w-5 h-5 text-slate-400 ml-4" />
                    <input
                      type="text"
                      placeholder="Search devices..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 px-3 py-2 outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 mr-1 transition-colors"
                    >
                      <Search className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-2 bg-slate-800 rounded-xl shadow-2xl max-h-96 overflow-y-auto border border-slate-700">
                    {searchQuery === "" ? (
                      <div className="p-4">
                        <p className="text-sm text-slate-400 mb-3 px-2">
                          Popular Searches
                        </p>
                        {suggestions.map((category, idx) => (
                          <div key={idx} className="mb-4 last:mb-0">
                            <h3 className="text-sm font-semibold text-slate-300 mb-2 px-2">
                              {category.category}
                            </h3>
                            <div className="space-y-1">
                              {category.items
                                .slice(0, 4)
                                .map((item, itemIdx) => (
                                  <button
                                    key={itemIdx}
                                    onClick={() => handleSuggestionClick(item)}
                                    className="w-full text-left px-4 py-2.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between group"
                                  >
                                    <span>{item}</span>
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </button>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : filteredSuggestions.length > 0 ? (
                      <div className="p-4">
                        {filteredSuggestions.map((category, idx) => (
                          <div key={idx} className="mb-4 last:mb-0">
                            <h3 className="text-sm font-semibold text-slate-300 mb-2 px-2">
                              {category.category}
                            </h3>
                            <div className="space-y-1">
                              {category.items.map((item, itemIdx) => (
                                <button
                                  key={itemIdx}
                                  onClick={() => handleSuggestionClick(item)}
                                  className="w-full text-left px-4 py-2.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between group"
                                >
                                  <span>{item}</span>
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-slate-400">
                          No devices found matching "{searchQuery}"
                        </p>
                        <p className="text-sm text-slate-500 mt-2">
                          Try searching for iPhone, Samsung, MacBook, or Dell
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-slate-700 text-slate-300 px-4 py-2 text-sm hover:bg-slate-600 transition-colors border border-slate-600"
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  100's Happy Customers
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-slate-700 text-slate-300 px-4 py-2 text-sm hover:bg-slate-600 transition-colors border border-slate-600"
                >
                  <Shield className="w-4 h-4 mr-1.5" />
                  Best Price Guaranteed
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-slate-700 text-slate-300 px-4 py-2 text-sm hover:bg-slate-600 transition-colors border border-slate-600"
                >
                  <Zap className="w-4 h-4 mr-1.5" />
                  Free Home Pickup
                </Badge>
              </div>
            </div>

            {/* Hero Image/Video */}
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-200 via-teal-200 to-orange-200 rounded-3xl shadow-2xl overflow-hidden p-8 transform hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 700 600" className="w-full h-full">
                  {/* Background elements */}
                  <defs>
                    <linearGradient
                      id="bgGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#ff8a80", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#ffab91", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>

                  {/* Main background card */}
                  <rect
                    x="50"
                    y="30"
                    width="600"
                    height="540"
                    rx="30"
                    fill="url(#bgGrad)"
                  />

                  {/* Main character - Happy delivery person */}
                  <g transform="translate(280, 200)">
                    {/* Shadow */}
                    <ellipse
                      cx="50"
                      cy="280"
                      rx="70"
                      ry="15"
                      fill="black"
                      opacity="0.15"
                    />

                    {/* Legs */}
                    <rect
                      x="30"
                      y="200"
                      width="40"
                      height="85"
                      rx="5"
                      fill="#2c5f6f"
                    />

                    {/* Body - Cyan shirt */}
                    <rect
                      x="15"
                      y="100"
                      width="70"
                      height="110"
                      rx="10"
                      fill="#4db8c4"
                    />
                    <line
                      x1="50"
                      y1="110"
                      x2="50"
                      y2="200"
                      stroke="#3aa3af"
                      strokeWidth="2"
                    />

                    {/* Arms */}
                    <ellipse
                      cx="10"
                      cy="130"
                      rx="22"
                      ry="45"
                      fill="#4db8c4"
                      transform="rotate(-15 10 130)"
                    />
                    <ellipse
                      cx="90"
                      cy="130"
                      rx="22"
                      ry="45"
                      fill="#4db8c4"
                      transform="rotate(15 90 130)"
                    />

                    {/* Left hand holding phone */}
                    <circle cx="-5" cy="155" r="20" fill="#ffccbc" />

                    {/* Phone in left hand */}
                    <rect
                      x="-30"
                      y="140"
                      width="45"
                      height="75"
                      rx="8"
                      fill="#2c3e50"
                      stroke="#1a252f"
                      strokeWidth="3"
                    />
                    <rect
                      x="-25"
                      y="148"
                      width="35"
                      height="55"
                      rx="3"
                      fill="#4db8c4"
                    />
                    <circle cx="-7.5" cy="208" r="5" fill="#1a252f" />

                    {/* Heart icon on phone */}
                    <path
                      d="M -7.5 165 L -2 170 L -7.5 175 L -13 170 Z"
                      fill="#ff6b6b"
                    />
                    <circle cx="-7.5" cy="167" r="4" fill="#ff6b6b" />
                    <circle
                      cx="-7.5"
                      cy="167"
                      r="4"
                      fill="#ff6b6b"
                      transform="translate(-5, 0)"
                    />

                    {/* Right hand holding box */}
                    <circle cx="105" cy="155" r="20" fill="#ffccbc" />

                    {/* Package box */}
                    <rect
                      x="90"
                      y="100"
                      width="60"
                      height="55"
                      rx="5"
                      fill="#4db8c4"
                    />
                    <rect
                      x="95"
                      y="105"
                      width="50"
                      height="25"
                      rx="3"
                      fill="#2c5f6f"
                    />
                    <line
                      x1="120"
                      y1="100"
                      x2="120"
                      y2="155"
                      stroke="white"
                      strokeWidth="3"
                    />
                    <line
                      x1="90"
                      y1="127"
                      x2="150"
                      y2="127"
                      stroke="white"
                      strokeWidth="3"
                    />

                    {/* Package details */}
                    <text x="108" y="148" fill="white" fontSize="12">
                      |||
                    </text>
                    <text x="128" y="148" fill="white" fontSize="12">
                      ||
                    </text>

                    {/* Head */}
                    <circle cx="50" cy="60" r="50" fill="#ffccbc" />

                    {/* Hair - Cyan */}
                    <path
                      d="M 10 50 Q 15 15 50 10 Q 85 15 90 50 Q 92 65 88 70 L 12 70 Q 8 65 10 50 Z"
                      fill="#4db8c4"
                    />
                    <path
                      d="M 30 25 Q 50 20 70 25"
                      stroke="#3aa3af"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Face - Happy expression */}
                    <circle cx="35" cy="55" r="4" fill="#333" />
                    <circle cx="65" cy="55" r="4" fill="#333" />

                    {/* Big smile */}
                    <path
                      d="M 30 70 Q 50 85 70 70"
                      stroke="#333"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Eyebrows */}
                    <path
                      d="M 28 48 Q 35 45 42 48"
                      stroke="#333"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 58 48 Q 65 45 72 48"
                      stroke="#333"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Store building bottom left */}
                  <g transform="translate(100, 420)">
                    <rect
                      x="0"
                      y="40"
                      width="90"
                      height="100"
                      fill="#ff6b6b"
                      rx="5"
                    />
                    <path d="M -10 40 L 45 15 L 100 40 Z" fill="#ff5252" />
                    <rect
                      x="35"
                      y="10"
                      width="20"
                      height="8"
                      fill="#d32f2f"
                      rx="2"
                    />

                    {/* Windows */}
                    <rect x="10" y="60" width="25" height="30" fill="#4db8c4" />
                    <rect x="55" y="60" width="25" height="30" fill="#4db8c4" />

                    {/* Door */}
                    <rect
                      x="30"
                      y="95"
                      width="30"
                      height="45"
                      fill="#80cbc4"
                      rx="3"
                    />
                    <circle cx="52" cy="117" r="3" fill="#2c5f6f" />

                    {/* Awning */}
                    <rect
                      x="28"
                      y="90"
                      width="34"
                      height="8"
                      fill="white"
                      rx="2"
                    />
                    <line
                      x1="28"
                      y1="94"
                      x2="32"
                      y2="98"
                      stroke="#ff6b6b"
                      strokeWidth="2"
                    />
                    <line
                      x1="44"
                      y1="94"
                      x2="48"
                      y2="98"
                      stroke="#ff6b6b"
                      strokeWidth="2"
                    />
                    <line
                      x1="58"
                      y1="94"
                      x2="62"
                      y2="98"
                      stroke="#ff6b6b"
                      strokeWidth="2"
                    />
                  </g>

                  {/* Tree left */}
                  <g transform="translate(50, 450)">
                    <rect x="15" y="40" width="12" height="60" fill="#8d6e63" />
                    <circle cx="21" cy="35" r="25" fill="#a5d6a7" />
                    <circle cx="21" cy="28" r="20" fill="#81c784" />
                  </g>

                  {/* Tree right */}
                  <g transform="translate(600, 450)">
                    <rect x="15" y="40" width="12" height="60" fill="#8d6e63" />
                    <circle cx="21" cy="35" r="25" fill="#b2dfdb" />
                    <circle cx="21" cy="28" r="20" fill="#80cbc4" />
                  </g>

                  {/* Delivery truck bottom right */}
                  <g transform="translate(480, 430)">
                    <rect
                      x="20"
                      y="40"
                      width="100"
                      height="55"
                      rx="6"
                      fill="#ff6b6b"
                    />
                    <rect
                      x="5"
                      y="50"
                      width="20"
                      height="40"
                      rx="3"
                      fill="#d32f2f"
                    />

                    {/* Truck cargo area */}
                    <rect
                      x="25"
                      y="45"
                      width="90"
                      height="45"
                      rx="4"
                      fill="white"
                    />

                    {/* Lines on cargo */}
                    <line
                      x1="30"
                      y1="52"
                      x2="110"
                      y2="52"
                      stroke="#80cbc4"
                      strokeWidth="4"
                    />
                    <line
                      x1="30"
                      y1="62"
                      x2="110"
                      y2="62"
                      stroke="#80cbc4"
                      strokeWidth="4"
                    />
                    <line
                      x1="30"
                      y1="72"
                      x2="110"
                      y2="72"
                      stroke="#80cbc4"
                      strokeWidth="4"
                    />
                    <line
                      x1="30"
                      y1="82"
                      x2="110"
                      y2="82"
                      stroke="#80cbc4"
                      strokeWidth="4"
                    />

                    {/* Windows */}
                    <rect
                      x="8"
                      y="55"
                      width="10"
                      height="12"
                      fill="#b3e5fc"
                      rx="1"
                    />

                    {/* Wheels */}
                    <circle cx="35" cy="95" r="14" fill="#263238" />
                    <circle cx="35" cy="95" r="8" fill="#546e7a" />
                    <circle cx="105" cy="95" r="14" fill="#263238" />
                    <circle cx="105" cy="95" r="8" fill="#546e7a" />
                  </g>

                  {/* Decorative dots bottom */}
                  <circle cx="280" cy="565" r="4" fill="white" opacity="0.6" />
                  <circle cx="300" cy="565" r="4" fill="white" opacity="0.6" />
                  <circle cx="320" cy="565" r="4" fill="white" opacity="0.6" />

                  <circle cx="360" cy="565" r="4" fill="white" opacity="0.6" />
                  <circle cx="380" cy="565" r="4" fill="white" opacity="0.6" />
                  <circle cx="400" cy="565" r="4" fill="white" opacity="0.6" />
                  <circle cx="420" cy="565" r="4" fill="white" opacity="0.6" />
                  <circle cx="440" cy="565" r="4" fill="white" opacity="0.6" />

                  {/* Orange line bottom right */}
                  <line
                    x1="500"
                    y1="565"
                    x2="580"
                    y2="565"
                    stroke="#ff6b6b"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Small decorative circle */}
                  <circle cx="620" cy="220" r="8" fill="white" opacity="0.5" />

                  {/* Vertical lines decoration */}
                  <g opacity="0.3">
                    <line
                      x1="120"
                      y1="420"
                      x2="120"
                      y2="480"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <line
                      x1="125"
                      y1="425"
                      x2="125"
                      y2="475"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <line
                      x1="130"
                      y1="430"
                      x2="130"
                      y2="470"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-200 mb-2">100+</div>
              <div className="text-slate-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-200 mb-2">100+</div>
              <div className="text-slate-400">Devices Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-200 mb-2">
                24hrs
              </div>
              <div className="text-slate-400">Quick Payment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-200 mb-2">100%</div>
              <div className="text-slate-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Categories */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
              Our <span className="text-slate-400">Categories</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Mobile Category */}

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-blue-500 bg-slate-800 hover:bg-slate-750 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  >
                    <rect
                      x="18"
                      y="4"
                      width="28"
                      height="56"
                      rx="4"
                      fill="#374151"
                      stroke="#4b5563"
                      strokeWidth="2"
                    />
                    <rect x="22" y="10" width="20" height="40" fill="#6b7280" />
                    <circle cx="32" cy="54" r="3" fill="#4b5563" />
                    <line
                      x1="26"
                      y1="7"
                      x2="38"
                      y2="7"
                      stroke="#4b5563"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-200 tracking-wide">
                  MOBILE
                </h3>
              </CardContent>
            </Card>

            {/* Watch Category */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750 opacity-60 hover:opacity-70 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  >
                    <rect
                      x="20"
                      y="18"
                      width="24"
                      height="30"
                      rx="5"
                      fill="#374151"
                      stroke="#4b5563"
                      strokeWidth="2"
                    />
                    <rect
                      x="24"
                      y="22"
                      width="16"
                      height="18"
                      fill="#6b7280"
                      rx="2"
                    />
                    <circle cx="32" cy="44" r="2" fill="#374151" />
                    <path
                      d="M 26 52 Q 32 50 38 52"
                      stroke="#4b5563"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 26 14 Q 32 16 38 14"
                      stroke="#4b5563"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-200 tracking-wide">
                  WATCH
                </h3>
                <Badge className="mt-2 bg-slate-700 text-slate-300 text-xs">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            {/* Tablet Category */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750 opacity-60 hover:opacity-70 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  >
                    <rect
                      x="12"
                      y="8"
                      width="40"
                      height="48"
                      rx="3"
                      fill="#374151"
                      stroke="#4b5563"
                      strokeWidth="2"
                    />
                    <rect x="16" y="12" width="32" height="38" fill="#6b7280" />
                    <circle cx="32" cy="53" r="2" fill="#4b5563" />
                    <line
                      x1="28"
                      y1="5"
                      x2="36"
                      y2="5"
                      stroke="#4b5563"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-200 tracking-wide">
                  TABLET
                </h3>
                <Badge className="mt-2 bg-slate-700 text-slate-300 text-xs">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            {/* Laptop Category */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-blue-500 bg-slate-800 hover:bg-slate-750 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  >
                    <rect
                      x="8"
                      y="12"
                      width="48"
                      height="34"
                      rx="2"
                      fill="#374151"
                      stroke="#4b5563"
                      strokeWidth="2"
                    />
                    <rect x="12" y="16" width="40" height="26" fill="#6b7280" />
                    <path d="M 4 46 L 60 46 L 58 50 L 6 50 Z" fill="#4b5563" />
                    <rect x="28" y="50" width="8" height="2" fill="#374151" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-200 tracking-wide">
                  LAPTOP
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Updated with GitHub dark mode styling */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              How It <span className="text-cyan-400">Works</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Selling your device is simple and secure with our 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:border-blue-500 transition-all">
                <span className="text-3xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Get Instant Quote
              </h3>
              <p className="text-slate-400 mb-6 text-lg">
                Select your device model and condition to get an instant price
                quote. Our system ensures accurate pricing.
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-8 group-hover:border-slate-700 transition-all">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-40 transform group-hover:scale-105 transition-transform duration-300"
                >
                  {/* Phone screen */}
                  <rect
                    x="60"
                    y="20"
                    width="80"
                    height="140"
                    rx="8"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  <rect
                    x="68"
                    y="32"
                    width="64"
                    height="110"
                    fill="#334155"
                    rx="3"
                  />
                  <circle cx="100" cy="150" r="6" fill="#475569" />

                  {/* Price tag */}
                  <path
                    d="M 110 80 L 170 80 L 180 90 L 170 100 L 110 100 Z"
                    fill="#3b82f6"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <circle cx="155" cy="90" r="4" fill="#dbeafe" />
                  <text
                    x="120"
                    y="95"
                    fill="#dbeafe"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    ₹
                  </text>

                  {/* Device icons */}
                  <rect
                    x="75"
                    y="45"
                    width="20"
                    height="28"
                    rx="2"
                    fill="#475569"
                    opacity="0.5"
                  />
                  <rect
                    x="105"
                    y="45"
                    width="20"
                    height="28"
                    rx="2"
                    fill="#475569"
                    opacity="0.5"
                  />

                  {/* Checkmarks */}
                  <circle
                    cx="85"
                    cy="95"
                    r="8"
                    fill="#06b6d4"
                    stroke="#0891b2"
                    strokeWidth="2"
                  />
                  <path
                    d="M 82 95 L 85 98 L 89 92"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="115"
                    cy="95"
                    r="8"
                    fill="#06b6d4"
                    stroke="#0891b2"
                    strokeWidth="2"
                  />
                  <path
                    d="M 112 95 L 115 98 L 119 92"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Calculator */}
                  <rect
                    x="25"
                    y="120"
                    width="50"
                    height="60"
                    rx="4"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <rect
                    x="30"
                    y="127"
                    width="40"
                    height="15"
                    fill="#475569"
                    rx="2"
                  />
                  <circle cx="38" cy="152" r="4" fill="#475569" />
                  <circle cx="50" cy="152" r="4" fill="#475569" />
                  <circle cx="62" cy="152" r="4" fill="#475569" />
                  <circle cx="38" cy="165" r="4" fill="#475569" />
                  <circle cx="50" cy="165" r="4" fill="#475569" />
                  <circle cx="62" cy="165" r="4" fill="#06b6d4" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:border-cyan-500 transition-all">
                <span className="text-3xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Free Pickup
              </h3>
              <p className="text-slate-400 mb-6 text-lg">
                Schedule a free pickup at your convenience. Our trained
                executives will collect your device safely from your doorstep.
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-8 group-hover:border-slate-700 transition-all">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-40 transform group-hover:scale-105 transition-transform duration-300"
                >
                  {/* Delivery truck */}
                  <rect
                    x="90"
                    y="90"
                    width="80"
                    height="50"
                    rx="5"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <rect
                    x="95"
                    y="100"
                    width="45"
                    height="30"
                    fill="#475569"
                    rx="2"
                  />

                  {/* Truck cabin */}
                  <path
                    d="M 85 90 L 85 120 L 95 120 L 95 100 L 85 90"
                    fill="#0f172a"
                  />
                  <rect
                    x="87"
                    y="95"
                    width="6"
                    height="8"
                    fill="#334155"
                    rx="1"
                  />

                  {/* Wheels */}
                  <circle
                    cx="110"
                    cy="140"
                    r="12"
                    fill="#0f172a"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                  <circle cx="110" cy="140" r="6" fill="#334155" />
                  <circle
                    cx="155"
                    cy="140"
                    r="12"
                    fill="#0f172a"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                  <circle cx="155" cy="140" r="6" fill="#334155" />

                  {/* Package in truck */}
                  <rect
                    x="145"
                    y="75"
                    width="25"
                    height="25"
                    fill="#3b82f6"
                    rx="2"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <line
                    x1="157.5"
                    y1="75"
                    x2="157.5"
                    y2="100"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <line
                    x1="145"
                    y1="87.5"
                    x2="170"
                    y2="87.5"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  {/* House */}
                  <rect
                    x="20"
                    y="100"
                    width="50"
                    height="45"
                    fill="#1e293b"
                    rx="3"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <rect x="32" y="115" width="12" height="15" fill="#475569" />
                  <rect x="50" y="115" width="12" height="15" fill="#475569" />
                  <rect
                    x="35"
                    y="132"
                    width="15"
                    height="13"
                    fill="#334155"
                    rx="1"
                  />

                  {/* Roof */}
                  <path d="M 15 100 L 45 75 L 75 100 Z" fill="#0f172a" />
                  <rect
                    x="38"
                    y="70"
                    width="14"
                    height="5"
                    fill="#334155"
                    rx="1"
                  />

                  {/* Delivery person */}
                  <circle cx="75" cy="110" r="8" fill="#475569" />
                  <rect
                    x="68"
                    y="118"
                    width="14"
                    height="22"
                    fill="#1e293b"
                    rx="2"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <line
                    x1="68"
                    y1="125"
                    x2="60"
                    y2="120"
                    stroke="#334155"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="82"
                    y1="125"
                    x2="90"
                    y2="130"
                    stroke="#334155"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Motion lines */}
                  <line
                    x1="30"
                    y1="75"
                    x2="40"
                    y2="75"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <line
                    x1="25"
                    y1="85"
                    x2="38"
                    y2="85"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:border-blue-500 transition-all">
                <span className="text-3xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Get Paid Instantly
              </h3>
              <p className="text-slate-400 mb-6 text-lg">
                After device verification, receive instant payment via UPI, bank
                transfer, or cash. Quick, secure, and hassle-free.
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-8 group-hover:border-slate-700 transition-all">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-40 transform group-hover:scale-105 transition-transform duration-300"
                >
                  {/* Phone with payment */}
                  <rect
                    x="60"
                    y="30"
                    width="80"
                    height="140"
                    rx="8"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  <rect
                    x="68"
                    y="42"
                    width="64"
                    height="110"
                    fill="#334155"
                    rx="3"
                  />
                  <circle cx="100" cy="160" r="6" fill="#475569" />

                  {/* Payment success icon */}
                  <circle
                    cx="100"
                    cy="90"
                    r="25"
                    fill="#06b6d4"
                    stroke="#0891b2"
                    strokeWidth="3"
                  />
                  <path
                    d="M 88 90 L 96 98 L 112 82"
                    stroke="white"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Money notes */}
                  <rect
                    x="75"
                    y="125"
                    width="50"
                    height="25"
                    rx="3"
                    fill="#3b82f6"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="137.5"
                    r="8"
                    fill="#2563eb"
                    opacity="0.3"
                  />
                  <text
                    x="95"
                    y="143"
                    fill="#dbeafe"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    ₹
                  </text>

                  {/* Cash/coins */}
                  <circle
                    cx="25"
                    cy="100"
                    r="15"
                    fill="#3b82f6"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <text
                    x="18"
                    y="107"
                    fill="#dbeafe"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    ₹
                  </text>

                  <circle
                    cx="175"
                    cy="100"
                    r="15"
                    fill="#3b82f6"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <text
                    x="168"
                    y="107"
                    fill="#dbeafe"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    ₹
                  </text>

                  {/* UPI icon */}
                  <rect
                    x="20"
                    y="140"
                    width="35"
                    height="35"
                    rx="5"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <text
                    x="27"
                    y="163"
                    fill="#06b6d4"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    UPI
                  </text>

                  {/* Bank icon */}
                  <rect
                    x="145"
                    y="140"
                    width="35"
                    height="35"
                    rx="5"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <path
                    d="M 152 150 L 162.5 145 L 173 150 L 173 170 L 152 170 Z"
                    fill="#475569"
                  />
                  <rect x="158" y="155" width="3" height="10" fill="#1e293b" />
                  <rect x="164" y="155" width="3" height="10" fill="#1e293b" />

                  {/* Speed lines */}
                  <line
                    x1="30"
                    y1="60"
                    x2="45"
                    y2="60"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <line
                    x1="25"
                    y1="70"
                    x2="45"
                    y2="70"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <line
                    x1="155"
                    y1="60"
                    x2="170"
                    y2="60"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <line
                    x1="155"
                    y1="70"
                    x2="175"
                    y2="70"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/sell">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-xl transition-all">
                Start Selling Now
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              Why Choose <span className="text-slate-400">InstaCash</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-all border border-slate-700 hover:border-blue-500 bg-slate-800">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">
                100% Secure
              </h3>
              <p className="text-slate-400">
                Your data and device are completely safe with our verified
                process
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all border border-slate-700 hover:border-blue-500 bg-slate-800">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">
                Best Prices
              </h3>
              <p className="text-slate-400">
                Get the highest market value for your device guaranteed
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all border border-slate-700 hover:border-blue-500 bg-slate-800">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-400">
                Complete the entire process in under 24 hours
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust InstaCash
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white shadow-lg hover:shadow-2xl transition-all border-2 hover:border-purple-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd2a0029-26fe-43ac-8fda-08781eaaa4bc.png"
                    alt="Customer testimonial"
                    className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Rajesh Kumar
                    </h4>
                    <p className="text-gray-600">Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "Sold my iPhone 12 and got the best price in the market. The
                  pickup was on time and payment was instant. Highly
                  recommended!"
                </p>
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white shadow-lg hover:shadow-2xl transition-all border-2 hover:border-purple-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/254fcec6-3ac3-4850-b93a-11dd36332bd4.png"
                    alt="Customer testimonial"
                    className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Priya Sharma
                    </h4>
                    <p className="text-gray-600">Delhi</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "Bought a MacBook Pro at an amazing price. The device was
                  exactly as described and the buying process was smooth and
                  transparent."
                </p>
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-white shadow-lg hover:shadow-2xl transition-all border-2 hover:border-purple-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ac6499f7-b470-472c-b215-3d2edfc94500.png"
                    alt="Customer testimonial"
                    className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Amit Patel
                    </h4>
                    <p className="text-gray-600">Bangalore</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "The entire process was hassle-free. From getting the quote to
                  receiving payment, everything was professional and quick. Will
                  definitely use again!"
                </p>
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with GitHub dark mode styling */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Ready to Get the Best Value for Your Device?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto">
            Join over 5 lakh satisfied customers who have trusted InstaCash for
            their device trading needs. Get started today and experience the
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/sell">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-xl transition-all">
                Sell your Device now
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - New GitHub dark mode inspired footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                Cashionix
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                India's most trusted platform for buying and selling used
                devices.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Sell Device
                  </a>
                </li>
                
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                 
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            {/* <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div> */}
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm">
                © 2025 Cashionix. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  Status
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
