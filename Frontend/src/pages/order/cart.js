/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const branch = localStorage.getItem('branch');
  const [cartItemss, setCartItems] = useState(storedCartItems);
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );
  const navigate = useNavigate();
  const handleAdd = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: (localQuantities[item._id] || 0) + 1
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };
  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: Math.max((localQuantities[item._id] || 0) - 1, 0)
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems
      .map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: Math.max((cartItem.quantity || 0) - 1, 0)
          };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);
    setCartItems(updatedCartItems);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };

  const handleDelete = (itemId) => {
    try {
      const storedCartItem =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCartItems = storedCartItem.filter(
        (item) => item._id !== itemId
      );

      // Update state
      setLocalQuantities((prevQuantities) => {
        const { [itemId]: _, ...rest } = prevQuantities;
        return rest;
      });
      setCartItems(updatedCartItems);

      // Update localStorage
      if (updatedCartItems.length === 0) {
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      // console.error('Error deleting item:', error.message);
      alert('Error deleting item');
    }
  };
  const checkoutHandler = () => {
    const cartItemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1; // Use item.quantity directly
      const price = Number(item.price);
      const subtotal = quantity * price;
      // console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
      return acc + subtotal;
    }, 0);

    if (cartItemsTotal > 0) {
      localStorage.setItem('cartItemsTotal', JSON.stringify(cartItemsTotal));
      navigate('/shippingInfo');
    } else {
      alert('Cannot proceed to checkout with an empty cart.');
    }
  };

  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);
  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        className="row justify-content-center"
        id="EmptyCard"
        style={{ height: '60vh' }}
      >
        <div className="col-12 mt-5 my-auto text-center align-center">
          <h3 className="mx-auto fs-1 pt-5">Your cart is empty</h3>
        </div>
      </div>
    );
  }

  return (
    <div id="CartMain">
      <div className="col-11 mx-auto py-5 ">
        <div
          id="CardDetail"
          className="container mx-auto custom-table col-12 col-lg-5 pt-5"
        >
          <Card id="CardText" className="px-4 py-2 mb-3 col-12 mx-auto">
            <Card.Body>
              <div className="delivery-info">
                <b>Restaurant:</b> {branch} {address}
              </div>
              <div className="delivery-info">
                <b>Date:</b> {date}
              </div>
              <div className="delivery-info">
                <b>Time:</b> {time}
              </div>
            </Card.Body>
          </Card>
          <Card id="CardText" className="px-4 py-2 mb-3 col-12 ms-3 mx-auto">
            <>Cart Order Items</>
          </Card>

          <Card
            id="CardText"
            className="row d-flex col-11 mx-auto justify-content-between "
          >
            {/* <div> */}
            {cartItems.map((item) => (
              <Fragment key={item._id}>
                {/* <hr /> */}
                <div className="row cart-item">
                  <div className="container-fluid">
                    <div className="row cart-item-details">
                      <span
                        className="pointer col-5"
                        onClick={() => handleViewDetails(item)}
                        style={{ fontSize: '1.0rem' }}
                      >
                        {item.name}
                      </span>
                      <div className="col-7 d-flex mb-2">
                        {/* <p className="col-12" id="card_item_price">
                      ${item.price}
                    </p> */}
                        <p className="col-6" id="card_item_total">
                          <p id="CardDetail">
                            <span className="text-black">
                              ${item.price * item.quantity}
                            </span>
                          </p>
                        </p>
                        <div className="stockCounter col-6 ">
                          {/* <div className="stockCounter "> */}
                          <span
                            className="icon-container"
                            onClick={() => handleMinus(item)}
                          >
                            <FontAwesomeIcon
                              icon={faMinus}
                              className="icon-border"
                            />
                          </span>
                          <span className=" quantity ">{item.quantity} </span>
                          <span
                            className="icon-container"
                            onClick={() => handleAdd(item)}
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="icon-border"
                            />
                          </span>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
              </Fragment>
            ))}
            <div className="col-12">
              <div id="order_summary">
                <p id="CardText">
                  Items total:{' '}
                  <span className="order-summary-values" id="CardText">
                    $
                    {(
                      cartItems.reduce((acc, item) => {
                        const subtotal = item.price * item.quantity;
                        return acc + subtotal;
                      }, 0) || 0
                    ).toFixed(2)}
                  </span>
                </p>
                {/* <hr /> */}
              </div>
            </div>
          </Card>
          <div className="px-4 py-2 mb-3 col-11 mx-auto">
            <button
              id="checkout_btn"
              onClick={checkoutHandler}
              className="btn my-global-button my-4 "
            >
              Check out
            </button>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Menu Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedMenuItem && (
                <>
                  <h3>{selectedMenuItem.name}</h3>
                  <p>Price: ${selectedMenuItem.price.toFixed(2)}</p>
                  <p>Description: {selectedMenuItem.description}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cart;
