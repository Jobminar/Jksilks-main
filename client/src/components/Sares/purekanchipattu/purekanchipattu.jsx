import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../semikanchipattu/semikanchipattu.css'

const Purekanchipattu = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://jk-skills.onrender.com/inventory';
  
    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        console.log(data)
        const freshVegetables = data.items.filter(item => item.category === 'pureKanchiPattu');
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
      <div className='saree-con'>
        
      <h1 className='head'>Pure Kanchi Pattu</h1>
                  <p>Kanchi pattu sarees comes with a traditional value that is displayed through its craftsmanship. A traditional pattu saree is weaved using pure mulberry silk and a gold zari. Each saree is made with three threads of mulberry silk.</p>
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

export default Purekanchipattu;
