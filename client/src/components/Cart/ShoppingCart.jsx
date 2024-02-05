
import React, { useState, useEffect } from 'react';
import './shoppingcart.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';

const ShoppingCart = () => {
  const [cartData, setCartData] = useState([]);
  const [quantityById, setQuantityById] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

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

  useEffect(() => {
    // Calculate total amount when cartData or quantityById changes
    const newTotalAmount = cartData.reduce((total, item) => {
      const itemQuantity = quantityById[item._id] || 1;
      return total + item.price * itemQuantity;
    }, 0);

    setTotalAmount(newTotalAmount);
  }, [cartData, quantityById]);

  const handleIncrease = (itemId) => {
    setQuantityById(prevQuantityById => ({
      ...prevQuantityById,
      [itemId]: (prevQuantityById[itemId] || 1) + 1,
    }));
  };

  const handleDecrease = (itemId) => {
    if (quantityById[itemId] > 1) {
      setQuantityById(prevQuantityById => ({
        ...prevQuantityById,
        [itemId]: prevQuantityById[itemId] - 1,
      }));
    }
  };

  // handle delete
  const handleItemDelete = (itemid) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user && user.user._id;
    const itemIdToDelete = itemid;
    console.log(userId ,   itemIdToDelete)
    // Data to send in the request body
    const dataToDelete = {
      userId: userId,
      itemId: itemIdToDelete
    };
    
    // Make a DELETE request to your backend API
    axios.delete('https://jk-skills.onrender.com/remove-from-cart', { data: dataToDelete })
      .then(response => {
        // Handle success (e.g., show a success message)
        alert('Item successfully deleted from the cart!');
        // You might want to update your local state to reflect the removal
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        alert('Error deleting item from the cart!');
        console.error('Error deleting item:', error);
      });
  };
  
  

  return (
    <div className='shoppingCart-con'>
      <div className='shoppingcart-main-con'>
        <h2>Your Shopping Cart</h2>
        {cartData.length > 0 ? (
          <div className='cart-main-con'>
            {cartData.map((item, index) => (
              <div key={index} className='cart-sub-con'>
                <div className='cart-image'>
                  <img src={`data:image/png;base64, ${item.itemImage1}`} alt={`Item ${item.itemname}`} />
                </div>
                <div>
                  <h3>{item.itemname}</h3>
                  <p className='details-price'>&#8377; {item.price}<br /><span>Inclusive all taxes</span></p>
                  <p>Type: {item.category}</p>
                  <p>Model: {item.code}</p>
                </div>
                <div className='quantity-sub-section'>
                  <h1>Quantity :</h1>
                  <button onClick={() => handleDecrease(item._id)}>-</button>
                  <span>{quantityById[item._id]}</span>
                  <button onClick={() => handleIncrease(item._id)}>+</button>
                </div>
                <div className='delete-icon' onClick={() => handleItemDelete(item._id)}>
                  <DeleteOutlinedIcon />
                </div>
              </div>
            ))}
            <div className='checkout-amount'>
              
              <div className='totalamount'>
                <h2>Total Amount : {totalAmount}</h2>
              </div>
              <div className='checkout-button'>
                <button>
                    Proceed to checkout
                </button>
              </div>
            </div>
            
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
