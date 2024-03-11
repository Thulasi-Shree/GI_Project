/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    restaurantBranch: '',
    restaurantId: '',
    description: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    cuisineTypeCategory: '',
    openingHours: ''
  });

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name.startsWith('address.')) {
      // If the field belongs to the address, update it separately
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [e.target.name.slice(8)]: e.target.value
        }
      });
    } else {
      // Otherwise, update the form data normally
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/restaurant/create', formData);
      console.log('Restaurant created successfully!');
      alert('Restaurant created Successfully!');
    } catch (error) {
      console.error('Error creating restaurant:', error);
      alert('Error creating restaurant!');
    }
  };

  return (
    <div className="MenuHeaderMain1">
      <Card className="col-md-5 container py-5" id="CardBackIMg1">
        <h4>Create a New Restaurant</h4>
        <form onSubmit={handleSubmit} className="address-container">
          {/* Add input fields for each restaurant property */}
          <div className="mb-3">
            {' '}
            <label>
              Restaurant Name:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="restaurantName"
              className={`form-control `}
              value={formData.restaurantName}
              onChange={handleChange}
              required
              placeholder="Field is required"
            />
          </div>

          <div className="mb-3">
            <label>
              Restaurant Branch:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="restaurantBranch"
              value={formData.restaurantBranch}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-3">
            <label>
              Restaurant Id:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="restaurantId"
              value={formData.restaurantId}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-3">
            <label>
              Description:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>
          <div className="mb-4">
            <label>
              Address Line 1:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Address Line 2:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="address.line2"
              value={formData.address.line2}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              City:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              State:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Postal Code:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-4">
            <label>
              Country:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-3">
            {' '}
            <label>
              Point:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="point"
              value={formData.point}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <div className="mb-3">
            <label>
              Cuisine:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <select
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              name="cuisineTypeCategory"
              value={formData.cuisineTypeCategory}
              onChange={handleChange}
              required
              className={`form-control `}
            >
              <option value="">Select</option>
              <option value="Italian">Italian</option>
              <option value="Asian">Asian</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Mexican">Mexican</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label>
              Opening Hours:{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              required
              placeholder="Field is required"
              className={`form-control `}
            />
          </div>

          <button className="btn my-global-button mb-3" type="submit">
            Create Restaurant
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateRestaurant;
