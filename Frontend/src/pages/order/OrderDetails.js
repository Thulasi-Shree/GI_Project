/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './UserOrderList.css';
// import Sidebar from './Sidebar';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState('');
  const { id } = useParams();

  // Function to fetch order details
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/order/${id}`);
      const orderData = response.data.order;

      if (orderData && Array.isArray(orderData.items)) {
        setOrderDetails(orderData);
        setStatus(orderData.orderStatus);
      } else {
        console.error('Invalid order details response:', orderData);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  // const updateOrder = orderDetails._id;
  // Function to update order status
  // Function to update order status

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrderDetails(id);
  }, [id]); // Empty dependency array ensures the effect runs only once

  return (
    <div className="container-fluid py-5" id="ProfileMainImg">
      <div className="row col-lg-9 custom-table mx-auto" id="CardBackIMg">
        <div className="col">
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-4 order-details">
              <h4 className="my-4">
                <b>Order Info</b>
              </h4>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <div className="mx-2">
                  <b>Order Id:</b>
                </div>
                {orderDetails?._id}
              </div>

              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Name:</b>
                {`${orderDetails?.shipping.name} ${
                  orderDetails?.shipping.lastName || ''
                }`}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginBottom: '1rem'
                }}
              >
                <b className="mx-2">Phone:</b>{' '}
                {orderDetails?.shipping.phone || 'not found'}
              </div>
              <Card
                style={{
                  display: 'flex',
                  marginBottom: '1rem',
                  padding: '5px'
                }}
              >
                <b className="">Billing Address:</b>{' '}
                {orderDetails?.shipping?.address?.line1 || ''},{' '}
                {orderDetails?.shipping.address.city || ''},{' '}
                {orderDetails?.shipping.address.state || ''},{' '}
                {orderDetails?.shipping.address.country || ''},
                {orderDetails?.shipping.address.postalCode || ''}
              </Card>
              {orderDetails?.delivery && (
                <Card
                  style={{
                    display: 'flex',
                    marginBottom: '1rem',
                    padding: '5px'
                  }}
                >
                  <b className="">Delivery Address:</b>{' '}
                  {orderDetails?.delivery?.line1 || ''},{' '}
                  {orderDetails?.delivery?.city || ''},{' '}
                  {orderDetails?.delivery?.state || ''},{' '}
                  {orderDetails?.delivery?.country || ''},
                  {orderDetails?.delivery?.postalCode || ''}
                </Card>
              )}
              <Card className="mb-3">
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Restaurant:</b>{' '}
                  {orderDetails?.restaurantBranch || 'not found'}
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Selected time:</b>{' '}
                  {orderDetails?.selectedTimeSlot || 'not found'}
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Selected Date:</b>{' '}
                  {orderDetails?.orderDate || 'not found'}
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Order Type:</b>{' '}
                  {orderDetails?.orderType || 'not found'}
                </div>
              </Card>
              <Card className="pt-2">
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Total Amount:</b> $
                  {orderDetails?.totalPrice}
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Payment:</b> {orderDetails?.paymentStatus}
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Payment Id:</b>{' '}
                  {orderDetails?.paymentInfo}
                </div>
                <div />
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Paid at:</b> {orderDetails?.paidAt}
                </div>
              </Card>
              <Card
                style={{
                  display: 'flex',
                  marginBottom: '1rem',
                  padding: '5px'
                }}
                className={`my-4 ${
                  orderDetails?.orderStatus === 'Delivered'
                    ? 'greenColor'
                    : 'redColor'
                }`}
              >
                <b className="mx-2">Order Status:</b>{' '}
                {orderDetails?.orderStatus}
              </Card>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Order Instruction:</b>{' '}
                {orderDetails?.orderInstruction || '-'}
              </div>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Delivery Instruction :</b>{' '}
                {orderDetails?.deliveryInstruction || '-'}
              </div>
              <div />
            </div>

            <div className="col-12 col-lg-8 mt-5">
              <div className="col-9 px-5 mx-auto">
                <h3 className="my-4">Order Items:</h3>
              </div>
              <div className="col-12">
                {orderDetails?.items.length > 0 ? (
                  orderDetails?.items.map((item) => (
                    <Card
                      className="cart-item my-3 container col-8"
                      key={item._id}
                    >
                      <div className="row my-2">
                        {/* <div className="col-2 col-lg-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div> */}

                        <div className="col-12 col-lg-6">
                          <p>{item.name}</p>
                        </div>

                        <div className="col-5 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-7 col-lg-3 mt-4 mt-lg-0">
                          <p>Qty-{item.itemQuantity}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p>Items failed to display</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
