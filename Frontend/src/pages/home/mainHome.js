/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import MenuList from '../menu/userMenuList';
import FilterPanel from '../menu/FilterPanel';
import './home.css';

const Home = () => {
  const branch = localStorage.getItem('branch');
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const selectedBranch = localStorage.getItem('restaurantId');
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealTypeCategory, setMealTypeCategory] = useState(null);
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState(null);
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [items, setItems] = useState(0);

  useEffect(() => {
    const handleStorage = () => {
      const items = JSON.parse(localStorage.getItem('cartItems'));
      // console.log(items);
      if (items) {
        setItems(items.length);
        // console.log(items);
      }
    };

    window.addEventListener('storage', handleStorage());
    return () => window.removeEventListener('storage', handleStorage());
  }, []);

  const handleAddToCart = (menuItem) => {
    // Check if menuItem is defined and has an _id property
    if (!menuItem || !menuItem._id) {
      // console.error('Invalid menuItem:', menuItem);
      return;
    }

    // Check if the item is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item._id === menuItem._id
    );

    if (existingCartItem) {
      return;
    }
    const updatedCartItems = [
      ...cartItems,
      { ...menuItem, quantity: cartItems.quantity || 1 }
    ];
    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    const items = JSON.parse(localStorage.getItem('cartItems'));
    if (items) {
      setItems(items.length);
    }
  };

  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [show, setShow] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getProducts = async (
    keyword,
    dietaryPreferenceCategory,
    mealTypeCategory,
    currentPage
  ) => {
    try {
      setLoading(true);
      let link = `/api/products?restaurantId=${selectedBranch}&page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }
      const response = await axios.get(link);
      setMenus(response.data.Menus);
      setProductsCount(response.data.Count);
      setResPerPage(response.data.resPerPage);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching menus:', error);
      setLoading(false);
      // toast.warning('No menus available!', {
      //   position: toast.POSITION.BOTTOM_CENTER,
      //   autoClose: 3000
      // });
      setMealTypeCategory(null);
      setDietaryPreferenceCategory(null);
    }
  };

  const handleClearFilter = () => {
    setMealTypeCategory(null);
    setDietaryPreferenceCategory(null);
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm('');
  };

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
      // toast.error('Cannot proceed to checkout with an empty cart.');
    }
  };
  const returnBack = () => {
    getProducts();
  };

  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);

  useEffect(() => {
    getProducts(
      searchTerm,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
  }, [
    currentPage,
    searchTerm,
    mealTypeCategory,
    dietaryPreferenceCategory,
    branch
  ]);

  useEffect(() => {
    axios
      .get('/api/dietary-preferences')
      .then((response) => setDietaryCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching dietary categories:', error)
        alert('Error fetching dietary categories')
      );

    axios
      .get('/api/meal-types')
      .then((response) => setMealCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching meal categories:', error)
        alert('Error fetching meal categories')
      );
  }, []);

  return (
    <>
      {/* <div className="ProductImg1">
        <p className="text-white text-center" style={{ paddingTop: '100px', fontSize:'60px' }}>
          <span style={{ opacity: '0.5' }}>--</span> MENU LIST{' '}
          <span style={{ opacity: '0.5' }}>--</span>
        </p>
      </div> */}
      <Col md={12} lg={12} xs={12} sm={12}>
        <div className="Product2Comp text-center">
          <h3 className="py-4" id="Product2H3" style={{ color: ' #c6ac83' }}>
            What food do we have in our restaurant?
          </h3>
          <h2 className="mt-2" style={{ color: '#dadce0' }}>
            FROM OUR MENU
          </h2>
          <p className="mt-5 " style={{ color: ' #c6ac83' }}>
            We always give our customers a feeling of peace of mind and comfort
            when dining at our restaurant
          </p>
          <p style={{ color: ' #c6ac83', paddingBottom: '30px' }}>
            Sed ut perspiciatis unde omnis iste natus error voluptate
            accusantium
          </p>
        </div>
      </Col>
      <div className="Product3Comp ">
        <div style={{}} className="pt-3 float-end px-3" id="ShoppingCart">
          <Button
            as={Link}
            to="/cart"
            style={{
              border: 'none',
              backgroundColor: 'orange',
              borderRadius: '30px'
            }}
          >
            <i className="fa-solid fa-cart-shopping fa-xl " />
            <span>{items}</span>
          </Button>{' '}
          <br />
          <Button
            style={{
              border: 'none',
              backgroundColor: 'orange',
              borderRadius: '30px',
              padding: '6px 26px'
            }}
            className="filter-icon my-2 text-center"
            variant="light"
            // onClick={handleToggleFilterPanel}
            onClick={handleShow}
          >
            <FontAwesomeIcon
              style={{
                border: 'none',
                color: 'white',
                backgroundColor: 'orange'
              }}
              icon={faFilter}
            />
          </Button>
        </div>
        <Container fluid>
          <Row>
            {showFilterPanel && (
              <FilterPanel
                dietaryCategories={dietaryCategories}
                mealCategories={mealCategories}
                mealTypeCategory={mealTypeCategory}
                setMealTypeCategory={setMealTypeCategory}
                dietaryPreferenceCategory={dietaryPreferenceCategory}
                setDietaryPreferenceCategory={setDietaryPreferenceCategory}
                handleClearFilter={handleClearFilter}
              />
            )}
            <Col className="mb-5" xs={12} md={12} lg={12} sm={1}>
              <MenuList
                menus={menus}
                handleViewDetails={handleViewDetails}
                handleAddToCart={handleAddToCart}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                handlePageChange={handlePageChange}
                searchTerm={searchTerm}
                handleCloseModal={handleCloseModal}
                showModal={showModal}
                show={showModal}
                onHide={handleCloseModal}
                selectedMenuItem={selectedMenuItem}
              />
            </Col>
            {/* )} */}
          </Row>
          <>
            <Modal
              style={{ backgroundColor: 'transparent' }}
              show={showModal}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Filter Panel</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FilterPanel
                  dietaryCategories={dietaryCategories}
                  mealCategories={mealCategories}
                  mealTypeCategory={mealTypeCategory}
                  setMealTypeCategory={setMealTypeCategory}
                  dietaryPreferenceCategory={dietaryPreferenceCategory}
                  setDietaryPreferenceCategory={setDietaryPreferenceCategory}
                  handleClearFilter={handleClearFilter}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Container>
      </div>
    </>
  );
};

export default Home;
