import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AddUsers() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.state && location.state.user;
  const [formData, setFormData] = useState(
    isEditMode
      ? {
          name: location.state.user.name || '',
          email: location.state.user.email || '',
          password: '', // Leave blank for security
          password_confirmation: '',
          terms: false,
        }
      : {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          terms: false,
        }
  );

  // State to show errors or success
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Clear any previous messages
    setErrors({});
    setSuccess('');

    if (isEditMode) {
      // Update existing user
      axios
        .put(`/api/users/${location.state.user.id}`, formData)
        .then((response) => {
          setSuccess(response.data.message || 'User updated successfully!');
          navigate('/list');
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors || {});
          } else {
            console.error(error);
          }
        });
    } else {
      // Create new user
      axios
        .post('/register', formData)
        .then((response) => {
          setSuccess(response.data.message || 'Registration successful!');
          setFormData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
          });
          navigate('/list');
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors || {});
          } else {
            console.error(error);
          }
        });
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        {isEditMode ? 'Edit User' : 'Sign up'}
                      </p>

                      {/* Display success message */}
                      {success && (
                        <div className="alert alert-success" role="alert">
                          {success}
                        </div>
                      )}

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label">Your Name</label>
                            {errors.name && (
                              <div className="text-danger">{errors.name}</div>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label">Your Email</label>
                            {errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div>
                        </div>

                        {/* Password */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label">Password</label>
                            {errors.password && (
                              <div className="text-danger">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Password Confirmation */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password_confirmation"
                              value={formData.password_confirmation}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label">
                              Repeat your password
                            </label>
                            {errors.password && (
                              <div className="text-danger">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Terms */}
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            I agree to all statements in{' '}
                            <a href="#!">Terms of service</a>
                          </label>
                          {errors.terms && (
                            <div className="text-danger ms-2">
                              {errors.terms}
                            </div>
                          )}
                        </div>

                        {/* Submit */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddUsers;

// Render into #example
if (document.getElementById('example')) {
  ReactDOM.createRoot(document.getElementById('example')).render(
    <React.StrictMode>
      <AddUsers />
    </React.StrictMode>
  );
}