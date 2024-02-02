import React from 'react'
import './productview.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Productview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || null;



  // handle quantity
 
    const [quantity, setQuantity] = useState(1);
  
    const handleIncrease = () => {
      setQuantity(quantity => quantity + 1);
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity => quantity - 1);
      }
    };


    // handle buttons
    const handleBuyNow = () => {
      // Add logic for handling "Buy Now" functionality
      alert(`Your total amount is ${Buynowamount} rupes`);
    };
  
   

    const Buynowamount = parseInt(selectedProduct.price) * quantity

    // data send to backend

    const handleAddToCart = () => {
        const dataToSend = {
          category: selectedProduct.category || null,
          itemname: selectedProduct.itemname ||  null,
          price: selectedProduct.price,
          code: selectedProduct.code,
          stitchingOptions: selectedProduct.stitchingOptions,
          fabric: selectedProduct.fabric,
          washCare: selectedProduct.washCare,
          length: selectedProduct.length,
          description: selectedProduct.description,
          itemImage1: selectedProduct.itemImage1,
          // itemImage2: 'exampleImage2Base64',
          // itemImage3: 'exampleImage3Base64',
          // itemImage4: 'exampleImage4Base64',
        };
    
        // Make a POST request to your backend API
        axios.post('https://jk-skills.onrender.com/add-to-cart', dataToSend)
          .then(response => {
            // Handle success (e.g., show a success message)
            alert(`Successfully added ${quantity} items to the cart!`);
          })
          .catch(error => {
            alert(`error added items to the cart!`);

            // Handle error (e.g., show an error message)
            console.error('Error adding items to the cart:', error);
          });
      };
    


    


  return (
    <>
   
      <div className='productview-con'>
         <div className='productview-main-con'>
            <div className='productview-main-img-con'>
                <div className='main-img-con'>
                <img src={`data:image/png;base64, ${selectedProduct.itemImage1}`} alt={`Item ${selectedProduct.itemname}`} />
                </div>
                <div className='sub-img-con'>
                    <div className='sub-img'>
                       <img src={`data:image/png;base64, ${selectedProduct.itemImage2}`} alt={`Item ${selectedProduct.itemname}`} />
                    </div>
                    <div className='sub-img'>
                    <img src={`data:image/png;base64, ${selectedProduct.itemImage3}`} alt={`Item ${selectedProduct.itemname}`} />
                    </div>
                    <div className='sub-img'>
                    <img src={`data:image/png;base64, ${selectedProduct.itemImage4}`} alt={`Item ${selectedProduct.itemname}`} />
                    </div>
                </div>                
            </div>
            <div className='productview-main-details-con'>
                <div className='details'>
                  <div>
                     <h2>{selectedProduct.itemname}</h2>
                  </div>
                  <p className='details-price'>&#8377;    {selectedProduct.price}<br/><span>Inclusive all taxes</span></p>
                  <p>Type : {selectedProduct.category}</p>
                  <p>Model :  {  selectedProduct.code}</p>
                  <p>Stitching Options :  {  selectedProduct.stitchingOptions}</p>
                  <p>Fabric : {selectedProduct.fabric}</p>
                  <p>Washcare : {selectedProduct.washCare}</p>
                  <p>Length : {selectedProduct.length} mtr</p>
                  <p>Description : {selectedProduct.description}</p>
                  <div className='quantity-section'>Quantity :  
                  <div className='quantity-sub-section'>
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                  </div>
                  </div>
                  <div className='buttons-section'>
                    <button onClick={handleBuyNow}>Buy Now</button>
                    <button onClick={handleAddToCart} >Add to Cart</button>
                  </div>
                </div>
                
                 
            </div>
         </div>
      </div>
{/* 
      <p style={{margin:'1rem 5rem'}}>
        {Object.entries(selectedProduct).map(([key, value]) => (
          <span key={key}>
            {key}: {value}<br />
          </span>
        ))}
      </p> */}
    </>
  )
}

export default Productview