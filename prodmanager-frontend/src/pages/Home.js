import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/api';

function Home() {
  const isLoggedIn = isAuthenticated();

  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Manage your products
            <br />
            <span className="hero-highlight">beautifully</span>
          </h1>
          <p className="hero-description">
            A clean, minimal product management system that helps you organize 
            and manage your inventory with ease. Built for modern teams.
          </p>
          
          <div className="hero-actions">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
              </>
            ) : (
              <Link to="/products" className="btn btn-primary">
                View Products
              </Link>
            )}
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="product-preview">
            <div className="product-card-demo">
              <div className="demo-image"></div>
              <div className="demo-content">
                <div className="demo-title"></div>
                <div className="demo-description"></div>
                <div className="demo-price"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📦</div>
            <h3>Easy Management</h3>
            <p>Add, edit, and organize your products with a clean, intuitive interface</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Role-based authentication ensures your data stays protected</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works perfectly on desktop, tablet, and mobile devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 