import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
import LoadingSpinner from '../components/LoadingSpinner';

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
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Products</h1>
              <p>Manage your product inventory</p>
            </div>
            <div className="header-actions">
              <button 
                className="btn btn-secondary"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? '⟳' : '↻'} Refresh
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddNew}
                disabled={loading}
              >
                + Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          {/* Error Message */}
          {error && (
            <div className="error-banner">
              <span>⚠️ {error}</span>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <LoadingSpinner />
              <p>Loading products...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && !error && (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No products yet</h3>
              <p>Get started by adding your first product</p>
              <button className="btn btn-primary" onClick={handleAddNew}>
                + Add Your First Product
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    isDeleting={isDeleting}
                    deletingId={deletingId}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="products-stats">
                <div className="stat-item">
                  <div className="stat-number">{products.length}</div>
                  <div className="stat-label">Total Products</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    ${products.reduce((sum, p) => sum + parseFloat(p.price), 0).toFixed(2)}
                  </div>
                  <div className="stat-label">Total Value</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    ${products.length > 0 ? (products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length).toFixed(2) : '0.00'}
                  </div>
                  <div className="stat-label">Average Price</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
    </div>
  );
}

export default Products; 