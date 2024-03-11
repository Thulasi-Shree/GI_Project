/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card } from 'react-bootstrap';
// import '../auth/register/SignUpForm.css';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: '',
    confirmEmail: '',
    phone: '',
    restaurantBranch: '',
    restaurantId: ''
  });
  const [restaurantBranches, setRestaurantBranches] = useState([]); // Updated
  const [restaurantIds, setRestaurantIds] = useState([]); // Updated

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Find the corresponding restaurant ID for the selected branch
    const selectedId = restaurantIds.find(
      (id, index) => restaurantBranches[index] === value
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      restaurantBranch:
        name === 'restaurantBranch' ? value : prevFormData.restaurantBranch,
      restaurantId:
        name === 'restaurantBranch' ? selectedId : prevFormData.restaurantId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the axios call to your login API endpoint
      const response = await axios.post('/api/register', formData);

      // Handle success, for example, show a success message or redirect
      // console.log('Register successful', response.data);

      // Show success toast
      alert('Registration successful!');
    } catch (error) {
      // Handle error
      console.error('error', error.response.data.message);

      // Show error toast
      alert(`${error.response.data.message}`);
    }
  };
  useEffect(() => {
    // Fetch restaurant branches and ids from API
    const fetchRestaurantData = async () => {
      try {
        const branchesResponse = await axios.get('/api/restaurant/get');
        const restaurants = branchesResponse.data.data;
        // Separate branches and ids
        const branches = restaurants.map(
          (restaurant) => restaurant.restaurantBranch
        );
        const ids = restaurants.map((restaurant) => restaurant.restaurantId);

        setRestaurantBranches(branches);
        setRestaurantIds(ids);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        // Handle error (e.g., show a toast)
      }
    };

    // Call the fetchRestaurantData function
    fetchRestaurantData();
  }, []);

  return (
    <div className="MenuHeaderMain1 py-5">
      <Card
        className="address-container container  p-4 col-md-8 col-lg-6 col-xl-4"
        id="CardBackIMg1"
      >
        <form onSubmit={handleSubmit} id="CardText">
          <div>
            <h2>Create Admin</h2>
          </div>

          <div className="mb-3">
            <label htmlFor="name">
              First name:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              className={`form-control `}
              id="name"
              name="name"
              required
              placeholder="Field is required"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">
              Last name:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="text"
              className={`form-control `}
              id="lastName"
              name="lastName"
              placeholder="Field is required"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              Email:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="email"
              className={`form-control `}
              id="email1"
              name="email"
              placeholder="Field is required"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="password"
              id="password"
              className={`form-control `}
              name="password"
              placeholder="Field is required"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">
              Phone:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              type="tel"
              id="phone"
              name="phone"
              className={`form-control `}
              placeholder="Field is required"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" id="CardText">
              Role:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <select
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option
                value="superAdmin"
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              >
                Super Admin
              </option>
              <option
                value="admin"
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              >
                Admin
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="restaurantBranch" id="CardText">
              Restaurant Branch:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <select
              style={{ backgroundColor: '#d4ffe8', color: 'black' }}
              id="restaurantBranch"
              className="form-control"
              name="restaurantBranch"
              value={formData.restaurantBranch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              {restaurantBranches &&
                restaurantBranches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            {/* Hide the Restaurant Id select input from the UI */}
            <input
              type="hidden"
              id="restaurantId"
              name="restaurantId"
              value={formData.restaurantId}
            />
          </div>
          <div className="mb-3">
            <Button type="submit" className=" my-global-button mb-4">
              Create Admin
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateAdmin;
