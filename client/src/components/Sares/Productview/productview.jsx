import React from 'react'
import './productview.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
      navigate('/orders')
    };
   
  //  handle addto cart----------------------------------------------->backend

    const Buynowamount = parseInt(selectedProduct.price) * quantity
      
    // data send to backend
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    const userId = user && user.user._id;
   
    const handleAddToCart = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);
      const userId = user && user.user._id;
      const itemid = selectedProduct._id
     
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
          userId:userId,
          itemId:itemid,
          quantity : quantity,
        };
    
        // Make a POST request to your backend API
        axios.post('https://jk-skills.onrender.com/add-to-cart', dataToSend)
          .then(response => {
          // Handle success (e.g., show a success message)
          alert(`Successfully added ${quantity} items to the favorite!`);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            alert('This item is already added to the wishlist.');
          } else {
            alert('Error adding items to the wishlist.');
          }

          // Handle other errors if needed
          console.error('Error adding items to the wishlist:', error);
        });
      };
    
      


    // handle favorite ----------------------------------------------------->backend
    const [isFavorite, setIsFavorite] = useState(false);

    const handlefavorite = () => {
      setIsFavorite(prevState => !prevState);
      const user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);
      const itemId = selectedProduct._id
      const userId = user && user.user._id;
     console.log(itemId)
     console.log(userId)

        const dataToSendfav = {
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
          userId:userId,
          itemId:itemId
          // quantity : quantity,
        };
    
        // Make a POST request to your backend API
        // Make a POST request to your backend API
        axios.post('https://jk-skills.onrender.com/wishlist/add', dataToSendfav)
        .then(response => {
          // Handle success (e.g., show a success message)
          alert(`Successfully added ${quantity} items to the favorite!`);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            alert('This item is already added to the wishlist.');
          } else {
            alert('Error adding items to the wishlist.');
          }

          // Handle other errors if needed
          console.error('Error adding items to the wishlist:', error);
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
                  <div className='title-fav-section'>
                     <h2>{selectedProduct.itemname}</h2>
                     <div>
                        <FavoriteIcon onClick={handlefavorite} style={{ color: isFavorite ? 'red' : 'black' }} />
                      </div>

                  </div>
                  <p className='details-price'>&#8377;    {selectedProduct.price}<br/><span>Inclusive all taxes</span></p>
                  <p>Type : {selectedProduct.category}</p>
                  <p>Model :  {  selectedProduct.code}</p>
                  <p>Stitching Options :  {  selectedProduct.stitchingOptions}</p>
                  <p>Fabric : {selectedProduct.fabric}</p>
                  <p>Washcare : {selectedProduct.washCare}</p>
                  <p>Length : {selectedProduct.length} mtr</p>
                  <p>Description : {selectedProduct.description}</p>
                  {/* <h1>id :{userId}</h1> */}
                  <div className='quantity-section'>Quantity :  
                  <div className='quantity-sub-section'>
                    <button onClick={()=>{handleIncrease}}>-</button>
                    <span>{quantity}</span>
                    <button onClick={()=>{handleDecrease}}>+</button>
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