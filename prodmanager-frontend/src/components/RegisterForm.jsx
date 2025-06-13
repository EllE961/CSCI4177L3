import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .required('Full name is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  phone: Yup.string()
    .matches(/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits')
    .required('Phone number is required'),
  
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

// Initial form values
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
};

const RegisterForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      console.log('Registration data:', values);
      
      // Show success message
      toast.success('Registration successful! Welcome to ProdManager!');
      
      // Reset form
      resetForm();
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">
                <i className="bi bi-person-plus-fill me-2"></i>
                Create Your Account
              </h2>
              <p className="mb-0 mt-2 opacity-75">Join ProdManager today</p>
            </Card.Header>
            
            <Card.Body className="p-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, values }) => (
                  <Form>
                    {/* Full Name Field */}
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label fw-bold">
                        <i className="bi bi-person me-1"></i>
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`form-control ${
                          errors.fullName && touched.fullName ? 'is-invalid' : ''
                        } ${!errors.fullName && touched.fullName ? 'is-valid' : ''}`}
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage 
                        name="fullName" 
                        component="div" 
                        className="invalid-feedback d-block" 
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-bold">
                        <i className="bi bi-envelope me-1"></i>
                        Email Address *
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          errors.email && touched.email ? 'is-invalid' : ''
                        } ${!errors.email && touched.email ? 'is-valid' : ''}`}
                        placeholder="Enter your email"
                      />
                      <ErrorMessage 
                        name="email" 
                        component="div" 
                        className="invalid-feedback d-block" 
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-bold">
                        <i className="bi bi-telephone me-1"></i>
                        Phone Number *
                      </label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-control ${
                          errors.phone && touched.phone ? 'is-invalid' : ''
                        } ${!errors.phone && touched.phone ? 'is-valid' : ''}`}
                        placeholder="Enter your phone number (10-15 digits)"
                      />
                      <ErrorMessage 
                        name="phone" 
                        component="div" 
                        className="invalid-feedback d-block" 
                      />
                      <div className="form-text">
                        <small className="text-muted">
                          <i className="bi bi-info-circle me-1"></i>
                          Only digits, 10-15 characters long
                        </small>
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-bold">
                        <i className="bi bi-lock me-1"></i>
                        Password *
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password ? 'is-invalid' : ''
                        } ${!errors.password && touched.password ? 'is-valid' : ''}`}
                        placeholder="Enter your password"
                      />
                      <ErrorMessage 
                        name="password" 
                        component="div" 
                        className="invalid-feedback d-block" 
                      />
                      <div className="form-text">
                        <small className="text-muted">
                          <i className="bi bi-info-circle me-1"></i>
                          Minimum 6 characters required
                        </small>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label fw-bold">
                        <i className="bi bi-lock-fill me-1"></i>
                        Confirm Password *
                      </label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                        } ${!errors.confirmPassword && touched.confirmPassword ? 'is-valid' : ''}`}
                        placeholder="Confirm your password"
                      />
                      <ErrorMessage 
                        name="confirmPassword" 
                        component="div" 
                        className="invalid-feedback d-block" 
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="fw-bold"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Create Account
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Form Info */}
                    <div className="mt-4 text-center">
                      <Alert variant="info" className="mb-0">
                        <i className="bi bi-shield-check me-2"></i>
                        <small>
                          By creating an account, you agree to our Terms of Service and Privacy Policy.
                        </small>
                      </Alert>
                    </div>

                    {/* Debug Info (remove in production) */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mt-4">
                        <details>
                          <summary className="text-muted">Debug Info (Development Only)</summary>
                          <pre className="mt-2 p-2 bg-light rounded">
                            <small>
                              <strong>Form Values:</strong>
                              {JSON.stringify(values, null, 2)}
                            </small>
                          </pre>
                        </details>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm; 