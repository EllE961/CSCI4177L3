import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters'),
  image: Yup.string()
    .required('Image URL is required')
    .url('Please enter a valid URL'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be at least $0.01')
});

const ProductModal = ({
  show,
  onHide,
  onSubmit,
  initialValues = {
    title: '',
    image: '',
    description: '',
    price: ''
  },
  isLoading = false,
  modalTitle = 'Add Product'
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, { setSubmitting, resetForm });
        }}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              {/* Title Field */}
              <Form.Group className="mb-3">
                <Form.Label>Product Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && errors.title}
                  placeholder="Enter product title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Image URL Field */}
              <Form.Group className="mb-3">
                <Form.Label>Image URL *</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.image && errors.image}
                  placeholder="https://example.com/image.jpg"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
                {values.image && !errors.image && (
                  <div className="mt-2">
                    <img 
                      src={values.image} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </Form.Group>

              {/* Description Field */}
              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                  placeholder="Enter product description"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Price Field */}
              <Form.Group className="mb-3">
                <Form.Label>Price ($) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && errors.price}
                  placeholder="0.00"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button 
                variant="secondary" 
                onClick={() => {
                  resetForm();
                  onHide();
                }}
                disabled={isSubmitting || isLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {(isSubmitting || isLoading) && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                )}
                {modalTitle.includes('Edit') ? 'Update Product' : 'Create Product'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProductModal; 