/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-useless-path-segments
import RestaurantSelection from '../../pages/restaurant/RestaurantSelection';
import ProductModal from './HomeModel';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/restaurant/get');
      const { data } = response;

      if (Array.isArray(data.data)) {
        setRestaurants(data.data);
      } else {
        setError('Invalid data format');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request error
        // console.error('Bad Request:', error.response.data);
        // Optionally, you can display a toast message here
        alert(`Bad Request: ${error.response.data}`);
      } else {
        setError('Error fetching data');
        // Display a toast message or log the error to the console
        // console.error('Error fetching data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    alert('Error!');
    return null; // or handle the error in a way that makes sense for your application
  }
  return (
    <div>
      <ProductModal />
      <div className="">
        <RestaurantSelection />
      </div>
    </div>
  );
};

export default HomePage;
