import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, LogOut, User, Package } from 'lucide-react';
import { api } from '../../api/client';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // eslint-disable-line react-hooks/set-state-in-effect
  }, [location]);

  const handleLogout = () => {
    api.auth.logout();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Navigation Bar */}
      <div className="navbar-top">
        <div className="container">
          <div className="navbar-top-content">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <Package size={28} />
              <span className="navbar-logo-text">GrocerFlow</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <form className="navbar-search hidden-mobile" onSubmit={handleSearch}>
              <input
                type="text"
                className="navbar-search-input"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              <button type="submit" className="navbar-search-btn" aria-label="Submit search">
                <Search size={20} />
              </button>
            </form>

            {/* Actions */}
            <div className="navbar-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/account" className="navbar-action-link hidden-mobile">
                    <User size={20} />
                    <span>Account</span>
                  </Link>
                  <Link to="/cart" className="navbar-action-link">
                    <ShoppingCart size={20} />
                    <span className="hidden-mobile">Cart</span>
                    <span className="navbar-cart-badge">0</span>
                  </Link>
                  <button onClick={handleLogout} className="navbar-action-link hidden-mobile">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/cart" className="navbar-action-link">
                    <ShoppingCart size={20} />
                    <span className="hidden-mobile">Cart</span>
                  </Link>
                  <Link to="/login" className="btn btn-primary btn-sm">
                    Sign In
                  </Link>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="navbar-mobile-toggle visible-mobile-only"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation (Categories/Links) */}
      <div className="navbar-secondary hidden-mobile">
        <div className="container">
          <nav className="navbar-nav">
            <Link to="/" className={`navbar-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/lists"
                  className={`navbar-nav-link ${location.pathname === '/lists' ? 'active' : ''}`}
                >
                  My Lists
                </Link>
                <Link
                  to="/board"
                  className={`navbar-nav-link ${location.pathname === '/board' ? 'active' : ''}`}
                >
                  Board
                </Link>
              </>
            )}
            <Link
              to="/products"
              className={`navbar-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            >
              Products
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Search (visible on mobile) */}
      <div className="navbar-mobile-search visible-mobile-only">
        <div className="container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="navbar-search-btn" aria-label="Submit search">
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="container">
            <nav className="navbar-mobile-nav">
              <Link
                to="/"
                className="navbar-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/lists"
                    className="navbar-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Lists
                  </Link>
                  <Link
                    to="/board"
                    className="navbar-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Board
                  </Link>
                  <Link
                    to="/account"
                    className="navbar-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                </>
              )}
              <Link
                to="/products"
                className="navbar-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              {isLoggedIn && (
                <button onClick={handleLogout} className="navbar-mobile-link navbar-mobile-logout">
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
