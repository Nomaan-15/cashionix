"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Bangalore");

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      // Bangalore pincode validation (starts with 560)
      if (pincode.startsWith('560')) {
        setSelectedLocation(`Bangalore - ${pincode}`);
        setLocationModalOpen(false);
        setPincode("");
      } else {
        alert("We currently serve Bangalore only. Please enter a Bangalore pincode (560xxx)");
      }
    }
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />

      <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-slate-700 rounded-lg p-2 border border-slate-600">
                <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12" y2="18"></line>
                </svg>
              </div>
              <span className="text-2xl font-bold text-slate-200">
                Cashionix
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">
                Home
              </Link>
              <Link href="/sell" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">
                Sell Device
              </Link>
              <Link href="#about" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">
                About Us
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 flex items-center gap-2"
                onClick={() => setLocationModalOpen(true)}
              >
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{selectedLocation}</span>
              </Button>
              
              {/* Conditional rendering based on auth state */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">{user.username}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-red-400 hover:text-red-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 flex items-center gap-2"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Login</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-slate-300 hover:text-blue-400 font-medium transition-colors px-2 py-2 hover:bg-slate-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/sell"
                  className="text-slate-300 hover:text-blue-400 font-medium transition-colors px-2 py-2 hover:bg-slate-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sell Device
                </Link>
                <Link
                  href="#about"
                  className="text-slate-300 hover:text-blue-400 font-medium transition-colors px-2 py-2 hover:bg-slate-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <div className="flex flex-col space-y-3 pt-4 border-t border-slate-700">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-slate-300 hover:text-blue-400 border-slate-600 hover:bg-slate-800"
                    onClick={() => {
                      setLocationModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {selectedLocation}
                  </Button>
                  
                  {/* Mobile auth buttons */}
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
                        <User className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300">{user.username}</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-400 hover:text-red-300 border-slate-600 hover:bg-slate-800"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full justify-start text-slate-300 hover:text-blue-400 border-slate-600 hover:bg-slate-800"
                      onClick={() => {
                        setShowAuthModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Location Modal */}
      {locationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200 border border-slate-700">
            {/* Close button */}
            <button
              onClick={() => setLocationModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-600">
                <MapPin className="w-8 h-8 text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Select Your Location</h2>
              <p className="text-slate-400">Enter your pincode to get accurate pricing and service availability</p>
            </div>

            {/* Pincode Form */}
            <form onSubmit={handlePincodeSubmit} className="space-y-4">
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-slate-300 mb-2">
                  Enter Pincode
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 6) {
                        setPincode(value);
                      }
                    }}
                    placeholder="e.g., 560001"
                    className="w-full px-4 py-3 border-2 border-slate-600 rounded-lg bg-slate-700 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                    maxLength={6}
                  />
                </div>
                {pincode.length > 0 && pincode.length < 6 && (
                  <p className="text-sm text-red-400 mt-1">Pincode must be 6 digits</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={pincode.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Location
              </Button>
            </form>

            {/* Bangalore Info */}
            <div className="mt-6 pt-6 border-t border-slate-600 text-center">
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <p className="text-sm font-medium text-slate-300 mb-1">Currently Serving</p>
                <p className="text-lg font-bold text-slate-100">Bangalore Only</p>
                <p className="text-xs text-slate-400 mt-1">More cities coming soon!</p>
              </div>
            </div>

            {/* Use Current Location */}
            <button
              onClick={() => {
                setSelectedLocation("Detecting location...");
                setTimeout(() => {
                  setSelectedLocation("Bangalore");
                  setLocationModalOpen(false);
                }, 1000);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-medium py-2"
            >
              <MapPin className="w-5 h-5" />
              Use Current Location
            </button>
          </div>
        </div>
      )}
    </>
  );
}