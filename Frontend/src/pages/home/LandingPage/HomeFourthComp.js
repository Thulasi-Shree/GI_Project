import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Button } from 'react-bootstrap';
import './index.css';
import ContactUs from 'pages/contactUs/contactUs';

const HomeFourthComp = () => {
  return (
    <div className="HomeForthComp">
      <Container>
        <Row className="text-center">
          <Col lg={12} md={12} xs={12} sm={12}>
            <h1
              className="mt-md-5"
              style={{ fontFamily: 'serif', fontSize: '50px' }}
            >
              Sign up to receive news and offers from us!
            </h1>
          </Col>
          <Col lg={12} xs={12} sm={12}>
            <div className="mt-4">
              <ContactUs />
            </div>
          </Col>

          <Col lg={12} xs={12} sm={12}>
            <h5 className="mt-4 " style={{ color: 'black' }}>
              * We promise not to spam your inbox in any way
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeFourthComp;
