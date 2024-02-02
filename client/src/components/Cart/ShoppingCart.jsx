// import React, { useState, useEffect } from 'react';
// import './shoppingcart.css'
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// const ShoppingCart = () => {
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     fetch('https://jk-skills.onrender.com/get-cart')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Set the fetched data to the state
//         setCartData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching cart data:', error);
//       });
//   }, []);

   
//   const [quantity, setQuantity] = useState(1);
//   const handleIncrease = () => {
//     setQuantity(quantity => quantity + 1);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity(quantity => quantity - 1);
//     }
//   };
 
//   // handle delete
//   const handleItemDelete = async (itemId) => {
//     try {
//       const deleteUrl = `https://jk-skills.onrender.com/remove-from-cart/${itemId}`;

//       const response = await fetch(deleteUrl, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete item. Status: ${response.status}`);
//       }
//       alert('Item successfully deleted');
//       // Remove the deleted item from the local state
//       // setInventoryData(prevData => prevData.filter(item => item._id !== itemId));
//       // alert('item deleted')
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };


//   return (
//     <div className='shoppingCart-con'>
//       <div className='shoppingcart-main-con'>
//         <h2>Your Shopping Cart</h2>
//         {cartData.length > 0 ? (
//           <div className='cart-main-con'>
//             {cartData.map((item, index) => (
//               <div key={index} className='cart-sub-con'>
//                 <div className='cart-image'>
//                     <img src={`data:image/png;base64, ${item.itemImage1}`} alt={`Item ${item.itemname}`} />
//                 </div>
//                 <div>
//                   <h3>{item.itemname}</h3>
//                   <p className='details-price'>&#8377;    {item.price}<br/><span>Inclusive all taxes</span></p>
//                   <p>Type : {item.category}</p>
//                   <p>Model :  {  item.code}</p>
//                 </div>
//                 <div className='quantity-sub-section'>
//                   <h1>Quantity :</h1>
//                     <button onClick={handleDecrease}>-</button>
//                     <span>{quantity}</span>
//                     <button onClick={handleIncrease}>+</button>
//                   </div>
//                 <div className='delete-icon' onClick={()=>{handleItemDelete(item._id)}}>
//                   <DeleteOutlinedIcon/>
              
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;



import React, { useState, useEffect } from 'react';
import './shoppingcart.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ShoppingCart = () => {
  const [cartData, setCartData] = useState([]);
  const [quantityById, setQuantityById] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jk-skills.onrender.com/get-cart')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Set the fetched data to the state
        setCartData(data);
        // Initialize quantity for each item to 1
        const initialQuantityById = {};
        data.forEach(item => {
          initialQuantityById[item._id] = 1;
        });
        setQuantityById(initialQuantityById);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
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
  const handleItemDelete = async (itemId) => {
    try {
      const deleteUrl = `https://jk-skills.onrender.com/remove-from-cart/${itemId}`;

      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item. Status: ${response.status}`);
      }

      alert('Item successfully deleted');
      // Remove the deleted item from the local state
      setCartData(prevData => prevData.filter(item => item._id !== itemId));
      // Also remove quantity state for the deleted item
      setQuantityById(prevQuantityById => {
        const { [itemId]: deletedQuantity, ...rest } = prevQuantityById;
        return rest;
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
            <div className='totalamount'>
              <h2>Total Amount : {totalAmount}</h2>
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
