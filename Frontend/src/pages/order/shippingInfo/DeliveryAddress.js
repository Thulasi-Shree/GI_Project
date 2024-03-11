/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './index.css';
import { Button, Card } from 'react-bootstrap';
import BillingAddress from './BillingAddress';

const DeliveryAddress = ({
  streetAddress,
  postalCode,
  city,
  state,
  country,
  textBox2,
  billingPostalCode,
  useCurrentLocation,
  billingStreetAddress,
  setBillingPostalCode,
  handleSameAsDeliveryChange,
  setBillingStreetAddress,
  handleButtonClick,
  billingCity,
  setBillingCity,
  setBillingState,
  setBillingCountry,
  billingState,
  billingCountry,
  handleStreetAddressChange,
  handleZipCodeChange,
  handleCityChange,
  handleStateChange,
  sameAsDelivery,
  handleUseCurrentLocationChange,
  userLocation,
  distanceResult,
  handleText2
}) => {
  return (
    <Card className="my-3 p-3" id="CardBackIMg">
      <h4 id="CardText">Delivery Address</h4>
      <div className="location-options mt-2">
        <label className="radio-label" id="CardText">
          <input
            style={{ color: 'black', backgroundColor: '#d4ffe8' }}
            type="radio"
            name="locationOption"
            checked={useCurrentLocation}
            onChange={handleUseCurrentLocationChange}
          />
          <span className="radio-custom" />
          Use current location
        </label>
        <label className="radio-label" id="CardText">
          <input
            type="radio"
            name="locationOption"
            style={{ color: 'black', backgroundColor: '#d4ffe8' }}
            checked={!useCurrentLocation}
            onChange={handleUseCurrentLocationChange}
          />
          <span className="radio-custom" />
          Enter address manually
        </label>
      </div>

      {useCurrentLocation ? (
        <div>
          <p id="CardText">Using current location</p>
          {userLocation ? (
            <div>
              <p id="CardText">
                Address: {userLocation.features[0].properties.address_line1},{' '}
                {userLocation.features[0].properties.postcode},{' '}
                {userLocation.features[0].properties.state_district},{' '}
                {userLocation.features[0].properties.state},{' '}
                {userLocation.features[0].properties.country}
              </p>
              {/* <Button
                className="mb-2 my-global-button"
                onClick={handleButtonClick}
              >
                Check delivery{' '}
              </Button>{' '}
              <span className="text-danger">*</span> */}
              {distanceResult !== null && (
                <>
                  {distanceResult < 500 ? (
                    <div>
                      <p
                        style={{
                          color: '#008000',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Order available for this location
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        style={{
                          color: 'red',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Order not available for this location
                      </p>
                    </div>
                  )}
                </>
              )}
              <div className="mb-3">
                <label
                  htmlFor="deliveryInstructions"
                  className="form-label"
                  id="CardText"
                >
                  Delivery Instruction
                </label>
              </div>
              <div className="mb-3">
                <textarea
                  style={{ color: 'black', backgroundColor: 'transparent' }}
                  type="text"
                  className={`form-control `}
                  name="deliveryInstructions"
                  value={textBox2}
                  onChange={handleText2}
                  placeholder="Delivery Instructions"
                />
              </div>
              <div className="address-options mt-2">
                <label className="radio-label" id="CardText">
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="radio"
                    name="sameAsDeliveryOption"
                    checked={sameAsDelivery}
                    onChange={handleSameAsDeliveryChange}
                  />
                  <span className="radio-custom" />
                  Use Delivery address
                </label>
                <label className="radio-label" id="CardText">
                  <input
                    style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                    type="radio"
                    name="sameAsDeliveryOption"
                    checked={!sameAsDelivery}
                    onChange={handleSameAsDeliveryChange}
                  />
                  <span className="radio-custom" />
                  Enter different address
                </label>
              </div>
              <BillingAddress
                sameAsDelivery={sameAsDelivery}
                streetAddress={billingStreetAddress}
                postalCode={billingPostalCode}
                city={billingCity}
                state={billingState}
                country={billingCountry}
                handleStreetAddressChange={(e) =>
                  setBillingStreetAddress(e.target.value)
                }
                handleZipCodeChange={(e) =>
                  setBillingPostalCode(e.target.value)
                }
                handleCityChange={(e) => setBillingCity(e.target.value)}
                handleStateChange={(e) => setBillingState(e.target.value)}
                handleCountryChange={(e) => setBillingCountry(e.target.value)}
              />
              {/* <Button
                className="mb-2 my-global-button"
                onClick={handleBillingAddressChange}
              >
                Check Address
              </Button> */}
            </div>
          ) : (
            <p>Loading location...</p>
          )}
        </div>
      ) : (
        <div className="address-container">
          <div className="mb-3">
            <label id="CardText" htmlFor="streetAddress" className="form-label">
              Street Address{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ color: 'black', backgroundColor: 'transparent' }}
              type="text"
              className={`form-control `}
              id="streetAddress"
              value={streetAddress}
              onChange={handleStreetAddressChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label id="CardText" htmlFor="zipCode" className="form-label">
              ZIP Code{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ color: 'black', backgroundColor: 'transparent' }}
              type="text"
              className={`form-control `}
              id="zipCode"
              value={postalCode}
              onChange={handleZipCodeChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label id="CardText" htmlFor="city" className="form-label">
              City{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ color: 'black', backgroundColor: 'transparent' }}
              type="text"
              className={`form-control `}
              id="city"
              value={city}
              onChange={handleCityChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" id="CardText" className="form-label">
              State{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ color: 'black', backgroundColor: 'transparent' }}
              type="text"
              className={`form-control `}
              id="state"
              value={state}
              onChange={handleStateChange}
              required
              placeholder="Field is required"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" id="CardText" className="form-label">
              Country{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ color: 'black', backgroundColor: 'transparent' }}
              type="text"
              className={`form-control `}
              id="country"
              value={country}
              // onChange={handleCountryChange}
              required
              disabled
              placeholder="Field is required"
            />
          </div>
          {/* <Button
            className="mb-2 my-global-button"
            onClick={handleButtonClick}
            // disabled={isButtonClicked}
          >
            Check delivery{' '}
          </Button>{' '} */}
          {/* <span className="text-danger">*</span> */}
          {distanceResult !== null && (
            <>
              {distanceResult < 500 ? (
                <div>
                  <p
                    style={{
                      color: 'green',
                      backgroundColor: 'transparent',
                      fontWeight: '500'
                    }}
                  >
                    Order available for this location
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      color: 'red',
                      backgroundColor: 'transparent'
                      // fontWeight: '500'
                    }}
                  >
                    Order not available for this location
                  </p>
                </div>
              )}
            </>
          )}
          <label
            htmlFor="deliveryInstructions"
            id="CardText"
            className="form-label"
          >
            Delivery Instruction
          </label>
          <div className="mb-3">
            <textarea
              style={{ color: 'black', backgroundColor: 'transparent' }}
              type="text"
              className={`form-control `}
              name="deliveryInstructions"
              value={textBox2}
              onChange={handleText2}
              placeholder="Delivery Instructions"
            />
          </div>
          <div className="address-options mt-2">
            <label className="radio-label" id="CardText">
              <input
                type="radio"
                name="sameAsDeliveryOption"
                checked={sameAsDelivery}
                onChange={handleSameAsDeliveryChange}
              />
              <span className="radio-custom" />
              Use Delivery address
            </label>
            <label className="radio-label" id="CardText">
              <input
                type="radio"
                name="sameAsDeliveryOption"
                checked={!sameAsDelivery}
                onChange={handleSameAsDeliveryChange}
              />
              <span className="radio-custom" />
              Enter different address
            </label>
          </div>
          <BillingAddress
            sameAsDelivery={sameAsDelivery}
            streetAddress={billingStreetAddress}
            postalCode={billingPostalCode}
            city={billingCity}
            state={billingState}
            country={billingCountry}
            handleStreetAddressChange={(e) =>
              setBillingStreetAddress(e.target.value)
            }
            handleZipCodeChange={(e) => setBillingPostalCode(e.target.value)}
            handleCityChange={(e) => setBillingCity(e.target.value)}
            handleStateChange={(e) => setBillingState(e.target.value)}
            handleCountryChange={(e) => setBillingCountry(e.target.value)}
          />
          {/* <Button
            className="my-global-button mb-2"
            onClick={handleBillingAddressChange}
          >
            Check Address
          </Button> */}
        </div>
      )}
    </Card>
  );
};

export default DeliveryAddress;
