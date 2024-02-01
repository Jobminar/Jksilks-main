import React from 'react'
import './productview.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Productview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || null;
 
  const [selectedimage, setSelectedimage] = useState(selectedProduct.itemImage1);

  const handleSubImageClick = (image) => {
    // Update the selectedProduct state to switch the main image
    setSelectedimage((prevProduct) => ({
      ...prevProduct,
      itemImage1: image,
    }));
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
                  <div className='sub-img' onClick={() => handleSubImageClick(selectedProduct.itemImage2)}>
                    <img src={`data:image/png;base64, ${selectedProduct.itemImage2}`} alt={`Item ${selectedProduct.itemname}`} />
                  </div>
                  <div className='sub-img' onClick={() => handleSubImageClick(selectedProduct.itemImage3)}>
                    <img src={`data:image/png;base64, ${selectedProduct.itemImage3}`} alt={`Item ${selectedProduct.itemname}`} />
                  </div>
                  <div className='sub-img' onClick={() => handleSubImageClick(selectedProduct.itemImage4)}>
                    <img src={`data:image/png;base64, ${selectedProduct.itemImage4}`} alt={`Item ${selectedProduct.itemname}`} />
                  </div>
                </div>                
              </div>
              <div className='productview-main-details-con'>
                {Object.entries(selectedProduct).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
         </div>
      </div>

      <p style={{margin:'1rem 5rem'}}>
        {Object.entries(selectedProduct).map(([key, value]) => (
          <span key={key}>
            {key}: {value}<br />
          </span>
        ))}
      </p>
    </>
  )
}

export default Productview