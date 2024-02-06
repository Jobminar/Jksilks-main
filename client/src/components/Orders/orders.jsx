import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orders.css'
import { useNavigate } from 'react-router-dom';

const Ordersummary = () => {
  const navigate = useNavigate()
  const [cartData, setCartData] = useState([]);

  // get items
  useEffect(() => {
    // Fetch data from the API
    const user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);
      const userId = user && user.user._id;
    
      if (userId) {
        // Make a GET request to the /getCartByUserId/:userId endpoint
        fetch(`https://jk-skills.onrender.com/getCartByUserId/${userId}`)
          .then((response) => {
            // Check if the request was successful (status code 2xx)
            if (response.ok) {
              return response.json();
            } else {
              // Handle errors for unsuccessful requests
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
          })
          .then((cartItems) => {
            // Handle the response data (cartItems) as needed
            console.log(cartItems);
            setCartData(cartItems)
          })
          .catch((error) => {
            // Handle errors during the fetch operation
            console.error("Fetch error:", error);
          });
      } else {
        console.error("User not logged in");
        // Handle not logged in scenario
      }
  }, []);


  return (
    <>
      <div className='ordersmain-con'>
          <h1>Orders summary</h1>

          {/* <ul>
         
              <p>{JSON.stringify(cartData, null, 2)}</p>
      
        </ul> */}
        <div className='delivery-address'>
             
        </div>
        <div className='main-order-con'>
          <h1>Orders</h1> 
        {cartData.map(product => (
          <div key={product.id} className='sub-order-con'>
            <div className='order-image'>
            <img src={`data:image/png;base64, ${product.itemImage1}`} alt={`Item ${product.itemname}`} />
            </div>
            <div>
              <h3>{product.itemname}</h3>
              <p>Price: {product.price}</p>
            </div>
            <div>
             <p>Description: {product.description}</p>
             <p>Quantity: {product.quantity}</p>
            </div>
            
            
          </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Ordersummary;
