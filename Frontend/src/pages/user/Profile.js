/* eslint-disable no-alert */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaData from 'layout/MetaData';
import './users.scss';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState({
    oldPassword: true,
    password: true,
    confirmPassword: true
  });

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  const handleEdit = () => {
    navigate(`/updateProfile/${userId}`);
  };

  const handleEditProfile = async () => {
    const isValid =
      isFormValid.oldPassword &&
      isFormValid.password &&
      isFormValid.confirmPassword;

    if (!isValid) {
      alert('Please provide all the fields in the form.');
      return;
    }

    try {
      if (password === confirmPassword) {
        const response = await axios.put(`/api/password/change/${userId}`, {
          oldPassword,
          password,
          confirmPassword
        });

        const successMessage = response.data.message;
        alert(successMessage);
        handleCloseEditModal();
      } else {
        alert('New password and confirm password must be the same.');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while updating the password.';
      alert(errorMessage);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/myprofile/${userId}`);
      const { user } = response.data.data;
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatar(user.avatar);
    };
    fetchUser();
  }, []);

  return (
    <div id="ProfileMainImg1" className="py-5 bg">
      <div className="col-10 mx-auto mt-4 row justify-content-around">
        <MetaData title={user.name} />
        <Container>
          <Row>
            <div>
              <h1 className="mx-auto" id="CardText">
                Profile
              </h1>
            </div>
            <Col lg={{ span: 5, offset: 0 }} md={12}>
              <Card className=" borderUp mb-5 mt-3" id="CardBackIMg1">
                <figure className="my-4 avatar avatar-profile" id="CardText">
                  <img
                    className="rounded-circle img-fluid"
                    src={avatar ?? require('../../assets/img/ProfilePic.png')}
                    alt="Profile"
                  />
                </figure>
                <div className="row-buttons col-9 mx-auto">
                  <div>
                    <button
                      className="btn my-global-button my-2"
                      onClick={handleEdit}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div>
                    <Link to="/userOrderList">
                      <button className="btn my-global-button my-2">
                        My Orders
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mx-auto">
                  <button
                    className="btn my-global-button mx-auto mb-4 "
                    onClick={handleShowEditModal}
                  >
                    Reset Password
                  </button>
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 5, offset: 2 }} md={{ span: 6, offset: 4 }}>
              <div className="my-5">
                <h4>Full Name</h4>
                <p id="CardText" style={{ fontWeight: '600' }}>
                  {name} {lastName}
                </p>

                <h4>Email Address</h4>
                <p id="CardText" style={{ fontWeight: '600' }}>
                  {email}
                </p>

                <h4>Phone</h4>
                <p id="CardText" style={{ fontWeight: '600' }}>
                  {phone}
                </p>

                <Modal
                  style={{ backgroundColor: 'transparent' }}
                  show={showEditModal}
                  id="CardBackIMg1"
                  onHide={handleCloseEditModal}
                >
                  <div id="CardBackIMg1">
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="oldPassword">
                          <Form.Label id="CardText">Old Password</Form.Label>
                          <Form.Control
                            type="password"
                            style={{
                              backgroundColor: '#d4ffe8',
                              color: 'black'
                            }}
                            required
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={(e) =>
                              setOldPassword(e.target.value) &&
                              setIsFormValid((prev) => ({
                                ...prev,
                                oldPassword: true
                              }))
                            }
                          />
                        </Form.Group>
                        {!isFormValid.confirmPassword && (
                          <div className="text-danger">
                            This fields are required.
                          </div>
                        )}
                        <Form.Group controlId="newPassword">
                          <Form.Label id="CardText">New Password</Form.Label>
                          <Form.Control
                            style={{
                              backgroundColor: '#d4ffe8',
                              color: 'black'
                            }}
                            type="password"
                            placeholder="Enter your new password"
                            value={password}
                            required
                            onChange={(e) =>
                              setPassword(e.target.value) &&
                              setIsFormValid((prev) => ({
                                ...prev,
                                password: true
                              }))
                            }
                          />
                        </Form.Group>
                        {!isFormValid.confirmPassword && (
                          <div className="text-danger">
                            This fields are required.
                          </div>
                        )}
                        <Form.Group controlId="confirm_password">
                          <Form.Label id="CardText">
                            Confirm Password
                          </Form.Label>
                          <Form.Control
                            style={{
                              backgroundColor: '#d4ffe8',
                              color: 'black'
                            }}
                            type="password"
                            placeholder="Re-enter your new password"
                            value={confirmPassword}
                            required
                            onChange={(e) =>
                              setConfirmPassword(e.target.value) &&
                              setIsFormValid((prev) => ({
                                ...prev,
                                confirmPassword: true
                              }))
                            }
                          />
                        </Form.Group>
                        {!isFormValid.confirmPassword && (
                          <div className="text-danger">
                            This fields are required.
                          </div>
                        )}
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="my-global-button"
                        onClick={handleCloseEditModal}
                      >
                        Close
                      </Button>
                      <Button
                        className="my-global-button"
                        onClick={handleEditProfile}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </div>
                </Modal>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
