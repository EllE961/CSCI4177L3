import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';

// Redux Actions
import { 
  readProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../redux/actions';

// Components
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

function Products() {
  const dispatch = useDispatch();
  
  // Redux State
  const { 
    products, 
    loading, 
    error, 
    isCreating, 
    isUpdating, 
    isDeleting 
  } = useSelector(state => state);
  
  // Local State
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(readProducts());
  }, [dispatch]);

  // Handle Create Product
  const handleCreateProduct = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(createProduct({
        title: values.title,
        image: values.image,
        description: values.description,
        price: parseFloat(values.price)
      }));
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Update Product
  const handleUpdateProduct = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(updateProduct(editingProduct.id, {
        title: values.title,
        image: values.image,
        description: values.description,
        price: parseFloat(values.price)
      }));
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeletingId(id);
        await dispatch(deleteProduct(id));
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Handle Modal Close
  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // Handle Add New Product
  const handleAddNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  // Refresh Products
  const handleRefresh = () => {
    dispatch(readProducts());
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Product Management</h1>
            <div className="d-flex gap-2">
              <Button 
                variant="outline-secondary" 
                onClick={handleRefresh}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise"></i> Refresh
              </Button>
              <Button 
                variant="primary" 
                onClick={handleAddNew}
                disabled={loading}
              >
                <i className="bi bi-plus"></i> Add New Product
              </Button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" dismissible onClose={() => window.location.reload()}>
              <Alert.Heading>Error!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading products...</p>
            </div>
          )}

          {/* No Products Message */}
          {!loading && products.length === 0 && !error && (
            <Card className="text-center py-5">
              <Card.Body>
                <i className="bi bi-box-seam display-1 text-muted"></i>
                <h3 className="mt-3 text-muted">No Products Found</h3>
                <p className="text-muted">Start by adding your first product!</p>
                <Button variant="primary" onClick={handleAddNew}>
                  <i className="bi bi-plus"></i> Add First Product
                </Button>
              </Card.Body>
            </Card>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <Row>
              {products.map((product) => (
                <Col key={product.id} md={6} lg={4} xl={3} className="mb-4">
                  <ProductCard
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    isDeleting={isDeleting}
                    deletingId={deletingId}
                  />
                </Col>
              ))}
            </Row>
          )}

          {/* Product Stats */}
          {!loading && products.length > 0 && (
            <Card className="mt-4 bg-light">
              <Card.Body>
                <Row className="text-center">
                  <Col md={4}>
                    <h5 className="text-primary">{products.length}</h5>
                    <small className="text-muted">Total Products</small>
                  </Col>
                  <Col md={4}>
                    <h5 className="text-success">
                      ${products.reduce((sum, p) => sum + parseFloat(p.price), 0).toFixed(2)}
                    </h5>
                    <small className="text-muted">Total Value</small>
                  </Col>
                  <Col md={4}>
                    <h5 className="text-info">
                      ${products.length > 0 ? (products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length).toFixed(2) : '0.00'}
                    </h5>
                    <small className="text-muted">Average Price</small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Product Modal */}
      <ProductModal
        show={showModal}
        onHide={handleModalClose}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        initialValues={editingProduct ? {
          title: editingProduct.title,
          image: editingProduct.image,
          description: editingProduct.description,
          price: editingProduct.price.toString()
        } : {
          title: '',
          image: '',
          description: '',
          price: ''
        }}
        modalTitle={editingProduct ? 'Edit Product' : 'Add New Product'}
        isLoading={isCreating || isUpdating}
      />
    </Container>
  );
}

export default Products; 