
import { useNavigate } from 'react-router-dom'
import Homedata  from '../../Home/Homedata/homedata'

const Lightweightpattu =(()=>{
    const navigate = useNavigate()
    return(
        <> 
               <div className='saree-con'>
                 <h1 className='head'>Light Weight Pattu</h1>
                  <p>Light weight pattu sarees are a blend of traditional motifs and patterns with contemporary fashion. Crafted from fine silk, offer the timeless allure of traditional elegance with a feather-light feel, making them effortlessly wearable and gracefully stylish for any affair.</p>
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
export default Lightweightpattu