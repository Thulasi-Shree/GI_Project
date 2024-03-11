/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuList.js
import React from 'react';
import { Button, Col, Modal } from 'react-bootstrap';
import './userMenuList.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const MenuList = ({
  menus,
  handleViewDetails,
  handleAddToCart,
  searchTerm,
  handleSearchChange,
  handleSearchSubmit,
  handleCloseModal,
  showModal,
  selectedMenuItem
}) => {
  return (
    <div>
      <Col
        lg={{ span: 4, offset: 4 }}
        md={{ span: 8, offset: 2 }}
        sm={{ span: 12, offset: 2 }}
        xs={12}
      >
        <input
          type="text"
          style={{
            borderRadius: '50px',
            marginTop: '50px',
            backgroundColor: 'white'
          }}
          className={`form-control `}
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Col>

      {menus.length === 0 ? (
        <div style={{ margin: '2%', textAlign: 'center' }}>
          <p>No menus found.</p>
        </div>
      ) : (
        <Container>
          <Row id="RowFourthComp" xs={12} sm={2} lg={4} md={2} className="mt-5">
            {menus.map((menuItem) => (
              <div key={menuItem._id} className="row">
                <div>
                  <Card style={{ width: '18rem' }} id="CardBackIMg1">
                    <Card.Img
                      variant="top"
                      src={
                        menuItem.images.length > 0
                          ? menuItem.images[0].image
                          : 'https://via.placeholder.com/75x50'
                      }
                      alt={menuItem.name}
                      style={{ height: '200px', width: '285px' }}
                    />
                    <Card.Body>
                      <Card.Title
                        className="text-center"
                        style={{ fontSize: '23px' }}
                        id="CardText"
                      >
                        {menuItem.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-center" id="CardText">
                        {menuItem.price}
                      </Card.Subtitle>
                      <Card.Text className="text-center" id="CardText">
                        {menuItem.mealTypeCategory}
                      </Card.Text>
                      <Card.Text className="text-center" id="CardText">
                        {menuItem.description}
                      </Card.Text>
                      <Button
                        variant="primary"
                        id="cart_btn"
                        disabled={!menuItem.isAvailable}
                        onClick={() => handleAddToCart(menuItem)}
                        className="btn d-inline mb-2 ms-auto "
                        style={{
                          backgroundColor: '#809aef ',
                          color: 'white',
                          fontWeight: '600',
                          width: '240px',
                          fontSize: '30px'
                        }}
                      >
                        {!menuItem.isAvailable ? (
                          <h6>Sold Out</h6>
                        ) : (
                          <h6 style={{ fontFamily: 'serif' }}>Add to Cart</h6>
                        )}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MenuList;
