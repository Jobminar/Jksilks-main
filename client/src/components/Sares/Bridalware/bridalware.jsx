
import { useNavigate } from 'react-router-dom'
import Homedata from '../../Home/Homedata/homedata'
const Bridalware = (()=>{
    const navigate = useNavigate()
    return(
        <>
               <div className='saree-con'>
                 <h1 className='head'>Bridal Wear Sarees</h1>
                  <p>Bridal wear sarees are opulent ensembles adorned with intricate embellishments, rich fabrics, and exquisite designs, meticulously crafted to exude timeless grace and elevate the bride's beauty on her special day, epitomizing tradition and splendor.</p>
                <div className='sare-section'>
                      <div>

                      </div>
                      <div className='sare-sub-section'>
                            <div className="sare-main-con" onClick={()=>{navigate('/addtocart')}}>
                                    {Homedata.map((item, index) => (
                                        <div key={index}>
                                        
                                            <img
                                            src={item.img}
                                            alt={item.name}
                                            className="sare-image"
                                            />
                                            <p className="sarename">{item.name}</p>
                                            <p className='sareprice'>{item.price}</p>
                                        
                                        </div>
                                    ))}
                            </div>
                            
                      </div>
                </div>

           </div>
        </>
    )
})
export default Bridalware