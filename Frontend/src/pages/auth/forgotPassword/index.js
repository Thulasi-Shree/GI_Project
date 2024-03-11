/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../login/login.scss';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('email', email);
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        };

        const response = await axios.post(
          '/api/password/forgot',
          formData,
          config
        );

        setMessage(response.data.message);
        alert(response.data.message);
        setEmail('');
      } catch (error) {
        setError(error.response ? error.response.data : 'An error occurred');
        const errorMessage = error.response
          ? error.response.data.message
          : 'An error occurred';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fix the validation errors');
      validator.current.showMessages();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <div id="ForgetPMainImg">
      <div className="signup-form-container mx-auto container-fluid col-md-4 py-5 mx-3 ">
        <form onSubmit={handleSubmit}>
          <div className="row custom-table my-5" id="CardBackIMg1">
            <div className="col-md-12">
              <h2 className="text-center mt-3 font-regular-29" id="CardText">
                Forgot password
              </h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" id="CardText">
                  Email address{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  id="CardText"
                  value={email}
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Field is required"
                  className="form-control"
                />
                {validator.current.message('Email', email, 'required')}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn mb-4 w-100"
              >
                Submit
              </button>
            </div>
            <div>
              <Link to="/login" id="CardText">
                Back to login
              </Link>
            </div>
            <div className="mb-3">
              <Link to="/" id="CardText">
                Continue as Guest
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
