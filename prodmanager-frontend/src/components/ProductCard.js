import React from 'react';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  isDeleting = false,
  deletingId = null 
}) => {
  const isCurrentlyDeleting = isDeleting && deletingId === product.id;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={product.image} 
        style={{ 
          height: '200px', 
          objectFit: 'cover' 
        }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" title={product.title}>
          {product.title}
        </Card.Title>
        
        <Card.Text 
          className="flex-grow-1" 
          style={{ 
            maxHeight: '100px', 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Badge bg="success" className="fs-6">
            ${parseFloat(product.price).toFixed(2)}
          </Badge>
          
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(product)}
              disabled={isCurrentlyDeleting}
            >
              <i className="bi bi-pencil"></i> Edit
            </Button>
            
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(product.id)}
              disabled={isCurrentlyDeleting}
            >
              {isCurrentlyDeleting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-1"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash"></i> Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </Card.Body>
      
      {/* Product ID Badge for reference */}
      <div className="position-absolute top-0 start-0 m-2">
        <Badge bg="secondary" className="small">
          ID: {product.id}
        </Badge>
      </div>
    </Card>
  );
};

export default ProductCard; 