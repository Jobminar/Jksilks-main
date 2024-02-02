// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ShoppingCart = () => {
//   // Data receive
//   const navigate = useNavigate();
//   const location = useLocation();
//   const cartProduct = location.state?.cartProduct || null;


//   const handleDeleteItem = (itemId) => {
//     // Remove the item with the given itemId from the cartProducts array
//     const updatedCartProducts = cartProducts.filter(item => item.id !== itemId);
//     // Update the location state or perform any other action as needed
//     navigate('/', { state: { cartProducts: updatedCartProducts } });
//   };

//   return (
//     <div className='ShoppingCart-con'>

         
//            <p>Inventory Data</p>
//          <pre>{JSON.stringify(cartProduct, null, 2)}</pre>
//       <h2>Your Shopping Cart</h2>
    
       
     
//     </div>
//   );
// };

// export default ShoppingCart;


// // import React, { useState, useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';

// // const ShoppingCart = () => {
// //   const location = useLocation();
// //   const cartProduct = location.state?.cartProduct || null;
  
// //   useEffect(() => {
// //     console.log("cartProducts data:", cartProduct);
// //   }, [cartProduct]);

// //   return (
// //     <div className='ShoppingCart-con'>
// //       <h2>Your Shopping Cart</h2>
   
// //         <ul>
// //           {cartProduct.map((item) => (
// //             <li key={item.id}>
// //               <div>
// //                 <p>{item.itemname}</p>
// //                 <p>{item.price}</p>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
      
// //         <p>Your cart is empty.</p>
   
// //     </div>
// //   );
// // };

// // export default ShoppingCart;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './shoppingcart.css'

const ShoppingCart = () => {
  // Data receive
  const navigate = useNavigate();
  const location = useLocation();
  const initialCartProduct = location.state?.cartProduct || null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (initialCartProduct) {
      setCartProducts([initialCartProduct]);
    }
  }, [initialCartProduct]);

  const handleDeleteItem = (itemId) => {
    // Remove the item with the given itemId from the cartProducts array
    const updatedCartProducts = cartProducts.filter(item => item.id !== itemId);
    // Update the cartProducts state
    setCartProducts(updatedCartProducts);
    // You can also update the location state if needed
    navigate('/', { state: { cartProducts: updatedCartProducts } });
  };

  return (
    <>
     <div className='ShoppingCart-con'>
         <div className='ShoppingCart-main-con'>
              {cartProducts.map((item) => (
              <div key={item.id}>
                <p>{item.itemname}</p>
                <p>{item.price}</p>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            ))}
         </div>
  
   
     

      <p>Inventory Data</p>
      <pre>{JSON.stringify(cartProducts, null, 2)}</pre>
      <h2>Your Shopping Cart</h2>
    </div>
    </>
   
  );
};

export default ShoppingCart;
