import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        // Dispatch login action
        dispatch(loginUser({ email: formData.email, password: formData.password, navigate }))
            .unwrap()
            .then(() => {
                alert('Login successful!');
                setFormData({
                    email: '',
                    password: '',
                });
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Login failed: ' + (error.message || 'Unknown error'));
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="col-">
                    <div className="card bg-dark text-light shadow-lg">
                        <div className="card-header bg-dark border-secondary text-center">
                            <h4 className="mb-0">Welcome Back</h4>
                            <p className="text-muted small">Login to access your account</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="form-floating mb-4">
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email" className="text-light">
                                        Email
                                    </label>
                                </div>

                                {/* Password Field */}
                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="password" className="text-light">
                                        Password
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary w-100 mb-3">
                                    Login
                                </button>

                                {/* Register Link */}
                                <div className="text-center">
                                    <p className="mb-0 text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="text-primary text-decoration-none fw-bold">
                                            Register here
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
