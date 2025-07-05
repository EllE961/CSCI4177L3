import React from 'react';

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  isDeleting = false,
  deletingId = null 
}) => {
  const isCurrentlyDeleting = isDeleting && deletingId === product.id;

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
      </div>
      
      <div className="product-content">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        
        <p className="product-description">
          {product.description}
        </p>
        
        <div className="product-footer">
          <div className="product-price">
            ${parseFloat(product.price).toFixed(2)}
          </div>
          
          <div className="product-actions">
            <button
              className="action-btn edit-btn"
              onClick={() => onEdit(product)}
              disabled={isCurrentlyDeleting}
              title="Edit product"
            >
              ✏️
            </button>
            
            <button
              className="action-btn delete-btn"
              onClick={() => onDelete(product.id)}
              disabled={isCurrentlyDeleting}
              title="Delete product"
            >
              {isCurrentlyDeleting ? '⟳' : '🗑️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 