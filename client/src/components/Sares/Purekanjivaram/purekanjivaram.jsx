
import { useNavigate } from 'react-router-dom'
import Homedata from '../../Home/Homedata/homedata'
const Purekanjivaram = (()=>{
    const navigate = useNavigate()
    return(
        <>
               <div className='saree-con'>
                 <h1 className='head'>Pure Kanchi Pattu</h1>
                  <p>Kanchi pattu sarees comes with a traditional value that is displayed through its craftsmanship. A traditional pattu saree is weaved using pure mulberry silk and a gold zari. Each saree is made with three threads of mulberry silk.</p>
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
export default Purekanjivaram