/* eslint-disable no-alert */
/* eslint-disable no-useless-catch */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalDetails from './PersonalDetails';
import OrderDetails from './OrderDetails';
import DeliveryAddress from './DeliveryAddress';
import BillingAddress from './BillingAddress';
import './ShippingInfo.css';

const ShippingInfo1 = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));
  const user = JSON.parse(localStorage.getItem('user'));
  const [enteredOtp, setOtp] = useState('');
  const [orderType, setOrderType] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('US');
  const [state, setState] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [textBox1, setTextBox1] = useState('');
  const [textBox2, setTextBox2] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timeVerified, setTimeVerified] = useState(false);
  const [name, setFirstName] = useState(isLoggedIn ? user.name : '');
  const [lastName, setLastName] = useState(isLoggedIn ? user.lastName : '');
  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [deliveryVerified, setDeliveryVerified] = useState(false);
  const [billingVerified, setBillingVerified] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [distanceResult, setDistanceResult] = useState(null);
  const [toastShown, setToastShown] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [billingCoordinates, setBillingCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(
    isLoggedIn ? user.phone : ''
  );
  const [errors, setErrors] = useState({});
  const lat = JSON.parse(localStorage.getItem('lat'));
  const lng = JSON.parse(localStorage.getItem('lng'));
  const [time, setTime] = useState(null);
  const location = useLocation();
  const oldState = location.state;

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    // console.log(time);
  };

  const handleUseCurrentLocationChange = () => {
    setUseCurrentLocation(!useCurrentLocation);
    // setUserLocation(false);
    setDeliveryVerified(false);
    setBillingVerified(false);
    setDistanceResult(null);
  };

  // Function to handle user name change
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTimeSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedTimeSlot(selectedSlot);
    localStorage.setItem('selectedTimeSlot', JSON.stringify(selectedSlot));
  };

  // Function to handle mobile number change
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleText1 = (e) => {
    const orderNotes = e.target.value;
    setTextBox1(orderNotes);
    localStorage.setItem('orderNotes', JSON.stringify(orderNotes));
  };
  const handleText2 = (e) => {
    const deliveryInstruction = e.target.value;
    setTextBox2(deliveryInstruction);
    localStorage.setItem(
      'deliveryInstruction',
      JSON.stringify(deliveryInstruction)
    );
  };
  // Function to handle order type change
  const handleOrderTypeChange = (e) => {
    const selectedOrderType = e.target.value;
    localStorage.setItem('orderType', JSON.stringify(selectedOrderType));
    setOrderType(selectedOrderType);
  };

  // Function to handle street address change
  const handleStreetAddressChange = (e) => {
    setStreetAddress(e.target.value);
  };

  // Function to handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  // Function to handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Function to handle ZIP code change
  const handleZipCodeChange = (e) => {
    setPostal_code(e.target.value);
  };
  const handleConfirmOtp = async () => {
    try {
      const apiUrl = '/api/verify/otp';

      const response = await axios.post(apiUrl, {
        email: emailOrMobile,
        mobile: emailOrMobile,
        enteredOtp
      });

      if (response.data.success) {
        // console.log('OTP verified successfully');
        alert('OTP verified successfully');
        localStorage.setItem('emailOrMobile', JSON.stringify(emailOrMobile));
        setOtpVerified(true);
      } else {
        alert(`OTP verification failed!`);
      }
    } catch (error) {
      alert(`OTP verification failed!`);
    }
  };
  const handleEmailOrMobileChange = (e) => {
    setEmailOrMobile(e.target.value);
  };

  const handleGetOtp = async () => {
    try {
      const apiUrl = '/api/send/otp';
      // console.log('Mobile Number:', emailOrMobile);
      // Check if the input is an email or a phone number
      const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
      const isPhone = /^\d{10}$/.test(emailOrMobile);

      // Send the request to get OTP
      await axios.post(apiUrl, {
        email: isEmail ? emailOrMobile : undefined,
        mobile: isPhone ? emailOrMobile : undefined
      });

      alert('OTP sent successfully!');
      setIsOtpSent(true);
    } catch (error) {
      // console.error('Error sending OTP:', error);
      alert(`Error sending OTP!`);
    }
  };

  let latitude1;
  let longitude1;
  const geoapifyApiKey = '31bc2a8978644190beec0a6f143266d3';
  let positionLat;
  let positionLng;
  let position;
  const findMyCoordinates = async () => {
    try {
      if (navigator.geolocation) {
        position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        latitude1 = position.coords.latitude; // Updated to get latitude
        longitude1 = position.coords.longitude; // Updated to get longitude
        localStorage.setItem('lat', JSON.stringify(latitude1));
        localStorage.setItem('lng', JSON.stringify(longitude1));
        const location = ` https://api.geoapify.com/v1/geocode/reverse?lat=${latitude1}&lon=${longitude1}&apiKey=70348c75b2aa4bd0b91fcba1f9e3a0dc`;
        const response = await axios.get(location);
        const { data } = response;
        setUserLocation(data);
        const distanceResponse = await axios.post('/api/calculate-distance', {
          latitude: latitude1,
          longitude: longitude1
        });

        const result = distanceResponse;
        const calculatedDistance = distanceResponse.data.distanceInKilometers;
        setDistanceResult(calculatedDistance);
        // setBillingVerified(true);
        if (calculatedDistance < 500) {
          setDeliveryVerified(true);
          localStorage.setItem('orderAvailableAlertShown', 'true');
        } else {
          setDeliveryVerified(false);
        }
        localStorage.setItem('distanceResponse', JSON.stringify(result));
        localStorage.setItem(
          'deliveryAddress',
          JSON.stringify({
            streetAddress: data.features[0].properties.address_line1,
            postal_code: data.features[0].properties.postcode,
            city: data.features[0].properties.city,
            state: data.features[0].properties.state,
            country: data.features[0].properties.country
          })
        );

        // console.log(data);
        setToastShown(true);
      } else {
        alert('Geolocation is not supported by your browser');
      }
    } catch (error) {
      // console.error('Error getting location:', error.message);
      alert('Error getting location');
      // notifyError(error.message);
    }
  };
  const fullAddress = `${streetAddress}, ${city}, ${postal_code} ${state}, ${country}`;

  const geocodeAddressToCoordinates = async (address) => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`
      );
      if (!response.data.features || response.data.features.length === 0) {
        throw new Error('Coordinates not found for the given address');
      }

      const firstFeature = response.data.features[0];
      const { lat, lon } = firstFeature.properties;
      positionLat = firstFeature.properties.lat;
      positionLng = firstFeature.properties.lon;
      // console.log(`-------------${positionLat}`);

      localStorage.setItem('lat', JSON.stringify(lat));
      localStorage.setItem('lng', JSON.stringify(lon));
      return { latitude: lat, longitude: lon };
    } catch (error) {
      throw error;
    }
  };
  const handleAddressChange = async (e) => {
    if (useCurrentLocation) {
      try {
        findMyCoordinates();
      } catch (error) {
        // console.log(error);
        alert('Error in finding coordinates');
      }
    } else {
      try {
        const newCoordinates = await geocodeAddressToCoordinates(fullAddress);
        setCoordinates(newCoordinates);
        const distanceResponse = await axios.post('/api/calculate-distance', {
          latitude: positionLat,
          longitude: positionLng
        });

        const result = distanceResponse;
        const calculatedDistance = distanceResponse.data.distanceInKilometers;
        setDistanceResult(calculatedDistance);
        // setBillingVerified(true);
        if (calculatedDistance < 500) {
          setDeliveryVerified(true);
          alert('Order availabe for your location');
        } else {
          setDeliveryVerified(false);
          if (orderType !== 'Pickup') {
            alert('Order not availabe for your location');
          }
        }

        localStorage.setItem('distanceResponse', JSON.stringify(result));
      } catch (error) {
        setDeliveryVerified(false);

        // Check if the error is an AxiosError and the status code is 400
        if (
          error.isAxiosError &&
          error.response &&
          error.response.status === 400
        ) {
          // Show a toast message for the 400 Bad Request error
          alert('Please check if delivery is available to your address.');
        }
        // else {
        //   // For other errors, show a general error message
        //   alert('Please enter your correct address.');
        // }
      }
    }
  };
  const handleButtonClick = () => {
    // setUserLocation(false);
    handleAddressChange();
  };
  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const [billingStreetAddress, setBillingStreetAddress] = useState('');
  const [billingpostal_code, setBillingpostal_code] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingCountry, setBillingCountry] = useState('US');
  const handleSameAsDeliveryChange = () => {
    setSameAsDelivery(!sameAsDelivery);

    if (!sameAsDelivery) {
      // If the user selects "Same as Delivery," auto-populate billing address
      setBillingStreetAddress(streetAddress);
      setBillingpostal_code(postal_code);
      setBillingCity(city);
      setBillingState(state);
      setBillingCountry(country);
    } else {
      // If the user unselects "Same as Delivery," clear the billing address
      setBillingStreetAddress('');
      setBillingpostal_code('');
      setBillingCity('');
      setBillingState('');
      // setBillingCountry('');
      localStorage.removeItem('billingAddress');
    }
  };
  const handleDeliveryBillingAddressChange = async (event) => {
    const fullBillingAddress = `${billingStreetAddress}, ${billingCity}, ${billingState}, ${billingpostal_code}, ${billingCountry}`;

    const geocodeBillingAddressToCoordinates = async (address) => {
      try {
        const geoapifyApiKey = '31bc2a8978644190beec0a6f143266d3';
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`
        );

        if (!response.data.features || response.data.features.length === 0) {
          throw new Error(
            'Coordinates not found for the given billing address'
          );
        }

        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;

        localStorage.setItem('billingLat', JSON.stringify(lat));
        localStorage.setItem('billingLng', JSON.stringify(lon));
        setBillingVerified(true);

        return { latitude: lat, longitude: lon };
      } catch (error) {
        // toast.error('Error geocoding billing address');
        setBillingVerified(false);
        throw error;
      }
    };

    try {
      const billingCoordinates = await geocodeBillingAddressToCoordinates(
        fullBillingAddress
      );
      setBillingCoordinates(billingCoordinates);
      // setBillingVerified(true);
      // toast.success('Address verified!');
      // if (
      //   (billingVerified === true && deliveryVerified === true) ||
      //   (orderType === 'Pickup' && billingVerified === true)
      // ) {
      //   navigate('/order/confirm');
      // }
    } catch (error) {
      // console.error('Error getting billing coordinates:', error.message);
      alert('Enter the correct address!');
      // Handle errors for billing address coordinates
    }
  };
  const handleBillingAddressChange = async (event) => {
    event.preventDefault();

    const fullBillingAddress = `${streetAddress}, ${city}, ${state}, ${postal_code}, ${country}`;

    const geocodeBillingAddressToCoordinates = async (address) => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${geoapifyApiKey}`
        );

        if (!response.data.features || response.data.features.length === 0) {
          throw new Error(
            'Coordinates not found for the given billing address'
          );
        }

        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;
        setBillingVerified(true);
        localStorage.setItem('billingLat', JSON.stringify(lat));
        localStorage.setItem('billingLng', JSON.stringify(lon));

        return { latitude: lat, longitude: lon };
      } catch (error) {
        throw error;
      }
    };

    try {
      const billingCoordinates = await geocodeBillingAddressToCoordinates(
        fullBillingAddress
      );

      setBillingCoordinates(billingCoordinates);
      // isValid(true);

      // Additional logic if needed
      // if (
      //   (billingVerified === true && deliveryVerified === true) ||
      //   (orderType === 'Pickup' && billingVerified === true)
      // ) {
      //   navigate('/order/confirm');
      // }
    } catch (error) {
      setBillingVerified(false);
      alert('Please enter the address correctly');
      // Handle the error accordingly, you might want to set an error state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addressData = {
        orderType,
        name,
        lastName,
        email,
        mobileNumber,
        textBox1,
        textBox2
      };
      if (orderType === 'Pickup') {
        await handleBillingAddressChange(e);
      } else {
        await handleDeliveryBillingAddressChange(e);
        await handleButtonClick();
      }

      localStorage.setItem('shippingInfo', JSON.stringify(addressData));
    } catch (error) {
      // Handle other errors
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again later.');
    }
  };

  useEffect(() => {
    // Fetch time slots from the API
    const fetchTimeSlots = async () => {
      try {
        const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
        const response = await axios.post('/api/timeSlots', { restaurantId });
        const timeSlotsData = response.data.timeSlots;
        setTimeSlots(timeSlotsData);
      } catch (error) {
        // console.error('Error fetching time slots:', error.message);
        alert('Error fetching time slots');
      }
    };

    fetchTimeSlots();
  }, []);
  useEffect(() => {
    if (!toastShown && useCurrentLocation) {
      findMyCoordinates();
      setToastShown(true);
    }
  }, [toastShown, useCurrentLocation]);
  useEffect(() => {
    // This useEffect will run whenever any of the billing address state values change
    // and it will update localStorage accordingly.
    localStorage.setItem(
      'billingAddress',
      JSON.stringify({
        streetAddress: billingStreetAddress,
        postal_code: billingpostal_code,
        city: billingCity,
        state: billingState,
        country: billingCountry
      })
    );
  }, [
    billingStreetAddress,
    billingpostal_code,
    billingCity,
    billingState,
    billingCountry
  ]);
  useEffect(() => {
    localStorage.setItem(
      'deliveryAddress',
      JSON.stringify({
        streetAddress,
        postal_code,
        city,
        state,
        country
      })
    );
  }, [streetAddress, postal_code, city, state, country]);
  useEffect(() => {
    // console.log('sameAsDelivery changed:', sameAsDelivery);
    if (sameAsDelivery) {
      if (!useCurrentLocation) {
        setBillingStreetAddress(streetAddress);
        setBillingpostal_code(postal_code);
        setBillingCity(city);
        setBillingState(state);
        setBillingCountry(country);
      } else {
        // If not manually entered, use the current location address
        setBillingStreetAddress(
          userLocation.features[0].properties.address_line1
        );
        setBillingpostal_code(userLocation.features[0].properties.postcode);
        setBillingCity(userLocation.features[0].properties.city);
        setBillingState(userLocation.features[0].properties.state);
        setBillingCountry(userLocation.features[0].properties.country);
      }
    }
  }, [sameAsDelivery, streetAddress, postal_code, city, state, country]);
  useEffect(() => {
    // if (billingVerified && deliveryVerified) {
    //   navigate('/order/confirm');
    // }
    if (
      (billingVerified === true && deliveryVerified === true) ||
      (orderType === 'Pickup' && billingVerified === true)
    ) {
      navigate('/order/confirm');
    }
  }, [billingVerified, deliveryVerified, orderType, navigate]);

  return (
    <div id="ShippingInfo" className="py-5">
      <div className="container col-md-5 custom-table my-4" id="CardBackIMg">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {!isLoggedIn && (
            <PersonalDetails
              name={name}
              lastName={lastName}
              email={email}
              otp={enteredOtp}
              handleGetOtp={handleGetOtp}
              isOtpSent={isOtpSent}
              otpVerified={otpVerified}
              emailOrMobile={emailOrMobile}
              handleConfirmOtp={handleConfirmOtp}
              handleFirstNameChange={handleFirstNameChange}
              handleLastNameChange={handleLastNameChange}
              handleEmailChange={handleEmailChange}
              handleOtpChange={handleOtpChange}
              handleEmailOrMobileChange={handleEmailOrMobileChange}
              errors={errors}
            />
          )}
          {(otpVerified || isLoggedIn) && (
            <OrderDetails
              orderType={orderType}
              selectedTimeSlot={selectedTimeSlot}
              timeSlots={timeSlots}
              handleOrderTypeChange={handleOrderTypeChange}
              handleTimeSlotChange={handleTimeSlotChange}
              handleTimeChange={handleTimeChange}
              time={time}
            />
          )}
          {orderType === 'Delivery' && (
            <DeliveryAddress
              streetAddress={streetAddress}
              postal_code={postal_code}
              city={city}
              state={state}
              country={country}
              textBox2={textBox2}
              setBillingVerified={setBillingVerified}
              handleStreetAddressChange={handleStreetAddressChange}
              handleZipCodeChange={handleZipCodeChange}
              handleCityChange={handleCityChange}
              handleStateChange={handleStateChange}
              handleCountryChange={handleCountryChange}
              handleText2={handleText2}
              handleButtonClick={handleButtonClick}
              toastShown={toastShown}
              setToastShown={setToastShown}
              useCurrentLocation={useCurrentLocation}
              findMyCoordinates={findMyCoordinates}
              userLocation={userLocation}
              sameAsDelivery={sameAsDelivery}
              billingCity={billingCity}
              billingState={billingState}
              billingCountry={billingCountry}
              setBillingStreetAddress={setBillingStreetAddress}
              handleSameAsDeliveryChange={handleSameAsDeliveryChange}
              billingStreetAddress={billingStreetAddress}
              billingPostalCode={billingpostal_code}
              setBillingPostalCode={setBillingpostal_code}
              setBillingCity={setBillingCity}
              setBillingState={setBillingState}
              setBillingCountry={setBillingCountry}
              coordinates={coordinates}
              handleUseCurrentLocationChange={handleUseCurrentLocationChange}
              distanceResult={distanceResult}
            />
          )}
          {orderType === 'Pickup' && (
            <BillingAddress
              streetAddress={streetAddress}
              postal_code={postal_code}
              city={city}
              state={state}
              country={country}
              textBox1={textBox1}
              handleBillingAddressChange={handleButtonClick}
              handleStreetAddressChange={handleStreetAddressChange}
              handleZipCodeChange={handleZipCodeChange}
              handleCityChange={handleCityChange}
              handleStateChange={handleStateChange}
              handleCountryChange={handleCountryChange}
              handleText1={handleText1}
              orderType={orderType}
            />
          )}
          <button
            type="submit"
            className="btn my-global-button btn-primary mb-4"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingInfo1;
