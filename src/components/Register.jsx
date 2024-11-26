import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    dispatch(createUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        alert('Registration successful!');
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Registration error:', error);
        alert('Registration failed: ' + (error.message || 'Unknown error'));
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="card-header text-center bg-primary text-white py-3">
          <h4 className="mb-0">Create Your Account</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control border-0 bg-light shadow-sm"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control border-0 bg-light shadow-sm"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label fw-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control border-0 bg-light shadow-sm"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100 py-2">
              Register
            </button>
          </form>
        </div>
        <div className="card-footer text-center bg-light">
          <small>
            Already have an account?{' '}
            <a href="/login" className="text-primary fw-bold">
              Login here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
