import './semikanchipattu.css'
import { useNavigate } from 'react-router-dom'
import Homedata from '../../Home/Homedata/homedata'

const Semikanchipattu =(()=>{
    const navigate = useNavigate()
    return(
        <>
           <div className='saree-con'>
                 <h1 className='head'>Semi Kanchi Pattu</h1>
                  <p>It is also known as Kanchipuram Blended soft Silk Sarees and Kanjivaram Mixed Silk Sarees. Kanchipuram Semi Silk sarees are lightweight and comfortable as pure silk. Semi silk is as soft as cotton and as bright as silk and as breathable as wool.</p>
                <div className='sare-section'>
                      <div>
                      For filter
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
export default Semikanchipattu