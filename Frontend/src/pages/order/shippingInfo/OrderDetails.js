/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card } from 'react-bootstrap';
import './index.css';

const OrderDetails = ({
  orderType,
  handleOrderTypeChange,
  handleText1,
  textBox1
}) => {
  return (
    <Card className="my-3 p-3 bg-transparent">
      <h4 id="CardText">Order Details</h4>
      <div className="mb-3 address-container">
        <label htmlFor="orderType" className="form-label" id="CardText">
          Order Type{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <select
          className="form-select form-select-sm col-xs-2 "
          id="orderType"
          value={orderType}
          onChange={handleOrderTypeChange}
          style={{ backgroundColor: '#d4ffe8', color: 'black' }}
          required
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Pickup" className="text-black">
            Pickup
          </option>
          <option value="Delivery" className="text-black">
            Delivery
          </option>
        </select>
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="orderNotes" className="form-label" id="CardText">
          Order Notes
        </label>
        <textarea
          type="text"
          style={{ backgroundColor: '#d4ffe8', color: 'black' }}
          className={`form-control `}
          name="orderNotes"
          value={textBox1}
          onChange={handleText1}
          placeholder="Order Notes"
        />
      </div>
    </Card>
  );
};

export default OrderDetails;
