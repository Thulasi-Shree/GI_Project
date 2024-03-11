/* eslint-disable no-alert */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {
  // clearAuthError,
  sendLoginOtp
} from '../../../redux-toolkit/actions/auth';
import './login.scss';

const SendLoginOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      // console.log('Logged in successfully');
    }
    if (error) {
      // console.log(error);
      alert('Failed!');
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      localStorage.setItem('emailOrPhone', JSON.stringify(email));
      alert(`OTP sent!`);
      navigate('/loginWithOtp');
      dispatch(sendLoginOtp(email));
    } else {
      validator.current.showMessages();
      setEmail('');
      dispatch(sendLoginOtp(setEmail));
    }
  };
  return (
    <div id="ForgetPMainImg" className="py-4">
      <div className="container-fluid mx-auto col-md-5 mt-5 mb-4 signup-form-container ">
        <form onSubmit={handleLogin}>
          <div className="row  custom-table mx-3 my-5" id="CardBackIMg1">
            <div className="col-11 mx-auto">
              <h4 className="text-center mt-3 font-regular-29" id="CardText">
                Send OTP
              </h4>
              <div className="mb-3">
                <label className="form-label mt-2" id="CardText">
                  Email
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  value={email}
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Field is required"
                  className="form-control"
                />
                {validator.current.message('email', email, 'required')}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 mb-4 mt-2 "
                  style={{ backgroundColor: '#bd870b' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SendLoginOtp;
