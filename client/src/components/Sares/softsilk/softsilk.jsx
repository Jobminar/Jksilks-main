
import { useNavigate } from 'react-router-dom'
import Homedata from '../../Home/Homedata/homedata'
const Softsilk = (()=>{
    const navigate = useNavigate()
    return(
        <>
               <div className='saree-con'>
                 <h1 className='head'>Soft Silk</h1>
                  <p>Soft silk sarees are produced using fine silk fiber and less zari to attain its smooth texture. The smooth surface that does not have any projected threads makes it convenient to use. They are a harmonious blend of delicate silk threads, exuding a luxurious yet gentle texture, allowing for seamless draping and a touch of understated elegance, perfect for various occasions.</p>
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
export default Softsilk