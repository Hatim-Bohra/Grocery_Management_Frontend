import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Background Shapes */}
      <div className="hero-bg-shape hero-bg-shape-right" />
      <div className="hero-bg-shape hero-bg-shape-left" />

      <div className="container">
        <div className="hero-content">
          {/* Text Content */}
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge badge-primary hero-badge">Same Day Delivery 🚀</span>
              <h1 className="hero-title">
                Fresh Groceries <br />
                <span className="hero-title-gradient">Delivered Fast</span>
              </h1>
              <p className="hero-description">
                Experience the finest quality fresh produce, organic essentials, and household items
                delivered straight to your doorstep within hours.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary btn-lg">
                  Start Shopping
                  <ShoppingBag size={20} />
                </button>
                <button className="btn btn-secondary btn-lg">
                  View Categories
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <p className="hero-stat-value">15k+</p>
                  <p className="hero-stat-label">Happy Customers</p>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <p className="hero-stat-value">2k+</p>
                  <p className="hero-stat-label">Products</p>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <p className="hero-stat-value">4.9</p>
                  <p className="hero-stat-label">Customer Rating</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="hero-image-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-image-wrapper"
            >
              <div className="hero-image-circle">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Fresh Grocery Bag"
                  className="hero-image"
                />

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="hero-floating-card hero-floating-card-top"
                >
                  <div className="hero-floating-card-content">
                    <div className="hero-floating-icon hero-floating-icon-green">🌿</div>
                    <div>
                      <p className="hero-floating-title">100% Organic</p>
                      <p className="hero-floating-subtitle">Fresh & Natural</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="hero-floating-card hero-floating-card-bottom"
                >
                  <div className="hero-floating-card-content">
                    <div className="hero-floating-icon hero-floating-icon-blue">🚚</div>
                    <div>
                      <p className="hero-floating-title">Free Delivery</p>
                      <p className="hero-floating-subtitle">On orders over $50</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
