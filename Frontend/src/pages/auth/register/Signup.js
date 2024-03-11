/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
  // const navigate = useNavigate();
  const defaultAvatarImage =
    'https://th.bing.com/th/id/OIP.QTPhxyhDQjv4eE1mA4ulLAHaJs?w=168&h=220&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: defaultAvatarImage,
    // confirmEmail: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the axios call to your login API endpoint
      const response = await axios.post('/api/register', formData);

      // Handle success, for example, show a success message or redirect
      // console.log('Register successful', response.data);

      // Show success toast
      alert('Registration link has sent to your email successfully!');
      // navigate('/');
    } catch (error) {
      // Handle error
      // console.error('error', error.response.data.message);

      // Show error toast
      alert(`${error.response.data.message}`);
    }
  };
  const defaultAvatarStyle = {
    display: formData.avatar === defaultAvatarImage ? 'block' : 'none',
    maxWidth: '100px' // Adjust the size as needed
  };

  const customAvatarStyle = {
    display: formData.avatar !== defaultAvatarImage ? 'block' : 'none',
    maxWidth: '100px' // Adjust the size as needed
    // Add additional styles for custom avatar if needed
  };
  const avatarContainerStyle = {
    textAlign: 'center'
  };

  return (
    <div
      className="container-fluid signup-form-container mb-3 py-5"
      id="LoginMainImg"
    >
      <form onSubmit={handleSubmit}>
        <div
          className="col-11 col-md-5 mx-auto custom-table mx-3 mt-4"
          id="CardBackIMg1"
        >
          <div className="col-md-12 col-12 px-4">
            <h1 className="text-center mt-3 font-regular-29" id="CardText">
              Sign up
            </h1>
            <div
              id="CardText"
              style={{
                fontSize: '18px',
                fontStyle: 'italic'
              }}
            >
              If you have account?{' '}
              <div className="links-container mb-4">
                <div>
                  <Link
                    to="/login"
                    id="CardText"
                    style={{
                      fontSize: '20px',
                      fontFamily: 'serif',
                      fontStyle: 'normal'
                    }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label
                  htmlFor="name"
                  id="CardText"
                  style={{
                    fontWeight: '500',
                    fontSize: '19px'
                  }}
                >
                  First name:
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Field is required"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control `}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label
                  htmlFor="lastName"
                  id="CardText"
                  style={{
                    fontWeight: '500',
                    fontSize: '19px'
                  }}
                >
                  Last name:
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Field is required"
                    value={formData.lastName}
                    className={`form-control `}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label
                  htmlFor="email1"
                  id="CardText"
                  style={{
                    fontWeight: '500',
                    fontSize: '19px'
                  }}
                >
                  Email:{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="email"
                    id="email1"
                    name="email"
                    placeholder="Field is required"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control `}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label
                  htmlFor="password"
                  id="CardText"
                  style={{
                    fontWeight: '500',
                    fontSize: '19px'
                  }}
                >
                  Password:{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                    <span>
                      <p
                        id="CardText"
                        style={{
                          fontWeight: '500',
                          fontSize: '14px'
                        }}
                      >
                        At least 8 characters
                      </p>
                    </span>
                  </span>
                </label>
                <div>
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Field is required"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`form-control `}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label
                  htmlFor="phone"
                  id="CardText"
                  style={{
                    fontWeight: '500',
                    fontSize: '19px'
                  }}
                >
                  Phone:{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Field is required"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`form-control `}
                  />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', display: 'none' }}>
              <label
                htmlFor="avatar"
                id="CardText"
                style={{
                  fontWeight: '500',
                  fontSize: '19px'
                }}
              >
                Avatar Image:
              </label>
              <div style={avatarContainerStyle}>
                <img
                  src={formData.avatar}
                  alt="User Avatar"
                  style={{ ...defaultAvatarStyle, marginBottom: '10px' }}
                />
                <img
                  src={formData.avatar}
                  alt="User Avatar"
                  style={customAvatarStyle}
                />
              </div>
              <input
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files[0] })
                }
              />
            </div>

            <div className="my-3">
              <button
                type="submit"
                className="w-100 mt-4"
                style={{ backgroundColor: '#bd870b' }}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
