import Adminheader from '../adminheader'
import './adminfeedback.css'
import productimage from '../../Home/images/Frame 29.png'
import profileimg from '../images/profile.png'
import dots from '../images/dots.png'

const Adminfeedback =(()=>{
    return(
        <>
            <Adminheader/>
             <div className="adminfeedback">
                   <h1>Feedback</h1>
                   <div className='feedback-con'>
                        <div className='products-feedback'>
                             <p>Products</p>
                             <img src={productimage} alt='productsfeedback'/>

                        </div>
                        <div className='reviews-feedback'>
                            <p>Reviews</p>
                            <div className='customer-sub-details'>
                             <img src={profileimg} alt='profileimg' className='profile-img'/>
                             <div className='customer-content'>
                                 <p>Janaki Ramakrishna</p>
                                 <p className='date'>Joined : 08/02/2024 </p>
                             </div>
                             
                             <img src={dots} alt='dots' className='dotsimg'/>
                        </div>
                        <h2 className='review-msg'>Very nice quality amazing. Very nice quality amazing.Very nice quality amazing.Very nice quality amazing. Very nice quality amazing.</h2>
                        </div>
                   </div>
             </div>
        </>
    )
})
export default Adminfeedback