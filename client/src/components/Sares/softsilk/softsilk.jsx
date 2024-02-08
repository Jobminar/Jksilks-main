import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../semikanchipattu/semikanchipattu.css'
import Navbar from '../../Navbar/Navbar';

const Softsilk = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://jk-skills.onrender.com/inventory';
  
    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        console.log(data)
        const freshVegetables = data.items.filter(item => item.category === 'softSilk');
        setInventoryData(freshVegetables);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //  data send

  const [selectedProduct,setSelectedProduct]=useState('');

  const handleProduct = (item) => {
    setSelectedProduct(item);
    navigate('/productview', { state: { selectedProduct: item } });
    console.log(item,'data')
  };


  return (
    <>
     {/* <p>Inventory Data</p>
         <pre>{JSON.stringify(inventoryData, null, 2)}</pre> */}
      <Navbar/>
      <div className='saree-con'>
        
 <h1 className='head'>Soft Silk</h1>
                  <p>Soft silk sarees are produced using fine silk fiber and less zari to attain its smooth texture. The smooth surface that does not have any projected threads makes it convenient to use. They are a harmonious blend of delicate silk threads, exuding a luxurious yet gentle texture, allowing for seamless draping and a touch of understated elegance, perfect for various occasions.</p>
        <div className='sare-section'>
          <div>

          </div>
          <div className='sare-sub-section'>
            <div className="sare-main-con">
              {inventoryData.map((item, index) => (
                <div key={index}>
                  <div className='product-image' onClick={() => handleProduct(item)} >
                    <img src={`data:image/png;base64, ${item.itemImage1}`} alt={`Item ${item.itemName}`} />
                 </div>
                  <p className="sarename">{item.itemname}</p>
                  <p className='sareprice'>{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Softsilk;
