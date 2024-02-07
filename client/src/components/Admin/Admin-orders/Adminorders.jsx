import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adminorders = () => {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jk-skills.onrender.com/orders/all');
        setOrdersData(response.data.orders || []); // Handle potential undefined or non-array case
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='Adminorders-con'>
        <h2>Orders</h2>
        {ordersData.map((orderGroup) => (
          <div key={orderGroup._id}>
            <h3>Order Group ID: {orderGroup._id}</h3>
            <ul>
              {Array.isArray(orderGroup.orders) && orderGroup.orders.map((order) => (
                <li key={order._id}>
                  <p>Order ID: {order._id}</p>
                  <p>Item Name: {order.orders[0].itemname}</p>
                  <p>Price: {order.orders[0].price}</p>
                  <p>Quantity: {order.orders[0].quantity}</p>
                  {/* Display other order details based on your API response */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Adminorders;
